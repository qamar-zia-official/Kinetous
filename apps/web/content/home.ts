import { z } from "zod";

/**
 * Content for the homepage (/).
 *
 * The homepage is composed of a hero, a systems carousel, the services
 * section, a "why" section, the process section, and a contact section.
 * The carousel, services, and process sections have their own data files
 * (`sections/porfolio/port1-data.ts`, `sections/our-services/*`,
 * `sections/our-process/our-process-data.ts`); this file holds the copy
 * for the hero and the "why" section.
 */

export const homeContentSchema = z.object({
    seo: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        keywords: z.array(z.string()).default([]),
    }),
    hero: z.object({
        eyebrow: z.string().min(1),
        headline: z.array(z.string().min(1)).min(1),
        description: z.string().min(1),
        secondaryCta: z.object({
            label: z.string().min(1),
            href: z.string().min(1),
        }),
    }),
    strip: z.object({
        items: z.array(z.string().min(1)).default([]),
    }),
    systems: z.object({
        title: z.string().min(1),
    }),
    why: z.object({
        title: z.string().min(1),
        heading: z.string().min(1),
        headingAccent: z.string().min(1),
        greeting: z.string().min(1),
        body: z.array(z.string().min(1)).default([]),
        closing: z.string().min(1),
        points: z
            .array(
                z.object({
                    title: z.string().min(1),
                    description: z.string().min(1),
                }),
            )
            .default([]),
    }),
    anchors: z
        .array(
            z.object({
                link: z.string().min(1),
                label: z.string().min(1),
            }),
        )
        .default([]),
});

export type HomeContent = z.infer<typeof homeContentSchema>;

export const homeContent = homeContentSchema.parse({
    seo: {
        title: "E-Commerce Fulfillment & Logistics Automation",
        description:
            "Kinetous builds custom e-commerce fulfillment and logistics automations for Shopify businesses and 3PL operators — connecting order processing, inventory, shipping, tracking, returns, and internal workflows.",
        keywords: [
            "e-commerce fulfillment automation",
            "3PL integration",
            "Shopify logistics automation",
            "inventory sync automation",
            "order routing software",
            "returns automation",
        ],
    },
    hero: {
        eyebrow: "E-Commerce Fulfillment & Logistics Automation",
        headline: [
            "Automate What Happens After the Order.",
            "Shopify to Warehouse to 3PL to Delivery.",
        ],
        description:
            "Kinetous builds custom integrations and workflow automations for Shopify businesses and 3PL operators — from order processing and inventory coordination to shipping, tracking, returns, and operational visibility.",
        secondaryCta: {
            label: "Explore Fulfillment Automation",
            href: "#services",
        },
    },
    strip: {
        items: [
            "Order Routing",
            "Inventory Sync",
            "Shipment Tracking",
            "Returns",
            "Exception Handling",
            "Operational Dashboards",
        ],
    },
    systems: {
        title: "Systems You can Try right Now",
    },
    why: {
        title: "Why Work With Me",
        heading: "A Technical Partner,",
        headingAccent: "Not Just Another Developer",
        greeting: "Hi, I'm Qamar Zia.",
        body: [
            "I help businesses design, build, and automate the systems that power their growth — from customer-facing applications and ecommerce platforms to internal tools, AI workflows, and operational automations.",
            "Unlike traditional agencies, you work directly with the person designing and building the solution. No account managers, no outsourced teams, and no communication layers between your business requirements and implementation.",
        ],
        closing:
            "Build systems that create leverage, reduce complexity, and scale with the business.",
        points: [
            {
                title: "Direct Access",
                description:
                    "Work directly with the person designing and building the solution. No account managers, outsourcing, or communication layers.",
            },
            {
                title: "Business First",
                description:
                    "Every technical decision is evaluated through its business impact, scalability, efficiency, and long-term value.",
            },
            {
                title: "Fulfillment Depth",
                description:
                    "Order routing, inventory sync, carrier integration, returns, and exception handling are the core of the practice, not a side project.",
            },
            {
                title: "Design + Engineering",
                description:
                    "Products should feel intuitive and trustworthy. Strong UX and solid engineering go hand in hand.",
            },
            {
                title: "Built To Last",
                description:
                    "Clean architecture, maintainability, and scalability are considered from day one to reduce future technical debt.",
            },
            {
                title: "End-To-End Ownership",
                description:
                    "From planning and architecture to deployment and iteration, there is a single accountable owner throughout the project.",
            },
        ],
    },
    anchors: [
        { link: "#", label: "Top" },
        { link: "#port1", label: "Systems" },
        { link: "#services", label: "Services" },
        { link: "#why", label: "Why Us" },
        { link: "#process", label: "Our Process" },
        { link: "#contact", label: "Contact" },
    ],
});
