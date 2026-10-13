import nodemailer from "nodemailer";

/**
 * Mail settings. Accepts the documented names and the NEXT_PUBLIC_* names this project's .env
 * already uses (server-side only: NEXT_PUBLIC_ values can leak into browser bundles).
 */
export function mailConfig() {
  const user = process.env.EMAIL_SERVER_USER ?? process.env.NEXT_PUBLIC_EMAIL_USER;
  const pass = process.env.EMAIL_SERVER_PASS ?? process.env.NEXT_PUBLIC_EMAIL_PASS;
  const from = process.env.EMAIL_FROM ?? user;
  const owner = process.env.EMAIL_RECEIVER ?? process.env.NEXT_PUBLIC_RECEIVER_EMAIL ?? from;
  if (!user || !pass || !from || !owner) return null;
  return { user, pass, from, owner };
}

export function createTransporter() {
  const cfg = mailConfig();
  if (!cfg) throw new Error("Email service is not configured");
  return {
    cfg,
    transporter: nodemailer.createTransport({ service: "gmail", auth: { user: cfg.user, pass: cfg.pass } }),
  };
}

/** Header values must never contain line breaks (header injection). */
export const oneLine = (v: unknown) => String(v ?? "").replace(/[\r\n]+/g, " ").trim();
