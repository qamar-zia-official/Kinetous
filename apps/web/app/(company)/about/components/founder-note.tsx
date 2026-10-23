import img from "@/public/image.png";
import Image from "next/image";

import { aboutContent } from "@/content/about";

export default function FounderNote() {
    const { founderNote } = aboutContent;

    return (
        <section
            className="border-t border-border scroll-mt-32 flex justify-center items-center"
        >
            <div className="container py-28 max-w-7xl">
                <div className="grid gap-20 lg:grid-cols-[280px_1fr]">
                    <aside>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                            {founderNote.eyebrow}
                        </p>

                        <div className="mt-10 space-y-3">
                            <div className="h-48 w-48 rounded-full   bg-muted overflow-hidden">
                                <Image
                                    src={img}
                                    alt={founderNote.name}
                                    width={400}
                                    height={400}
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {founderNote.name}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    {founderNote.role}
                                </p>
                            </div>
                        </div>
                    </aside>

                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-black tracking-tight text-balance md:text-5xl">
                            {founderNote.title}
                        </h2>

                        <div className="prose prose-zinc dark:prose-invert prose-lg mt-10 max-w-none">
                            {founderNote.paragraphs.map((paragraph) => (
                                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-10 flex items-center gap-4">
                            <div className="h-px flex-1 bg-border" />

                            <span className="font-medium">
                                {founderNote.signature}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
