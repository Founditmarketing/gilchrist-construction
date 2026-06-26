"use server";

/* ─────────────────────────────────────────────────────────────────────────
   Job-application server action — the on-site careers funnel.

   Self-contained (no third-party ATS). Validation runs on the server (Server
   Actions are reachable by direct POST, so we never trust the client).
   Delivery mirrors the bid action:

     • If RESEND_API_KEY + (APPLY_NOTIFY_EMAIL | BID_NOTIFY_EMAIL) are set →
       emails the application for real, with the resume attached if provided.
     • If not (current pitch state) → the application is still recorded
       server-side (console) and the applicant is given the office phone, so a
       candidate is NEVER silently dropped with a fake "success". `delivered`
       tells the UI the truth.

   To go live set in Vercel env: RESEND_API_KEY, APPLY_NOTIFY_EMAIL (or reuse
   BID_NOTIFY_EMAIL), and BID_FROM_EMAIL on a Resend-verified domain. A durable
   sink (DB / Blob / webhook) is the right long-term store before scale.
   ───────────────────────────────────────────────────────────────────────── */

import type { ApplyState } from "./apply-shared";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /\d[\d\s().+-]{6,}/; // at least a few digits, loosely formatted
const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB
const RESUME_EXTS = [".pdf", ".doc", ".docx", ".txt", ".rtf"];

function renderEmail(v: Record<string, string>, resume: string): string {
  return [
    `New job application from gilchrist-construction.vercel.app`,
    ``,
    `Position:      ${v.position}${v.category ? ` (${v.category})` : ""}`,
    ``,
    `Name:          ${v.fullName}`,
    `Phone:         ${v.phone || "—"}`,
    `Email:         ${v.email || "—"}`,
    `Location:      ${v.location || "—"}`,
    ``,
    `Experience:    ${v.years || "—"}`,
    `CDL:           ${v.cdl || "—"}`,
    `Runs / builds: ${v.equipment || "—"}`,
    `Available:     ${v.availability || "—"}`,
    `Veteran:       ${v.veteran || "—"}`,
    `Resume:        ${resume || "— (none attached)"}`,
    ``,
    `Message:`,
    v.message || "—",
  ].join("\n");
}

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  // Honeypot: a hidden field real users never fill. If set, pretend success.
  if (s(formData, "company_website")) {
    return { status: "success", message: "Thanks — we'll be in touch.", delivered: false, errors: {}, values: {} };
  }

  const values = {
    position: s(formData, "position") || "General application",
    category: s(formData, "category"),
    fullName: s(formData, "fullName"),
    phone: s(formData, "phone"),
    email: s(formData, "email"),
    location: s(formData, "location"),
    years: s(formData, "years"),
    cdl: s(formData, "cdl"),
    equipment: s(formData, "equipment"),
    availability: s(formData, "availability"),
    veteran: s(formData, "veteran"),
    message: s(formData, "message"),
  };

  const errors: Record<string, string> = {};
  if (values.fullName.length < 2) errors.fullName = "Your name, please.";
  if (values.location.length < 2) errors.location = "Where are you based? City or parish is fine.";
  // Need at least one real way to reach them.
  const hasPhone = PHONE_RE.test(values.phone);
  const hasEmail = EMAIL_RE.test(values.email);
  if (values.email && !hasEmail) errors.email = "That email doesn't look right.";
  if (!hasPhone && !hasEmail) errors.phone = "A phone or email so we can reach you.";

  // Resume (optional) — validate type + size on the SERVER, since the accept
  // attribute is client-only and a Server Action is reachable by direct POST.
  let resumeMeta = "";
  let resumeFile: File | null = null;
  const resume = formData.get("resume");
  if (resume && typeof resume === "object" && "arrayBuffer" in resume && (resume as File).size > 0) {
    const file = resume as File;
    const dot = file.name.lastIndexOf(".");
    const ext = dot >= 0 ? file.name.slice(dot).toLowerCase() : "";
    if (!RESUME_EXTS.includes(ext)) {
      errors.resume = "Résumé must be a PDF, Word, text, or RTF file.";
    } else if (file.size > MAX_RESUME_BYTES) {
      errors.resume = "Résumé is over 5 MB — attach a smaller file or skip it.";
    } else {
      resumeFile = file;
      resumeMeta = `${file.name} · ${Math.max(1, Math.round(file.size / 1024))} KB`;
    }
  }

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", delivered: false, errors, values };
  }

  let attachment: { filename: string; content: string } | null = null;
  if (resumeFile) {
    try {
      const buf = Buffer.from(await resumeFile.arrayBuffer());
      attachment = { filename: resumeFile.name, content: buf.toString("base64") };
    } catch (err) {
      console.error("[gilchrist] resume read failed", err);
      resumeMeta += " — could not be read";
    }
  }

  // Record server-side regardless of email delivery, so nothing is ever lost.
  console.log("[gilchrist] job application", JSON.stringify({ ...values, resume: resumeMeta, at: new Date().toISOString() }));

  let delivered = false;
  const key = process.env.RESEND_API_KEY;
  const to = process.env.APPLY_NOTIFY_EMAIL ?? process.env.BID_NOTIFY_EMAIL;
  const from = process.env.BID_FROM_EMAIL ?? "Gilchrist Careers <onboarding@resend.dev>";
  if (key && to) {
    try {
      const payload: Record<string, unknown> = {
        from,
        to: [to],
        subject: `Application — ${values.position} — ${values.fullName}`,
        text: renderEmail(values, resumeMeta),
      };
      if (hasEmail) payload.reply_to = values.email;
      if (attachment) payload.attachments = [attachment];
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      delivered = res.ok;
      if (!res.ok) console.error("[gilchrist] resend application failed", res.status, await res.text().catch(() => ""));
    } catch (err) {
      console.error("[gilchrist] resend application threw", err);
      delivered = false;
    }
  } else if (key && !to) {
    console.warn("[gilchrist] RESEND_API_KEY set but no APPLY_NOTIFY_EMAIL/BID_NOTIFY_EMAIL — application recorded, not emailed");
  }

  return {
    status: "success",
    delivered,
    message: delivered
      ? "Application received — a Gilchrist superintendent will follow up with you."
      : "Application received. For an immediate response, call the office at (318) 448-3565.",
    errors: {},
    values: {},
  };
}
