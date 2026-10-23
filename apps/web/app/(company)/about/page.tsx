import type { Metadata } from "next";

import Hero from "./components/hero";
import WhoIAm from "./components/who-i-am";
import EngineeringCapabilities from "./components/engineering-capabilities";
import WhyDifferent from "./components/why-different";
import Process from "./components/process";
import SetSections from "@/app/components/navbar/set-sections";
import EngineeringPrinciples from "./components/engineering-principles";
import LongTermGrowth from "./components/long-term-growth";
import FounderNote from "./components/founder-note";
import { ContactBody } from "../sections/contact/contact-body";
import { aboutContent } from "@/content/about";

const siteUrl = "https://kinetous.com";

export const metadata: Metadata = {
    title: aboutContent.seo.title,
    description: aboutContent.seo.description,
    keywords: aboutContent.seo.keywords,
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: `${aboutContent.seo.title} | Kinetous`,
        description: aboutContent.seo.description,
        url: `${siteUrl}/about`,
        type: "profile",
    },
};

export default function AboutPage() {
    const { anchors } = aboutContent;

    return (
        <main className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 mx-auto space-y-10">
            <SetSections sections={anchors} />
            <Hero />
            <div id="wia">
                <WhoIAm />
            </div>
            <div id="engc">
                <EngineeringCapabilities />
            </div>
            <div id="wm">
                <WhyDifferent />
            </div>
            <div id="pr">
                <Process />
            </div>
            <div id="bopt">
                <EngineeringPrinciples />
            </div>
            <div id="ltg">
                <LongTermGrowth />
            </div>
            <div id="fn">
                <FounderNote />
            </div>
            <div id="cta">
                <ContactBody includeSchema={false} />
            </div>
        </main>
    );
}
