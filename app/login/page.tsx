import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export default function LoginPage() {
  async function login(formData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) redirect("/login?error=1");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) redirect("/login?error=1");

    cookies().set("rst_user", user.id, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect("/admin");
  }

  return (
    <form action={login} className="p-6 max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        name="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
      />

      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Login
      </button>
    </form>
  );
}