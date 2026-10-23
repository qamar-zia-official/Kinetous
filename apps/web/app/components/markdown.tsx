import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

import { CodeBlock } from "./code-block";
import { cn } from "@repo/ui/utils";

/**
 * Renders the Markdown bodies stored in `content/*.ts`.
 *
 * `remark-gfm` adds tables, task lists, and strikethrough; `rehype-slug` gives
 * every heading a stable anchor id; `rehype-highlight` colours fenced code
 * blocks (the `atom-one-dark` theme is imported in `globals.css`).
 *
 * `tone` controls the palette: "light" for the default themed pages, "dark"
 * for the sections that use the `bg-zinc-950` treatment.
 */

type HastNode = {
    type: string;
    value?: string;
    children?: HastNode[];
};

function toText(node: HastNode | undefined): string {
    if (!node) return "";

    if (node.type === "text") return node.value ?? "";

    if (node.children) return node.children.map((child) => toText(child)).join("");

    return "";
}

type Tone = "light" | "dark";

const toneClasses: Record<
    Tone,
    {
        heading: string;
        body: string;
        link: string;
        inlineCode: string;
        table: string;
        tableHead: string;
        tableCell: string;
        quote: string;
        rule: string;
    }
> = {
    light: {
        heading: "text-foreground",
        body: "text-muted-foreground",
        link: "text-primary",
        inlineCode: "border-border bg-muted text-foreground",
        table: "border-border",
        tableHead: "border-border bg-muted/40 text-foreground",
        tableCell: "border-border/60 text-muted-foreground",
        quote: "border-primary/60 bg-primary/5 text-muted-foreground",
        rule: "border-border",
    },
    dark: {
        heading: "text-white",
        body: "text-zinc-400",
        link: "text-blue-400",
        inlineCode: "border-white/15 bg-white/10 text-zinc-100",
        table: "border-white/10",
        tableHead: "border-white/10 bg-white/5 text-zinc-100",
        tableCell: "border-white/10 text-zinc-400",
        quote: "border-blue-500/60 bg-blue-500/10 text-zinc-300",
        rule: "border-white/10",
    },
};

function buildComponents(tone: Tone): Components {
    const c = toneClasses[tone];

    return {
        h2: ({ children, id, ...props }) => (
            <h2
                id={id}
                className={cn(
                    "mt-14 scroll-mt-28 text-2xl font-bold tracking-tight md:text-3xl",
                    c.heading,
                )}
                {...props}
            >
                {children}
            </h2>
        ),
        h3: ({ children, id, ...props }) => (
            <h3
                id={id}
                className={cn(
                    "mt-10 scroll-mt-28 text-xl font-semibold tracking-tight md:text-2xl",
                    c.heading,
                )}
                {...props}
            >
                {children}
            </h3>
        ),
        h4: ({ children, id, ...props }) => (
            <h4
                id={id}
                className={cn(
                    "mt-8 scroll-mt-28 text-lg font-semibold tracking-tight",
                    c.heading,
                )}
                {...props}
            >
                {children}
            </h4>
        ),
        p: ({ children, ...props }) => (
            <p className={cn("mt-5 leading-8", c.body)} {...props}>
                {children}
            </p>
        ),
        a: ({ children, href, ...props }) => {
            const external = typeof href === "string" && href.startsWith("http");

            return (
                <a
                    href={href}
                    className={cn(
                        "font-medium underline decoration-current/40 underline-offset-4 transition-colors hover:decoration-current",
                        c.link,
                    )}
                    {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    {...props}
                >
                    {children}
                </a>
            );
        },
        ul: ({ children, ...props }) => (
            <ul
                className={cn("mt-5 list-disc space-y-2 pl-6", c.body)}
                {...props}
            >
                {children}
            </ul>
        ),
        ol: ({ children, ...props }) => (
            <ol
                className={cn("mt-5 list-decimal space-y-2 pl-6", c.body)}
                {...props}
            >
                {children}
            </ol>
        ),
        li: ({ children, ...props }) => (
            <li className="leading-8 marker:opacity-60" {...props}>
                {children}
            </li>
        ),
        blockquote: ({ children, ...props }) => (
            <blockquote
                className={cn(
                    "mt-6 border-l-2 px-5 py-4",
                    c.quote,
                )}
                {...props}
            >
                {children}
            </blockquote>
        ),
        hr: ({ ...props }) => (
            <hr className={cn("my-10 border-t", c.rule)} {...props} />
        ),
        pre: ({ children }) => <>{children}</>,
        table: ({ children, ...props }) => (
            <div
                className={cn(
                    "mt-6 w-full overflow-x-auto rounded-xl border",
                    c.table,
                )}
            >
                <table
                    className="w-full border-collapse text-left text-sm"
                    {...props}
                >
                    {children}
                </table>
            </div>
        ),
        th: ({ children, ...props }) => (
            <th
                className={cn("border-b px-4 py-3 font-semibold", c.tableHead)}
                {...props}
            >
                {children}
            </th>
        ),
        td: ({ children, ...props }) => (
            <td
                className={cn(
                    "border-b px-4 py-3 align-top",
                    c.tableCell,
                )}
                {...props}
            >
                {children}
            </td>
        ),
        code: ({ className, children, node }) => {
            const language = /language-([\w-]+)/.exec(className ?? "")?.[1] ?? "";
            const raw = toText(node as unknown as HastNode);
            const isBlock = Boolean(language) || raw.includes("\n");

            if (!isBlock) {
                return (
                    <code
                        className={cn(
                            "rounded-md border px-1.5 py-0.5 font-mono text-[0.85em]",
                            c.inlineCode,
                        )}
                    >
                        {children}
                    </code>
                );
            }

            return (
                <CodeBlock language={language || "text"} value={raw}>
                    {children}
                </CodeBlock>
            );
        },
    };
}

type MarkdownProps = {
    content: string;
    className?: string;
    tone?: Tone;
};

export function Markdown({ content, className, tone = "light" }: MarkdownProps) {
    if (!content.trim()) return null;

    return (
        <div className={cn("max-w-none", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, rehypeHighlight]}
                components={buildComponents(tone)}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
