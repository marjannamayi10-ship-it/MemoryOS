import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { PricingGrid } from "@/components/PricingGrid";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "MemoryOS plans: Free, Pro ($14/mo), API ($49/mo), and Enterprise. 14-day Pro trial.",
};

type SearchParams = Promise<{ canceled?: string }>;

export default async function PricingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const canceled = params.canceled === "1";

  return (
    <div className="min-h-full bg-[var(--fog)]">
      <div className="relative overflow-hidden bg-[var(--ink)] text-[var(--fog)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 0%, rgba(15,118,110,0.4), transparent 60%)",
          }}
          aria-hidden
        />
        <SiteHeader />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-10 md:px-8">
          <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-white md:text-5xl">
            Simple pricing that scales with memory.
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Individuals start on Pro. Builders graduate to API. Enterprises get
            control. Pro includes a 14-day trial — no card required until
            checkout completes.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-14 md:px-8">
        <PricingGrid canceled={canceled} />

        <section className="mt-20 max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
            What you can expect to earn
          </h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            At Pro ($14/mo) and API ($49/mo), early traction of 100 Pro + 20 API
            customers is roughly{" "}
            <strong className="font-semibold text-[var(--ink)]">
              $2,380 MRR
            </strong>
            . A few hundred Pro users with a handful of API accounts lands in
            the{" "}
            <strong className="font-semibold text-[var(--ink)]">
              $5k–15k MRR
            </strong>{" "}
            range before enterprise deals. Yearly billing improves cash
            collection and cuts churn.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
