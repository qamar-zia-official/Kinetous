import { z } from "zod";

import { ctaSchema } from "./schemas";

/**
 * Site-wide configuration. Everything that appears in more than one place
 * (navigation, footer, structured data, contact blocks) is defined here so
 * it can be changed from a single file.
 */

export const siteSchema = z.object({
    name: z.string().min(1),
    legalName: z.string().min(1),
    url: z.string().min(1),
    locale: z.string().min(1),
    tagline: z.string().min(1),
    positioning: z.string().min(1),
    description: z.string().min(1),
    ogImage: z.string().min(1),
    logo: z.string().min(1),
    contact: z.object({
        email: z.string().min(1),
        whatsapp: z.string().min(1),
        whatsappDisplay: z.string().min(1),
        phoneDisplay: z.string().min(1),
    }),
    social: z.object({
        linkedin: z.string().min(1),
        linkedinProfile: z.string().min(1),
    }),
    cta: z.object({
        primary: ctaSchema,
        secondary: ctaSchema,
    }),
    nav: z.array(
        z.object({
            label: z.string().min(1),
            href: z.string().min(1),
            external: z.boolean().default(false),
        }),
    ),
    footer: z.object({
        description: z.string().min(1),
        sections: z.array(
            z.object({
                title: z.string().min(1),
                links: z.array(
                    z.object({
                        label: z.string().min(1),
                        href: z.string().min(1),
                        external: z.boolean().default(false),
                    }),
                ),
            }),
        ),
        legalLinks: z.array(
            z.object({
                label: z.string().min(1),
                href: z.string().min(1),
                external: z.boolean().default(false),
            }),
        ),
    }),
});

export type SiteContent = z.infer<typeof siteSchema>;

export const site = siteSchema.parse({
    name: "Kinetous",
    legalName: "Kinetous",
    url: "https://kinetous.com",
    locale: "en_US",
    tagline: "E-commerce fulfillment & operations automation",
    positioning:
        "Kinetous builds custom e-commerce fulfillment and logistics automations for Shopify businesses and 3PL operators — connecting order processing, inventory, shipping, tracking, returns, and internal workflows.",
    description:
        "Custom fulfillment and operations automation for Shopify businesses and 3PLs. Connect order processing, inventory, shipping, tracking, returns, and internal workflows.",
    ogImage: "/og-main.png",
    logo: "/logo black circle.svg",
    contact: {
        email: "hello@kinetous.com",
        whatsapp: "923058771054",
        whatsappDisplay: "+92 305 8771054",
        phoneDisplay: "+92 305 8771054",
    },
    social: {
        linkedin: "https://www.linkedin.com/company/Kinetous/",
        linkedinProfile: "https://www.linkedin.com/in/qamar-zia-32389537b/",
    },
    cta: {
        primary: {
            label: "Discuss Your Workflow",
            href: "/contact",
            variant: "primary",
        },
        secondary: {
            label: "Explore Fulfillment Automation",
            href: "/services/ecommerce-fulfillment-3pl-logistics-automation",
            variant: "secondary",
        },
    },
    nav: [
        { label: "Home", href: "/", external: false },
        { label: "Services", href: "/services", external: false },
        { label: "Case Studies", href: "/case-studies", external: false },
        { label: "About", href: "/about", external: false },
        { label: "Blog", href: "https://blog.kinetous.com", external: true },
        { label: "Contact", href: "/contact", external: false },
    ],
    footer: {
        description:
            "Kinetous builds custom e-commerce fulfillment and logistics automations for Shopify businesses and 3PL operators.",
        sections: [
            {
                title: "Services",
                links: [
                    {
                        label: "All services",
                        href: "/services",
                        external: false,
                    },
                    {
                        label: "Fulfillment & logistics automation",
                        href: "/services/ecommerce-fulfillment-3pl-logistics-automation",
                        external: false,
                    },
                    {
                        label: "Internal operations & dashboards",
                        href: "/services/internal-operations-and-dashboards",
                        external: false,
                    },
                    {
                        label: "Customer support automation",
                        href: "/services/customer-support-automation",
                        external: false,
                    },
                    {
                        label: "Shopify store development",
                        href: "/services/shopify-store-development",
                        external: false,
                    },
                ],
            },
            {
                title: "Company",
                links: [
                    { label: "About", href: "/about", external: false },
                    { label: "Overview", href: "/overview", external: false },
                    { label: "Case studies", href: "/case-studies", external: false },
                    { label: "Pricing", href: "/pricing", external: false },
                    { label: "Team", href: "/team", external: false },
                    { label: "Blog", href: "https://blog.kinetous.com", external: true },
                    { label: "Contact", href: "/contact", external: false },
                ],
            },
            {
                title: "Resources",
                links: [
                    {
                        label: "Fulfillment FAQ",
                        href: "/services#faq",
                        external: false,
                    },
                    {
                        label: "Engagement process",
                        href: "/services#process",
                        external: false,
                    },
                    {
                        label: "Reliability approach",
                        href: "/services#reliability",
                        external: false,
                    },
                    {
                        label: "LinkedIn",
                        href: "https://www.linkedin.com/company/Kinetous/",
                        external: true,
                    },
                ],
            },
        ],
        legalLinks: [
            { label: "Privacy Policy", href: "/privacy", external: false },
            { label: "Terms of Service", href: "/terms", external: false },
        ],
    },
});

export const siteUrl = site.url;
export const siteName = site.name;
export const siteDescription = site.description;
export const siteTagline = site.tagline;
export const sitePositioning = site.positioning;
