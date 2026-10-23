import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import StructuredData from "@repo/ui/seo/StructuredData";
import { Markdown } from "@/app/components/markdown";
import { servicesContent } from "@/content/services";
import {
    ourServicesData,
    tierLabels,
    type Service,
} from "../../sections/our-services/our-services-data";

const siteUrl = "https://kinetous.com";

type Params = { slug: string };

export function generateStaticParams() {
    return servicesContent.items.map((service) => ({ slug: service.slug }));
}

function getService(slug: string): Service | undefined {
    return ourServicesData.find((service) => service.slug === slug);
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { slug } = await params;
    const content = servicesContent.items.find((service) => service.slug === slug);
    if (!content) return {};

    return {
        title: content.seo.title,
        description: content.seo.description,
        keywords: content.seo.keywords,
        alternates: {
            canonical: `/services/${slug}`,
        },
        openGraph: {
            title: `${content.seo.title} | Kinetous`,
            description: content.seo.description,
            url: `${siteUrl}/services/${slug}`,
            type: "website",
        },
    };
}

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;
    const service = getService(slug);
    if (!service) notFound();

    const otherServices = ourServicesData.filter((s) => s.slug !== slug);

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}/services/${slug}#service`,
        name: service.title,
        description: service.summary,
        serviceType: service.title,
        provider: {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
        },
        areaServed: [{ "@type": "Country", name: "United States" }],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: service.title,
            itemListElement: service.features.map((feature) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: feature.name,
                    description: feature.shortDescription,
                },
            })),
        },
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
                name: "Services",
                item: `${siteUrl}/services`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: service.title,
                item: `${siteUrl}/services/${slug}`,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <StructuredData data={[serviceSchema, breadcrumbSchema]} />

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
                        <Link href="/services" className="hover:text-zinc-300">
                            Services
                        </Link>
                    </li>
                    <li aria-hidden>/</li>
                    <li className="text-zinc-300" aria-current="page">
                        {service.title}
                    </li>
                </ol>
            </nav>

            {/* Hero */}
            <section className="px-5 sm:px-8 pt-8 pb-14 sm:pb-16 border-b border-white/5">
                <div className="mx-auto max-w-4xl">
                    <span
                        className={
                            service.tier === "flagship"
                                ? "inline-block rounded-full border border-blue-600/40 bg-blue-600/10 px-3 py-1 text-[11px] font-medium text-blue-400"
                                : "inline-block rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-zinc-500"
                        }
                    >
                        {tierLabels[service.tier]}
                    </span>

                    <h1 className="mt-4 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.1]">
                        {service.title}
                    </h1>

                    <p className="mt-5 text-base sm:text-lg leading-relaxed text-zinc-400">
                        {service.summary}
                    </p>

                    <Markdown content={service.markdown} tone="dark" className="mt-6" />

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="https://wa.me/923058771054?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20operations"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 text-sm shadow-lg shadow-blue-600/25 transition-colors"
                        >
                            <FaWhatsapp size={16} />
                            Start a Conversation
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

            {/* Capabilities */}
            <section className="px-5 sm:px-8 py-14 sm:py-20">
                <div className="mx-auto max-w-4xl space-y-16">
                    {service.features.map((feature) => (
                        <article
                            key={feature.slug}
                            id={feature.slug}
                            className="scroll-mt-28 border-t border-white/5 pt-12 first:border-t-0 first:pt-0"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                                    <feature.icon className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold">
                                    {feature.name}
                                </h2>
                            </div>

                            <Markdown
                                content={feature.markdown}
                                tone="dark"
                                className="mt-6"
                            />

                            <div className="mt-8 grid gap-8 sm:grid-cols-3">
                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                        What You Get
                                    </h3>
                                    <ul className="mt-3 space-y-2">
                                        {feature.deliverables.map((item) => (
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

                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                        Built For
                                    </h3>
                                    <ul className="mt-3 space-y-2">
                                        {feature.idealFor.map((item) => (
                                            <li key={item} className="text-sm text-zinc-400">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                        Outcomes
                                    </h3>
                                    <ul className="mt-3 space-y-2">
                                        {feature.outcomes.map((item) => (
                                            <li key={item} className="text-sm text-zinc-400">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {feature.technologies &&
                                feature.technologies.length > 0 && (
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {feature.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-500"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                        </article>
                    ))}
                </div>
            </section>

            {/* Cross-links to other services */}
            <section className="border-t border-white/5 px-5 sm:px-8 py-14 sm:py-16">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-lg font-semibold text-zinc-300">
                        Other Services
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        {otherServices.map((other) => (
                            <Link
                                key={other.slug}
                                href={`/services/${other.slug}`}
                                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-blue-600/40 hover:bg-white/[0.04]"
                            >
                                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200 group-hover:text-blue-400">
                                    <other.brandIcon className="h-4 w-4" />
                                    {other.title}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Link
                        href="/services"
                        className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400"
                    >
                        <ArrowLeft size={14} />
                        Back to all services
                    </Link>
                </div>
            </section>
        </main>
    );
}
