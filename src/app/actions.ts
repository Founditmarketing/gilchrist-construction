"use server";

/* ─────────────────────────────────────────────────────────────────────────
   Bid-request server action — the conversion spine the brochure was missing.

   Self-contained (no Chill / Supabase coupling) so the /gilchrist route stays
   extractable to its own repo. Validation runs on the server (Server Actions are
   reachable by direct POST, so we never trust the client). Delivery:

     • If RESEND_API_KEY + BID_NOTIFY_EMAIL are set → emails the lead for real.
     • If not (current pitch state) → the submission is still recorded server-side
       (console) and the user is given the office phone, so a lead is NEVER
       silently dropped with a fake "success". `delivered` tells the UI the truth.

   To go live, set in Vercel env: RESEND_API_KEY, BID_NOTIFY_EMAIL, and
   BID_FROM_EMAIL on a Resend-VERIFIED domain. BID_FROM_EMAIL is effectively
   REQUIRED: the default onboarding@resend.dev only delivers to the Resend
   account owner's own address and is rejected/spam-filtered otherwise. Failures
   are logged server-side (the UI honestly falls back to "call the office"), but
   a durable sink (DB/Blob/webhook) is the right long-term fix before scale.
   ───────────────────────────────────────────────────────────────────────── */

import type { BidState } from "./bid-shared";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

function renderEmail(v: Record<string, string>): string {
  return [
    `New bid request from gilchristconstruction.com`,
    ``,
    `Project type:  ${v.projectType}`,
    `Location:      ${v.location}`,
    `Owner/agency:  ${v.owner || "—"}`,
    `Bid/let date:  ${v.bidDate || "—"}`,
    `Est. value:    ${v.valueRange || "—"}`,
    `Plans/specs:   ${v.plansLink || "—"}`,
    ``,
    `Contact:       ${v.name}${v.company ? ` (${v.company})` : ""}`,
    `Email:         ${v.email}`,
    `Phone:         ${v.phone || "—"}`,
    ``,
    `Message:`,
    v.message,
  ].join("\n");
}

export async function submitBidRequest(
  _prev: BidState,
  formData: FormData,
): Promise<BidState> {
  // Honeypot: a hidden field real users never fill. If set, pretend success.
  if (s(formData, "company_website")) {
    return { status: "success", message: "Thanks — we'll be in touch.", delivered: false, errors: {}, values: {} };
  }

  const values = {
    projectType: s(formData, "projectType"),
    location: s(formData, "location"),
    owner: s(formData, "owner"),
    bidDate: s(formData, "bidDate"),
    valueRange: s(formData, "valueRange"),
    name: s(formData, "name"),
    company: s(formData, "company"),
    email: s(formData, "email"),
    phone: s(formData, "phone"),
    plansLink: s(formData, "plansLink"),
    message: s(formData, "message"),
  };

  const errors: Record<string, string> = {};
  if (!values.projectType) errors.projectType = "Pick the closest project type.";
  if (values.location.length < 2) errors.location = "Where is the work? Parish or city is fine.";
  if (values.name.length < 2) errors.name = "Your name, please.";
  if (!EMAIL_RE.test(values.email)) errors.email = "A valid email so we can reply.";
  if (values.message.length < 10) errors.message = "A sentence or two about the project.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", delivered: false, errors, values };
  }

  // Record server-side regardless of email delivery, so nothing is ever lost.
  console.log("[gilchrist] bid request", JSON.stringify({ ...values, at: new Date().toISOString() }));

  let delivered = false;
  const key = process.env.RESEND_API_KEY;
  const to = process.env.BID_NOTIFY_EMAIL;
  const from = process.env.BID_FROM_EMAIL ?? "Gilchrist Website <onboarding@resend.dev>";
  if (key && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: values.email,
          subject: `Bid request — ${values.projectType} — ${values.location}`,
          text: renderEmail(values),
        }),
      });
      delivered = res.ok;
      // Surface a configured-but-failing delivery (bad key, unverified domain,
      // rate limit) so the operator can reconcile — never swallow it silently.
      if (!res.ok) console.error("[gilchrist] resend delivery failed", res.status, await res.text().catch(() => ""));
    } catch (err) {
      console.error("[gilchrist] resend threw", err);
      delivered = false;
    }
  } else if (key && !to) {
    console.warn("[gilchrist] RESEND_API_KEY set but BID_NOTIFY_EMAIL missing — lead recorded, not emailed");
  }

  return {
    status: "success",
    delivered,
    message: delivered
      ? "Request received — a Gilchrist estimator will follow up shortly."
      : "Request received. For an immediate response, call the office at (318) 448-3565.",
    errors: {},
    values: {},
  };
}
