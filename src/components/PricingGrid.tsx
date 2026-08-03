"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PLANS,
  formatUsd,
  yearlySavingsPercent,
  type BillingInterval,
} from "@/lib/pricing";
import { CheckoutButton } from "@/components/CheckoutButton";

export function PricingGrid({
  canceled = false,
}: {
  canceled?: boolean;
}) {
  const [interval, setInterval] = useState<BillingInterval>("month");

  return (
    <div className="mx-auto w-full max-w-6xl">
      {canceled ? (
        <p className="mb-8 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-center text-sm text-[var(--muted)]">
          Checkout canceled — pick a plan when you are ready. No charge was made.
        </p>
      ) : null}

      <div className="mb-10 flex flex-col items-center gap-4">
        <div
          className="inline-flex rounded-full border border-[var(--line)] bg-[var(--surface)] p-1"
          role="group"
          aria-label="Billing interval"
        >
          <button
            type="button"
            onClick={() => setInterval("month")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              interval === "month"
                ? "bg-[var(--ink)] text-[var(--fog)]"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setInterval("year")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              interval === "year"
                ? "bg-[var(--ink)] text-[var(--fog)]"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Yearly
            <span className="ml-2 text-[var(--signal)]">Save ~17%</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {PLANS.map((plan) => {
          const savings = yearlySavingsPercent(plan);
          const price =
            interval === "year" ? plan.priceYearly : plan.priceMonthly;
          const paidPlanId =
            plan.id === "pro" || plan.id === "api" ? plan.id : null;

          return (
            <article
              key={plan.id}
              className={`flex flex-col border p-6 transition duration-300 ${
                plan.highlighted
                  ? "border-[var(--signal)] bg-[var(--ink)] text-[var(--fog)] shadow-[0_24px_60px_-28px_rgba(15,118,110,0.55)]"
                  : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]"
              }`}
            >
              <header className="mb-6">
                <p
                  className={`font-[family-name:var(--font-display)] text-2xl tracking-tight ${
                    plan.highlighted ? "text-white" : "text-[var(--ink)]"
                  }`}
                >
                  {plan.name}
                </p>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    plan.highlighted ? "text-white/70" : "text-[var(--muted)]"
                  }`}
                >
                  {plan.tagline}
                </p>
              </header>

              <div className="mb-6">
                {price == null ? (
                  <p className="font-[family-name:var(--font-display)] text-4xl">
                    Custom
                  </p>
                ) : (
                  <>
                    <p className="font-[family-name:var(--font-display)] text-4xl tracking-tight">
                      {formatUsd(price)}
                      <span
                        className={`ml-1 text-base font-sans font-normal ${
                          plan.highlighted
                            ? "text-white/60"
                            : "text-[var(--muted)]"
                        }`}
                      >
                        /{interval === "year" ? "yr" : "mo"}
                      </span>
                    </p>
                    {interval === "year" && savings ? (
                      <p
                        className={`mt-1 text-xs ${
                          plan.highlighted
                            ? "text-[var(--signal-soft)]"
                            : "text-[var(--signal)]"
                        }`}
                      >
                        {savings}% off vs monthly
                      </p>
                    ) : null}
                  </>
                )}
              </div>

              <ul className="mb-6 flex flex-1 flex-col gap-2.5 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span
                      className={
                        plan.highlighted
                          ? "text-[var(--signal-soft)]"
                          : "text-[var(--signal)]"
                      }
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span
                      className={
                        plan.highlighted ? "text-white/85" : "text-[var(--ink)]"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {paidPlanId ? (
                <CheckoutButton
                  planId={paidPlanId}
                  interval={interval}
                  label={plan.cta}
                  className={`inline-flex h-11 w-full items-center justify-center px-4 text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-[var(--signal)] text-[var(--ink)] hover:bg-[var(--signal-soft)]"
                      : "bg-[var(--ink)] text-[var(--fog)] hover:bg-[var(--ink-soft)]"
                  }`}
                />
              ) : (
                <Link
                  href={plan.ctaHref || "/"}
                  className={`inline-flex h-11 w-full items-center justify-center px-4 text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-[var(--signal)] text-[var(--ink)] hover:bg-[var(--signal-soft)]"
                      : "border border-[var(--line)] bg-transparent text-[var(--ink)] hover:border-[var(--ink)]"
                  }`}
                >
                  {plan.cta}
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
