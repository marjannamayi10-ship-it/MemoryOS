"use client";

import { useState, useTransition } from "react";
import type { BillingInterval, PlanId } from "@/lib/pricing";

type Props = {
  planId: Extract<PlanId, "pro" | "api">;
  interval: BillingInterval;
  label: string;
  className?: string;
  /** When true, error text uses light styling for dark plan cards */
  onDark?: boolean;
};

export function CheckoutButton({
  planId,
  interval,
  label,
  className,
  onDark = false,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onClick() {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId, interval }),
        });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          setError(
            data.error ||
              "Checkout is not ready yet. Add Stripe keys (see .env.example).",
          );
          return;
        }
        window.location.href = data.url;
      } catch {
        setError("Network error starting checkout");
      }
    });
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className={className}
      >
        {pending ? "Redirecting…" : label}
      </button>
      {error ? (
        <p
          className={`text-sm leading-snug ${
            onDark ? "text-[#fbbf24]" : "text-[var(--signal-warm)]"
          }`}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
