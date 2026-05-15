import type { APIRoute } from "astro"
import { z } from "zod"
import nodemailer from "nodemailer"

export const prerender = false

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Valid email required").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000),
  company: z.string().trim().max(200).optional().default(""),
  budget: z.string().trim().max(40).optional().default(""),
  subject: z.string().trim().max(200).optional().default("New contact form submission"),
  website: z.string().max(500).optional().default(""),
  services: z.array(z.string().max(40)).max(10).optional().default([]),
})

type RateState = { count: number; resetAt: number }
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const buckets = new Map<string, RateState>()

function rateLimit(ip: string) {
  const now = Date.now()
  const bucket = buckets.get(ip)
  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true, remaining: MAX_PER_WINDOW - 1 }
  }
  if (bucket.count >= MAX_PER_WINDOW) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }
  bucket.count += 1
  return { ok: true, remaining: MAX_PER_WINDOW - bucket.count }
}

let transporter: nodemailer.Transporter | null = null
function getTransporter() {
  if (transporter) return transporter
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = import.meta.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP not configured: set SMTP_HOST, SMTP_USER, SMTP_PASS")
  }
  transporter = nodemailer.createTransport({
    host: String(SMTP_HOST),
    port: Number(SMTP_PORT ?? 465),
    secure: String(SMTP_SECURE ?? "true") === "true",
    auth: { user: String(SMTP_USER), pass: String(SMTP_PASS) },
  })
  return transporter
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ ok: false, error: "Expected application/json" }, { status: 415 })
  }

  const limit = rateLimit(clientAddress ?? "unknown")
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 3600) } },
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  if (payload && typeof payload === "object" && "website" in payload && (payload as { website?: string }).website) {
    return Response.json({ ok: true }, { status: 200 })
  }

  const parsed = ContactSchema.safeParse(payload)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    const path = first?.path?.[0]
    const fieldPrefix = typeof path === "string" ? `${path.charAt(0).toUpperCase()}${path.slice(1)}: ` : ""
    return Response.json({ ok: false, error: `${fieldPrefix}${first?.message ?? "Invalid input"}` }, { status: 400 })
  }

  const { CONTACT_TO, CONTACT_FROM } = import.meta.env
  const to = String(CONTACT_TO ?? "")
  const from = String(CONTACT_FROM ?? to)
  if (!to) {
    return Response.json({ ok: false, error: "Inbox not configured" }, { status: 500 })
  }

  const { name, email, message, company, budget, subject, services } = parsed.data
  const servicesLabel = services.length ? services.join(", ") : ""
  const html = `
    <h2>${escapeHtml(subject)}</h2>
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
    ${budget ? `<p><strong>Budget:</strong> ${escapeHtml(budget)}</p>` : ""}
    ${servicesLabel ? `<p><strong>Interested in:</strong> ${escapeHtml(servicesLabel)}</p>` : ""}
    <hr />
    <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
  `

  try {
    await getTransporter().sendMail({
      from,
      to,
      replyTo: `${name} <${email}>`,
      subject,
      text: `From: ${name} <${email}>\nCompany: ${company || "—"}\nBudget: ${budget || "—"}\nInterested in: ${servicesLabel || "—"}\n\n${message}`,
      html,
    })
  } catch (err) {
    console.error("[contact] send failed:", err)
    return Response.json({ ok: false, error: "Could not send message. Please try again later." }, { status: 502 })
  }

  return Response.json({ ok: true })
}
