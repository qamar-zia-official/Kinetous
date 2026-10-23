import { z } from "zod";

import {
    ctaSchema,
    faqSchema,
    listItemSchema,
    serviceSchema,
    type ServiceContent,
} from "./schemas";

/**
 * Content for the /services pillar and its /services/[slug] cluster pages.
 *
 * `items` is the single source of truth for every service page: title,
 * summary, long-form Markdown body, capability breakdowns, and per-page
 * SEO metadata all live here. The page components only render what they
 * find in this array.
 */

export const servicesContentSchema = z.object({
    seo: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        keywords: z.array(z.string()).default([]),
    }),
    hero: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        primaryCta: ctaSchema,
        secondaryCta: ctaSchema,
    }),
    intro: z.string().default(""),
    engagement: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        steps: z.array(listItemSchema).default([]),
    }),
    reliability: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        items: z.array(listItemSchema).default([]),
    }),
    faq: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        items: z.array(faqSchema).default([]),
    }),
    items: z.array(serviceSchema).default([]),
});

export type ServicesContent = z.infer<typeof servicesContentSchema>;

const fulfillmentCapabilities = [
    {
        slug: "shopify-3pl-order-routing",
        title: "Shopify to 3PL & Warehouse Order Routing",
        summary:
            "Automatically routing new Shopify orders to the correct warehouse, fulfillment center, or 3PL the moment they're placed, without anyone touching a portal.",
        body: `## What this solves

A new order today usually means a person checking the storefront, deciding which warehouse or 3PL it should go to, and manually entering it into that partner's system — often re-typing the same line items, shipping address, and SKU details that already exist in Shopify. At low volume this is tedious. At real volume it's a full-time job, and it's where orders get delayed, duplicated, or sent to the wrong location.

## Why it matters

Every hour an order sits waiting to be manually routed is an hour added to the delivery promise made at checkout. Routing mistakes — an order sent to a warehouse that's out of stock on that SKU, or split incorrectly across locations — create the exact kind of fulfillment errors that generate support tickets and refund requests.

## How we approach it

We connect Shopify directly to the warehouse management systems and 3PL platforms a business already uses, so a new order is validated, allocated to the correct fulfillment location, and pushed through automatically based on rules the business defines: stock availability, shipping zone, order priority, or SKU-specific routing agreements with a given 3PL.

We build for the edge cases that break naive integrations: split shipments across multiple warehouses, partial stock availability, and orders that need manual review before they're released. Those get flagged for a human rather than routed incorrectly and discovered later.

## Typical deliverables

Order routing architecture, 3PL/WMS integration, rule-based allocation logic, split-shipment handling, and exception queues for orders needing manual review.`,
        deliverables: [
            "Shopify to 3PL/WMS order integration",
            "Rule-based fulfillment routing",
            "Multi-warehouse allocation logic",
            "Split-shipment handling",
            "Exception queue for manual review",
            "Order acknowledgment sync back to Shopify",
        ],
        idealFor: [
            "Brands fulfilling from more than one warehouse or 3PL",
            "Stores manually re-entering orders into a 3PL portal",
            "Growing order volume outpacing manual routing",
            "Businesses onboarding a new 3PL partner",
        ],
        outcomes: [
            "Orders reach the warehouse within moments, not hours",
            "Fewer misrouted and split-shipment errors",
            "No manual re-entry into 3PL portals",
            "Faster time from order to pick",
        ],
        technologies: [
            "Shopify Admin/Order APIs",
            "3PL & WMS APIs (ShipBob, Extensiv, ShipStation)",
            "Webhooks",
            "EDI where required",
        ],
    },
    {
        slug: "inventory-multichannel-synchronization",
        title: "Inventory & Multi-Channel Synchronization",
        summary:
            "Keeping stock counts accurate and synchronized in near real time across Shopify, your warehouse, your 3PL, and every other sales channel you sell on.",
        body: `## What this solves

Selling through a storefront, a warehouse, and one or more 3PLs — sometimes across multiple sales channels too — creates constant risk of the numbers disagreeing. A SKU sells out at the 3PL but still shows in stock on Shopify. A restock happens at the warehouse but the storefront isn't told. Each mismatch becomes an oversold order, a backorder nobody planned for, or a customer refund.

## Why it matters

Overselling damages trust immediately: a customer pays for something that isn't actually available, and now the business has to explain that, refund it, or scramble to source it elsewhere. At volume, manual stock reconciliation between systems simply cannot keep pace, and the businesses selling across the most channels are usually the ones with the least accurate combined inventory picture.

## How we approach it

We build inventory synchronization between Shopify, warehouse and 3PL stock systems, and any additional sales channels, so a change in stock anywhere is reflected everywhere within moments of the source event. This includes handling multi-warehouse stock pools, safety stock buffers, and SKU mapping when the same product is listed differently across channels.

We pay specific attention to sync failures and conflicts — a webhook that doesn't fire, two systems updating the same SKU at once — since these are where inventory drift usually starts. Built correctly, the sync self-corrects and alerts rather than silently drifting out of accuracy over weeks.

## Typical deliverables

Inventory sync architecture, multi-warehouse stock pooling, SKU mapping across channels, safety stock logic, and sync failure alerting.`,
        deliverables: [
            "Multi-channel inventory sync",
            "Multi-warehouse stock pooling",
            "SKU mapping across sales channels",
            "Safety stock and buffer logic",
            "Backorder and oversell prevention",
            "Sync failure detection and alerts",
        ],
        idealFor: [
            "Multi-channel sellers (Shopify, marketplaces, wholesale)",
            "Brands with multi-warehouse or multi-3PL stock",
            "Stores with recurring overselling issues",
            "Businesses adding a new sales channel",
        ],
        outcomes: [
            "Accurate stock levels everywhere, at all times",
            "Fewer oversells and backorder surprises",
            "Less manual stock reconciliation",
            "Confidence to add new sales channels",
        ],
        technologies: [
            "Shopify Inventory API",
            "3PL/WMS stock feeds",
            "Webhooks",
            "PostgreSQL",
        ],
    },
    {
        slug: "shipping-carrier-automation",
        title: "Shipping & Carrier Automation",
        summary:
            "Automatically selecting the right carrier and service level, generating labels, and pushing tracking back to Shopify and the customer without manual steps.",
        body: `## What this solves

Once an order is picked and packed, someone still has to choose a carrier and service level, generate a shipping label, and make sure the tracking number gets back to both the storefront and the customer. Done manually across dozens or hundreds of daily shipments, this is slow, inconsistent, and an easy place for the wrong carrier or rate to get selected.

## Why it matters

Shipping cost and delivery speed directly affect margin and customer satisfaction. A business shipping without rate-shopping logic is often overpaying on a meaningful share of its orders, and a customer who doesn't receive tracking information promptly generates a support ticket that a working system should have prevented entirely.

## How we approach it

We build shipping automation that selects the carrier and service level based on rules the business defines — destination, weight, order value, delivery speed promised at checkout — then generates the label and books the shipment automatically. Tracking numbers sync back to Shopify and trigger customer notifications without anyone touching a shipping dashboard.

This includes rate-shopping across carriers where it makes financial sense, and fallback logic for carrier outages or service disruptions so shipments don't stall because one carrier's API is briefly unavailable.

## Typical deliverables

Carrier selection and rate-shopping logic, automated label generation, tracking sync to Shopify, customer notification triggers, and carrier fallback handling.`,
        deliverables: [
            "Rule-based carrier and service selection",
            "Automated label generation",
            "Rate-shopping across carriers",
            "Tracking sync to Shopify and customers",
            "Carrier outage fallback logic",
            "Shipping cost reporting",
        ],
        idealFor: [
            "Stores shipping high daily order volume",
            "Businesses using more than one carrier",
            "Brands with delivery-speed promises at checkout",
            "Teams generating labels manually today",
        ],
        outcomes: [
            "Faster time from pack to ship",
            "Lower average shipping cost",
            "Automatic tracking delivered to customers",
            "Fewer shipping-related support tickets",
        ],
        technologies: [
            "Carrier APIs (EasyPost, Shippo, carrier-direct)",
            "Shopify Fulfillment API",
            "Webhooks",
        ],
    },
    {
        slug: "returns-reverse-logistics-automation",
        title: "Returns & Reverse Logistics Automation",
        summary:
            "Automating the return, refund, and inventory-update workflow so a returned item is processed and restocked without a spreadsheet or manual email chain.",
        body: `## What this solves

Returns are usually the least automated part of the fulfillment chain. A customer emails or fills a form, someone manually approves it, a label gets sent, and when the item finally comes back, someone has to remember to update inventory and process the refund. Each manual handoff is a place the process stalls, and reverse logistics errors — refunding without restocking, or restocking damaged goods — are expensive.

## Why it matters

A slow or inconsistent return experience damages repeat purchase rates directly; customers remember how a return was handled at least as much as how the original order went. On the operational side, returns that don't correctly update inventory create exactly the kind of stock inaccuracy that causes oversells elsewhere in the business.

## How we approach it

We build a returns workflow that lets a customer initiate a return against clear, automated rules, generates the return label, and updates inventory and refund status automatically once the item is received and inspected. Where a return needs human judgement — damaged goods, policy exceptions — it's flagged for review rather than auto-approved or silently dropped.

This connects back into the same inventory and shipping systems already in place, so a returned item that's resellable flows back into available stock without anyone manually adjusting a count.

## Typical deliverables

Automated return initiation and approval rules, return label generation, inspection and restock workflow, refund automation, and reporting on return reasons and volume.`,
        deliverables: [
            "Automated return request and approval flow",
            "Return label generation",
            "Restock and inventory update on receipt",
            "Refund automation",
            "Exception handling for damaged/disputed returns",
            "Return reason and volume reporting",
        ],
        idealFor: [
            "Brands with meaningful return volume",
            "Stores handling returns manually via email",
            "Businesses needing accurate restock timing",
            "Teams wanting return-reason visibility",
        ],
        outcomes: [
            "Faster return-to-refund turnaround",
            "Accurate, automatic restock of resellable items",
            "Fewer manual refund errors",
            "Clear visibility into why items come back",
        ],
        technologies: [
            "Shopify Returns API",
            "Carrier return-label APIs",
            "3PL/WMS receiving integration",
        ],
    },
    {
        slug: "fulfillment-logistics-visibility-dashboards",
        title: "Fulfillment & Logistics Visibility Dashboards",
        summary:
            "A single dashboard showing order status, inventory position, shipping performance, and 3PL SLAs, so nobody has to log into four different portals to find an answer.",
        body: `## What this solves

Fulfillment data lives scattered across Shopify, a WMS, one or more 3PL portals, and carrier tracking pages. Answering a simple question — "how many orders are stuck", "is this 3PL hitting its SLA", "which SKUs are about to stock out" — means checking several systems and assembling the answer by hand, and by the time it's assembled it may already be out of date.

## Why it matters

Operational problems in fulfillment compound quickly if they aren't visible early. A 3PL slipping on pick-and-pack time, a carrier's delivery performance degrading, a SKU quietly heading toward a stockout — each of these is far cheaper to catch early than to discover through a wave of customer complaints.

## How we approach it

We build a fulfillment and logistics dashboard that pulls live data from Shopify, the warehouse or 3PL, and carriers into one view built around the specific questions the business actually needs answered: order status and exceptions, inventory position by SKU and location, shipping performance and cost, and 3PL SLA tracking where applicable.

This isn't a generic analytics template; it's scoped to the metrics that drive operational decisions for that specific business, with alerting on the thresholds that matter — a stockout risk, an SLA breach, a spike in exceptions — so problems surface before they become customer-facing.

## Typical deliverables

Fulfillment dashboard architecture, live data integrations across Shopify/3PL/carriers, SLA and exception tracking, stockout risk alerting, and role-based views for operations versus leadership.`,
        deliverables: [
            "Unified fulfillment and logistics dashboard",
            "Live order and exception tracking",
            "Inventory position by SKU and location",
            "3PL SLA and carrier performance tracking",
            "Stockout risk alerting",
            "Role-based views for ops vs leadership",
        ],
        idealFor: [
            "Businesses juggling multiple 3PL or warehouse portals",
            "Operations leads without a single source of truth",
            "Brands tracking 3PL SLA performance",
            "Leadership needing fulfillment visibility without asking ops",
        ],
        outcomes: [
            "One place to check fulfillment health",
            "Earlier warning on stockouts and SLA slips",
            "Less time spent checking multiple portals",
            "Data-backed 3PL and carrier decisions",
        ],
        technologies: [
            "Next.js",
            "PostgreSQL",
            "3PL/WMS & carrier API integrations",
            "Recharts",
        ],
    },
];

