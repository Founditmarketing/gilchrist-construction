"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle, ArrowRight, ArrowLeft, Phone } from "@phosphor-icons/react";
import { submitBidRequest } from "../actions";
import { BID_INITIAL } from "../bid-shared";
import { PHONE_DISPLAY, PHONE_HREF } from "../site";

const PROJECT_TYPES = [
  "Highway / roadway",
  "Interchange / overpass",
  "Bridge & structures",
  "Asphalt paving & production",
  "Concrete paving & production",
  "Earthwork / drainage / base",
  "Design-build",
  "Subcontract inquiry",
  "Other",
];

const VALUE_RANGES = ["Not sure yet", "Under $1M", "$1M – $5M", "$5M – $20M", "$20M – $50M", "$50M+"];

// Which fields live on which visual step. All stay mounted (hidden, not
// unmounted) so a single server-action submit still carries every value.
const STEP1_FIELDS = ["projectType", "location", "owner", "bidDate", "valueRange", "plansLink", "message"] as const;
const STEP1_REQUIRED = ["projectType", "location", "message"] as const;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className="gc-btn gc-btn-primary gc-focus w-full !py-[1.05rem] sm:w-auto sm:!px-8">
      {pending ? "Sending…" : "Send project details"}
      {!pending && <ArrowRight size={18} weight="bold" aria-hidden="true" />}
    </button>
  );
}

function Field({
  name, label, required, error, children,
}: {
  name: string; label: string; required?: boolean; error?: string; children: (props: { id: string; describedBy?: string; invalid: boolean }) => React.ReactNode;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="gc-label">
        {label}{required && <span className="gc-req" aria-hidden="true"> *</span>}
      </label>
      {children({ id, describedBy: error ? errId : undefined, invalid: !!error })}
      {error && <p id={errId} className="gc-field-error" role="alert">{error}</p>}
    </div>
  );
}

function StepPill({ n, label, state }: { n: number; label: string; state: "active" | "done" | "todo" }) {
  const lit = state !== "todo";
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`grid h-6 w-6 place-items-center rounded-full border text-[0.7rem] gc-mono ${
          lit ? "border-[var(--gc-hi)] bg-[rgba(67,174,42,0.14)] text-[var(--gc-hi)]" : "border-[var(--gc-line-strong)] text-[var(--gc-text-faint)]"
        }`}
        aria-hidden="true"
      >
        {n}
      </span>
      <span className={`gc-mono text-[0.6rem] tracking-[0.14em] ${state === "active" ? "text-[var(--gc-text)]" : "text-[var(--gc-text-faint)]"}`}>{label}</span>
    </span>
  );
}

