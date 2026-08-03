import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function HomePage() {
  return (
    <>
      <div className="relative min-h-[100svh] text-[var(--fog)]">
        <div className="hero-atmosphere" aria-hidden />
        <SiteHeader />

        <main className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-6xl flex-col justify-center px-6 pb-20 pt-10 md:px-8 md:pb-28">
          <p className="animate-rise font-[family-name:var(--font-display)] text-5xl leading-none tracking-tight text-white sm:text-7xl md:text-8xl">
            MemoryOS
          </p>
          <h1 className="animate-rise-delay mt-6 max-w-2xl font-[family-name:var(--font-display)] text-2xl leading-snug text-white/95 sm:text-3xl md:text-4xl">
            Tell any AI once. It remembers everywhere.
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Persistent semantic memory for Claude, ChatGPT, agents, and your
            own apps — so context follows you, not the other way around.
          </p>
          <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center bg-[var(--signal)] px-6 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--signal-soft)]"
            >
              Start free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center border border-white/25 px-6 text-sm font-semibold text-white transition hover:border-white/60"
            >
              See pricing
            </Link>
          </div>
        </main>
      </div>

      <section
        id="how"
        className="border-t border-[var(--line)] bg-[var(--fog)] px-6 py-20 md:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)] md:text-4xl">
            One memory. Every AI.
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            MemoryOS stores what matters, scores relevance, and injects the
            right context into whatever tool you are using.
          </p>

          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {[
              {
                title: "Capture",
                body: "Hooks and MCP tools quietly save preferences, decisions, and project facts — never raw secrets by default.",
              },
              {
                title: "Recall",
                body: "Semantic search plus recency and importance so the next session starts mid-thought, not from zero.",
              },
              {
                title: "Port",
                body: "The same memory layer works across assistants and your product API. Export or delete anytime.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[var(--muted)] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="get-started"
        className="border-t border-[var(--line)] bg-[var(--surface)] px-6 py-20 md:px-8"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)] md:text-4xl">
              Free to try. Paid when it sticks.
            </h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">
              Start on Free, upgrade to Pro when you need unlimited sync, or
              plug the API into your product when you are ready to charge
              customers of your own.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex h-12 shrink-0 items-center bg-[var(--ink)] px-6 text-sm font-semibold text-[var(--fog)] transition hover:bg-[var(--ink-soft)]"
          >
            Compare plans
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
