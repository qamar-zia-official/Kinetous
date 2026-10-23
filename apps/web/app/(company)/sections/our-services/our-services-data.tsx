import { IconType } from "react-icons/lib";
import { StaticImageData } from "next/image";

import srvc1 from "@/public/srvc.1.png";
import srvc11 from "@/public/srvc.1.2.png";
import srvc12 from "@/public/srvc.1.3.png";
import srvc13 from "@/public/srvc.1.4.png";
import srvc14 from "@/public/srvc.1.5.png";
import srvc15 from "@/public/srvc.1.6.png";
import srvc2 from "@/public/srvc.2.png";
import srvc21 from "@/public/srvc.2.1.png";
import srvc22 from "@/public/srvc.2.2.png";
import srvc23 from "@/public/srvc.2.3.png";
import srvc24 from "@/public/srvc.2.4.png";
import srvc25 from "@/public/srvc.2.5.png";
import srvc3 from "@/public/srvc.3.png";
import srvc31 from "@/public/srvc.3.1.png";
import srvc32 from "@/public/srvc.3.2.png";
import srvc33 from "@/public/srvc.3.3.png";
import srvc34 from "@/public/srvc.3.4.png";
import srvc35 from "@/public/srvc.3.5.png";

import {
    MdShoppingCart,
    MdDashboard,
    MdIntegrationInstructions,
    MdSupportAgent,
    MdAutoGraph,
    MdStorefront,
    MdCloudQueue,
} from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { FiCheckCircle, FiDatabase, FiCpu, FiZap } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import {
    TbFileInvoice,
    TbTruckDelivery,
    TbArrowsExchange,
    TbRotate2,
} from "react-icons/tb";

import { servicesContent } from "@/content/services";
import type { ServiceContent } from "@/content/schemas";

/**
 * Visual layer for the service catalogue.
 *
 * All copy — titles, summaries, long-form Markdown, deliverables, and SEO —
 * lives in `content/services.ts`. This file only holds the things that
 * cannot live in a data file: icons and images, keyed by slug.
 */

export type ServiceTier = ServiceContent["tier"];

export type Feature = {
    icon: IconType;
    image: StaticImageData;
    name: string;
    slug: string;
    /** Short summary for service cards. */
    shortDescription: string;
    /** Full explanation of the capability. Written in Markdown. */
    markdown: string;
    /** What the client actually receives. */
    deliverables: string[];
    /** Who this capability is built for. */
    idealFor: string[];
    /** What changes for the business as a result. */
    outcomes: string[];
    /** Only included when specific tools or platforms are genuinely relevant. */
    technologies?: string[];
};

export type Service = {
    title: string;
    slug: string;
    brandIcon: IconType;
    image: StaticImageData;
    tier: ServiceTier;
    summary: string;
    /** Long-form explanation of the service. Written in Markdown. */
    markdown: string;
    features: Feature[];
};

const serviceIcons: Record<string, IconType> = {
    "ecommerce-fulfillment-3pl-logistics-automation": TbTruckDelivery,
    "internal-operations-and-dashboards": MdDashboard,
    "shopify-store-development": MdShoppingCart,
    "customer-support-automation": BsRobot,
};

const serviceImages: Record<string, StaticImageData> = {
    "ecommerce-fulfillment-3pl-logistics-automation": srvc2,
    "internal-operations-and-dashboards": srvc3,
    "shopify-store-development": srvc1,
    "customer-support-automation": srvc2,
};

const capabilityIcons: Record<string, IconType> = {
    // Fulfillment & logistics
    "shopify-3pl-order-routing": TbArrowsExchange,
    "inventory-multichannel-synchronization": MdCloudQueue,
    "shipping-carrier-automation": MdLocalShipping,
    "returns-reverse-logistics-automation": TbRotate2,
    "fulfillment-logistics-visibility-dashboards": MdDashboard,
    // Internal operations
    "operations-command-centers": MdDashboard,
    "workflow-automation": FiZap,
    "document-processing": TbFileInvoice,
    "cross-system-integrations": MdIntegrationInstructions,
    "custom-internal-tools": FiCpu,
    // Support
    "order-context-support": MdDashboard,
    "request-routing-and-triage": MdSupportAgent,
    "support-knowledge-base": FiDatabase,
    "support-operations-reporting": FiZap,
    // Storefront
    "high-converting-storefronts": MdStorefront,
    "performance-optimisation": MdAutoGraph,
    "customer-journey-optimisation": FiCheckCircle,
    "inventory-fulfilment-sync": MdCloudQueue,
    "business-system-integrations": MdIntegrationInstructions,
};

const capabilityImages: Record<string, StaticImageData> = {
    "shopify-3pl-order-routing": srvc21,
    "inventory-multichannel-synchronization": srvc22,
    "shipping-carrier-automation": srvc23,
    "returns-reverse-logistics-automation": srvc24,
    "fulfillment-logistics-visibility-dashboards": srvc25,
    "operations-command-centers": srvc31,
    "workflow-automation": srvc32,
    "document-processing": srvc33,
    "cross-system-integrations": srvc34,
    "custom-internal-tools": srvc35,
    "order-context-support": srvc21,
    "request-routing-and-triage": srvc22,
    "support-knowledge-base": srvc23,
    "support-operations-reporting": srvc24,
    "high-converting-storefronts": srvc11,
    "performance-optimisation": srvc12,
    "customer-journey-optimisation": srvc13,
    "inventory-fulfilment-sync": srvc14,
    "business-system-integrations": srvc15,
};

export const tierLabels: Record<ServiceTier, string> = {
    flagship: "Primary Specialization",
    adjacent: "Adjacent Service",
    supporting: "Supporting Service",
};

function toService(content: ServiceContent): Service {
    return {
        title: content.title,
        slug: content.slug,
        brandIcon: serviceIcons[content.slug] ?? MdDashboard,
        image: serviceImages[content.slug] ?? srvc1,
        tier: content.tier,
        summary: content.summary,
        markdown: content.body,
        features: content.capabilities.map((capability) => ({
            icon: capabilityIcons[capability.slug] ?? MdDashboard,
            image: capabilityImages[capability.slug] ?? srvc1,
            name: capability.title,
            slug: capability.slug,
            shortDescription: capability.summary,
            markdown: capability.body,
            deliverables: capability.deliverables,
            idealFor: capability.idealFor,
            outcomes: capability.outcomes,
            technologies: capability.technologies,
        })),
    };
}

export const ourServicesData: Service[] = servicesContent.items.map(toService);

export function getService(slug: string): Service | undefined {
    return ourServicesData.find((service) => service.slug === slug);
}