const internalOpsCapabilities = [
    {
        slug: "operations-command-centers",
        title: "Operations Command Centers",
        summary:
            "A single operational dashboard that replaces scattered spreadsheets and disconnected tools with one accurate, current view of the business.",
        body: `## What this solves

Operational visibility often lives in a dozen different places: a spreadsheet someone updates manually, a dashboard from one platform that doesn't include data from another, and institutional knowledge that exists only because someone on the team remembers it. Getting an accurate picture of what's actually happening requires checking all of them, and the answer is often already out of date by the time it's assembled.

## Why it matters

Decisions made on incomplete or outdated information are decisions made with unnecessary risk. When leadership or operations staff have to piece together a picture from multiple sources before they can act, response time slows down exactly when speed matters most — during a supply issue, a demand spike, or a process breaking down somewhere in the business.

## How we approach it

We build a command centre that pulls live data directly from the systems the business already runs on — inventory, orders, support, finance, whichever are relevant — into a single view designed around the decisions the team actually needs to make. This isn't a generic BI dashboard template with every metric available; it's built around a specific set of questions the business needs answered quickly.

Because the data is pulled live rather than manually updated, the dashboard reflects what's actually happening rather than what was true when someone last had time to update a spreadsheet. Access and views are structured around who needs to see what.

## Typical deliverables

Custom dashboard architecture, live data integrations, role-based views, key metric definition, and alerting for thresholds that need attention.`,
        deliverables: [
            "Custom dashboard architecture",
            "Live data integrations",
            "Role-based access and views",
            "Key metric definition",
            "Threshold alerting",
            "Historical trend views",
        ],
        idealFor: [
            "Operations teams relying on spreadsheets",
            "Leadership needing current operational visibility",
            "Multi-department businesses with siloed data",
            "Fast-growing companies outgrowing manual reporting",
        ],
        outcomes: [
            "Single source of operational truth",
            "Faster decision-making",
            "Reduced manual reporting work",
            "Better visibility across departments",
        ],
        technologies: ["Next.js", "PostgreSQL", "REST/Webhook integrations", "Recharts"],
    },
    {
        slug: "workflow-automation",
        title: "Workflow Automation",
        summary:
            "Automating repetitive manual tasks and clearing operational bottlenecks so your team spends time on work that actually needs judgement.",
        body: `## What this solves

Many operational tasks are repetitive by nature: moving data between systems, generating the same report every week, updating a status when a predictable event happens. Done manually, these tasks consume hours that scale directly with volume, and they're also where human error tends to creep in, since repetitive work invites mistakes exactly because it doesn't require much attention.

## Why it matters

Time spent on repetitive manual work is time not spent on the parts of the job that actually require judgement. As a business grows, the volume of repetitive tasks grows with it, and without automation, that usually means hiring more people to do the same manual work rather than solving the underlying inefficiency.

## How we approach it

We identify the specific tasks consuming the most repetitive manual effort and automate them individually, rather than attempting a wholesale automation platform that tries to cover everything at once. This usually starts with the highest-volume, lowest-judgement tasks — status updates, data transfers, recurring reports, notification triggers — and works outward from there.

Automation is built to fail safely. When a task hits an edge case it wasn't designed for, it flags for a human rather than proceeding on a bad assumption. A system that automates ninety percent of a task correctly and handles the remaining ten percent gracefully is more valuable than one that tries to automate everything and fails silently on the edge cases.

## Typical deliverables

Task automation architecture, workflow mapping, exception handling and human handoff, and monitoring for automated processes.`,
        deliverables: [
            "Repetitive task automation",
            "Workflow mapping and documentation",
            "Exception handling logic",
            "Human handoff for edge cases",
            "Automated reporting",
            "Process monitoring and alerts",
        ],
        idealFor: [
            "Operations teams doing repetitive manual work",
            "Businesses scaling without proportional headcount growth",
            "Teams generating recurring reports manually",
            "Companies with high error rates in manual processes",
        ],
        outcomes: [
            "Reduced manual work",
            "Fewer process errors",
            "Faster task completion",
            "More team time on judgement-based work",
        ],
    },
    {
        slug: "document-processing",
        title: "Document Processing",
        summary:
            "Automatically extracting information from invoices, forms, and business documents so your team stops manually re-typing data into other systems.",
        body: `## What this solves

Invoices, purchase orders, shipping documents, and forms arrive in every format imaginable — PDFs, scanned images, emails with attachments — and someone on the team has to read each one and manually enter the relevant data into whatever system tracks it. This is slow, error-prone, and scales badly as document volume grows.

## Why it matters

Manual data entry is one of the most common sources of operational errors: a transposed number on an invoice, a missed line item, a delay because documents pile up faster than someone can process them. These errors are individually small but collectively expensive, especially in finance and logistics workflows where accuracy compounds downstream.

## How we approach it

We build document processing that extracts structured data directly from invoices, forms, and other business documents, regardless of format, and feeds it into the systems that need it — an accounting platform, an inventory system, an operations dashboard — without a person retyping anything. This includes handling variation: documents from different vendors rarely follow the same layout, and the extraction logic is built to handle that variation rather than assuming a single template.

Extracted data is validated before it's committed anywhere important. Where confidence is low, the document is flagged for a human to check rather than allowing a bad extraction to silently enter the system and cause a downstream error.

## Typical deliverables

Document extraction pipeline, format and layout handling, validation and confidence scoring, and integration with downstream systems.`,
        deliverables: [
            "Document extraction pipeline",
            "Multi-format and multi-vendor handling",
            "Data validation and confidence scoring",
            "Integration with accounting or inventory systems",
            "Exception flagging for low-confidence extractions",
        ],
        idealFor: [
            "Finance teams processing high invoice volume",
            "Logistics operations handling shipping documents",
            "Businesses with manual data entry backlogs",
            "Companies receiving documents in varied formats",
        ],
        outcomes: [
            "Reduced manual data entry",
            "Fewer invoice and form errors",
            "Faster document turnaround",
            "Cleaner downstream data",
        ],
        technologies: ["OCR", "LLM-based extraction", "Node.js", "PostgreSQL"],
    },
    {
        slug: "cross-system-integrations",
        title: "Cross-System Integrations",
        summary:
            "Connecting inventory, CRM, support, accounting, and communication platforms into one workflow that updates everywhere automatically, without duplicate manual entry.",
        body: `## What this solves

Internal operations rarely run on a single system. Inventory lives in one platform, customer relationships in another, support tickets somewhere else, and accounting in a fourth. When these systems don't talk to each other, staff end up as the integration layer, manually copying information between tools — and that manual copying is where inconsistencies and delays creep in.

## Why it matters

A CRM that doesn't reflect current order status, an accounting system that's a week behind actual sales, a support team without visibility into inventory — each of these creates friction for whoever has to work across the gap. At scale, this friction adds up to a meaningful drag on how quickly the business can operate and respond.

## How we approach it

We connect the specific systems a business runs on using their APIs, mapping data so that the same customer, order, or product means the same thing everywhere it appears. Integration is scoped around the actual operational needs of the business, connecting what genuinely needs to be connected rather than building unnecessary complexity linking every tool that exists.

We pay particular attention to what happens when systems disagree — network failures, sync delays, conflicting updates — since these edge cases are usually where integrations break down in practice. Built correctly, the integration handles them without silently losing or duplicating data.

## Typical deliverables

Cross-system integration architecture, API-based data mapping, conflict and error handling, and monitoring for sync reliability.`,
        deliverables: [
            "Integration architecture across core systems",
            "API-based data mapping",
            "Conflict and error handling logic",
            "Sync reliability monitoring",
            "Documentation of connected workflows",
        ],
        idealFor: [
            "Businesses running disconnected internal tools",
            "Operations teams manually bridging systems",
            "Companies scaling past spreadsheet workflows",
            "Multi-department businesses needing shared data",
        ],
        outcomes: [
            "Consistent data across internal systems",
            "Less manual copying between tools",
            "Fewer sync errors",
            "Faster cross-team operations",
        ],
    },
    {
        slug: "custom-internal-tools",
        title: "Custom Internal Tools",
        summary:
            "Internal software built around how your business actually operates, instead of forcing your team to adapt to a generic tool.",
        body: `## What this solves

Generic software is built for the average case across thousands of businesses, which means it's rarely a precise fit for any single one. Teams end up working around the limitations of a tool that almost fits — using spreadsheets to cover the gaps, or maintaining manual processes for the parts of their workflow the software simply doesn't support.

## Why it matters

Working around software limitations has a real cost, even when it's not immediately visible. Every workaround is a point of manual effort, a place where errors can enter, and a process that new team members have to be taught separately from the tool itself. Over time, these workarounds accumulate into an operation that's harder to run than it should be.

## How we approach it

We build internal tools specifically for how a business actually operates: its terminology, its approval processes, its edge cases — rather than adapting the business to fit a generic tool's assumptions. This starts with understanding the actual workflow in detail, including the exceptions and edge cases that generic software usually ignores, since those are often where the real operational cost lives.

Custom tools are built to be maintained and extended over time, not as a one-off project. That means clean, documented code and a structure the team can build on as the business's needs change.

## Typical deliverables

Custom internal tool design and build, workflow-specific feature development, role-based access, and documentation for ongoing maintenance.`,
        deliverables: [
            "Custom internal tool design and build",
            "Workflow-specific feature development",
            "Role-based access control",
            "Edge case and exception handling",
            "Ongoing maintenance documentation",
            "Team onboarding support",
        ],
        idealFor: [
            "Businesses with workflows generic software can't fit",
            "Teams maintaining spreadsheet workarounds",
            "Operations with unique approval or process needs",
            "Companies planning to scale internal processes",
        ],
        outcomes: [
            "Software that fits actual workflows",
            "Fewer manual workarounds",
            "Easier onboarding for new staff",
            "A tool that scales with the business",
        ],
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM"],
    },
];

