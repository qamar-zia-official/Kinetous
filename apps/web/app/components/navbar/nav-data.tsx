import { Card, CardContent } from "@repo/ui/card";
import { Contact, HomeIcon, Briefcase, Layers } from "lucide-react";
import { FaBlog } from "react-icons/fa";
import { FiZap, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import { linkType } from "./nav.types";
import { ourServicesData } from "@/app/(company)/sections/our-services/our-services-data";
import BorderGlow from "@repo/ui/glowing-border";

// Derived directly from the service data (single source of truth) so nav
// links can never drift out of sync with the actual /services/[slug] routes.
export const services = ourServicesData.map((service) => ({
  label: service.title,
  link: `/services/${service.slug}`,
  icon: service.brandIcon,
}));

// Short blurbs for the mega-menu cards. Sourced from the service content so
// the menu can never drift out of sync with the service pages.
const serviceBlurbs: Record<string, string> = Object.fromEntries(
  ourServicesData.map((service) => [service.slug, service.summary]),
);

export const links: linkType[] = [
  {
    label: "Home",
    link: "/",
    icon: HomeIcon,
    drop: false,
  },
  {
    label: "Case Studies",
    link: "/case-studies",
    icon: Briefcase,
    drop: false,
  },
  {
    label: "Pricing",
    link: "/pricing",
    icon: Layers,
    drop: false,
  },
  {
    label: "Blog",
    link: "/blog",
    icon: FaBlog,
    drop: false,
  },
  {
    label: "Services",
    link: "/services",
    icon: Contact,
    drop: true,
    children: (
      <Card>
        <CardContent className="col-span-8 grid grid-cols-2 gap-6 border-r border-zinc-100 dark:border-zinc-900 pr-6 max-w-5xl">
          <div className="grid grid-cols-2 gap-2">
            {ourServicesData.map((service) => (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col gap-1.5 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <div className="flex items-center gap-2 font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <service.brandIcon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{service.title}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {serviceBlurbs[service.slug] ?? ""}
                </p>
              </a>
            ))}
          </div>

          <BorderGlow
            backgroundColor="var(--color-zinc-800)"
            className="flex flex-col justify-between p-4 rounded-xl from-blue-50 to-indigo-50 dark:from-zinc-900/60 dark:to-zinc-900/20 border border-blue-100/50 dark:border-zinc-800"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 mb-3">
                <FiZap className="w-3 h-3 animate-pulse text-blue-500" />
                <span>Instant Value Loop</span>
              </div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Free Website Audit
              </h4>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Analyze your current architecture, performance, and business
                messaging metrics using our AI scanner.
              </p>
            </div>
            <Link
              href="https://audit.kinetous.com"
              className="mt-4 group h-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow transition-colors w-full text-center font-semibold"
            >
              <span className="group-hover:scale-150 ease-in-out duration-400 flex gap-2">
                Run Free Audit
                <FiCheckCircle className="w-3.5 h-3.5" />
              </span>
            </Link>
          </BorderGlow>
        </CardContent>
      </Card>
    ),
  },
];
