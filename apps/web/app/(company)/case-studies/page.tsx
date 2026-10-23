import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import StructuredData from "@repo/ui/seo/StructuredData";
import { Markdown } from "@/app/components/markdown";
import { caseStudiesContent } from "@/content/case-studies";

const siteUrl = "https://kinetous.com";

export const metadata: Metadata = {
    title: caseStudiesContent.seo.title,
    description: caseStudiesContent.seo.description,
    keywords: caseStudiesContent.seo.keywords,
    alternates: {
        canonical: "/case-studies",
    },
    openGraph: {
        title: `${caseStudiesContent.seo.title} | Kinetous`,
        description: caseStudiesContent.seo.description,
        url: `${siteUrl}/case-studies`,
        type: "website",
    },
};

export default function CaseStudiesPage() {
    const { hero, disclosure, intro, items } = caseStudiesContent;

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
                name: "Case Studies",
                item: `${siteUrl}/case-studies`,
            },
        ],
    };

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.title,
            url: `${siteUrl}/case-studies/${item.slug}`,
        })),
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <StructuredData data={[breadcrumbSchema, itemListSchema]} />

            {/* Hero */}
            <section className="border-b border-white/5 px-5 sm:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20">
                <div className="mx-auto max-w-5xl text-center">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/60">
                        {hero.eyebrow}
                    </span>
                    <h1 className="mt-4 text-[clamp(1.9rem,5vw,3.25rem)] font-bold leading-[1.1]">
                        {hero.title}
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed">
                        {hero.description}
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <a
                            href="https://wa.me/923058771054?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20fulfillment%20workflow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 text-base shadow-lg shadow-blue-600/25 transition-colors"
                        >
                            <FaWhatsapp size={18} />
                            {hero.primaryCta.label}
                        </a>
                        <Link
                            href={hero.secondaryCta.href}
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 text-zinc-300 font-bold px-6 py-3 text-base hover:bg-white/5 transition-colors"
                        >
                            {hero.secondaryCta.label}
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Disclosure */}
            <section className="px-5 sm:px-8 py-12 sm:py-16">
                <div className="mx-auto max-w-3xl">
                    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400/80">
                            Please read first
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                            {disclosure}
                        </p>
                    </div>

                    <Markdown content={intro} tone="dark" className="mt-10" />
                </div>
            </section>

            {/* Scenario list */}
            <section className="border-t border-white/5 px-5 sm:px-8 py-16 sm:pb-20">
                <div className="mx-auto max-w-4xl space-y-6">
                    {items.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/case-studies/${item.slug}`}
                            className="group block rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-blue-600/40 hover:bg-white/[0.04]"
                        >
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-zinc-500">
                                    {item.industry}
                                </span>
                                {item.services.map((service) => (
                                    <span
                                        key={service}
                                        className="rounded-full bg-blue-600/10 px-3 py-1 text-[11px] font-medium text-blue-400"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>

                            <h2 className="mt-4 text-xl sm:text-2xl font-bold group-hover:text-blue-400 transition-colors">
                                {item.title}
                            </h2>

                            <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
                                {item.summary}
                            </p>

                            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400">
                                Read the scenario
                                <ArrowRight
                                    size={14}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
