import {
    ArrowRightLeft,
    Blocks,
    Bot,
    BrainCircuit,
    Code2,
    Database,
    FlaskConical,
    Handshake,
    Layers3,
    LayoutDashboard,
    PackageCheck,
    Rocket,
    Search,
    ShieldCheck,
    ShoppingBag,
    Truck,
    Users,
    Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Icon lookup for the about page.
 *
 * `content/about.ts` stores an icon *key* rather than a component so the
 * content file stays plain data. The key must exist in this map.
 */
export const aboutIcons: Record<string, LucideIcon> = {
    // Capabilities
    truck: Truck,
    bot: Bot,
    dashboard: LayoutDashboard,
    integrations: ArrowRightLeft,
    workflow: Workflow,
    shoppingBag: ShoppingBag,
    database: Database,
    // Principles
    brain: BrainCircuit,
    users: Users,
    layers: Layers3,
    rocket: Rocket,
    shield: ShieldCheck,
    handshake: Handshake,
    // Process
    search: Search,
    blueprint: Blocks,
    code: Code2,
    flask: FlaskConical,
    handover: PackageCheck,
};

export function getAboutIcon(key: string): LucideIcon {
    return aboutIcons[key] ?? Blocks;
}
