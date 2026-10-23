import { z } from "zod";

/**
 * Content for /about.
 *
 * `icon` fields hold a key that maps to a component in
 * `about/icon-map.ts` — keep the key name and the component stay in sync.
 */

export const aboutContentSchema = z.object({
    seo: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        keywords: z.array(z.string()).default([]),
    }),
    hero: z.object({
        badge: z.string().min(1),
        title: z.string().min(1),
        titleAccent: z.string().min(1),
        description: z.string().min(1),
        primaryCta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
        secondaryCta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
        stats: z
            .array(
                z.object({
                    value: z.string().min(1),
                    label: z.string().min(1),
                }),
            )
            .default([]),
    }),
    founder: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        lead: z.string().min(1),
        body: z.array(z.string().min(1)).default([]),
        name: z.string().min(1),
        role: z.string().min(1),
        shortBio: z.string().min(1),
        altText: z.string().min(1),
    }),
    capabilities: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        items: z
            .array(
                z.object({
                    icon: z.string().min(1),
                    title: z.string().min(1),
                    description: z.string().min(1),
                    items: z.array(z.string().min(1)).default([]),
                }),
            )
            .default([]),
    }),
    principles: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
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
    process: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        steps: z
            .array(
                z.object({
                    icon: z.string().min(1),
                    title: z.string().min(1),
                    description: z.string().min(1),
                }),
            )
            .default([]),
    }),
    engineeringPrinciples: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        items: z
            .array(
                z.object({
                    number: z.string().min(1),
                    title: z.string().min(1),
                    body: z.string().min(1),
                }),
            )
            .default([]),
    }),
    longTerm: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        sections: z
            .array(
                z.object({
                    title: z.string().min(1),
                    left: z.string().min(1),
                    right: z.string().min(1),
                }),
            )
            .default([]),
    }),
    founderNote: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        paragraphs: z.array(z.string().min(1)).default([]),
        signature: z.string().min(1),
        name: z.string().min(1),
        role: z.string().min(1),
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

export type AboutContent = z.infer<typeof aboutContentSchema>;