const supportCapabilities = [
    {
        slug: "order-context-support",
        title: "Order Context for Support Workflows",
        summary:
            "Giving support agents the live order, shipment, and inventory context behind each conversation, so answers come from connected data instead of guesswork.",
        body: `## What this solves

Most order-status questions can only be answered by someone who can see the order, the shipment, and the current stock position at once. When those systems are separate, the agent either asks the customer to wait while they check, or answers from memory and gets it wrong.

## Why it matters

A large share of e-commerce support volume is a small number of repeated questions: where is my order, has it shipped, can I change the address, is it still in stock. Each of these should be answerable from data the business already has.

## How we approach it

We connect the support channel to the operational systems so the agent — or the automated first response — can see order status, shipment status, and tracking without switching tools. The connection is built around the specific systems the business already runs, so no new tool has to be adopted for the benefit to be had.

## Typical deliverables

Support-to-order data connection, order status lookups for agents, contextual response templates, and a defined handoff to a human for anything outside the automated scope.`,
        deliverables: [
            "Support-to-order system connection",
            "Order and shipment status lookups",
            "Contextual response templates",
            "Human handoff for out-of-scope requests",
            "Response accuracy review",
        ],
        idealFor: [
            "Support teams handling a high repeat-question load",
            "Stores where order status drives most tickets",
            "Businesses where agents switch between tools per ticket",
            "Teams that want a single view of customer context",
        ],
        outcomes: [
            "Faster answers on order-status questions",
            "Less time lost switching between systems",
            "More consistent replies across agents",
            "Better-informed first responses",
        ],
        technologies: ["Shopify APIs", "REST/Webhook integrations", "PostgreSQL"],
    },
    {
        slug: "request-routing-and-triage",
        title: "Request Routing & Triage",
        summary:
            "Classifying inbound requests, routing them to the right queue, and flagging the ones that genuinely need a person — without auto-answering beyond the data's confidence.",
        body: `## What this solves

When request volume grows, the queue becomes the bottleneck: everything lands in the same place, everything is urgent, and nothing is prioritised. Teams end up working through tickets in arrival order rather than by what actually matters.

## Why it matters

Repetitive, well-understood requests can be handled automatically or near-instantly. Anything ambiguous, anything involving a policy exception, anything that touches a refund beyond a threshold — that needs a person. Without triage, the person spends their attention on the easy questions.

## How we approach it

We define a routing model with the business: the request types that can be resolved from connected order data, the types that need a human, and the types that need a supervisor. Automated handling is bounded by the confidence of the underlying data, and anything outside that boundary is escalated to a human rather than guessed at.

## Typical deliverables

Request type taxonomy, routing and priority rules, escalation paths, threshold configuration, and reporting on handled-versus-escalated volume.`,
        deliverables: [
            "Request type taxonomy",
            "Routing and priority rules",
            "Escalation paths to human review",
            "Confidence thresholds for automated handling",
            "Handled vs escalated reporting",
        ],
        idealFor: [
            "Support teams with a growing ticket backlog",
            "Businesses with many similar inbound requests",
            "Operations where priority handling is manual",
            "Teams wanting clear escalation rules",
        ],
        outcomes: [
            "Repetitive requests handled without a person",
            "Ambiguous requests surfaced earlier",
            "Clearer ownership per request type",
            "Less time spent triaging the queue",
        ],
    },
    {
        slug: "support-knowledge-base",
        title: "Support Knowledge Base",
        summary:
            "Consolidating FAQs, policies, and product information into one current source so replies stay consistent as policies and products change.",
        body: `## What this solves

Support knowledge is usually scattered across a help centre, internal documents, old email threads, and whatever individual agents happen to remember. Responses built from scattered knowledge are inconsistent, and inconsistent answers to the same question are a support problem of their own.

## Why it matters

An answer built from outdated documentation causes more harm than an answer that says the information isn't available. Keeping a single, accurate, current source of support knowledge is what makes automated and assisted responses trustworthy rather than a liability.

## How we approach it

We consolidate existing FAQs, policy documents, and product information into a structured knowledge base with a process for keeping it current as policies, products, and pricing change — so it doesn't drift the way static documentation usually does. Content is also structured for retrieval rather than only for human reading, because content that reads well to a person doesn't always retrieve cleanly for a system answering a specific question.

## Typical deliverables

Knowledge base consolidation, content structuring for retrieval, policy and pricing update workflow, version tracking, and a gap analysis of missing documentation.`,
        deliverables: [
            "Knowledge base consolidation",
            "Content structuring for retrieval",
            "Policy and pricing update workflow",
            "Version tracking for support content",
            "Gap analysis for missing documentation",
        ],
        idealFor: [
            "Businesses with scattered support documentation",
            "Teams updating policies frequently",
            "Brands scaling their FAQ and help centre",
            "Support teams onboarding new agents often",
        ],
        outcomes: [
            "More consistent responses",
            "Faster updates when policies change",
            "Less reliance on individual agent memory",
            "A single source for support content",
        ],
    },
    {
        slug: "support-operations-reporting",
        title: "Support Operations Reporting",
        summary:
            "Reporting on request volume, common question types, and escalation patterns, so recurring issues get fixed at the source instead of answered repeatedly.",
        body: `## What this solves

Every support conversation contains information about what's actually going wrong with a product or process, but that information is usually locked inside individual tickets and never aggregated into something a team can act on. Without visibility into patterns, the same product issue can generate tickets for months before anyone notices it's systemic.

## Why it matters

Support data is one of the most direct signals a business has about where products, policies, or processes are causing friction for customers. Teams that can see patterns in that data can fix root causes instead of repeatedly treating the same symptom one conversation at a time.

## How we approach it

We build reporting that aggregates conversation data into clear, usable views: which questions come up most often, where requests escalate to humans and why, how resolution times trend, and which issues correlate with specific products or periods. The goal is a view the team actually checks, not a report that gets generated and ignored.

## Typical deliverables

Request analytics, trend and pattern reporting, escalation rate tracking, resolution time tracking, and product or issue correlation reporting.`,
        deliverables: [
            "Conversation analytics dashboard",
            "Common question and trend tracking",
            "Escalation rate reporting",
            "Resolution time tracking",
            "Product or issue correlation reporting",
        ],
        idealFor: [
            "Support leads tracking team performance",
            "Product teams needing customer feedback signals",
            "Businesses scaling support operations",
            "Teams wanting data-backed process improvements",
        ],
        outcomes: [
            "Visibility into support trends",
            "Faster identification of systemic issues",
            "Data-backed process improvements",
            "Clearer reporting for leadership",
        ],
    },
];

