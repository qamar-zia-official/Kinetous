import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import StructuredData from "@repo/ui/seo/StructuredData";
import { Markdown } from "@/app/components/markdown";
import { caseStudiesContent } from "@/content/case-studies";
import type { CaseStudy } from "@/content/schemas";

const siteUrl = "https://kinetous.com";

type Params = { slug: string };

export function generateStaticParams() {
    return caseStudiesContent.items.map((item) => ({ slug: item.slug }));
}

function getCaseStudy(slug: string): CaseStudy | undefined {
    return caseStudiesContent.items.find((item) => item.slug === slug);
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { slug } = await params;
    const item = getCaseStudy(slug);
    if (!item) return {};

    return {
        title: item.seo.title,
        description: item.seo.description,
        keywords: item.seo.keywords,
        alternates: {
            canonical: `/case-studies/${slug}`,
        },
        openGraph: {
            title: `${item.seo.title} | Kinetous`,
            description: item.seo.description,
            url: `${siteUrl}/case-studies/${slug}`,
            type: "article",
        },
    };
}

export default async function CaseStudyPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;
    const item = getCaseStudy(slug);
    if (!item) notFound();

    const otherScenarios = caseStudiesContent.items.filter(
        (entry) => entry.slug !== slug,
    );

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${siteUrl}/case-studies/${slug}#article`,
        headline: item.title,
        description: item.summary,
        about: item.services.join(", "),
        isAccessibleForFree: true,
        author: {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
        },
        publisher: {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
        },
        mainEntityOfPage: `${siteUrl}/case-studies/${slug}`,
    };

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
            {
                "@type": "ListItem",
                position: 3,
                name: item.title,
                item: `${siteUrl}/case-studies/${slug}`,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <StructuredData data={[articleSchema, breadcrumbSchema]} />

            {/* Breadcrumb */}
            <nav
                aria-label="Breadcrumb"
                className="px-5 sm:px-8 pt-28 sm:pt-32 text-xs text-zinc-500"
            >
                <ol className="mx-auto flex max-w-4xl flex-wrap items-center gap-1.5">
                    <li>
                        <Link href="/" className="hover:text-zinc-300">
                            Home
                        </Link>
                    </li>
                    <li aria-hidden>/</li>
                    <li>
                        <Link href="/case-studies" className="hover:text-zinc-300">
                            Case Studies
                        </Link>
                    </li>
                    <li aria-hidden>/</li>
                    <li className="text-zinc-300" aria-current="page">
                        {item.title}
                    </li>
                </ol>
            </nav>

            {/* Hero */}
            <section className="px-5 sm:px-8 pt-8 pb-12 sm:pb-14 border-b border-white/5">
                <div className="mx-auto max-w-4xl">
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

                    <h1 className="mt-4 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.1]">
                        {item.title}
                    </h1>

                    <p className="mt-5 text-base sm:text-lg leading-relaxed text-zinc-400">
                        {item.summary}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="https://wa.me/923058771054?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20fulfillment%20workflow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 text-sm shadow-lg shadow-blue-600/25 transition-colors"
                        >
                            <FaWhatsapp size={16} />
                            Discuss a Similar Workflow
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 text-zinc-300 font-bold px-6 py-3 text-sm hover:bg-white/5 transition-colors"
                        >
                            Contact Us
                            <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Scenario body */}
            <section className="px-5 sm:px-8 py-12 sm:py-16">
                <div className="mx-auto max-w-3xl space-y-12">
                    <article>
                        <h2 className="text-xl sm:text-2xl font-bold">The problem</h2>
                        <Markdown
                            content={item.challenge}
                            tone="dark"
                            className="mt-4"
                        />
                    </article>

                    <article>
                        <h2 className="text-xl sm:text-2xl font-bold">
                            How the system is designed
                        </h2>
                        <Markdown
                            content={item.approach}
                            tone="dark"
                            className="mt-4"
                        />
                    </article>

                    {item.architecture && (
                        <article>
                            <h2 className="text-xl sm:text-2xl font-bold">
                                Architecture
                            </h2>
                            <Markdown
                                content={item.architecture}
                                tone="dark"
                                className="mt-4"
                            />
                        </article>
                    )}

                    <article>
                        <h2 className="text-xl sm:text-2xl font-bold">
                            What changes
                        </h2>
                        <Markdown
                            content={item.outcome}
                            tone="dark"
                            className="mt-4"
                        />
                    </article>

                    {item.metrics.length > 0 && (
                        <div className="grid gap-4 sm:grid-cols-3">
                            {item.metrics.map((metric) => (
                                <div
                                    key={metric.label}
                                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                                >
                                    <p className="text-2xl font-bold text-blue-400">
                                        {metric.value}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-zinc-200">
                                        {metric.label}
                                    </p>
                                    {metric.note && (
                                        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                                            {metric.note}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
                        <p className="text-sm leading-relaxed text-zinc-300">
                            {caseStudiesContent.disclosure}
                        </p>
                    </div>

                    <ul className="space-y-2">
                        {item.services.map((service) => (
                            <li
                                key={service}
                                className="flex items-start gap-2 text-sm text-zinc-400"
                            >
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Other scenarios */}
            <section className="border-t border-white/5 px-5 sm:px-8 py-14 sm:py-16">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-lg font-semibold text-zinc-300">
                        Other scenarios
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {otherScenarios.map((other) => (
                            <Link
                                key={other.slug}
                                href={`/case-studies/${other.slug}`}
                                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-blue-600/40 hover:bg-white/[0.04]"
                            >
                                <p className="text-sm font-semibold text-zinc-200 group-hover:text-blue-400">
                                    {other.title}
                                </p>
                                <p className="mt-2 text-xs text-zinc-500">
                                    {other.industry}
                                </p>
                            </Link>
                        ))}
                    </div>

                    <Link
                        href="/case-studies"
                        className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400"
                    >
                        <ArrowLeft size={14} />
                        Back to all scenarios
                    </Link>
                </div>
            </section>
        </main>
    );
}
