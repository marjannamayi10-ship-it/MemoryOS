import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "You're in",
  description: "MemoryOS subscription activated.",
};

type SearchParams = Promise<{ session_id?: string }>;

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-full bg-[var(--fog)]">
      <div className="bg-[var(--ink)]">
        <SiteHeader />
      </div>
      <main className="mx-auto flex max-w-2xl flex-col px-6 py-24 md:px-8">
        <p className="font-[family-name:var(--font-display)] text-5xl tracking-tight text-[var(--ink)]">
          Memory unlocked.
        </p>
        <p className="mt-4 text-lg text-[var(--muted)]">
          Your subscription is active
          {params.session_id ? " and Stripe confirmed the session" : ""}. Open
          your assistant, connect the MemoryOS MCP server, and stop repeating
          yourself.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center bg-[var(--ink)] px-5 text-sm font-semibold text-[var(--fog)]"
          >
            Back home
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center border border-[var(--line)] px-5 text-sm font-semibold text-[var(--ink)]"
          >
            View plans
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
