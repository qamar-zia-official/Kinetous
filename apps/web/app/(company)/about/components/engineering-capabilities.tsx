import { aboutContent } from "@/content/about";
import { getAboutIcon } from "./icon-map";

export default function EngineeringCapabilities() {
    const { capabilities } = aboutContent;

    const items = capabilities.items.map((capability) => ({
        ...capability,
        Icon: getAboutIcon(capability.icon),
    }));

    return (
        <section
            className="scroll-mt-32 border-t border-border/60"
        >
            <div className="mx-auto max-w-7xl px-6 py-24">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                        {capabilities.eyebrow}
                    </p>

                    <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                        {capabilities.title}
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        {capabilities.description}
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((capability) => (
                        <div
                            key={capability.title}
                            className="group rounded-3xl   bg-zinc-800/50 p-8 transition-all hover:border-primary/25 hover:bg-zinc-800/50/80"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl   bg-background">
                                <capability.Icon className="h-6 w-6 text-primary" />
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                {capability.title}
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                {capability.description}
                            </p>

                            <ul className="mt-8 space-y-3">
                                {capability.items.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-muted-foreground"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
