import { aiSuggestTitle } from "./actions";

export default function Step1() {
  return (
    <div>
      <label className="block mb-4">
        <span className="text-sm font-medium">Nonprofit Name (optional)</span>
        <input
          type="text"
          name="nonprofitName"
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-4">
        <span className="text-sm font-medium">EIN (optional)</span>
        <input
          type="text"
          name="ein"
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <form
        action={async (formData) => {
          "use server";
          const needType = formData.get("needType") as string;
          const title = await aiSuggestTitle(needType);
          return { title };
        }}
      >
        <button
          type="submit"
          className="text-sm text-purple-600 hover:underline"
        >
          Suggest Title
        </button>
      </form>
    </div>
  );
}