const storefrontCapabilities = [
    {
        slug: "high-converting-storefronts",
        title: "Storefront Development",
        summary:
            "Custom-built storefronts with the product, category, and checkout flows designed around how the catalogue is actually browsed and bought.",
        body: `## What this solves

A storefront built from a generic theme communicates generic. It loads slower than it should, presents products in a layout that wasn't designed for the catalogue, and asks customers to trust a brand that looks like a thousand others running the same template.

## Why it matters

Customers decide within seconds whether a store feels credible. Page structure, image quality, load speed, and checkout clarity all contribute to that decision before a single word of copy is read. A storefront that is slow, cluttered, or inconsistent with the rest of the brand experience loses buyers who would otherwise have purchased.

## How we approach it

We design and build storefronts around the specific catalogue, price point, and buying behaviour of the business, not a template's assumptions. That means custom product layouts for how items are actually browsed and compared, checkout flows with the fewest possible steps between intent and purchase, and a visual system consistent with the brand across every page.

Every storefront is built with the same engineering discipline as the systems behind it: clean code, sensible component structure, and performance considered from the first commit rather than patched in afterward.

## Typical deliverables

Custom storefront architecture, product and category page design, checkout flow design, responsive layouts across devices, and a component system the team can extend without rebuilding pages from scratch.`,
        deliverables: [
            "Custom storefront architecture",
            "Product and category page design",
            "Checkout flow design and build",
            "Responsive layouts for all devices",
            "Reusable component library",
            "Brand-consistent visual system",
        ],
        idealFor: [
            "Growing ecommerce brands",
            "DTC companies scaling past their first platform",
            "Brands outgrowing template themes",
            "Retailers with complex product catalogues",
        ],
        outcomes: [
            "A storefront designed around the actual catalogue",
            "Clearer purchase path for the customer",
            "Faster page load times",
            "A storefront the brand owns end to end",
        ],
        technologies: ["Next.js", "Shopify", "TypeScript", "Tailwind CSS"],
    },
    {
        slug: "performance-optimisation",
        title: "Performance Engineering",
        summary:
            "Technical performance work that reduces load times, prevents abandoned sessions, and keeps checkout fast during high-traffic sales events.",
        body: `## What this solves

Every additional second a page takes to load costs conversions. Slow product pages, bloated checkout scripts, and unoptimised images push visitors to abandon before they buy, and that cost compounds during high-traffic periods like sales events, when performance problems that go unnoticed on a quiet day become checkout failures under load.

## Why it matters

Performance is not a cosmetic concern. Search rankings, ad quality scores, and conversion rates are all directly affected by how fast pages load and respond. A storefront that performs well under normal traffic can still fail during a promotion or product launch if it was never engineered to handle spikes in concurrent users.

## How we approach it

We treat performance as a measurable engineering target, not a vague goal. That means auditing render-blocking scripts, image delivery, third-party tags, and server response times, then addressing each bottleneck individually rather than applying generic optimisation checklists. Where a platform's defaults are the constraint, we work around them with custom caching, lazy loading, and code-splitting strategies suited to the store's actual traffic patterns.

Testing happens under realistic load, not just on a developer's machine with an empty cart and no competing scripts. The goal is a storefront that stays fast at checkout, during a flash sale, and on the slowest device a real customer is likely to use.

## Typical deliverables

Performance audits, image and asset optimisation, script loading strategy, caching configuration, and load testing before major sales events.`,
        deliverables: [
            "Full performance audit",
            "Image and asset optimisation",
            "Script loading and third-party tag review",
            "Caching and CDN configuration",
            "Code splitting and lazy loading setup",
            "Load testing for peak traffic events",
        ],
        idealFor: [
            "Stores with high cart abandonment",
            "Brands running seasonal sales campaigns",
            "Sites with heavy third-party scripts",
            "High-traffic ecommerce catalogues",
        ],
        outcomes: [
            "Faster page load times",
            "Fewer abandoned sessions",
            "More stable performance during traffic spikes",
            "Measurable Core Web Vitals improvement",
        ],
        technologies: ["Next.js", "Lighthouse", "CDN caching", "Image optimisation pipelines"],
    },
    {
        slug: "customer-journey-optimisation",
        title: "Customer Journey Optimisation",
        summary:
            "Mapping and refining every step from landing page to checkout to remove friction, reduce drop-off, and complete more purchases.",
        body: `## What this solves

Most conversion loss doesn't happen at checkout — it happens earlier, at the small points of friction a customer hits before ever reaching the payment page: confusing navigation, unclear shipping information, an extra form field that didn't need to exist. Each of these is minor on its own. Together they explain why a store with decent traffic still converts poorly.

## Why it matters

Customers rarely abandon a purchase because of one dramatic failure. They abandon because the path from interest to purchase asked more of them than it needed to. Identifying exactly where that happens requires looking at real behaviour, not assumptions about what customers want.

## How we approach it

We map the actual path customers take through the store using session data, funnel analysis, and direct observation of the checkout flow, then identify the specific steps causing drop-off. From there we redesign the journey around removing unnecessary decisions and inputs rather than adding more content or persuasion elements.

This often means simplifying navigation, reducing checkout fields to what's genuinely required, clarifying shipping and return information earlier in the journey, and making sure the path from product page to purchase is as short as the business model allows. Changes are validated against real conversion data rather than shipped on instinct.

## Typical deliverables

Customer journey mapping, funnel and drop-off analysis, checkout flow redesign, friction audits, and A/B testing of key conversion points.`,
        deliverables: [
            "Customer journey mapping",
            "Funnel and drop-off analysis",
            "Checkout flow redesign",
            "Form and field reduction audit",
            "Navigation and information architecture review",
            "A/B testing of conversion points",
        ],
        idealFor: [
            "Stores with high traffic but low conversion",
            "Brands with complex checkout flows",
            "Multi-step purchase journeys",
            "Teams lacking behavioural data on customers",
        ],
        outcomes: [
            "Clearer purchase paths",
            "Reduced cart abandonment",
            "Fewer unnecessary steps to checkout",
            "Changes validated against real behaviour",
        ],
    },
    {
        slug: "inventory-fulfilment-sync",
        title: "Inventory & Fulfilment Sync",
        summary:
            "Connecting storefront stock levels to warehouse and 3PL systems so what a customer can buy matches what can actually be shipped.",
        body: `## What this solves

A storefront that promises stock the warehouse doesn't have creates the two most expensive problems in e-commerce: an oversold order that has to be refunded or sourced elsewhere, and a customer who paid for something that isn't there. This happens when the storefront and the fulfillment systems hold separate, unreconciled numbers.

## Why it matters

Inventory accuracy is the contract between what a store advertises and what it can deliver. It determines whether delivery estimates mean anything, whether a customer can be told an item is available, and how much of the operation has to be spent apologising for mistakes that were visible in the data.

## How we approach it

We connect the storefront to the warehouse or 3PL stock system so the available quantity shown to customers reflects what can actually be fulfilled, with buffer logic for the lag between a sale and the stock system catching up. The same work is covered in more depth as part of [E-commerce fulfillment, 3PL & logistics automation](/services/ecommerce-fulfillment-3pl-logistics-automation) — it is listed here because a storefront engagement is often where the gap first becomes visible.

## Typical deliverables

Stock availability sync, buffer and safety stock rules, listing updates from fulfilment data, oversell prevention, and stockout alerting.`,
        deliverables: [
            "Stock availability sync",
            "Buffer and safety stock rules",
            "Listing updates from fulfillment data",
            "Oversell prevention",
            "Stockout risk alerting",
        ],
        idealFor: [
            "Brands selling from a warehouse or 3PL",
            "Stores with overselling problems",
            "Businesses with a storefront connected to nothing",
            "Teams where delivery estimates are unreliable",
        ],
        outcomes: [
            "What customers can buy matches what can ship",
            "Fewer oversells and refunds",
            "More reliable delivery estimates",
            "Earlier warning on stockouts",
        ],
        technologies: ["Shopify Inventory API", "3PL/WMS stock feeds", "Webhooks"],
    },
    {
        slug: "business-system-integrations",
        title: "Business System Integrations",
        summary:
            "Linking ecommerce, CRM, support, email, and logistics platforms so data moves automatically across the entire business operation without manual re-entry.",
        body: `## What this solves

Growing ecommerce businesses tend to accumulate tools faster than they connect them. The storefront runs on one platform, customer data lives in a CRM, support runs through a separate helpdesk, and logistics is tracked in yet another system. Without integration, staff spend hours a week manually moving information between them, and that information drifts out of sync almost immediately.

## Why it matters

Disconnected systems create invisible operational cost. A support agent without order history takes longer to resolve a ticket. A marketing team without accurate customer data sends the wrong offer to the wrong segment. None of these failures show up as a single obvious problem, but together they slow the business down and introduce errors that are hard to trace back to their source.

## How we approach it

We build integrations between the specific systems a business already relies on, using each platform's API rather than forcing a migration to new software. Data is mapped carefully so that a customer record, an order, or a support ticket means the same thing in every system it touches, and updates in one place propagate automatically to the others.

This work is scoped around what the business actually needs connected, not every system that could theoretically be linked. The result is fewer manual handoffs, fewer data entry errors, and a team that can trust the numbers in front of them without checking three other tools first.

## Typical deliverables

System integration architecture, API-based data mapping, automated sync between platforms, error handling and monitoring, and documentation for the connected workflow.`,
        deliverables: [
            "Integration architecture across systems",
            "API-based data mapping",
            "Automated data sync",
            "Error handling and retry logic",
            "Sync monitoring and alerts",
            "Integration documentation",
        ],
        idealFor: [
            "Businesses running multiple disconnected tools",
            "Operations teams doing manual data entry",
            "Support teams needing order context",
            "Growing teams scaling past spreadsheets",
        ],
        outcomes: [
            "Less manual data entry",
            "Consistent data across systems",
            "Faster support resolution times",
            "Better operational visibility",
        ],
        technologies: ["REST APIs", "Webhooks", "Custom middleware", "PostgreSQL"],
    },
];

