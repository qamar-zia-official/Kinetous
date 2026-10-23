import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import StructuredData from "@repo/ui/seo/StructuredData";
import { pricingContent } from "@/content/pricing";

const siteUrl = "https://kinetous.com";

export const metadata: Metadata = {
    title: pricingContent.seo.title,
    description: pricingContent.seo.description,
    keywords: pricingContent.seo.keywords,
    alternates: {
        canonical: "/pricing",
    },
    openGraph: {
        title: `${pricingContent.seo.title} | Kinetous`,
        description: pricingContent.seo.description,
        url: `${siteUrl}/pricing`,
        type: "website",
    },
};

export default function PricingPage() {
    const { hero, tiers, factors, faq, cta } = pricingContent;

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
                name: "Pricing",
                item: `${siteUrl}/pricing`,
            },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <StructuredData data={[breadcrumbSchema, faqSchema]} />

            <section className="px-5 sm:px-8 pt-28 sm:pt-32 pb-12 sm:pb-16">
                <div className="mx-auto max-w-3xl text-center">
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
                <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={
                                tier.featured
                                    ? "rounded-3xl border border-blue-600/40 bg-blue-600/[0.06] p-8 flex flex-col"
                                    : "rounded-3xl border border-white/10 bg-white/[0.02] p-8 flex flex-col"
                            }
                        >
                            {tier.featured && (
                                <span className="mb-4 w-fit rounded-full border border-blue-600/40 bg-blue-600/10 px-3 py-1 text-[11px] font-medium text-blue-400">
                                    Most Common Scope
                                </span>
                            )}

                            <h2 className="text-xl font-bold">{tier.name}</h2>

                            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                                {tier.description}
                            </p>

                            <p className="mt-6 text-2xl sm:text-3xl font-extrabold text-blue-400">
                                {tier.price}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                                {tier.priceNote}
                            </p>

                            <ul className="mt-6 space-y-3">
                                {tier.includes.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2 text-sm text-zinc-400"
                                    >
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-t border-white/5 px-5 sm:px-8 py-16 sm:py-20">
                <div className="mx-auto max-w-3xl">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/60">
                        {factors.eyebrow}
                    </span>
                    <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
                        {factors.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-zinc-400">
                        {factors.description}
                    </p>

                    <div className="mt-10 space-y-6">
                        {factors.items.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                            >
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 px-5 sm:px-8 py-16 sm:py-20">
                <div className="mx-auto max-w-3xl">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/60">
                        {faq.eyebrow}
                    </span>
                    <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
                        {faq.title}
                    </h2>
                    <div className="mt-10 space-y-8">
                        {faq.items.map((item) => (
                            <div key={item.question}>
                                <h3 className="text-base sm:text-lg font-semibold text-zinc-100">
                                    {item.question}
                                </h3>
                                <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-400">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 px-5 sm:px-8 py-16 sm:pb-20">
                <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
                    <h2 className="text-xl font-bold">{cta.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {cta.description}
                    </p>
                    <Link
                        href={cta.href}
                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 text-sm transition-colors"
                    >
                        {cta.label}
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
