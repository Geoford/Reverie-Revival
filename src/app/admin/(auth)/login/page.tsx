import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createAdminSession } from "@/lib/admin-auth";
import { compare } from "bcryptjs";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function loginAction(formData: FormData) {
  "use server";

  if (!prisma) {
    throw new Error("Prisma client is not available.");
  }

  const payload = {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };

  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    redirect("/admin/login?error=invalid");
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });

  if (!admin) {
    redirect("/admin/login?error=invalid");
  }

  const isValid = await compare(parsed.data.password, admin.passwordHash);
  if (!isValid) {
    redirect("/admin/login?error=invalid");
  }

  await createAdminSession(admin.id);
  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string } | Promise<{ error?: string }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const errorMessage =
    resolvedSearchParams.error === "invalid"
      ? "Invalid email or password."
      : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0B0B0C]/80 p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.4em] text-white/60">
            REVERIE REVIVAL
          </p>
          <h1
            className="mt-4 text-2xl tracking-[0.2em]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            ADMIN LOGIN
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-lg border border-[#E10613]/60 bg-[#E10613]/10 px-4 py-3 text-sm text-[#E10613]">
            {errorMessage}
          </div>
        )}

        <form action={loginAction} className="space-y-5">
          <div>
            <label
              className="block text-xs tracking-[0.25em] text-white/70"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              EMAIL
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full border border-white/20 bg-[#121214] px-4 py-3 text-white focus:border-white/60 focus:outline-none"
            />
          </div>
          <div>
            <label
              className="block text-xs tracking-[0.25em] text-white/70"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              PASSWORD
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full border border-white/20 bg-[#121214] px-4 py-3 text-white focus:border-white/60 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white py-3 text-sm tracking-[0.3em] text-[#0B0B0C] transition-colors hover:bg-[#E10613] hover:text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
