import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const payloadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().min(1),
});

const CONTACT_INBOX_EMAIL =
  process.env.CONTACT_INBOX_EMAIL ?? "tankenneth207@gmail.com";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Reverie Revival <onboarding@resend.dev>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function sendContactEmail(message: {
  name: string;
  email: string;
  phone?: string | null;
  body: string;
}) {
  if (!RESEND_API_KEY) {
    return { sent: false, reason: "missing_api_key" };
  }

  const contentLines = [
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    message.phone ? `Phone: ${message.phone}` : "Phone: (not provided)",
    "",
    message.body,
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_INBOX_EMAIL],
      subject: `New message from ${message.name}`,
      text: contentLines.join("\n"),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return { sent: false, reason: text || "send_failed" };
  }

  return { sent: true };
}

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json(
      { error: "Prisma client is not available." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const created = await prisma.contactMessage.create({
    data: {
      name: parsed.data.name.trim(),
      email: parsed.data.email.trim(),
      phone: parsed.data.phone?.trim() || null,
      message: parsed.data.message.trim(),
    },
  });

  const emailResult = await sendContactEmail({
    name: created.name,
    email: created.email,
    phone: created.phone,
    body: created.message,
  });

  return NextResponse.json({
    ok: true,
    emailSent: emailResult.sent,
  });
}