export const servicesContent = servicesContentSchema.parse({
    seo: {
        title: "E-Commerce Fulfillment & Logistics Automation Services",
        description:
            "Custom fulfillment and operations automation for Shopify businesses and 3PLs. Connect order routing, inventory sync, shipping, tracking, returns, and internal workflows.",
        keywords: [
            "e-commerce fulfillment automation",
            "ecommerce logistics automation",
            "3PL automation",
            "3PL integration",
            "Shopify fulfillment automation",
            "Shopify 3PL integration",
            "order fulfillment automation",
            "warehouse automation",
            "shipping automation",
            "returns automation",
            "reverse logistics automation",
            "inventory synchronization",
        ],
    },
    hero: {
        eyebrow: "E-Commerce Fulfillment & Logistics Automation",
        title: "Connect the Systems Behind Every Order",
        description:
            "Kinetous builds custom integrations and workflow automations for Shopify businesses and 3PL operators — from order processing and inventory coordination to shipping, tracking, returns, and operational visibility.",
        primaryCta: {
            label: "Discuss Your Workflow",
            href: "/contact",
            variant: "primary",
        },
        secondaryCta: {
            label: "Explore Fulfillment Automation",
            href: "/services/ecommerce-fulfillment-3pl-logistics-automation",
            variant: "secondary",
        },
    },
    intro: `## Where these services fit

Most e-commerce operations break down in the same place: the systems behind an order do not talk to each other. Orders are re-typed by hand into a 3PL portal, stock counts disagree between the storefront and the warehouse, tracking updates live in a carrier dashboard nobody opens, and returns are processed over email.

Kinetous builds the layer that connects those systems. Work starts with the operational problem, not with a tool: what is being done manually today, which systems hold the data, and what should happen automatically once the workflow is understood.

The service below is the flagship: fulfillment and logistics automation is where the work is deepest. The adjacent services exist because the same operational reality shows up in different places — inside the business rather than around the order, or in the support inbox rather than the warehouse.`,
    engagement: {
        eyebrow: "How engagement works",
        title: "From first conversation to a running system",
        description:
            "Every engagement is scoped around a specific operational workflow rather than a fixed package. The sequence below is the standard shape of a build; the content of each step changes with the workflow.",
        steps: [
            {
                title: "Discovery and workflow mapping",
                description:
                    "We map the current process end to end: which systems are involved, where the manual handoffs are, and what an exception looks like today. This produces a shared, written picture of the workflow before anything is built.",
            },
            {
                title: "Scope and architecture",
                description:
                    "The workflow is broken into components — intake, allocation, shipping, tracking, returns — with the integration approach, the data model, and the dependency on each party's APIs agreed in writing before implementation starts.",
            },
            {
                title: "Implementation",
                description:
                    "Integrations are built and wired into the existing stack. Each step is developed against the real shape of the data, including the awkward cases: partial stock, split shipments, duplicate events, and failed downstream calls.",
            },
            {
                title: "Testing against real scenarios",
                description:
                    "Testing covers the normal path and the exception path, because the exception path is where fulfillment systems usually fail. Cases are replayed against the business's own order shapes rather than synthetic happy-path data.",
            },
            {
                title: "Handover and monitoring",
                description:
                    "The system is handed over with documentation, and monitoring is put in place for the paths that matter. What ongoing support looks like after launch is agreed as part of the scope, rather than assumed afterwards.",
            },
        ],
    },
    reliability: {
        eyebrow: "Reliability principles",
        title: "How these systems are built to behave",
        description:
            "Fulfillment automation is judged by what happens when something goes wrong, not by how it looks when everything works. These are the principles applied to every integration we build.",
        items: [
            {
                title: "Idempotent event handling",
                description:
                    "Storefront and 3PL systems retry and re-send events. Handlers are written so a repeated event produces the same result rather than a duplicate order, a double decrement, or a second shipment.",
            },
            {
                title: "Explicit failure handling",
                description:
                    "A failed downstream call is not silently swallowed. It is retried with backoff, escalated when retries are exhausted, and recorded so the failure is visible instead of disappearing into a log nobody reads.",
            },
            {
                title: "Exception queues, not silent defaults",
                description:
                    "Orders that split, oversell, arrive with missing data, or fail a routing rule are routed to a review queue for a human. The system defaults to flagging, never to guessing.",
            },
            {
                title: "Data validation before commit",
                description:
                    "Values are validated before they are written to a system of record, so a malformed payload or an unexpected status change cannot quietly corrupt downstream data.",
            },
            {
                title: "Observability over assumption",
                description:
                    "Sync status, queue depth, and error rates are surfaced so problems are found by monitoring rather than by a customer noticing a missing order.",
            },
            {
                title: "Human escalation paths",
                description:
                    "Automation handles the repeatable path. Anything outside it — a policy exception, a damaged return, a carrier outage — has a defined route to a person, with the context attached.",
            },
        ],
    },
    faq: {
        eyebrow: "Questions buyers ask",
        title: "Before you scope a project",
        items: [
            {
                question: "What kinds of e-commerce workflows can be automated?",
                answer:
                    "The repeatable parts of the order lifecycle: order intake and routing, inventory synchronisation and allocation, label and carrier selection, tracking and status updates, and returns and restocking. The right starting point depends on where your team currently spends the most time, so the first conversation is about the workflow rather than the tools.",
            },
            {
                question: "Can you integrate with our existing Shopify setup?",
                answer:
                    "Yes. Shopify's Admin, Orders, Inventory, Fulfillments, and Returns APIs are the standard entry points, and we work with the apps already installed on the store rather than replacing them. If a specific app blocks an integration, we will say so during scoping instead of discovering it mid-build.",
            },
            {
                question: "Can inventory and fulfillment workflows span multiple locations?",
                answer:
                    "Yes. Multi-warehouse allocation, split shipments, and shared stock pools are all normal scope. The important part is defining the rules that decide which location handles which order — stock availability, shipping zone, SKU-specific agreements — and making sure the exceptions surface rather than being routed silently.",
            },
            {
                question: "How are duplicate events and failed integrations handled?",
                answer:
                    "Handlers are written to be idempotent, so a repeated webhook does not create a second order or a second shipment. Failed calls are retried with backoff, then escalated and recorded if they keep failing, rather than being dropped. This is the part of the system most likely to cause real damage if it is handled casually, so it is designed in from the start.",
            },
            {
                question: "Can a workflow include manual review for exceptions?",
                answer:
                    "Yes, and in practice most workflows need it. Orders that split, oversell, arrive with missing data, or break a routing rule go to a review queue with the context attached, so a person can resolve them quickly instead of finding out later that something was wrong.",
            },
            {
                question: "What information is needed to scope an implementation?",
                answer:
                    "Useful starting points: the systems in play (storefront, warehouse or 3PL, carrier, accounting), a rough order volume, how orders reach fulfillment today, where the manual steps are, and which systems have API access rather than portal-only access. A rough description of the workflow is enough to begin the conversation.",
            },
            {
                question: "Do you maintain and monitor integrations after launch?",
                answer:
                    "Monitoring and alerting are part of the build, so sync failures and stuck queues are visible without waiting for a customer to report them. Ongoing maintenance after launch is agreed as part of the scope — it depends on how many systems are involved and how quickly those systems change, so it is priced rather than assumed.",
            },
        ],
    },
    items: [
        {
            slug: "ecommerce-fulfillment-3pl-logistics-automation",
            title: "E-Commerce Fulfillment, 3PL & Logistics Automation",
            tier: "flagship",
            summary:
                "The core service: order routing, inventory coordination, shipping, tracking, returns, and the exception handling that sits between a Shopify store and the physical movement of a product.",
            body: `## The problem

Order volume grows faster than the manual processes behind it. A store that once fulfilled a dozen orders a day from a spreadsheet is now pushing hundreds through the same workaround: someone checking the storefront for new orders, re-typing them into a warehouse or 3PL portal, chasing tracking numbers, and manually updating stock counts when something runs out. It works, until the day it quietly stops working and nobody notices until a customer complains.

## How these systems work together

We build the automation layer that sits between the storefront and the physical movement of a product: order routing that sends each order to the right fulfillment location automatically, inventory sync that keeps stock accurate across every channel, shipping automation that generates labels and picks carriers without manual input, returns workflows that update inventory and refunds without a spreadsheet, and visibility dashboards that show exactly where every order and shipment stands.

None of these pieces work well in isolation. Order routing depends on inventory data being accurate. Shipping automation depends on the order already being correctly routed and allocated. Visibility depends on all of it reporting back to one place. Fulfillment is treated as a single connected system, not five separate tools bolted together.

## Who this is for

Shopify store owners and operators with growing order volume, e-commerce operations managers, teams handling orders across multiple inventory locations or fulfillment partners, and businesses whose staff currently reconcile orders, stock, shipping, tracking, and returns by hand.

For 3PL and logistics operators, the same architecture is usually built in the other direction: merchant orders arriving from different storefronts in different formats, warehouse allocation and shipment status needing coordination, and staff lacking a unified view of exceptions and outstanding work.

## What implementation involves

The scope is agreed against the actual workflow rather than a fixed feature list. Typically it includes one or more of: order intake and routing rules, inventory synchronisation across locations, carrier and label selection, tracking and status sync, returns and restocking, exception queues, and the operational visibility needed to see what is happening without checking four portals.

Dependencies matter and are named during scoping: each 3PL, WMS, and carrier exposes a different API with different capabilities, and some parts of a workflow may only be reachable through a portal or a manual export. Those constraints are surfaced during scoping rather than after the build starts.

## Why companies invest here

Businesses usually reach out once growth has outpaced their operational systems: a founder manually re-entering orders into a 3PL portal every morning, a warehouse team fulfilling from a stock count that is a day out of date, or a support inbox full of "where is my order" tickets that a connected system should have answered automatically. These are not isolated inconveniences — they are the same underlying problem showing up in different departments.

This is deliberately the specialization we go deepest on. Storefronts get a brand to launch. What determines whether that brand can scale past a few hundred orders a month without hiring proportionally more operations staff is what happens after the "Buy" button is clicked, and that is the system we build.`,
            capabilities: fulfillmentCapabilities,
            seo: {
                title: "E-Commerce Fulfillment, 3PL & Logistics Automation",
                description:
                    "Custom fulfillment and logistics automation for Shopify businesses and 3PLs — connect order routing, inventory sync, shipping, tracking, returns, and exceptions.",
                keywords: [
                    "e-commerce fulfillment automation",
                    "ecommerce logistics automation",
                    "3PL automation",
                    "3PL integration",
                    "Shopify fulfillment automation",
                    "Shopify 3PL integration",
                    "order fulfillment automation",
                    "warehouse automation",
                    "shipping automation",
                    "returns automation",
                    "reverse logistics automation",
                    "inventory synchronization",
                ],
            },
        },
        {
            slug: "internal-operations-and-dashboards",
            title: "Internal Operations & Dashboards",
            tier: "adjacent",
            summary:
                "Operations command centres, workflow automation, document processing, and cross-system integrations that replace spreadsheet handoffs with one accurate view of the business.",
            body: `## The problem

As businesses grow, operations tend to run on an accumulation of spreadsheets, email threads, and disconnected software that worked fine at a smaller scale but breaks down under real volume. Nobody chose this system deliberately — it grew one workaround at a time — and by the time it becomes a real problem, untangling it feels harder than living with it.

## How these systems work together

We build internal tooling as a connected set: a command centre that gives the team a single view of operations, automation that removes repetitive manual work, document processing that extracts information without manual data entry, integrations that connect the systems the business already depends on, and custom tools built for workflows that don't fit generic software.

None of these work well in isolation. A dashboard is only useful if the data behind it is current, which requires the integrations and automation to actually be in place. Document processing feeds structured data into that same dashboard rather than existing as a separate tool nobody checks.

## Why companies invest here

Businesses usually invest here after noticing the same pattern: a task that should take minutes takes hours because it involves manually checking multiple systems, or a decision gets delayed because nobody has a current, trustworthy view of what's actually happening operationally.

Generic software solves generic problems. Once a business has specific enough workflows, forcing that operation into a tool built for a different kind of company creates more friction than it removes. Custom internal tools — built around how the business actually works rather than how a template assumes it should work — remove that friction directly.

This is an adjacent service rather than the core specialisation. It exists because the same businesses that need fulfillment automation usually have the same manual reporting problem in finance, operations, and support, and solving it in the same engagement is usually more efficient than solving it separately.`,
            capabilities: internalOpsCapabilities,
            seo: {
                title: "Internal Operations, Dashboards & Workflow Automation",
                description:
                    "Operations command centres, workflow automation, document processing, and cross-system integrations that replace spreadsheet handoffs with a single accurate view of the business.",
                keywords: [
                    "operations automation",
                    "workflow automation",
                    "business process automation",
                    "operations dashboard",
                    "document processing automation",
                    "system integrations",
                ],
            },
        },
        {
            slug: "shopify-store-development",
            title: "Shopify Store Development",
            tier: "adjacent",
            summary:
                "Storefront development and Shopify integrations — the front door to an operation, built so what a customer can buy matches what can actually be shipped.",
            body: `## Where this fits

This is the secondary side of what we build, and deliberately so. A storefront gets a brand to launch and gives us a way into the business's operations, but the harder, more valuable problem is almost always what happens after checkout: fulfillment, inventory accuracy, and getting orders out the door correctly. Storefronts are still built to a high standard, but as the front door to an operation rather than as the whole business.

## The problem

Most ecommerce brands run on a patchwork of storefront themes, plugins, and disconnected tools that were never designed to work together. Each addition solves one problem while creating three more: slower page loads, inconsistent data between systems, and a checkout flow that leaks revenue at every step.

## How these systems work together

A storefront is only as good as what sits behind it. The build covers five layers that together form a single revenue system: the storefront itself, the performance work that keeps it fast under real traffic, the customer journey that carries a visitor from landing page to purchase, the inventory and fulfilment logic that keeps promises accurate, and the integrations that tie ecommerce to CRM, support, and logistics.

Each layer is engineered to support the others. A fast storefront means little if checkout friction turns visitors away. A smooth checkout means little if inventory data is wrong and orders can't be fulfilled.

## Why companies invest here

Off-the-shelf platforms get a brand to launch. They rarely get a brand past the point where growth exposes their limits: slow pages under load, manual reconciliation between systems, support teams answering the same fulfilment questions daily. Custom engineering removes these ceilings by building around how the business actually operates instead of forcing operations to fit a template.

Brands that invest in this area are usually past their first year of trading and have outgrown the tools that got them started. For brands already dealing with real fulfillment volume, this work is usually paired with our [e-commerce fulfillment, 3PL & logistics automation](/services/ecommerce-fulfillment-3pl-logistics-automation).`,
            capabilities: storefrontCapabilities,
            seo: {
                title: "Shopify Store Development",
                description:
                    "Custom Shopify storefront development with performance engineering, checkout flow work, and the inventory and fulfillment integrations behind them.",
                keywords: [
                    "Shopify store development",
                    "custom Shopify storefront",
                    "Shopify performance optimization",
                    "ecommerce store development",
                    "Shopify checkout optimization",
                ],
            },
        },
        {
            slug: "customer-support-automation",
            title: "Customer Support Automation",
            tier: "supporting",
            summary:
                "Connecting order, shipment, and inventory data to support workflows so repetitive order-status requests are resolved from real data, with clear human-review boundaries.",
            body: `## The problem

Support volume grows faster than support teams can scale. A large share of e-commerce tickets are the same handful of questions repeated: where is my order, has it shipped, can I change the address, is it still in stock. Each of these should be answerable from data the business already holds, but when the support channel is disconnected from the order and shipment systems, every one of them becomes manual work for a person.

## How these systems work together

We build a support layer from connected parts: the operational data that gives agents live order and shipment context, a request routing model that separates what can be handled from data from what needs a person, a maintained knowledge base so answers stay consistent as policies change, and reporting on request patterns so recurring issues get fixed at the source.

Each part depends on the others. Context without routing turns into manual work for every ticket. Routing without a knowledge base produces answers that drift out of date. Reporting without the first two produces numbers nobody acts on.

## Human boundaries

This is a supporting service, and the boundaries are stated plainly. Automated handling is limited to requests that can be answered from connected operational data with confidence. Refunds above an agreed threshold, policy exceptions, damaged goods, and anything a customer disputes stay with a person. The system is built to route those cases clearly and quickly, not to resolve them by guessing.

## Why companies invest here

Support automation done well does not replace a support team — it removes the repetitive share of their workload so they can spend time on the issues that actually need a person. Businesses that invest here are usually seeing support volume grow ahead of headcount, or losing sales to slow response times outside business hours.`,
            capabilities: supportCapabilities,
            seo: {
                title: "Customer Support Automation for E-Commerce",
                description:
                    "Connect order data to support workflows to route and resolve repetitive order-status requests faster, with clear human-review boundaries.",
                keywords: [
                    "customer support automation",
                    "ecommerce support automation",
                    "order status automation",
                    "support workflow automation",
                ],
            },
        },
    ] satisfies ServiceContent[],
});
