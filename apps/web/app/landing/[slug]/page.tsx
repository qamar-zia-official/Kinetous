import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Landing page not found",
    robots: { index: false, follow: false },
};

export default function LandingPage() {
    // This dynamic segment is a placeholder for campaign landing pages. Until
    // one is published, an unknown slug must return a real 404 rather than a
    // 200 with an empty body (a soft 404).
    notFound();
}
