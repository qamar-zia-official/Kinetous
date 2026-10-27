"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button } from "@repo/ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@repo/ui/navigation-menu";
import NavProfile from "./profile";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";

import { cn } from "@repo/ui/utils";
import { useIsMobile } from "@repo/hooks/use-mobile";
import { useScrollPN } from "./use-scroll-pn";
import { useNavigation } from "./use-navigation";
import { links } from "./nav-data";
import { ourServicesData } from "@/app/(company)/sections/our-services/our-services-data";
import logo from "@/public/logo mark white.svg";
import { useLenis } from "lenis/react";

// Retracts the primary row when the secondary (section) nav is hidden.
// These match the row's own vertical padding/line-height, so they only
// need to change if that row's typography or padding changes.
const NAV_RETRACT_OFFSET = { mobile: "-44px", desktop: "-61px" } as const;

// ---------------------------------------------------------------------------
// Breadcrumbs — collapses middle segments into a dropdown past 4 crumbs
// ---------------------------------------------------------------------------

const MAX_VISIBLE_CRUMBS = 4;

type Crumb = { label: string; href: string };

function useBreadcrumbs() {
  const pathname = usePathname();

  return useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const all: Crumb[] = segments.map((label, idx) => ({
      label,
      href: "/" + segments.slice(0, idx + 1).join("/"),
    }));

    if (all.length <= MAX_VISIBLE_CRUMBS) {
      return { visible: all, hidden: [] as Crumb[] };
    }

    // Keep first + last two visible, stash the rest behind a dropdown.
    return {
      visible: [...all.slice(0, 1), ...all.slice(-2)],
      hidden: all.slice(1, -2),
    };
  }, [pathname]);
}

function CrumbLink({ crumb, isLast }: { crumb: Crumb; isLast: boolean }) {
  return (
    <BreadcrumbItem>
      {isLast ? (
        <BreadcrumbPage aria-current="page">{crumb.label}</BreadcrumbPage>
      ) : (
        <BreadcrumbLink
          render={
            <Link
              href={crumb.href}
              className="rounded-sm px-1 text-zinc-400 hover:bg-zinc-700"
            >
              {crumb.label}
            </Link>
          }
        />
      )}
    </BreadcrumbItem>
  );
}

