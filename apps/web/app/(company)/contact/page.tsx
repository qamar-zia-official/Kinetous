import type { Metadata } from "next";

import { contactContent } from "@/content/team";
import { ContactBody } from "../sections/contact/contact-body";

const siteUrl = "https://kinetous.com";

export const metadata: Metadata = {
    title: contactContent.seo.title,
    description: contactContent.seo.description,
    keywords: contactContent.seo.keywords,
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: `${contactContent.seo.title} | Kinetous`,
        description: contactContent.seo.description,
        url: `${siteUrl}/contact`,
        type: "website",
    },
};

export default function ContactPage() {
    const { hero } = contactContent;

    return (
        <main className="min-h-screen bg-zinc-950 text-white" id="contact">
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

            <ContactBody />
        </main>
    );
}
