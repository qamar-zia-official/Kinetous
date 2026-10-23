import { z } from "zod";

/**
 * Content for /pricing.
 *
 * Prices are indicative ranges, not quotes. Do not add numbers that were not
 * already published, and do not imply guaranteed savings or ROI.
 */

export const pricingContentSchema = z.object({
    seo: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        keywords: z.array(z.string()).default([]),
    }),
    hero: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
    }),
    tiers: z
        .array(
            z.object({
                id: z.string().min(1),
                name: z.string().min(1),
                description: z.string().min(1),
                price: z.string().min(1),
                priceNote: z.string().min(1),
                featured: z.boolean().default(false),
                includes: z.array(z.string().min(1)).default([]),
            }),
        )
        .default([]),
    factors: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        items: z
            .array(
                z.object({
                    title: z.string().min(1),
                    description: z.string().min(1),
                }),
            )
            .default([]),
    }),
    faq: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        items: z
            .array(
                z.object({
                    question: z.string().min(1),
                    answer: z.string().min(1),
                }),
            )
            .default([]),
    }),
    cta: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        label: z.string().min(1),
        href: z.string().min(1),
    }),
});

export type PricingContent = z.infer<typeof pricingContentSchema>;

export const pricingContent = pricingContentSchema.parse({
    seo: {
        title: "Pricing — What Fulfillment Automation Actually Costs",
        description:
            "Real ranges, no packages. What fulfillment automation, Shopify integrations, and internal operations systems cost — and the four things that move the number.",
        keywords: [
            "fulfillment automation pricing",
            "3PL integration cost",
            "Shopify automation cost",
            "workflow automation project price",
        ],
    },
    hero: {
        eyebrow: "Pricing",
        title: "Here's what it actually costs.",
        description:
            "No packages. No \"starting at\" number that doubles after the sales call. You pay for the work the problem requires, and you'll know the number before you commit a dollar. Here's what the work runs — and what pushes it up or down.",
    },
    tiers: [
        {
            id: "fulfillment-automation",
            name: "Fulfillment & Logistics Automation",
            description:
                "Orders move through Shopify, a warehouse or 3PL, carriers, and a spreadsheet holding it all together. We connect the whole path — intake, routing, inventory, shipping, tracking, returns — so it runs without someone babysitting it. Single-workflow builds and internal tools are scoped the same way and land at the low end.",
            price: "$500 – $10,000+",
            priceNote: "Project range. The real number comes from scope.",
            featured: true,
            includes: [
                "Discovery and a written workflow map — you see exactly what gets built",
                "Order routing across one or more locations",
                "Inventory sync and allocation logic",
                "Carrier, label, and tracking integration",
                "Returns, inspection, and restocking workflow",
                "Exception handling with a human escalation path",
                "Visibility into the paths that actually matter",
                "Docs and a handover walkthrough — you own it, not me",
            ],
        },
        {
            id: "ongoing-support",
            name: "Ongoing Support & Monitoring",
            description:
                "APIs change. Carriers break. New channels show up. This keeps the machine running after launch — optional, priced by how much surface area you've got. You're not locked in.",
            price: "$100 – $2,000+",
            priceNote: "Per month, depending on scope.",
            featured: false,
            includes: [
                "Monitoring and alerts when an integration goes sideways",
                "Platform API change management",
                "New channel, location, or carrier onboarding",
                "Incremental workflow improvements",
                "Security patches and bug fixes",
            ],
        },
    ],
    factors: {
        eyebrow: "What moves the number",
        title: "Four things decide the price.",
        description:
            "A quote is fiction until these four are answered. Figure them out before you pay anyone — including me.",
        items: [
            {
                title: "How many systems are in the chain",
                description:
                    "Every system adds an API, a failure mode, and a place where the data disagrees. Shopify to one 3PL is a different job than Shopify to three 3PLs and two carriers. More moving parts, more money. That's it.",
            },
            {
                title: "API access or portal access",
                description:
                    "A documented API can be automated properly. A portal or a manual export means a workaround — more cost, plus a limitation you should know about before you sign. We'll tell you which one you're dealing with.",
            },
            {
                title: "How ugly the exceptions are",
                description:
                    "The happy path is cheap. Split shipments, partial stock, damaged returns, carrier outages, policy edge cases — that's where the engineering lives. It's also the difference between a system that survives peak season and one that doesn't.",
            },
            {
                title: "What you already have",
                description:
                    "Building on something solid is cheaper than rebuilding. Building on a spreadsheet isn't building — it's replacing. We'll tell you which one you're doing, even when the answer costs me the bigger job.",
            },
        ],
    },
    faq: {
        eyebrow: "Straight answers",
        title: "The questions you're actually asking.",
        items: [
            {
                question: "Why don't you have fixed prices?",
                answer:
                    "Because fixed prices are a lie. Two fulfillment builds can look identical on a call and be three times apart in work — one has clean APIs, the other has a portal and a spreadsheet. A flat price means I either overcharge the easy job or cut corners on the hard one. Neither helps you.",
            },
            {
                question: "What does a project actually cost?",
                answer:
                    "Most project work lands between $500 and $10,000+. Single workflows and internal tools sit at the low end. Multi-system fulfillment builds — several locations, carriers, returns, exceptions — sit at the top. That's a real range, not a hook.",
            },
            {
                question: "Do I have to pay for support after launch?",
                answer:
                    "No. It's optional, and it runs $100 to $2,000+ a month depending on how many systems are in play. Some clients take it, some don't. You're not locked into either.",
            },
            {
                question: "What if I don't know what I need yet?",
                answer:
                    "Then the first call is a scoping call, not a sales call. You describe the workflow, I tell you what's broken, what's worth fixing, and what it would take. If it's not a fit, I'll say so.",
            },
            {
                question: "Can you guarantee it'll pay for itself?",
                answer:
                    "No. Anyone who guarantees ROI on custom software is selling you something. What I can tell you is what the system will do, what it won't do, and what it costs before you start — then you decide.",
            },
        ],
    },
    cta: {
        title: "Want a real number?",
        description:
            "Tell me the systems, the volume, and the timeline. You'll get a straight answer on fit, scope, and cost — not a forty-page proposal written to impress you.",
        label: "Discuss Your Workflow",
        href: "/contact",
    },
});
