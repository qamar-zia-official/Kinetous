import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code, Cpu } from "lucide-react";

import StructuredData from "@repo/ui/seo/StructuredData";
import { overviewContent } from "@/content/overview";

const siteUrl = "https://kinetous.com";

const overviewIcons: Record<string, typeof Code> = {
    code: Code,
    cpu: Cpu,
};

export const metadata: Metadata = {
    title: overviewContent.seo.title,
    description: overviewContent.seo.description,
    keywords: overviewContent.seo.keywords,
    alternates: {
        canonical: "/overview",
    },
    openGraph: {
        title: `${overviewContent.seo.title} | Kinetous`,
        description: overviewContent.seo.description,
        url: `${siteUrl}/overview`,
        type: "website",
    },
};

export default function OverviewPage() {
    const { hero, expertise, stack } = overviewContent;

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
                name: "Overview",
                item: `${siteUrl}/overview`,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <StructuredData data={[breadcrumbSchema]} />

            <section className="px-5 sm:px-8 pt-28 sm:pt-32 pb-12 sm:pb-16">
                <div className="mx-auto max-w-5xl">
                    <h1 className="max-w-3xl text-[clamp(1.9rem,5vw,3.25rem)] font-bold leading-[1.1]">
                        {hero.title}
                    </h1>

                    <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400">
                        {hero.description}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Link
                            href={hero.primaryCta.href}
                            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 text-sm transition-colors"
                        >
                            {hero.primaryCta.label}
                            <ArrowRight size={14} className="ml-2" />
                        </Link>

                        <Link
                            href={hero.secondaryCta.href}
                            className="inline-flex items-center justify-center rounded-2xl border border-white/15 hover:border-white/30 text-white font-medium px-6 py-3 text-sm transition-colors"
                        >
                            {hero.secondaryCta.label}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="px-5 sm:px-8 pb-16 sm:pb-20">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        {expertise.title}
                    </h2>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {expertise.items.map((item) => {
                            const Icon =
                                overviewIcons[item.icon] ?? Code;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-3xl border border-white/10 bg-white/[0.02] p-8"
                                >
                                    <Icon className="h-8 w-8 text-blue-400" />

                                    <h3 className="mt-5 text-xl font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 px-5 sm:px-8 py-16 sm:py-20">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        {stack.title}
                    </h2>

                    <div className="mt-8 flex flex-wrap gap-2">
                        {stack.items.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-zinc-300"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
