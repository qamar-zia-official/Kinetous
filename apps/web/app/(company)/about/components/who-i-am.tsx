import Image from "next/image";

import profileImage from "@/public/image.png";
import { aboutContent } from "@/content/about";

export default function WhoIAm() {
    const { founder } = aboutContent;

    return (
        <section className="scroll-mt-32 border-t border-border/60">
            <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[380px_1fr]">
                {/* Left */}

                <div className="space-y-6">
                    <div className="overflow-hidden bg-transparent">
                        <Image
                            src={profileImage}
                            alt={founder.altText}
                            className=" rounded-3xl m-auto"
                        />
                    </div>

                    <div className="rounded-3xl bg-zinc-800/50 p-6">
                        <p className="text-xs uppercase tracking-[0.25em] text-primary">
                            Founder
                        </p>

                        <h3 className="mt-2 text-2xl font-bold">{founder.name}</h3>

                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                            {founder.shortBio}
                        </p>
                    </div>
                </div>

                {/* Right */}

                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                        {founder.eyebrow}
                    </p>

                    <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
                        {founder.title}
                    </h2>

                    <div className="prose prose-lg prose-invert mt-10 max-w-none text-muted-foreground">
                        <p>
                            <strong className="font-bold text-white text-2xl">
                                {founder.lead}
                            </strong>
                        </p>

                        {founder.body.map((paragraph) => (
                            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
