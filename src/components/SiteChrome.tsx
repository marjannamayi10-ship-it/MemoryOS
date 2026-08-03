import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-8">
      <Link
        href="/"
        className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--fog)] md:text-2xl"
      >
        MemoryOS
      </Link>
      <nav className="flex items-center gap-5 text-sm text-[var(--fog)]/75">
        <Link href="/#how" className="hidden transition hover:text-[var(--fog)] sm:inline">
          How it works
        </Link>
        <Link href="/pricing" className="transition hover:text-[var(--fog)]">
          Pricing
        </Link>
        <Link
          href="/pricing"
          className="inline-flex h-9 items-center bg-[var(--signal)] px-3.5 font-semibold text-[var(--ink)] transition hover:bg-[var(--signal-soft)]"
        >
          Start free
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--fog)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-[family-name:var(--font-display)] text-lg text-[var(--ink)]">
          MemoryOS
        </p>
        <div className="flex gap-5">
          <Link href="/pricing" className="hover:text-[var(--ink)]">
            Pricing
          </Link>
          <a href="mailto:hello@memoryos.dev" className="hover:text-[var(--ink)]">
            Contact
          </a>
        </div>
        <p>© {new Date().getFullYear()} MemoryOS</p>
      </div>
    </footer>
  );
}