export default function GcBidForm() {
  const [state, formAction] = useActionState(submitBidRequest, BID_INITIAL);
  const v = state.values ?? {};
  const e = state.errors ?? {};
  const errBannerRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState<1 | 2>(1);

  // On a failed submit (server action, no reload), jump to the step holding the
  // first error and move focus to the summary (WCAG 3.3.1 / 2.4.3).
  useEffect(() => {
    if (state.status === "error") {
      const step1HasError = STEP1_FIELDS.some((f) => e[f as keyof typeof e]);
      setStep(step1HasError ? 1 : 2);
      errBannerRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="gc-card p-7 sm:p-9" role="status" aria-live="polite">
        <span className="grid h-12 w-12 place-items-center rounded-[3px] bg-[var(--gc-hi)] text-[#160f00]">
          <CheckCircle size={26} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="gc-display-md mt-5 text-[var(--gc-text)]">Request received</h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-[var(--gc-text-muted)]">{state.message}</p>
        <a href={PHONE_HREF} className="gc-btn gc-btn-steel gc-focus mt-6 !py-[0.95rem]">
          <Phone size={17} weight="fill" aria-hidden="true" />
          <span className="gc-mono">{PHONE_DISPLAY}</span>
        </a>
      </div>
    );
  }

  // Advance to step 2 only once the required step-1 fields are filled, so the
  // user isn't bounced back from a submit. (Form has noValidate; we check here.)
  function next() {
    const form = formRef.current;
    if (form) {
      for (const name of STEP1_REQUIRED) {
        const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
        if (el && !el.value.trim()) {
          el.focus();
          el.scrollIntoView({ block: "center", behavior: "smooth" });
          return;
        }
      }
    }
    setStep(2);
  }

  return (
    <form ref={formRef} action={formAction} className="gc-card p-6 sm:p-8" noValidate aria-describedby={state.status === "error" ? "gc-form-top-err" : undefined}>
      {/* two-step progress — same fields, lighter feel */}
      <div className="mb-6 flex items-center gap-3">
        <StepPill n={1} label="PROJECT DETAILS" state={step === 1 ? "active" : "done"} />
        <span className="h-px flex-1 bg-[var(--gc-line-strong)]" aria-hidden="true" />
        <StepPill n={2} label="YOUR CONTACT" state={step === 2 ? "active" : "todo"} />
      </div>

      {state.status === "error" && (
        <p id="gc-form-top-err" ref={errBannerRef} tabIndex={-1} role="alert" className="gc-focus mb-5 rounded-[3px] border border-[#ff6a5e]/40 bg-[#ff6a5e]/10 px-4 py-3 text-[0.85rem] text-[#ffb0a8]">
          {state.message}
        </p>
      )}

      {/* ── STEP 1 · Project details (hidden, not unmounted, when on step 2) ── */}
      <div hidden={step === 2}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="projectType" label="Project type" required error={e.projectType}>
            {({ id, describedBy, invalid }) => (
              <select id={id} name="projectType" defaultValue={v.projectType ?? ""} required aria-invalid={invalid} aria-describedby={describedBy} className="gc-input">
                <option value="" disabled>Select…</option>
                {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
          </Field>

          <Field name="location" label="Project location" required error={e.location}>
            {({ id, describedBy, invalid }) => (
              <input id={id} name="location" defaultValue={v.location ?? ""} placeholder="Parish or city" required aria-required aria-invalid={invalid} aria-describedby={describedBy} className="gc-input" />
            )}
          </Field>

          <Field name="owner" label="Owner / agency" error={e.owner}>
            {({ id }) => <input id={id} name="owner" defaultValue={v.owner ?? ""} placeholder="LADOTD, parish, GC…" className="gc-input" />}
          </Field>

          <Field name="bidDate" label="Bid / let date" error={e.bidDate}>
            {({ id }) => <input id={id} name="bidDate" defaultValue={v.bidDate ?? ""} placeholder="e.g. Aug 2026" className="gc-input" />}
          </Field>

          <Field name="valueRange" label="Estimated value" error={e.valueRange}>
            {({ id }) => (
              <select id={id} name="valueRange" defaultValue={v.valueRange ?? ""} className="gc-input">
                <option value="" disabled>Select…</option>
                {VALUE_RANGES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
          </Field>

          <Field name="plansLink" label="Link to plans / specs" error={e.plansLink}>
            {({ id }) => <input id={id} name="plansLink" defaultValue={v.plansLink ?? ""} placeholder="Dropbox, Box, plan room…" className="gc-input" />}
          </Field>
        </div>

        <div className="mt-4">
          <Field name="message" label="About the project" required error={e.message}>
            {({ id, describedBy, invalid }) => (
              <textarea id={id} name="message" defaultValue={v.message ?? ""} rows={4} placeholder="Scope, timeline, and what you need from us." required aria-required aria-invalid={invalid} aria-describedby={describedBy} className="gc-input resize-y" />
            )}
          </Field>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={next} className="gc-btn gc-btn-primary gc-focus w-full !py-[1.05rem] sm:w-auto sm:!px-8">
            Continue
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </button>
          <p className="text-[0.8rem] text-[var(--gc-text-faint)]">
            Step 1 of 2 — project, then contact.
          </p>
        </div>
      </div>

      {/* ── STEP 2 · Contact (hidden, not unmounted, when on step 1) ── */}
      <div hidden={step === 1}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="name" label="Your name" required error={e.name}>
            {({ id, describedBy, invalid }) => (
              <input id={id} name="name" defaultValue={v.name ?? ""} autoComplete="name" required aria-required aria-invalid={invalid} aria-describedby={describedBy} className="gc-input" />
            )}
          </Field>

          <Field name="company" label="Company" error={e.company}>
            {({ id }) => <input id={id} name="company" defaultValue={v.company ?? ""} autoComplete="organization" className="gc-input" />}
          </Field>

          <Field name="email" label="Email" required error={e.email}>
            {({ id, describedBy, invalid }) => (
              <input id={id} name="email" type="email" defaultValue={v.email ?? ""} autoComplete="email" required aria-required aria-invalid={invalid} aria-describedby={describedBy} className="gc-input" />
            )}
          </Field>

          <Field name="phone" label="Phone" error={e.phone}>
            {({ id }) => <input id={id} name="phone" type="tel" defaultValue={v.phone ?? ""} autoComplete="tel" className="gc-input" />}
          </Field>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={() => setStep(1)} className="gc-btn gc-btn-ghost gc-focus !py-[1.05rem] sm:!px-6">
            <ArrowLeft size={17} weight="bold" aria-hidden="true" />
            Back
          </button>
          <SubmitButton />
          <p className="text-[0.8rem] text-[var(--gc-text-faint)]">
            Or call the office:{" "}
            <a href={PHONE_HREF} className="gc-focus gc-mono text-[var(--gc-text-muted)] underline-offset-4 hover:text-[var(--gc-hi)] hover:underline">{PHONE_DISPLAY}</a>
          </p>
        </div>
      </div>

      {/* Honeypot — hidden from humans, catches bots. Always mounted. */}
      <div className="gc-hp" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
