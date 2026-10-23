import type { Metadata } from "next";

import Header from "./sections/header/header";
import Port1 from "./sections/porfolio/port1";
import OurServices from "./sections/our-services/our-services";
import About from "./sections/about/about";
import OurProcess from "./sections/our-process/our-process";
import ContactForm from "./sections/contact/contact";
import StructuredData from "@repo/ui/seo/StructuredData";
import SetSections from "../components/navbar/set-sections";
import { homeContent } from "@/content/home";

export const metadata: Metadata = {
  title: homeContent.seo.title,
  description: homeContent.seo.description,
  keywords: homeContent.seo.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${homeContent.seo.title} | Kinetous`,
    description: homeContent.seo.description,
    url: "https://kinetous.com/",
    type: "website",
  },
};

export default function LandingPage() {
  // Service schema focused on fulfillment & logistics automation
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://kinetous.com/#fulfillment-logistics-services",
    name: "E-Commerce Fulfillment, 3PL & Logistics Automation",
    provider: {
      "@type": "Organization",
      "@id": "https://kinetous.com/#organization",
    },
    description:
      "Custom fulfillment and logistics automation for Shopify businesses and 3PLs—connecting order processing, inventory, shipping, tracking, returns, and internal workflows.",
    areaServed: [{ "@type": "Country", name: "United States" }],
    serviceType: "E-commerce fulfillment and logistics automation",
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#070A12] text-white antialiased flex flex-col gap-4">
      <SetSections sections={homeContent.anchors} />
      <StructuredData data={servicesSchema} />
      <Header />
      <Port1 />
      <OurServices />
      <About />
      <OurProcess />
      <ContactForm />
    </main>
  );
}
