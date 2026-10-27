import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experiments",
    description:
        "Internal prototypes and tooling experiments from the Kinetous workshop.",
    // Internal working page — not part of the public site, so it should not
    // be indexed.
    robots: { index: false, follow: true },
};

export default function ExperimentsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-8 max-w-3xl mx-auto space-y-12">
            <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Internal Experiments
                </h1>
                <p className="text-muted-foreground max-w-xl">
                    We prototype tools and test modern APIs internally before
                    integrating them into production environments for clients.
                </p>
            </div>
        </div>
    );
}
