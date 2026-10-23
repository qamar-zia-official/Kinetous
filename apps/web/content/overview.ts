import { z } from "zod";

/**
 * Content for /overview — a short technical summary of the practice and the
 * stack it is typically built with.
 */

export const overviewContentSchema = z.object({
    seo: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        keywords: z.array(z.string()).default([]),
    }),
    hero: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        primaryCta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
        secondaryCta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
    }),
    expertise: z.object({
        title: z.string().min(1),
        items: z
            .array(
                z.object({
                    icon: z.string().min(1),
                    title: z.string().min(1),
                    description: z.string().min(1),
                }),
            )
            .default([]),
    }),
    stack: z.object({
        title: z.string().min(1),
        items: z.array(z.string().min(1)).default([]),
    }),
});

export type OverviewContent = z.infer<typeof overviewContentSchema>;

export const overviewContent = overviewContentSchema.parse({
    seo: {
        title: "Overview — Fulfillment & Operations Automation",
        description:
            "A short technical summary of Kinetous: the areas of expertise and the stack used for fulfillment, Shopify, and internal operations engineering.",
        keywords: ["Kinetous overview", "automation stack", "fulfillment engineering services"],
    },
    hero: {
        title: "High-performance E-Commerce & Operations Automations",
        description:
            "Fulfillment automation, Shopify integrations, and the internal systems that replace manual operations work. No generic templates, no agency bloat. You work directly with the engineer.",
        primaryCta: { label: "Get an Estimate", href: "/contact" },
        secondaryCta: { label: "See Case Studies", href: "/case-studies" },
    },
    expertise: {
        title: "Core Expertise",
        items: [
            {
                icon: "code",
                title: "Fulfillment & 3PL Integrations",
                description:
                    "Shopify, warehouse, and 3PL systems connected end to end — order intake, routing, inventory sync, shipping, tracking, and returns, built against real API contracts rather than happy-path assumptions.",
            },
            {
                icon: "cpu",
                title: "Internal Tools & Workflow Automation",
                description:
                    "Operational dashboards, admin panels, and workflow automations that remove repetitive work — including exception queues, approval flows, document processing, and alerting.",
            },
        ],
    },
    stack: {
        title: "Our Stack",
        items: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "shadcn/ui",
            "Node.js",
            "PostgreSQL",
            "Shopify",
            "WooCommerce",
            "REST & GraphQL APIs",
            "Queue & Workflow Automation",
        ],
    },
});
