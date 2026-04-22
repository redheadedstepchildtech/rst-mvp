import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function AdminLoginPage() {
  async function login(formData) {
    "use server";

    const password = formData.get("password");
    const adminPass = process.env.ADMIN_PASSWORD;

    if (password === adminPass) {
      cookies().set("rst_admin", "true", {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      redirect("/admin");
    }

    redirect("/admin/login?error=1");
  }

  return (
    <form action={login} className="p-6 max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Admin Login</h1>

      <input
        type="password"
        name="password"
        placeholder="Enter admin password"
        className="w-full border p-2 rounded"
      />

      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Login
      </button>

      {typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("error") && (
          <p className="text-red-600 text-sm">Invalid password</p>
        )}
    </form>
  );
}