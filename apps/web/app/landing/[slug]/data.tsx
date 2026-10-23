import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

export const metadata = {
    metadataBase: new URL("https://kinetous.com"),
    icons: "string",
    title: {
        default:
            "Kinetous — E-Commerce Fulfillment, 3PL & Logistics Automation Agency",
        template: "%s | Kinetous",
    },
    description:
        "Kinetous is an AI automation agency that helps e-commerce and 3PL businesses automate order fulfillment, inventory sync, shipping, and returns. Shopify store development available as a secondary service.",
    keywords: [
        "e-commerce automation",
        "ecommerce automation agency",
        "logistics automation",
        "3PL automation",
        "3PL software",
        "Shopify fulfillment automation",
        "Shopify 3PL integration",
        "order fulfillment automation",
        "warehouse automation",
        "shipping automation",
        "returns automation",
        "inventory synchronization",
        "ecommerce operations automation",
        "AI automation agency",
        "reverse logistics automation",
        "Shopify store development",
    ],
    authors: [
        {
            name: "Kinetous",
            url: "https://www.linkedin.com/company/Kinetous/",
        },
        {
            name: "Qamar Zia",
            url: "https://www.linkedin.com/in/qamar-zia-32389537b/",
        },
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Kinetous — E-Commerce Fulfillment, 3PL & Logistics Automation",
        description:
            "We build the automation layer between Shopify, warehouses, 3PLs, and carriers — order routing, inventory sync, shipping, and returns, without the manual work.",
        url: "https://kinetous.com",
        siteName: "Kinetous",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/og-main.png",
                width: 1200,
                height: 630,
                alt: "Kinetous — E-Commerce Fulfillment, 3PL and Logistics Automation Agency",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Kinetous — E-Commerce Fulfillment, 3PL & Logistics Automation",
        description:
            "We build the automation layer between Shopify, warehouses, 3PLs, and carriers — order routing, inventory sync, shipping, and returns, without the manual work.",
        images: ["/og-main.png"],
    },
};

export type landingType = {
    slug: string;
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    ogImage?: string;
    twitterCard?: string;
    alternates: string[];
    keywords: string[];
    image: StaticImageData;
    head: {
        type: "primary" | "secondary";
        title: string;
    };
    CTA1: {
        lable: string;
        link: string;
    };
    CTA2: {
        label: string;
        link: string;
    };
    contentPeices: {
        markdown: string;
        pills: string;
        table: {
            header: string[];
        };
    }[];
    packages: {
        title: string;
        head: {
            title: string;
            type: string;
            color: string;
        };
    }[];
    otherServices: {
        label: string;
        description: string;
        link: string;
        icon: IconType;
    }[];
    articles: string[];
}[];
