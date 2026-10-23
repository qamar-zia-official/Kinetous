"use client";
import Link from "next/link";
import { getPostsByAuthor } from "@repo/db/blog/queries";
import { Button } from "@repo/ui/button";
import { Badge } from "@repo/ui/badge";
import { LogoutButton } from "@repo/ui/auth/logout-button";
import { AuthClient } from "@repo/auth/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { blogTable } from "@repo/db/schemas/schema";
import { ButtonGroup } from "@repo/ui/button-group";

export default function DashboardPage() {
    const { data, isPending } = AuthClient.useSession();
    const [posts, setPosts] = useState<
        (typeof blogTable.$inferSelect)[] | null
    >();
    const router = useRouter();

    useEffect(() => {
        // Wait for the session to resolve before doing anything.
        if (isPending) return;

        if (data == null) {
            router.push("/account/signup");
            return;
        }

        async function getPosts() {
            const post = await getPostsByAuthor(data!.user.id);
            setPosts(post);
        }
        getPosts();
    }, [data, isPending]);

    const canPublish = !!data?.user.emailVerified;

    return (
        <main className="mx-auto max-w-4xl px-6 py-16 space-y-8 min-h-screen flex pt-28 items-center flex-col w-full gap-4">
            <div className="flex items-center justify-between gap-4 w-full">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, {data?.user.name}
                    </h1>
                    <p className="text-muted-foreground">{data?.user.email}</p>
                </div>
                <div className="flex flex-col">
                    <ButtonGroup>
                        <LogoutButton />
                        <Button>
                            <Link href="/account/edit">Edit</Link>
                        </Button>
                    </ButtonGroup>
                </div>
            </div>

            <div className="flex items-center justify-between w-full">
                <h2 className="text-xl font-semibold">Your posts</h2>
                {canPublish ? (
                    <Button>
                        <Link href="/publish/new">New post</Link>
                    </Button>
                ) : (
                    <Button disabled title="Verify your email to publish">
                        New post
                    </Button>
                )}
            </div>

            {posts?.length === 0 ? (
                <p className="text-muted-foreground">
                    You haven&apos;t written anything yet.
                </p>
            ) : (
                <ul className="divide-y divide-border rounded-lg border border-border">
                    {posts?.map((post) => (
                        <li
                            key={post.id}
                            className="flex items-center justify-between gap-4 p-4"
                        >
                            <div>
                                <p className="font-medium">{post.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    {post.status}
                                    {post.publishedAt
                                        ? ` · ${new Date(post.publishedAt).toLocaleDateString()}`
                                        : ""}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {!post.visible && (
                                    <Badge variant="secondary">Draft</Badge>
                                )}
                                <Button variant="outline">
                                    <Link href={`/publish/${post.slug}`}>
                                        Edit
                                    </Link>
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
