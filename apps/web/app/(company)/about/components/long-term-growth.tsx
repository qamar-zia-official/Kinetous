import { aboutContent } from "@/content/about";



export default function LongTermGrowth() {
  const { longTerm } = aboutContent;

  return (
    <section
      className="border-t border-border scroll-mt-32 flex justify-center items-center"
    >
      <div className="container py-28 max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            {longTerm.eyebrow}
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl text-balance">
            {longTerm.title}
          </h2>

          <p className="mt-8 text-lg leading-8 text-muted-foreground">
            {longTerm.description}
          </p>
        </div>

        <div className="mt-24 space-y-20">
          {longTerm.sections.map((section) => (
            <article
              key={section.title}
              className="border-t border-border pt-10"
            >
              <h3 className="max-w-3xl text-3xl font-bold tracking-tight text-balance">
                {section.title}
              </h3>

              <div className="mt-8 grid gap-10 lg:grid-cols-2">
                <p className="leading-8 text-muted-foreground">
                  {section.left}
                </p>

                <p className="leading-8 text-muted-foreground">
                  {section.right}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
