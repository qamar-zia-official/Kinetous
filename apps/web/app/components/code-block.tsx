"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockProps = {
    language: string;
    value: string;
    children?: React.ReactNode;
};

export function CodeBlock({ language, value, children }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    async function copy() {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    }

    return (
        <div className="group relative my-6 overflow-hidden rounded-2xl border border-border/60 bg-zinc-950">
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {language}
                </span>

                <button
                    type="button"
                    onClick={copy}
                    aria-label="Copy code"
                    className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                    {copied ? (
                        <Check className="h-3.5 w-3.5" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" />
                    )}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>

            <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                <code className={`hljs bg-transparent p-0 language-${language}`}>
                    {children}
                </code>
            </pre>
        </div>
    );
}
