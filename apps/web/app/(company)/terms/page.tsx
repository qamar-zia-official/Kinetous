import type { Metadata } from "next";

import StructuredData from "@repo/ui/seo/StructuredData";
import { LegalDocumentView } from "@/app/components/legal-document";
import { termsOfService } from "@/content/legal";

const siteUrl = "https://kinetous.com";

export const metadata: Metadata = {
    title: termsOfService.seo.title,
    description: termsOfService.seo.description,
    keywords: termsOfService.seo.keywords,
    alternates: {
        canonical: "/terms",
    },
    openGraph: {
        title: `${termsOfService.seo.title} | Kinetous`,
        description: termsOfService.seo.description,
        url: `${siteUrl}/terms`,
        type: "website",
    },
};

export default function TermsPage() {
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
                name: termsOfService.name,
                item: `${siteUrl}/terms`,
            },
        ],
    };

    return (
        <>
            <StructuredData data={breadcrumbSchema} />
            <LegalDocumentView
                document={termsOfService}
                backHref="/"
                backLabel="Back to home"
            />
        </>
    );
}
