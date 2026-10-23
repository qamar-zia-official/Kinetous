import { aboutContent } from "@/content/about";
import { getAboutIcon } from "./icon-map";

export default function WhyDifferent() {
    const { principles } = aboutContent;

    const items = principles.items.map((item) => ({
        ...item,
        Icon: getAboutIcon(item.icon),
    }));

    return (
        <section
            className="border-t border-border/60 scroll-mt-32 bg-zinc-950"
        >
            <div className="mx-auto max-w-7xl px-6 py-24">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                        {principles.eyebrow}
                    </p>

                    <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                        {principles.title}
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        {principles.description}
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl   bg-zinc-800/50 p-8 transition-colors hover:border-primary/20"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl   bg-background">
                                <item.Icon className="h-6 w-6 text-primary" />
                            </div>

                            <h3 className="mt-6 text-xl font-semibold">
                                {item.title}
                            </h3>

                            <p className="mt-3 leading-7 text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
