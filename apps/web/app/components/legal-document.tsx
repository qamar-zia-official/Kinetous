import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Markdown } from "@/app/components/markdown";
import type { LegalDocument } from "@/content/schemas";

type LegalDocumentViewProps = {
    document: LegalDocument;
    backHref: string;
    backLabel: string;
};

/**
 * Shared renderer for the legal documents (`/privacy`, `/terms`). The copy
 * itself lives in `content/legal.ts`.
 */
export function LegalDocumentView({
    document,
    backHref,
    backLabel,
}: LegalDocumentViewProps) {
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <section className="px-5 sm:px-8 pt-28 sm:pt-32 pb-10">
                <div className="mx-auto max-w-3xl">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300"
                    >
                        <ArrowLeft size={12} />
                        {backLabel}
                    </Link>

                    <h1 className="mt-4 text-[clamp(1.9rem,5vw,3rem)] font-bold leading-[1.1]">
                        {document.name}
                    </h1>

                    <p className="mt-3 text-sm text-zinc-500">
                        Last updated {document.lastUpdated}
                    </p>

                    {document.intro && (
                        <p className="mt-6 text-base leading-relaxed text-zinc-400">
                            {document.intro}
                        </p>
                    )}
                </div>
            </section>

            <section className="px-5 sm:px-8 pb-20">
                <div className="mx-auto max-w-3xl">
                    {document.sections.map((section) => (
                        <article
                            key={section.id}
                            id={section.id}
                            className="scroll-mt-28 border-t border-white/5 pt-10 first:border-t-0 first:pt-0 mt-10 first:mt-0"
                        >
                            <h2 className="text-xl font-bold">{section.title}</h2>
                            <Markdown
                                content={section.body}
                                tone="dark"
                                className="mt-3"
                            />
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
