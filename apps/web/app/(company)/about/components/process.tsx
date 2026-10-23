import { aboutContent } from "@/content/about";
import { getAboutIcon } from "./icon-map";



export default function Process() {
  const { process } = aboutContent;

  const steps = process.steps.map((step, index) => ({
    ...step,
    Icon: getAboutIcon(step.icon),
    number: (index + 1).toString().padStart(2, "0"),
  }));

  return (
    <section className="scroll-mt-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            {process.eyebrow}
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            {process.title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {process.description}
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-border lg:block" />

          <div className="space-y-10">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-3xl   bg-zinc-800/50 p-8 lg:ml-12"
              >
                <div className="absolute -left-12.5 top-16 hidden h-12 w-12 items-center justify-center rounded-full   bg-background lg:flex">
                  <step.Icon className="h-5 w-5 text-primary" />
                </div>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl   bg-background lg:hidden">
                    <step.Icon className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-4 leading-8 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className="text-5xl font-black text-muted/15">
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
