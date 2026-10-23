import Image from "next/image";
import me from "@/public/image.png";

import SectionHeading2 from "../section-heading";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { homeContent } from "@/content/home";

export default function About() {
    const { why } = homeContent;

    return (
        <section className="max-w-7xl mx-auto py-32 px-4" id="why">
            <SectionHeading2>{why.title}</SectionHeading2>

            {/* Hero Row */}
            <div className="grid lg:grid-cols-[320px_1fr] gap-12 items-center mb-20">
                {/* Photo */}
                <div className="flex justify-center lg:justify-start">
                    <div className="relative w-64 h-64 overflow-hidden rounded-3xl border border-white/10">
                        <Image src={me} alt="Qamar Zia" fill className="object-cover" />
                    </div>
                </div>

                {/* Positioning */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-4xl md:text-5xl font-bold text-zinc-50 leading-tight">
                        {why.heading}
                        <br />
                        {why.headingAccent}
                    </h3>

                    <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
                        {why.greeting}
                    </p>

                    {why.body.map((paragraph) => (
                        <p
                            key={paragraph.slice(0, 40)}
                            className="text-zinc-400 text-lg leading-relaxed max-w-3xl"
                        >
                            {paragraph}
                        </p>
                    ))}

                    <p className="text-zinc-100 text-xl font-medium max-w-3xl leading-relaxed">
                        {why.closing}
                    </p>
                </div>
            </div>

            {/* Trust Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 border-t border-t-zinc-700 pt-4">
                {why.points.map((item) => (
                    <Card
                        key={item.title}
                        className="bg-zinc-800/50 backdrop-blur-xl border-none"
                    >
                        <CardHeader>
                            <CardTitle className="text-zinc-50">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-zinc-400 leading-relaxed">
                                {item.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
