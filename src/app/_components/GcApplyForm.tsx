"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle, ArrowRight, ArrowLeft, Phone } from "@phosphor-icons/react";
import { submitApplication } from "../apply-actions";
import { APPLY_INITIAL } from "../apply-shared";
import { PHONE_DISPLAY, PHONE_HREF } from "../site";

const YEARS = ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"];
const CDL_OPTS = ["None", "Class A", "Class B", "Learner's permit"];
const AVAIL = ["Immediately", "Within 2 weeks", "Within a month", "Just exploring"];
const VETERAN = ["Prefer not to say", "Yes", "No"];

const STEP1_REQUIRED = ["fullName", "location"] as const;
const STEP1_FIELDS = ["fullName", "phone", "email", "location"] as const;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className="gc-btn gc-btn-primary gc-focus w-full !py-[1.05rem] sm:w-auto sm:!px-8">
      {pending ? "Sending…" : "Submit application"}
      {!pending && <ArrowRight size={18} weight="bold" aria-hidden="true" />}
    </button>
  );
}

function Field({
  label, required, error, hint, children,
}: {
  label: string; required?: boolean; error?: string; hint?: string;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => React.ReactNode;
}) {
  const id = useId();
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errId : null, hint && !error ? hintId : null].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="gc-label">
        {label}{required && <span className="gc-req" aria-hidden="true"> *</span>}
      </label>
      {children({ id, describedBy, invalid: !!error })}
      {hint && !error && <p id={hintId} className="mt-1.5 text-[0.74rem] text-[var(--gc-text-faint)]">{hint}</p>}
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

/** On-site job application — no third-party ATS. `position` prefills the role
 *  (a hidden field), so the same form serves every job page and the general
 *  application. Mirrors the bid form: server-action validated, honest success
 *  whether or not email delivery is configured, fields stay mounted across the
 *  two visual steps so one submit carries everything. */
