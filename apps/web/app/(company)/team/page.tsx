import type { Metadata } from "next";

import StructuredData from "@repo/ui/seo/StructuredData";
import { teamContent } from "@/content/team";

const siteUrl = "https://kinetous.com";

export const metadata: Metadata = {
    title: teamContent.seo.title,
    description: teamContent.seo.description,
    keywords: teamContent.seo.keywords,
    alternates: {
        canonical: "/team",
    },
    openGraph: {
        title: `${teamContent.seo.title} | Kinetous`,
        description: teamContent.seo.description,
        url: `${siteUrl}/team`,
        type: "profile",
    },
};

export default function TeamPage() {
    const { hero, members, note } = teamContent;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${siteUrl}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Team",
                item: `${siteUrl}/team`,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <StructuredData data={[breadcrumbSchema]} />

            <section className="px-5 sm:px-8 pt-28 sm:pt-32 pb-12 sm:pb-16">
                <div className="mx-auto max-w-3xl">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/60">
                        {hero.eyebrow}
                    </span>
                    <h1 className="mt-4 text-[clamp(1.9rem,5vw,3.25rem)] font-bold leading-[1.1]">
                        {hero.title}
                    </h1>
                    <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-400">
                        {hero.description}
                    </p>
                </div>
            </section>

            <section className="px-5 sm:px-8 pb-16 sm:pb-20">
                <div className="mx-auto max-w-3xl space-y-6">
                    {members.map((member) => (
                        <article
                            key={member.name}
                            className="rounded-3xl border border-white/10 bg-white/[0.02] p-8"
                        >
                            <h2 className="text-xl font-bold">{member.name}</h2>

                            <p className="mt-1 text-sm font-medium text-blue-400">
                                {member.role}
                            </p>

                            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                                {member.bio}
                            </p>

                            {member.location && (
                                <p className="mt-4 text-xs text-zinc-500">
                                    {member.location}
                                </p>
                            )}

                            {member.links.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-4">
                                    {member.links.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target={
                                                link.external
                                                    ? "_blank"
                                                    : undefined
                                            }
                                            rel={
                                                link.external
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            className="text-xs font-medium text-zinc-400 transition-colors hover:text-white"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}

                    <p className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-sm leading-relaxed text-zinc-400">
                        {note}
                    </p>
                </div>
            </section>
        </main>
    );
}
