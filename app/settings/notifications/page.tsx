import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NotificationSettings() {
  const userId = cookies().get("rst_user")?.value;
  if (!userId) redirect("/login");

  const prefs = await prisma.notificationPreferences.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  async function save(formData) {
    "use server";

    await prisma.notificationPreferences.update({
      where: { userId },
      data: {
        notifyOnBoost: formData.get("notifyOnBoost") === "on",
        notifyOnCreate: formData.get("notifyOnCreate") === "on",
        notifyOnVerify: formData.get("notifyOnVerify") === "on",
        categoryFilter: formData.get("categoryFilter"),
        cityFilter: formData.get("cityFilter"),
      },
    });

    redirect("/settings/notifications");
  }

  return (
    <form action={save} className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Notification Preferences</h1>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="notifyOnBoost" defaultChecked={prefs.notifyOnBoost} />
        Notify me when Needs are boosted
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="notifyOnCreate" defaultChecked={prefs.notifyOnCreate} />
        Notify me when new Needs are created
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="notifyOnVerify" defaultChecked={prefs.notifyOnVerify} />
        Notify me when Needs are verified
      </label>

      <input
        name="categoryFilter"
        placeholder="Categories (comma-separated)"
        defaultValue={prefs.categoryFilter ?? ""}
        className="w-full border p-2 rounded"
      />

      <input
        name="cityFilter"
        placeholder="City filter"
        defaultValue={prefs.cityFilter ?? ""}
        className="w-full border p-2 rounded"
      />

      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Preferences
      </button>
    </form>
  );
}