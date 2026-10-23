import { z } from "zod";

/**
 * Content for /team and /contact.
 *
 * `team.members` reflects the actual structure of the business — a founder-led
 * studio. Do not add invented employees or job titles.
 */

export const teamContentSchema = z.object({
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
  members: z
    .array(
      z.object({
        name: z.string().min(1),
        role: z.string().min(1),
        bio: z.string().min(1),
        location: z.string().optional(),
        links: z
          .array(
            z.object({
              label: z.string().min(1),
              href: z.string().min(1),
              external: z.boolean().default(true),
            }),
          )
          .default([]),
      }),
    )
    .default([]),
  note: z.string().min(1),
});

export type TeamContent = z.infer<typeof teamContentSchema>;

export const teamContent = teamContentSchema.parse({
  seo: {
    title: "The Team — Founder-Led Fulfillment Engineering",
    description:
      "Kinetous is a founder-led engineering studio. You work directly with the engineer who designs and builds your fulfillment and operations systems.",
    keywords: [
      "Kinetous team",
      "e-commerce automation engineer",
      "founder-led studio",
    ],
  },
  hero: {
    eyebrow: "Team",
    title: "The people who build your system",
    description:
      "Kinetous is deliberately small. The person who designs the architecture is the person who writes the code and the person you talk to.",
  },
  members: [
    {
      name: "Qamar Zia ( Myself )",
      role: "Founder · E-Commerce Automation Engineer",
      bio: "I handle system design, API architecture, database engineering, and UI development personally. Based in Lahore, Pakistan, I coordinates on all project pipelines from early conceptual layouts through to deployment and handover.",
      location: "Lahore, Pakistan",
      links: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/qamar-zia-32389537b/",
        },
        { label: "WhatsApp", href: "https://wa.me/923058771054" },
      ],
    },
  ],
  note: "When a project needs specialised design, illustration, or additional engineering capacity, Kinetous brings in trusted specialists from a known network and remains the technical lead and single point of contact throughout.",
});

export const contactContentSchema = z.object({
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
  channels: z
    .array(
      z.object({
        id: z.string().min(1),
        label: z.string().min(1),
        value: z.string().min(1),
        description: z.string().min(1),
        href: z.string().min(1),
        external: z.boolean().default(true),
      }),
    )
    .default([]),
  expectations: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(z.string().min(1)).default([]),
  }),
});

export type ContactContent = z.infer<typeof contactContentSchema>;

export const contactContent = contactContentSchema.parse({
  seo: {
    title: "Contact — Discuss Your E-Commerce Fulfillment Workflow",
    description:
      "Talk through your order routing, inventory, shipping, tracking, or returns workflow with the engineer who would build it.",
    keywords: [
      "contact fulfillment automation",
      "3PL integration consultation",
      "Shopify automation quote",
    ],
  },
  hero: {
    eyebrow: "Contact",
    title: "Start with the workflow",
    description:
      "The most useful first conversation is about how orders move through your business today — which systems are involved, where the manual steps are, and what breaks when volume goes up. Send the details and the scope can be worked out from there.",
  },
  channels: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      value: "+92 305 8771054",
      description:
        "The fastest route. Useful for a quick description of the workflow, or to share screenshots of the portals and spreadsheets involved.",
      href: "https://wa.me/923058771054",
    },
    {
      id: "whatsapp-alt",
      label: "WhatsApp (alternate)",
      value: "+370 747 5981",
      description:
        "A second number on a different network, for reachability when the primary one does not connect.",
      href: "https://wa.me/3707475981",
    },
    {
      id: "email",
      label: "Email",
      value: "hello@kinetous.com",
      description:
        "Better for a written brief: the systems involved, the order volume, and the timeline you are working towards.",
      href: "mailto:hello@kinetous.com",
    },
    {
      id: "call",
      label: "Book a 30-minute call",
      value: "Open a scheduling slot",
      description:
        "A scheduled call for scoping conversations, booked directly against a live calendar so the time is confirmed immediately.",
      href: "https://cal.com/qamar-zia-w3kbwp/quick-meeting",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "Qamar Zia",
      description:
        "For context on the engineering side, or to reach out about work that is not yet a defined scope.",
      href: "https://www.linkedin.com/in/qamar-zia-32389537b/",
    },
  ],
  expectations: {
    eyebrow: "What happens next",
    title: "How the first conversation goes",
    description:
      "There is no sales process here. The first exchange is a scoping conversation about the operation, and it is worth having whether or not the work ends up being a fit.",
    items: [
      "You describe the workflow as it runs today, including the parts that are painful.",
      "We identify which steps are repetitive, which are judgement calls, and where the data currently disagrees.",
      "You get a straight read on whether the work is a fit, what it would take, and roughly what it would cost.",
      "If it is a fit, a written scope and architecture follow. If it is not, that is said plainly.",
    ],
  },
});
