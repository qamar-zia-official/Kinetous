import type { Metadata } from "next";

import StructuredData from "@repo/ui/seo/StructuredData";
import { LegalDocumentView } from "@/app/components/legal-document";
import { privacyPolicy } from "@/content/legal";

const siteUrl = "https://kinetous.com";

export const metadata: Metadata = {
    title: privacyPolicy.seo.title,
    description: privacyPolicy.seo.description,
    keywords: privacyPolicy.seo.keywords,
    alternates: {
        canonical: "/privacy",
    },
    openGraph: {
        title: `${privacyPolicy.seo.title} | Kinetous`,
        description: privacyPolicy.seo.description,
        url: `${siteUrl}/privacy`,
        type: "website",
    },
};

export default function PrivacyPage() {
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
                name: privacyPolicy.name,
                item: `${siteUrl}/privacy`,
            },
        ],
    };

    return (
        <>
            <StructuredData data={breadcrumbSchema} />
            <LegalDocumentView
                document={privacyPolicy}
                backHref="/"
                backLabel="Back to home"
            />
        </>
    );
}
