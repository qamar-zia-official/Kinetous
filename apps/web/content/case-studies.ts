import { z } from "zod";

import { caseStudySchema } from "./schemas";

/**
 * Case study content for /case-studies and /case-studies/[slug].
 *
 * IMPORTANT — these are representative engagement scenarios, not client
 * accounts. Client names, volumes, and figures are illustrative and clearly
 * labelled as such in the page UI and in the `disclosure` field below. Do not
 * replace them with invented real-client claims; if verified client
 * engagements are available, add them as additional entries and update the
 * disclosure text accordingly.
 */

export const caseStudiesContentSchema = z.object({
    seo: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        keywords: z.array(z.string()).default([]),
    }),
    hero: z.object({
        eyebrow: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        primaryCta: z.object({
            label: z.string().min(1),
            href: z.string().min(1),
        }),
        secondaryCta: z.object({
            label: z.string().min(1),
            href: z.string().min(1),
        }),
    }),
    disclosure: z.string().min(1),
    intro: z.string().default(""),
    items: z.array(caseStudySchema).default([]),
});

export type CaseStudiesContent = z.infer<typeof caseStudiesContentSchema>;

export const caseStudiesContent = caseStudiesContentSchema.parse({
    seo: {
        title: "Fulfillment Automation Case Studies & Architecture Examples",
        description:
            "Representative e-commerce fulfillment automation scenarios: order routing, inventory synchronisation, shipping and returns workflows, with the architecture and failure modes behind each one.",
        keywords: [
            "fulfillment automation case study",
            "3PL integration example",
            "inventory sync architecture",
            "Shopify order routing example",
            "warehouse automation scenario",
        ],
    },
    hero: {
        eyebrow: "Case Studies & Architecture",
        title: "How Fulfillment Automations Are Put Together",
        description:
            "Three representative scenarios covering the order lifecycle, written up as they would be scoped: the operational problem, the system design, and the failure modes that had to be handled.",
        primaryCta: {
            label: "Discuss Your Workflow",
            href: "/contact",
        },
        secondaryCta: {
            label: "Explore Fulfillment Automation",
            href: "/services/ecommerce-fulfillment-3pl-logistics-automation",
        },
    },
    disclosure:
        "These are representative scenarios, not client accounts. Business types, volumes, and system names are illustrative, and no client results are claimed. They exist to show how a fulfillment workflow is designed and where it usually breaks.",
    intro: `## Why these are scenarios rather than client stories

Publishing named clients, revenue figures, or performance results that cannot be verified is not something we do. What follows instead is a more useful demonstration of the same thing: three realistic fulfillment problems, the system design that solves each one, and the specific failure modes that decide whether an integration survives contact with production traffic.

The architecture diagrams are conceptual. They describe how a system of this shape is built, using the component categories that actually appear in this kind of integration.`,
    items: [
        {
            slug: "multi-warehouse-order-routing",
            title: "Routing Orders Across Three Fulfillment Locations",
            client: "Multi-channel DTC brand (representative scenario)",
            industry: "Direct-to-consumer e-commerce",
            services: [
                "Order routing",
                "Inventory synchronisation",
                "Exception handling",
            ],
            summary:
                "A brand fulfilling from three locations was re-typing orders into three separate 3PL portals every morning. The scenario replaces that with rule-based routing, shared stock visibility, and a review queue for the orders that do not fit a rule.",
            challenge: `Orders arrived in Shopify and were manually re-typed into each 3PL's portal. At the volume the brand was shipping, that was most of a person's working day, and it introduced three separate failure modes: a SKU sent to a location that had already run out, an order split across locations without anyone deciding to split it, and a stock count that was already stale by the time the warehouse picked the order.

Nothing about the underlying problem was unusual. It is the standard shape of a business that has outgrown manual routing, and it is the reason this service exists.`,
            approach: `The design separates three concerns that are usually tangled together.

**1. A single order record.** Every order enters once, from the Shopify order webhook, and is stored in an internal order record with a stable identifier. Downstream systems reference that identifier rather than re-reading Shopify, so a re-sent webhook cannot create a second order.

**2. Allocation as an explicit, testable step.** Routing rules run against the order's SKUs, destination, and the current stock position for each location. The result is a decision — one location, several locations, or no location — not an implicit side effect of which API was called first.

**3. An exception path that is part of the design.** Orders that split unexpectedly, that no location can fulfil, or that carry data the 3PL rejected are written to a review queue with the reason attached. They are not routed optimistically and they are not dropped.

The result is that the manual morning task becomes a monitoring task: the exceptions are the only thing that needs a person, and they arrive with context.`,
            outcome: `In the scenario, the daily manual re-entry disappears and the remaining human work concentrates on exceptions rather than routine re-typing. The more important structural change is that stock accuracy stops being a downstream consequence of the manual step — allocation is computed against live stock, so an out-of-stock SKU is a rule outcome rather than a surprise.

Outcomes of this kind are a function of the specific operation, so this scenario is written to describe system behaviour rather than promise a percentage.`,
            architecture: `\`\`\`text
Shopify (orders/webhooks)
        │
        ▼
  Order Intake ────► Internal Order Record (idempotent by order id)
        │                        │
        │                        ▼
        │                 Allocation Engine
        │                 (rules + live stock position)
        │                        │
        │        ┌───────────────┼───────────────┐
        │        ▼               ▼               ▼
        │    Location A      Location B      Location C
        │    (3PL / WMS)     (3PL / WMS)     (3PL / WMS)
        │        │               │               │
        │        └───────────────┼───────────────┘
        │                        │
        ▼                        ▼
  Exception Queue ◄──── Allocation result (single / split / none)
  (human review)
        │
        ▼
  Stock Sync ────► Shopify inventory levels
\`\`\`

The important structural properties:

- Order intake is idempotent: a repeated webhook updates the existing record instead of creating a second order.
- Allocation is a decision with a recorded outcome, so it can be audited after the fact.
- The exception queue is a first-class destination, not an error handler bolted on the side.
- Stock sync reads from the same allocation results, so the numbers the storefront shows and the numbers the warehouse works from cannot drift apart without an error surfacing.`,
            metrics: [
                {
                    label: "Manual routing steps",
                    value: "3 portals",
                    note: "Before: one re-typing pass per fulfilment location, every morning.",
                },
                {
                    label: "Allocation outcome",
                    value: "Single / split / none",
                    note: "Every order gets a recorded decision, including the ones that need a person.",
                },
                {
                    label: "Human involvement",
                    value: "Exceptions only",
                    note: "Review replaces re-typing as the daily manual task.",
                },
            ],
            seo: {
                title: "Multi-Warehouse Order Routing Automation Example",
                description:
                    "A representative scenario showing rule-based order routing across three fulfilment locations, shared stock visibility, and an exception queue for orders that do not fit a rule.",
                keywords: [
                    "multi-warehouse order routing",
                    "3PL order routing automation",
                    "warehouse allocation rules",
                    "split shipment handling",
                ],
            },
        },
        {
            slug: "inventory-sync-failure-modes",
            title: "Inventory Sync and the Failure Modes That Cause Drift",
            client: "Multi-channel seller (representative scenario)",
            industry: "E-commerce with wholesale and marketplace channels",
            services: [
                "Inventory synchronisation",
                "Data validation",
                "Sync monitoring",
            ],
            summary:
                "Selling across a storefront, a warehouse, and two marketplaces, a seller was reconciling stock by hand. The scenario documents how inventory sync actually fails, and the specific safeguards that keep the numbers from drifting apart.",
            challenge: `Stock was held in four systems: the Shopify storefront, the warehouse system, and two marketplace listings. None of them told the others anything. Reconciliation happened on a spreadsheet, weekly, and the result was routinely wrong by the time it was published.

The specific symptom was overselling on the storefront — a SKU would show as available after the warehouse had already sold the last unit, and the storefront had no way to know.`,
            approach: `Inventory synchronisation is a deceptively simple feature that fails in a small number of predictable ways. The design in this scenario addresses each of them explicitly.

**Directional sync, with a defined source of truth.** Each SKU and location has one authoritative source for its available quantity. Other systems are updated from it. Without a declared direction, two systems both writing "available = 4" eventually produce two different answers.

**The decrement is a transaction, not an update.** A sale decrements stock in a transaction that also records why the quantity changed. This makes the movement auditable and makes it possible to reconstruct the current position from the log of movements.

**Safety stock sits on top of the raw count.** A buffer is applied at read time rather than being written into the source, so re-syncing cannot erode the buffer over time.

**Every sync is logged with a reason.** A quantity change that cannot be traced to a known event is treated as a conflict and surfaced, not written.

**Reconciliation runs on a schedule as a check, not a fix.** A periodic reconciliation compares the sources and reports differences. Because the cause of every legitimate change is logged, a discrepancy means something is wrong — so it is investigated rather than papered over by writing the "expected" number back.`,
            outcome: `The structural change is that stock accuracy stops depending on anyone remembering to reconcile. The storefront reflects what the warehouse believes, within the bounds of the sync lag, and a discrepancy produces a signal instead of a silent overwrite.

The scenario also changes what happens when a sync fails. A failed sync is a queued, visible, retried operation — not a gap in a number that nobody notices until an order cannot be fulfilled.`,
            architecture: `\`\`\`text
            ┌──────────────┐
            │  Shopify     │──┐
            │ (storefront) │  │
            └──────────────┘  │  updates
                            ├──►  Stock Position ──► Marketplace A
            ┌──────────────┐  │  (single source)      Marketplace B
            │  Warehouse   │──┘         │
            │ (authoritative)           │
            └──────────────┘            ▼
                  │            Stock Movement Log
                  │            (every change has a reason)
                  ▼
            Reconciliation ──► Discrepancy Report
                              (investigate, do not overwrite)
\`\`\`

Properties that matter:

- One authoritative source per SKU and location; everything else is derived.
- Movements are transactional and logged, so the current position is reconstructible.
- Safety stock is applied at read time and cannot be eroded by re-syncing.
- A failed sync is a queued, visible, retried operation.`,
            metrics: [
                {
                    label: "Systems reconciled",
                    value: "4 → 1 source",
                    note: "One authoritative position per SKU and location, everything else derived.",
                },
                {
                    label: "Reconciliation cadence",
                    value: "Weekly manual → continuous",
                    note: "Differences are detected automatically and investigated.",
                },
                {
                    label: "Unattributed changes",
                    value: "Surfaced, not written",
                    note: "A change that cannot be traced to a known event is flagged as a conflict.",
                },
            ],
            seo: {
                title: "Inventory Synchronization Failure Modes & Fixes",
                description:
                    "How inventory sync actually fails across storefronts, warehouses, and marketplaces — and the safeguards that stop stock numbers from drifting apart.",
                keywords: [
                    "inventory synchronization",
                    "multi-channel inventory",
                    "oversell prevention",
                    "stock drift",
                    "inventory sync monitoring",
                ],
            },
        },
        {
            slug: "returns-and-restock-workflow",
            title: "Returns, Inspection, and Restocking as One Workflow",
            client: "Apparel and home goods brand (representative scenario)",
            industry: "E-commerce with meaningful return volume",
            services: [
                "Returns workflow",
                "Restock automation",
                "Inventory integration",
            ],
            summary:
                "A brand processing returns over email was refunding without restocking, so returned stock was invisible to the storefront. The scenario treats a return as a workflow with states, not a single refund action.",
            challenge: `Returns arrived as emails. Someone read the email, approved it manually, sent a label, and issued a refund. When the item came back, updating the inventory count was a separate manual task that frequently did not happen, or happened days later.

The consequence was that physically returned, resellable stock was not counted as available. The storefront showed lower stock than existed, and a product that should have been selling was effectively delisted.`,
            approach: `The design treats a return as a state machine rather than a single action, because the refund and the restock are different events that happen at different times, and only one of them means the item is sellable again.

**States, not flags.** A return moves through defined states — requested, approved, in transit, received, inspected, refunded, restocked. Each state change is an event with a timestamp. At any point the system can answer "where is this return" without reconstructing it from email threads.

**Inspection decides restock.** An item that is received is not automatically sellable. Inspection — condition, packaging, tags — determines whether it returns to available stock, goes to a discount channel, or is written off. This is the step the original manual process skipped, and skipping it is how returned-but-damaged stock ends up being sold as new.

**Restock is a movement, not an edit.** A restocked item returns to available quantity as a logged movement, so the inventory position and the returns data stay consistent. The same movement that returns stock to available also records that it came back through a return, which is what makes return-reason reporting possible.

**Refunds follow the restock decision, with thresholds.** Below an agreed value, the refund can follow the inspection result automatically. Above it, it goes to a person. A refund is never issued before the return state is known, so a refund cannot be issued against an item that was never received.`,
            outcome: `The visible change is that returned stock returns to sale, and that the decision about whether it should is made explicitly rather than by default. A return that cannot be restocked no longer disappears silently from the inventory picture, because the write-off is a recorded outcome too.

The second change is that the return workflow stops being a support inbox problem. It becomes a process with states, and the exceptions are visible as exceptions.`,
            architecture: `\`\`\`text
Customer request
      │
      ▼
  Return Request ──► Policy check ──► Return label issued
      │                                     │
      │                                     ▼
      │                            Item received (warehouse)
      │                                     │
      │                                     ▼
      │                               Inspection
      │                     ┌───────────────┼───────────────┐
      │                     ▼               ▼               ▼
      │              Resellable        Discount channel   Write-off
      │                     │               │               │
      │                     ▼               ▼               ▼
      │              Stock movement   Stock movement   Stock movement
      │                     │               │               │
      └─────────────────────┴───────────────┴───────────────┘
                            │
                            ▼
                    Refund (auto below threshold,
                    human review above)
\`\`\`

Properties that matter:

- The return is a state machine, so its position is always known.
- Inspection is a mandatory step between receipt and restock.
- Restock and write-off are both logged movements, so inventory stays consistent with returns data.
- Refunds above an agreed threshold require a person, and never precede a known return state.`,
            metrics: [
                {
                    label: "Return states",
                    value: "Requested → restocked",
                    note: "Every transition is a timestamped event rather than an email thread.",
                },
                {
                    label: "Restock timing",
                    value: "On inspection, not manual",
                    note: "A logged movement returns the item to available stock.",
                },
                {
                    label: "Refund threshold",
                    value: "Configurable",
                    note: "Above the threshold, a person approves the refund.",
                },
            ],
            seo: {
                title: "E-Commerce Returns Workflow Automation Example",
                description:
                    "A representative scenario for automating returns, inspection, restocking, and refunds as one connected workflow instead of an email process.",
                keywords: [
                    "e-commerce returns workflow automation",
                    "returns and refund process integration",
                    "restocking workflow automation",
                    "reverse logistics automation",
                ],
            },
        },
    ],
});
