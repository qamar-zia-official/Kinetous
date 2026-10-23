import { aboutContent } from "@/content/about";



export default function EngineeringPrinciples() {
  const { engineeringPrinciples } = aboutContent;

  return (
    <section
      className="border-t border-border flex justify-center items-center"
    >
      <div className="container py-28">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            {engineeringPrinciples.eyebrow}
          </p>

          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl text-balance">
            {engineeringPrinciples.title}
          </h2>

          <p className="mt-8 text-lg leading-8 text-muted-foreground">
            {engineeringPrinciples.description}
          </p>
        </div>

        <div className="mt-24 divide-y divide-border max-w-7xl mx-auto">
          {engineeringPrinciples.items.map((principle) => (
            <article
              key={principle.number}
              className="grid gap-8 py-12 md:grid-cols-[100px_1fr]"
            >
              <span className="text-3xl font-black tracking-tight text-primary/35">
                {principle.number}
              </span>

              <div className="max-w-3xl">
                <h3 className="text-2xl font-bold tracking-tight">
                  {principle.title}
                </h3>

                <p className="mt-4 leading-8 text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