export const aboutContent = aboutContentSchema.parse({
    seo: {
        title: "About — E-Commerce Fulfillment & Operations Automation",
        description:
            "Kinetous is a founder-led engineering studio focused on e-commerce fulfillment, 3PL integrations, inventory sync, and the internal systems that replace manual operations work.",
        keywords: [
            "e-commerce automation engineer",
            "fulfillment automation studio",
            "3PL integration specialist",
            "Shopify operations automation",
        ],
    },
    hero: {
        badge: "About Kinetous",
        title: "Engineering software that becomes part of",
        titleAccent: "how your business operates.",
        description:
            "Kinetous is a founder-led engineering studio focused on the operational systems behind growing online businesses: order fulfillment, 3PL and warehouse integrations, inventory sync, and the internal tools that remove repetitive work instead of creating more of it. Shopify store development is available too, as the front door to that same operation.",
        primaryCta: { label: "Discuss Your Workflow", href: "/contact" },
        secondaryCta: { label: "View Case Studies", href: "/case-studies" },
        stats: [
            {
                value: "Custom",
                label:
                    "Systems engineered around your workflow. No templates or page builders.",
            },
            {
                value: "Fulfillment-first",
                label:
                    "Order routing, inventory, shipping, tracking, and returns are the core focus.",
            },
            {
                value: "Direct",
                label:
                    "Work directly with the engineer designing and building your system.",
            },
            {
                value: "Open",
                label:
                    "You own your code, infrastructure, deployment, and data after delivery.",
            },
        ],
    },
    founder: {
        eyebrow: "Who I Am",
        title: "I don't build websites. I build the systems that businesses run on.",
        lead: "Software should remove operational friction instead of introducing more of it.",
        body: [
            "My work centers on e-commerce fulfillment, 3PL and warehouse integrations, and logistics operations automation — alongside internal operational dashboards, customer support workflows, business workflow automation, and, as a secondary service, custom Shopify storefronts. Every project starts by understanding how a business actually works before a single component is designed or a database table is created.",
            "Rather than adapting businesses to rigid software, I engineer software around existing workflows. That often means replacing spreadsheets, connecting disconnected platforms, automating manual processes, and building internal tools that quietly improve daily operations.",
            "I work directly with founders and decision makers throughout the project. There are no account managers translating technical conversations, no outsourced development teams, and no unnecessary communication layers. The person designing the architecture is the same person writing the code.",
            "When projects require branding, illustration, animation, or other specialized expertise, I collaborate with a trusted network of professionals while remaining the technical lead and primary point of contact.",
        ],
        name: "Qamar Zia",
        role: "Founder · E-Commerce Automation Engineer",
        shortBio:
            "E-commerce automation engineer focused on fulfillment, 3PL integrations, and the operational systems growing online businesses run on.",
        altText: "Portrait of Qamar Zia, founder of Kinetous",
    },
    capabilities: {
        eyebrow: "Engineering Capabilities",
        title: "Building software around your business — not the other way around.",
        description:
            "Every engagement is different, but most projects fall into one or more of these engineering disciplines. Rather than selling isolated services, complete systems are designed that solve operational problems across the business.",
        items: [
            {
                icon: "truck",
                title: "Fulfillment, 3PL & Logistics Automation",
                description:
                    "Order routing between Shopify and your warehouse or 3PL, inventory sync across channels, shipping and carrier automation, and returns workflows that keep stock accurate.",
                items: [
                    "Shopify to 3PL/WMS Integration",
                    "Multi-Channel Inventory Sync",
                    "Shipping & Carrier Automation",
                    "Returns & Reverse Logistics",
                    "Fulfillment Visibility Dashboards",
                ],
            },
            {
                icon: "bot",
                title: "Business Workflow Automation",
                description:
                    "Practical automation that removes repetitive work instead of adding another tool your team has to learn.",
                items: [
                    "Repetitive Task Automation",
                    "Document Processing",
                    "Approval Workflows",
                    "Notifications & Alerts",
                ],
            },
            {
                icon: "dashboard",
                title: "Internal Business Software",
                description:
                    "Operational dashboards and internal tools that replace spreadsheets and disconnected workflows with software designed around your business.",
                items: [
                    "Operations Dashboards",
                    "Admin Panels",
                    "Reporting Systems",
                    "Custom Internal Tools",
                ],
            },
            {
                icon: "integrations",
                title: "System Integrations",
                description:
                    "Connect inventory, CRM, accounting, communication platforms, and third-party services into one reliable workflow.",
                items: [
                    "API Development",
                    "ERP & CRM Integration",
                    "Payment Systems",
                    "Data Sync & Conflict Handling",
                ],
            },
            {
                icon: "workflow",
                title: "Operational Workflows",
                description:
                    "Designing systems that remove manual bottlenecks and allow teams to focus on higher-value work.",
                items: [
                    "Exception Queues",
                    "Document Processing",
                    "Inventory Automation",
                    "Escalation Paths",
                ],
            },
            {
                icon: "shoppingBag",
                title: "Shopify Store Development",
                description:
                    "Secondary to the automation work above: custom Shopify storefronts, checkout flow work, and high-performance shopping experiences built for your brand.",
                items: [
                    "Custom Shopify Storefronts",
                    "Headless Commerce",
                    "Store Performance",
                    "Customer Journey Optimization",
                ],
            },
            {
                icon: "database",
                title: "Backend & Infrastructure",
                description:
                    "Scalable backend systems, APIs, databases, and deployment infrastructure engineered for long-term maintainability.",
                items: [
                    "REST & GraphQL APIs",
                    "Database Design",
                    "Authentication",
                    "Cloud Deployment",
                ],
            },
        ],
    },
    principles: {
        eyebrow: "Why Kinetous",
        title: "A focused specialist, not a general-purpose agency.",
        description:
            "Most agencies spread their attention across websites, apps, chatbots, and marketing. Kinetous is deliberately narrower, and that narrowness is the point.",
        items: [
            {
                icon: "brain",
                title: "Engineering Before Everything",
                description:
                    "Every project begins by understanding your business, workflows, and operational bottlenecks before selecting technologies or writing code.",
            },
            {
                icon: "users",
                title: "Direct Collaboration",
                description:
                    "You'll work directly with the person designing and building your system, keeping communication clear, decisions fast, and feedback cycles short.",
            },
            {
                icon: "layers",
                title: "Built Around Your Business",
                description:
                    "We don't force businesses into generic software. Every system is designed around the way your team already operates and where automation creates the most value.",
            },
            {
                icon: "rocket",
                title: "Designed to Grow",
                description:
                    "Projects are engineered with long-term maintainability in mind so they can evolve naturally as your business, team, and requirements grow.",
            },
            {
                icon: "shield",
                title: "Ownership & Transparency",
                description:
                    "You retain ownership of your codebase, infrastructure, and data. We build with open technologies that leave your business in control.",
            },
            {
                icon: "handshake",
                title: "Growing With Our Clients",
                description:
                    "Kinetous is intentionally growing from an engineering-led studio into a specialized team. As projects expand, trusted designers and engineers are brought in without compromising quality or communication.",
            },
        ],
    },
    process: {
        eyebrow: "How We Work",
        title: "Every project follows a transparent engineering process.",
        description:
            "Whether it is a fulfillment integration, a storefront, or an internal business system, every engagement follows the same structured workflow. This keeps communication clear, reduces risk, and ensures the right problems are being solved.",
        steps: [
            {
                icon: "search",
                title: "Discovery & Workflow Mapping",
                description:
                    "We start by understanding how the business operates today: which systems are involved, where the manual handoffs are, and what an exception actually looks like in practice. This produces a shared, written picture of the workflow before anything is built.",
            },
            {
                icon: "blueprint",
                title: "Architecture & Scope",
                description:
                    "The workflow is broken into components with the integration approach, the data model, and the dependency on each party's APIs agreed in writing before implementation starts. Scope is defined against the workflow, not against a feature list.",
            },
            {
                icon: "code",
                title: "Implementation",
                description:
                    "Integrations are built and wired into the existing stack. Each step is developed against the real shape of the data, including the awkward cases: partial stock, split shipments, duplicate events, and failed downstream calls.",
            },
            {
                icon: "flask",
                title: "Testing & Exception Handling",
                description:
                    "Testing covers the normal path and the exception path, because the exception path is where fulfillment systems usually fail. Cases are replayed against the business's own order shapes rather than synthetic happy-path data.",
            },
            {
                icon: "handover",
                title: "Handover & Ongoing Support",
                description:
                    "The system is handed over with documentation, and monitoring is put in place for the paths that matter. What ongoing support looks like after launch is agreed as part of the scope rather than assumed afterwards.",
            },
        ],
    },
    engineeringPrinciples: {
        eyebrow: "Engineering Principles",
        title: "How we think is just as important as what we build.",
        description:
            "Every project is guided by a small set of engineering principles. They influence how systems are architected, how decisions are made, and ultimately how software continues delivering value long after launch.",
        items: [
            {
                number: "01",
                title: "Business Before Technology",
                body: "Every project begins by understanding your business objectives, operational bottlenecks, and growth plans. Technologies are selected because they solve measurable problems — not because they're trending.",
            },
            {
                number: "02",
                title: "Build Systems You Own",
                body: "Your software should belong to your business. We build using open standards and modern frameworks so you're never locked into proprietary platforms or dependent on a single vendor.",
            },
            {
                number: "03",
                title: "Performance Is a Feature",
                body: "Fast software creates better customer experiences and more efficient teams. Performance, accessibility, and maintainability are considered from the first architectural decision — not treated as afterthoughts.",
            },
            {
                number: "04",
                title: "Automation Should Remove Work",
                body: "Automation should reduce repetitive tasks, eliminate manual processes, and help your team focus on decisions that actually require human judgment. It should create leverage — not complexity.",
            },
            {
                number: "05",
                title: "Build for the Next Five Years",
                body: "Businesses evolve. New products launch, teams grow, and workflows change. Every system is designed with extensibility in mind so future improvements don't require expensive rewrites.",
            },
            {
                number: "06",
                title: "Clarity Beats Complexity",
                body: "The best software isn't the one with the most features — it's the one your team actually understands. Clear architecture, thoughtful interfaces, and maintainable code always outperform unnecessary complexity.",
            },
        ],
    },
    longTerm: {
        eyebrow: "Built for Long-Term Growth",
        title: "Great software doesn't stop evolving after launch.",
        description:
            "Every business changes over time. New products are introduced, teams grow, processes evolve, and customer expectations shift. The systems built here are designed to adapt — not to become obstacles.",
        sections: [
            {
                title: "Your software should improve over time.",
                left: "Launch day isn't the finish line. Once your team begins using the systems every day, new opportunities naturally emerge. Real usage reveals which workflows can be simplified, which reports become valuable, and where automation creates the biggest impact.",
                right: "Rather than treating software as a one-time project, systems are built that can evolve alongside the business. New capabilities can be introduced incrementally without rebuilding the entire platform.",
            },
            {
                title: "Knowledge should stay with your business.",
                left: "Every project includes documentation, recorded walkthroughs, and clear handover material. Your team should understand how the systems work, how they're operated, and how to continue using them confidently.",
                right: "Businesses should never feel locked into their own software. Whether you continue working with Kinetous or eventually build an internal team, the systems should remain understandable and maintainable.",
            },
            {
                title: "Long-term partnerships create better software.",
                left: "Working with Kinetous often continues after launch — not because the systems are unfinished, but because the business keeps growing. As new products, processes, and ideas emerge, the software evolves alongside them.",
                right: "The role gradually shifts from implementation to continuous improvement: refining workflows, expanding automations, and identifying the next opportunities where technology can remove friction from daily operations.",
            },
        ],
    },
    founderNote: {
        eyebrow: "A Note From the Founder",
        title: "I didn't start Kinetous to build websites.",
        paragraphs: [
            "I started Kinetous because I saw too many businesses paying for software that looked impressive but created more complexity than it removed. Expensive agency retainers, unnecessary rebuilds, proprietary platforms, and disconnected tools have become surprisingly common — and businesses are usually the ones left dealing with the consequences.",
            "My belief is simple: software should make running a business easier. It should remove repetitive work, connect the systems your team already uses, and give you complete ownership of what gets built. Technology should support your operations — not force your business to adapt to the technology.",
            "That's why every project begins with understanding how your business actually works before discussing frameworks or AI. The objective isn't to deliver the largest feature list. It's to build systems that quietly become part of your team's everyday workflow while remaining fast, maintainable, and easy to extend.",
            "Today, Kinetous is a founder-led engineering studio. As it continues to grow, the goal isn't to become a large agency with layers of account managers and handoffs. The goal is to build a small, highly capable team of engineers and specialists who care about thoughtful software, clear communication, and long-term partnerships just as much as I do.",
            "If you're looking for a team that values craftsmanship over shortcuts and engineering over marketing, I think we'll work well together.",
        ],
        signature: "— Qamar Zia",
        name: "Qamar Zia",
        role: "Founder · E-Commerce Automation Engineer",
    },
    anchors: [
        { link: "#", label: "Top" },
        { link: "#wia", label: "Who I Am" },
        { link: "#engc", label: "Engineering Capabilities" },
        { link: "#wm", label: "Why Kinetous" },
        { link: "#pr", label: "Process" },
        { link: "#bopt", label: "Engineering Principles" },
        { link: "#ltg", label: "Long Term" },
        { link: "#fn", label: "Founder Note" },
        { link: "#cta", label: "Contact" },
    ],
});
