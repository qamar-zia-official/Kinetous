"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@repo/db/index";
import { blogTable } from "@repo/db/schemas/schema";
import {
    insertBlogSchema,
    updateBlogSchema,
} from "@repo/db/blog/blog-schema";
import { ok, fail, type ActionResult } from "@repo/db/blog/result";
import { requireUser, requireOwner, AuthError } from "@repo/auth/guard";

function slugify(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

export async function addBlog(
    input: typeof blogTable.$inferInsert,
): Promise<ActionResult<typeof blogTable.$inferSelect>> {
    let user;
    try {
        user = await requireUser();
    } catch (e) {
        if (e instanceof AuthError) return fail(e);
        throw e;
    }

    const parsed = insertBlogSchema.safeParse({
        ...input,
        // `authorId` is forced to the logged-in user's id here, overriding
        // whatever the client sent. Previously `input.authorId` (fully
        // client-controlled) was passed straight through to the insert — any
        // caller could publish a post attributed to any user id, including
        // someone else's, which would also have let them "own" and later edit
        // that post once ownership checks were added.
        authorId: user.id,
        slug: input.slug || slugify(input.title),
    });

    if (!parsed.success) {
        console.log(parsed.error);
        return fail(
            new Error(parsed.error.issues[0]?.message ?? "Invalid blog data"),
        );
    }

    try {
        const [row] = await db.insert(blogTable).values(parsed.data).returning();
        if (!row) return fail(new Error("Failed to create blog"));
        revalidatePath("/blog");
        return ok(row);
    } catch (e) {
        return fail(e);
    }
}

export async function updateBlog(
    input: typeof updateBlogSchema._output,
): Promise<ActionResult<typeof blogTable.$inferSelect>> {
    // Ownership check first: previously anyone could edit any post by id.
    const [existing] = await db
        .select({ authorId: blogTable.authorId })
        .from(blogTable)
        .where(eq(blogTable.id, input.id))
        .limit(1);

    if (!existing) return fail(new Error("Blog not found"));

    try {
        await requireOwner(existing.authorId);
    } catch (e) {
        if (e instanceof AuthError) return fail(e);
        throw e;
    }

    const parsed = updateBlogSchema.safeParse(input);

    if (!parsed.success) {
        return fail(
            new Error(parsed.error.issues[0]?.message ?? "Invalid blog data"),
        );
    }

    const { id, ...values } = parsed.data;

    try {
        const [row] = await db
            .update(blogTable)
            .set(values)
            .where(eq(blogTable.id, id))
            .returning();

        if (!row) return fail(new Error("Blog not found"));

        revalidatePath("/blog");
        return ok(row);
    } catch (e) {
        return fail(e);
    }
}

export async function removeBlog(
    blogId: string,
): Promise<ActionResult<{ id: string }>> {
    const [existing] = await db
        .select({ authorId: blogTable.authorId })
        .from(blogTable)
        .where(eq(blogTable.id, blogId))
        .limit(1);

    if (!existing) return fail(new Error("Blog not found"));

    try {
        await requireOwner(existing.authorId);
    } catch (e) {
        if (e instanceof AuthError) return fail(e);
        throw e;
    }

    try {
        const [row] = await db
            .delete(blogTable)
            .where(eq(blogTable.id, blogId))
            .returning({ id: blogTable.id });

        if (!row) return fail(new Error("Blog not found"));

        revalidatePath("/blog");
        return ok(row);
    } catch (e) {
        return fail(e);
    }
}
