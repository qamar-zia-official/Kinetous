import { Button } from "@repo/ui/button";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SectionHeading2 from "../section-heading";
import Strip from "./strip";
import ContactFormElement from "../contact/form";
import { homeContent } from "@/content/home";

// Server component — no client JS needed for the hero. Entrance motion is
// handled with CSS-only `animate-in` utilities (tw-animate-css) instead of
// Framer Motion, so this section ships zero extra client bundle and paints
// immediately on first render.

export default function Header() {
    const { hero } = homeContent;

    return (
        <header className="min-h-screen flex flex-col items-center relative overflow-hidden bg-zinc-950">
            {/* Blueprint grid — signature texture that reads as "systems", not decoration */}
            <div
                aria-hidden
                className="absolute inset-0 -z-20 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                }}
            />
            {/* Soft glow anchoring the headline */}
            <div
                aria-hidden
                className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[420px] w-[420px] sm:h-[600px] sm:w-[600px] lg:h-[720px] lg:w-[720px] rounded-full bg-blue-600/20 blur-[100px] sm:blur-[120px]"
            />

            <div className="max-w-375 px-5 sm:px-8 pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 w-full gap-12 mx-auto relative">
                <div className="flex flex-col justify-center gap-5 sm:gap-6">
                    <span className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-400/60 text-center">
                        {hero.eyebrow}
                    </span>

                    <div className="flex flex-col gap-1 sm:gap-2 leading-[1.05] font-sans font-[100] text-center">
                        {hero.headline.map((line, i) => (
                            <h1
                                key={line}
                                className="overflow-hidden text-[clamp(1.75rem,6vw,3.75rem)]"
                            >
                                <SectionHeading2>{line}</SectionHeading2>
                            </h1>
                        ))}
                    </div>

                    <p className="animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200 fill-mode-both text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed text-center max-w-md sm:max-w-2xl md:max-w-4xl mx-auto">
                        {hero.description}
                    </p>

                    <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300 fill-mode-both flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-stretch sm:items-center mt-8 sm:mt-12 lg:mt-16 px-4 sm:px-0">
                        <ContactFormElement />
                        <a
                            href={hero.secondaryCta.href}
                            className="w-full sm:w-auto transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
                        >
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto border-white/10 text-zinc-300 font-bold px-6 py-3 rounded-2xl text-base flex items-center justify-center gap-2 hover:bg-white/5"
                            >
                                {hero.secondaryCta.label}
                                <ArrowRight size={16} />
                            </Button>
                        </a>
                    </div>
                </div>

                <Strip />
            </div>
        </header>
    );
}
