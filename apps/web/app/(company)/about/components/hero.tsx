import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { aboutContent } from "@/content/about";

export default function Hero() {
    const { hero } = aboutContent;

    return (
        <section className="relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pt-28 pb-24">
                <div className="max-w-6xl">
                    <Badge
                        variant="outline"
                        className="mb-6 rounded-full px-4 py-1 text-xs tracking-widest uppercase"
                    >
                        {hero.badge}
                    </Badge>

                    <h1 className="max-w-4xl text-4xl font-black tracking-tight leading-[1.05] md:text-7xl">
                        {hero.title}{" "}
                        <span className="text-primary">{hero.titleAccent}</span>
                    </h1>

                    <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                        {hero.description}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <Button size="lg">
                            <Link
                                href={hero.primaryCta.href}
                                className="text-white flex gap-2 items-center justify-center"
                            >
                                {hero.primaryCta.label}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        <Button variant="secondary" size="lg">
                            <Link href={hero.secondaryCta.href}>
                                {hero.secondaryCta.label}
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-16 grid gap-6 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4">
                        {hero.stats.map((stat) => (
                            <div key={stat.label}>
                                <p className="text-3xl font-bold">{stat.value}</p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
