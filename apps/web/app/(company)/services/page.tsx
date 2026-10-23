import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import StructuredData from "@repo/ui/seo/StructuredData";
import { Markdown } from "@/app/components/markdown";
import { servicesContent } from "@/content/services";
import { ourServicesData, tierLabels } from "../sections/our-services/our-services-data";

const siteUrl = "https://kinetous.com";

export const metadata: Metadata = {
    title: servicesContent.seo.title,
    description: servicesContent.seo.description,
    keywords: servicesContent.seo.keywords,
    alternates: {
        canonical: "/services",
    },
    openGraph: {
        title: `${servicesContent.seo.title} | Kinetous`,
        description: servicesContent.seo.description,
        url: `${siteUrl}/services`,
        type: "website",
    },
};

export default function ServicesPage() {
    const { hero, intro, engagement, reliability, faq } = servicesContent;

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
                name: "Services",
                item: `${siteUrl}/services`,
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

    const serviceListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: ourServicesData.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.title,
            url: `${siteUrl}/services/${service.slug}`,
        })),
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <StructuredData data={[breadcrumbSchema, faqSchema, serviceListSchema]} />

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
                            href="https://wa.me/923058771054?text=Hi%2C%20I%27d%20like%20to%20discuss%20automating%20my%20fulfillment%20operations"
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

            {/* Intro — Markdown from the content file */}
            <section className="px-5 sm:px-8 py-16 sm:py-20">
                <div className="mx-auto max-w-3xl">
                    <Markdown content={intro} tone="dark" />
                </div>
            </section>

            {/* Service grid — flagship first, supporting last */}
            <section className="px-5 sm:px-8 pb-16 sm:pb-20">
                <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2">
                    {ourServicesData.map((service) => (
                        <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-blue-600/40 hover:bg-white/[0.04]"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400">
                                    <service.brandIcon className="h-6 w-6" />
                                </div>
                                <span
                                    className={
                                        service.tier === "flagship"
                                            ? "rounded-full border border-blue-600/40 bg-blue-600/10 px-3 py-1 text-[11px] font-medium text-blue-400"
                                            : "rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-zinc-500"
                                    }
                                >
                                    {tierLabels[service.tier]}
                                </span>
                            </div>

                            <h2 className="text-xl sm:text-2xl font-bold group-hover:text-blue-400 transition-colors">
                                {service.title}
                            </h2>

                            <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                                {service.summary}
                            </p>

                            <ul className="flex flex-wrap gap-2">
                                {service.features.slice(0, 3).map((feature) => (
                                    <li
                                        key={feature.slug}
                                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400"
                                    >
                                        {feature.name}
                                    </li>
                                ))}
                            </ul>

                            <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400">
                                Explore the service
                                <ArrowRight
                                    size={14}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Engagement process */}
            <section
                id="process"
                className="scroll-mt-24 border-t border-white/5 px-5 sm:px-8 py-16 sm:py-20"
            >
                <div className="mx-auto max-w-3xl">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/60">
                        {engagement.eyebrow}
                    </span>
                    <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
                        {engagement.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-zinc-400">
                        {engagement.description}
                    </p>

                    <ol className="mt-10 space-y-6">
                        {engagement.steps.map((step, index) => (
                            <li
                                key={step.title}
                                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl font-black text-blue-600/60">
                                        {(index + 1).toString().padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {step.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Reliability principles */}
            <section
                id="reliability"
                className="scroll-mt-24 border-t border-white/5 px-5 sm:px-8 py-16 sm:py-20"
            >
                <div className="mx-auto max-w-3xl">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/60">
                        {reliability.eyebrow}
                    </span>
                    <h2 className="mt-4 text-2xl sm:text-3xl font-bold">
                        {reliability.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-zinc-400">
                        {reliability.description}
                    </p>

                    <ul className="mt-10 grid gap-5 sm:grid-cols-2">
                        {reliability.items.map((item) => (
                            <li
                                key={item.title}
                                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                            >
                                <h3 className="flex items-start gap-2 font-semibold">
                                    <Check className="mt-1 h-4 w-4 shrink-0 text-blue-400" />
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                    {item.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* FAQ */}
            <section
                id="faq"
                className="scroll-mt-24 border-t border-white/5 px-5 sm:px-8 py-16 sm:pb-20"
            >
                <div className="mx-auto max-w-3xl">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/60">
                        {faq.eyebrow}
                    </span>
                    <h2 className="mt-4 text-2xl sm:text-3xl font-bold">{faq.title}</h2>
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
        </main>
    );
}
