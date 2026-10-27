import type { Metadata } from "next";
import { getPublishedPosts, getAllTags } from "@repo/db/blog/queries";
import { BlogCard } from "@repo/ui/blog/blog-card";
import { TagFilter } from "@repo/ui/blog/tag-filter";
import { BlogPagination } from "@repo/ui/blog/blog-pagination";
import StructuredData from "@repo/ui/seo/StructuredData";
import {
    COMPANY_NAME,
    COMPANY_URL,
    DEFAULT_DESCRIPTION,
    SCHEMA_IDS,
    SITE_NAME,
    SITE_URL,
} from "@/lib/seo-config";

type BlogIndexSearchParams = { page?: string; tag?: string };

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<BlogIndexSearchParams>;
}): Promise<Metadata> {
    const { page: pageParam, tag } = await searchParams;
    const page = Number(pageParam ?? 1) || 1;
    const isFiltered = Boolean(tag) || page > 1;

    const titleParts = ["Blog"];
    if (tag) titleParts.push(`"${tag}" posts`);
    if (page > 1) titleParts.push(`Page ${page}`);

    return {
        title: isFiltered ? titleParts.join(" — ") : "Blog",
        description: DEFAULT_DESCRIPTION,
        alternates: {
            canonical: `${SITE_URL}/posts`,
        },
        robots: isFiltered
            ? { index: false, follow: true }
            : { index: true, follow: true },
    };
}

export default async function BlogIndex({
    searchParams,
}: {
    searchParams: Promise<BlogIndexSearchParams>;
}) {
    const { page: pageParam, tag } = await searchParams;
    const page = Number(pageParam ?? 1) || 1;

    const [{ posts, totalPages }, tags] = await Promise.all([
        getPublishedPosts({ page, tag }),
        getAllTags(),
    ]);

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": SCHEMA_IDS.blog,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        publisher: {
            "@type": "Organization",
            "@id": SCHEMA_IDS.organization,
            name: COMPANY_NAME,
            url: COMPANY_URL,
        },
        inLanguage: "en",
        isPartOf: {
            "@type": "WebSite",
            "@id": SCHEMA_IDS.website,
            name: SITE_NAME,
            url: SITE_URL,
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${SITE_URL}/posts`,
            },
        ],
    };

    return (
        <section className="mx-auto max-w-6xl px-6 py-24">
            <StructuredData data={blogSchema} id="ld-blog" />
            <StructuredData data={breadcrumbSchema} id="ld-breadcrumb" />
            <header className="mb-12 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
                <TagFilter tags={tags} />
            </header>

            {posts.length === 0 ? (
                <p className="text-muted-foreground">
                    {tag
                        ? `Nothing tagged "${tag}" yet.`
                        : "Nothing published yet."}
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            )}

            <div className="mt-12 flex justify-center">
                <BlogPagination page={page} totalPages={totalPages} />
            </div>
        </section>
    );
}
