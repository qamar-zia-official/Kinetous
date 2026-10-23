import { z } from "zod";

/**
 * Zod schemas for every editable content file in this directory.
 *
 * Every content file is parsed through one of these schemas at import time,
 * so a malformed edit (missing title, wrong tier value, empty markdown
 * body) fails loudly during `next build` instead of silently rendering a
 * broken page in production.
 */

export const ctaSchema = z.object({
    label: z.string().min(1),
    href: z.string().min(1),
    variant: z.enum(["primary", "secondary"]).default("primary"),
    external: z.boolean().default(false),
});

export type Cta = z.infer<typeof ctaSchema>;

export const seoSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    keywords: z.array(z.string()).default([]),
});

export type Seo = z.infer<typeof seoSchema>;

export const faqSchema = z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
});

export type Faq = z.infer<typeof faqSchema>;

export const listItemSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    href: z.string().optional(),
});

export type ListItem = z.infer<typeof listItemSchema>;

export const markdownSectionSchema = z.object({
    id: z.string().min(1),
    eyebrow: z.string().optional(),
    title: z.string().min(1),
    description: z.string().optional(),
    body: z.string().default(""),
    items: z.array(listItemSchema).default([]),
    bullets: z.array(z.string()).default([]),
});

export type MarkdownSection = z.infer<typeof markdownSectionSchema>;

export const capabilitySchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    body: z.string().default(""),
    deliverables: z.array(z.string()).default([]),
    idealFor: z.array(z.string()).default([]),
    outcomes: z.array(z.string()).default([]),
    technologies: z.array(z.string()).optional(),
});

export type Capability = z.infer<typeof capabilitySchema>;

export const serviceSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    tier: z.enum(["flagship", "adjacent", "supporting"]),
    summary: z.string().min(1),
    body: z.string().default(""),
    capabilities: z.array(capabilitySchema).default([]),
    seo: seoSchema,
});

export type ServiceContent = z.infer<typeof serviceSchema>;

export const caseStudySchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    client: z.string().min(1),
    industry: z.string().min(1),
    services: z.array(z.string()).default([]),
    summary: z.string().min(1),
    challenge: z.string().default(""),
    approach: z.string().default(""),
    outcome: z.string().default(""),
    architecture: z.string().default(""),
    metrics: z
        .array(
            z.object({
                label: z.string().min(1),
                value: z.string().min(1),
                note: z.string().optional(),
            }),
        )
        .default([]),
    seo: seoSchema,
});

export type CaseStudy = z.infer<typeof caseStudySchema>;

export const legalSectionSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    body: z.string().default(""),
});

export type LegalSection = z.infer<typeof legalSectionSchema>;

export const legalDocumentSchema = z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    lastUpdated: z.string().min(1),
    intro: z.string().default(""),
    sections: z.array(legalSectionSchema).default([]),
    seo: seoSchema,
});

export type LegalDocument = z.infer<typeof legalDocumentSchema>;