export default function GcApplyForm({ position, category }: { position: string; category?: string }) {
  const [state, formAction] = useActionState(submitApplication, APPLY_INITIAL);
  const v = state.values ?? {};
  const e = state.errors ?? {};
  const errBannerRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef(false);
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (state.status === "error") {
      const step1HasError = STEP1_FIELDS.some((f) => e[f as keyof typeof e]);
      setStep(step1HasError ? 1 : 2);
      errBannerRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Move focus into the newly shown step on user-driven navigation (the error
  // jump above keeps focus on the error summary instead).
  useEffect(() => {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    const panel = step === 1 ? step1Ref.current : step2Ref.current;
    panel?.querySelector<HTMLElement>("input:not([type=hidden]), select, textarea")?.focus();
  }, [step]);

  // Reliably announce the confirmation by moving focus to the success card.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className="gc-card gc-focus p-7 sm:p-9" role="status" aria-live="polite">
        <span className="grid h-12 w-12 place-items-center rounded-[3px] bg-[var(--gc-hi)] text-[#160f00]">
          <CheckCircle size={26} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="gc-display-md mt-5 text-[var(--gc-text)]">Application received</h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-[var(--gc-text-muted)]">{state.message}</p>
        <a href={PHONE_HREF} className="gc-btn gc-btn-steel gc-focus mt-6 !py-[0.95rem]">
          <Phone size={17} weight="fill" aria-hidden="true" />
          <span className="gc-mono">{PHONE_DISPLAY}</span>
        </a>
      </div>
    );
  }

  function next() {
    const form = formRef.current;
    if (form) {
      for (const name of STEP1_REQUIRED) {
        const el = form.elements.namedItem(name) as HTMLInputElement | null;
        if (el && !el.value.trim()) {
          el.focus();
          el.scrollIntoView({ block: "center", behavior: "smooth" });
          return;
        }
      }
      // Need at least one way to reach them before advancing.
      const phone = (form.elements.namedItem("phone") as HTMLInputElement | null)?.value.trim();
      const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value.trim();
      if (!phone && !email) {
        (form.elements.namedItem("phone") as HTMLInputElement | null)?.focus();
        return;
      }
    }
    pendingFocus.current = true;
    setStep(2);
  }

  return (
    <form ref={formRef} action={formAction} className="gc-card p-6 sm:p-8" noValidate>
      <input type="hidden" name="position" value={position} />
      {category && <input type="hidden" name="category" value={category} />}

      <div className="mb-6 flex items-center gap-3">
        <StepPill n={1} label="YOU" state={step === 1 ? "active" : "done"} />
        <span className="h-px flex-1 bg-[var(--gc-line-strong)]" aria-hidden="true" />
        <StepPill n={2} label="EXPERIENCE" state={step === 2 ? "active" : "todo"} />
      </div>

      {state.status === "error" && (
        <p ref={errBannerRef} tabIndex={-1} role="alert" className="gc-focus mb-5 rounded-[3px] border border-[#ff6a5e]/40 bg-[#ff6a5e]/10 px-4 py-3 text-[0.85rem] text-[#ffb0a8]">
          {state.message}
        </p>
      )}

      {/* ── STEP 1 · You ── */}
      <div ref={step1Ref} hidden={step === 2}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" required error={e.fullName}>
            {({ id, describedBy, invalid }) => (
              <input id={id} name="fullName" defaultValue={v.fullName ?? ""} autoComplete="name" required aria-invalid={invalid} aria-describedby={describedBy} className="gc-input" />
            )}
          </Field>

          <Field label="City / parish" required error={e.location}>
            {({ id, describedBy, invalid }) => (
              <input id={id} name="location" defaultValue={v.location ?? ""} placeholder="e.g. Alexandria, Rapides" required aria-invalid={invalid} aria-describedby={describedBy} className="gc-input" />
            )}
          </Field>

          <Field label="Phone" error={e.phone} hint="Phone or email — at least one.">
            {({ id, describedBy, invalid }) => (
              <input id={id} name="phone" type="tel" defaultValue={v.phone ?? ""} autoComplete="tel" aria-invalid={invalid} aria-describedby={describedBy} className="gc-input" />
            )}
          </Field>

          <Field label="Email" error={e.email}>
            {({ id, describedBy, invalid }) => (
              <input id={id} name="email" type="email" defaultValue={v.email ?? ""} autoComplete="email" aria-invalid={invalid} aria-describedby={describedBy} className="gc-input" />
            )}
          </Field>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={next} className="gc-btn gc-btn-primary gc-focus w-full !py-[1.05rem] sm:w-auto sm:!px-8">
            Continue
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </button>
          <p className="text-[0.8rem] text-[var(--gc-text-faint)]">Step 1 of 2 — you, then your experience.</p>
        </div>
      </div>

      {/* ── STEP 2 · Experience ── */}
      <div ref={step2Ref} hidden={step === 1}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Years of experience">
            {({ id }) => (
              <select id={id} name="years" defaultValue={v.years ?? ""} className="gc-input">
                <option value="">Select…</option>
                {YEARS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
          </Field>

          <Field label="CDL">
            {({ id }) => (
              <select id={id} name="cdl" defaultValue={v.cdl ?? ""} className="gc-input">
                <option value="">Select…</option>
                {CDL_OPTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
          </Field>

          <Field label="What do you run, drive, or build?" hint="Machines, trades, certifications.">
            {({ id, describedBy }) => (
              <input id={id} name="equipment" defaultValue={v.equipment ?? ""} placeholder="e.g. excavator, paver, Class A, bridge crew" aria-describedby={describedBy} className="gc-input" />
            )}
          </Field>

          <Field label="Available to start">
            {({ id }) => (
              <select id={id} name="availability" defaultValue={v.availability ?? ""} className="gc-input">
                <option value="">Select…</option>
                {AVAIL.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
          </Field>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Résumé (optional)" hint="PDF, Word, or text — under 5 MB." error={e.resume}>
            {({ id, describedBy, invalid }) => (
              <input
                id={id}
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.rtf"
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className="gc-input !py-2.5 text-[0.85rem] file:mr-3 file:cursor-pointer file:rounded-[3px] file:border-0 file:bg-[var(--gc-panel-2)] file:px-3 file:py-1.5 file:text-[0.8rem] file:text-[var(--gc-text)]"
              />
            )}
          </Field>

          <Field label="Veteran status (voluntary)">
            {({ id }) => (
              <select id={id} name="veteran" defaultValue={v.veteran ?? ""} className="gc-input">
                <option value="">Prefer not to say</option>
                {VETERAN.slice(1).map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Anything else?">
            {({ id }) => (
              <textarea id={id} name="message" defaultValue={v.message ?? ""} rows={3} placeholder="Tell us about your experience, or where you want to grow." className="gc-input resize-y" />
            )}
          </Field>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={() => setStep(1)} className="gc-btn gc-btn-ghost gc-focus !py-[1.05rem] sm:!px-6">
            <ArrowLeft size={17} weight="bold" aria-hidden="true" />
            Back
          </button>
          <SubmitButton />
          <p className="text-[0.8rem] text-[var(--gc-text-faint)]">
            Or call:{" "}
            <a href={PHONE_HREF} className="gc-focus gc-mono text-[var(--gc-text-muted)] underline-offset-4 hover:text-[var(--gc-hi)] hover:underline">{PHONE_DISPLAY}</a>
          </p>
        </div>
      </div>

      {/* Honeypot */}
      <div className="gc-hp" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
    </form>
  );
}
