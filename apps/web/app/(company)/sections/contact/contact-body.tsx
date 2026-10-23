import { Mail, MessageSquare, Calendar, User } from "lucide-react";

import StructuredData from "@repo/ui/seo/StructuredData";
import { contactContent } from "@/content/team";
import ContactFormElement from "./form";

const siteUrl = "https://kinetous.com";

const channelIcons: Record<string, typeof MessageSquare> = {
    whatsapp: MessageSquare,
    "whatsapp-alt": MessageSquare,
    email: Mail,
    call: Calendar,
    linkedin: User,
};

export function ContactBody({ includeSchema = true }: { includeSchema?: boolean }) {
    const { hero, channels, expectations } = contactContent;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${siteUrl}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Contact",
                item: `${siteUrl}/contact`,
            },
        ],
    };

    return (
        <>
            {includeSchema && <StructuredData data={[breadcrumbSchema]} />}

            <section className="px-5 sm:px-8 pb-16 sm:pb-20">
                <div className="mx-auto max-w-3xl space-y-10">
                    <ContactFormElement />

                    <div className="grid gap-4 sm:grid-cols-2">
                        {channels.map((channel) => {
                            const Icon =
                                channelIcons[channel.id] ?? MessageSquare;

                            return (
                                <a
                                    key={channel.id}
                                    href={channel.href}
                                    target={
                                        channel.external ? "_blank" : undefined
                                    }
                                    rel={
                                        channel.external
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="block space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
                                >
                                    <Icon className="h-5 w-5 text-blue-400" />

                                    <h2 className="font-bold">{channel.label}</h2>

                                    <p className="text-sm font-medium text-white">
                                        {channel.value}
                                    </p>

                                    <p className="text-xs leading-relaxed text-zinc-400">
                                        {channel.description}
                                    </p>
                                </a>
                            );
                        })}
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/60">
                            {expectations.eyebrow}
                        </span>
                        <h2 className="mt-4 text-xl font-bold">
                            {expectations.title}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                            {expectations.description}
                        </p>

                        <ol className="mt-6 space-y-3">
                            {expectations.items.map((item, index) => (
                                <li
                                    key={item}
                                    className="flex gap-4 text-sm leading-relaxed text-zinc-400"
                                >
                                    <span className="mt-0.5 text-xs font-semibold text-blue-400">
                                        {(index + 1).toString().padStart(2, "0")}
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>
        </>
    );
}