function HiddenCrumbsDropdown({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;

  return (
    <Popover>
      <PopoverTrigger
        className="rounded-sm px-1 text-zinc-400 hover:bg-zinc-700"
        aria-label={`${crumbs.length} more path segments`}
      >
        …
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="z-200 flex w-max min-w-32 flex-col gap-1 p-1"
      >
        {crumbs.map((crumb) => (
          <Link
            key={crumb.href}
            href={crumb.href}
            className="rounded-sm px-2 py-1.5 text-sm text-zinc-400 hover:bg-zinc-700"
          >
            {crumb.label}
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}

function Breadcrumbs() {
  const { visible, hidden } = useBreadcrumbs();
  // visible[0] is the first path segment after home; the dropdown (if any)
  // sits right after it, then the remaining visible crumbs follow.
  const [first, ...rest] = visible;

  return (
    <Breadcrumb className="flex h-full items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={
              <Link
                href="/"
                className="rounded-sm px-1 text-zinc-400 hover:bg-zinc-700"
              >
                home
              </Link>
            }
          />
        </BreadcrumbItem>

        {first && (
          <span className="flex items-center">
            <BreadcrumbSeparator />
            <CrumbLink crumb={first} isLast={visible.length === 1} />
          </span>
        )}

        {hidden.length > 0 && (
          <span className="flex items-center">
            <BreadcrumbSeparator />
            <HiddenCrumbsDropdown crumbs={hidden} />
          </span>
        )}

        {rest.map((crumb, idx) => (
          <span className="flex items-center" key={crumb.href}>
            <BreadcrumbSeparator />
            <CrumbLink crumb={crumb} isLast={idx === rest.length - 1} />
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// ---------------------------------------------------------------------------
// Brand mark — logo swaps to breadcrumb trail on hover
// ---------------------------------------------------------------------------
/**
 * Provides a link to the home page, with a logo and breadcrumb trail.
 **/
function BrandMark() {
  return (
    <div
      className="group flex h-8 items-start gap-1 overflow-hidden"
      aria-label="Kinetous — home"
    >
      <Image src={logo} alt="" width={24} height={24} aria-hidden />
      <div className="relative h-[200%] font-sans font-semibold text-zinc-400 transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="flex h-1/2 items-center text-2xl">inetous</span>
        <span className="flex h-1/2 items-center text-base">
          <Breadcrumbs />
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Desktop link row
// ---------------------------------------------------------------------------

function DesktopLinks() {
  return (
    <NavigationMenuList className="max-w-max">
      {links.map((link) =>
        link.drop ? (
          <NavigationMenuItem key={link.label}>
            <NavigationMenuTrigger className="flex items-center justify-center gap-2">
              {link.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="z-100">
              {link.children}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuLink key={link.label} href={link.link}>
            {link.label}
          </NavigationMenuLink>
        ),
      )}
    </NavigationMenuList>
  );
}

// ---------------------------------------------------------------------------
// Mobile sheet — links close the sheet on tap
// ---------------------------------------------------------------------------

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger aria-label="Open navigation menu">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className="z-200">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-1 px-2">
          {links.map((link) => (
            <SheetClose
              key={link.label}
              render={
                <Link
                  href={link.link}
                  className="flex items-center gap-2 p-4 rounded-full transition-colors bg-zinc-800 hover:bg-zinc-900"
                >
                  {link.label}
                </Link>
              }
            />
          ))}
        </div>

        <div className="px-2">
          <p className="px-4 py-4 text-xl font-bold text-center">Services</p>
          <div className="grid grid-cols-2 gap-1">
            {ourServicesData.map((item) => (
              <SheetClose
                key={item.title}
                render={
                  <Link
                    href={`/services/${item.slug}`}
                    className="flex flex-col items-center justify-center gap-2 p-4 aspect-square text-center bg-zinc-800 rounded-2xl hover:bg-zinc-900"
                  >
                    <item.brandIcon size={48} />
                    {item.title}
                  </Link>
                }
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ---------------------------------------------------------------------------
// Section nav — pure CSS collapse (grid-template-rows trick), no JS animation
// ---------------------------------------------------------------------------

function SectionNav({
  sections,
  visible,
}: {
  sections: { label: string; link: string }[];
  visible: boolean;
}) {
  const lenis = useLenis();
  if (sections.length === 0) return null;

  return (
    <div
      className={cn(
        "grid w-full justify-center overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
        visible ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="mx-auto flex w-full max-w-300 flex-wrap justify-center gap-4 p-2">
          {sections.map((sec) => (
            <Button
              key={sec.link}
              variant="ghost"
              onClick={() => {
                lenis?.scrollTo(sec.link);
              }}
              className="text-blue-600"
            >
              {sec.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export default function Navbar() {
  const { fixed } = useScrollPN();
  const isMobile = useIsMobile();
  const { sections } = useNavigation();
  const hasSections = sections.length > 0;
  const showSections = !fixed && hasSections;

  const retractOffset = isMobile
    ? NAV_RETRACT_OFFSET.mobile
    : NAV_RETRACT_OFFSET.desktop;

  return (
    <NavigationMenu
      style={{ top: fixed || !hasSections ? "0px" : retractOffset }}
      className={cn(
        "sticky z-100 mx-auto flex flex-col justify-between overflow-hidden",
        "border-b border-white/30 bg-zinc-800/50/60 px-4 shadow-2xl",
        "backdrop-blur-xl backdrop-brightness-150 backdrop-saturate-150",
      )}
    >
      <div className="mx-auto flex w-full max-w-300 items-center justify-between py-2">
        <NavigationMenuList className="max-w-max">
          <NavigationMenuItem>
            <BrandMark />
          </NavigationMenuItem>
        </NavigationMenuList>

        {!isMobile && <DesktopLinks />}
        <div className="w-fit ml-auto mr-1 md:mr-0 md:ml-0">
          <NavProfile />
        </div>
        {isMobile && <MobileNav />}
      </div>

      <SectionNav sections={sections} visible={showSections} />
    </NavigationMenu>
  );
}
