import { useState } from "react";
import Link from "next/link";
import { Donation, HelpOffer } from "@/types";

// inside the button area in DashboardCard, when not editing:
{!editing && (
  <>
    <Link
      href={`/rst/dashboard/${item.id}`}
      className="bg-gray-200 px-4 py-2 rounded inline-flex items-center justify-center"
    >
      View
    </Link>

    <button
      onClick={() => setEditing(true)}
      className="bg-gray-200 px-4 py-2 rounded"
    >
      Edit
    </button>

    <button
      onClick={handleDelete}
      className="bg-gray-200 px-4 py-2 rounded"
    >
      Delete
    </button>
  </>
)}

interface Props {
  item: Donation | HelpOffer;
  type: "donation" | "help-offer";
  onDelete?: (id: string) => void;
  onUpdate?: (item: Donation | HelpOffer) => void;
}

export default function DashboardCard({ item, type, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Shared fields
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description || "");

  // Donation-only
  const [category, setCategory] = useState(
    type === "donation" ? (item as Donation).category : ""
  );

  // Help-offer-only
  const [offerType, setOfferType] = useState(
    type === "help-offer" ? (item as HelpOffer).type : ""
  );
  const [availability, setAvailability] = useState(
    type === "help-offer" ? (item as HelpOffer).availability : ""
  );
  const [contactPreference, setContactPreference] = useState(
    type === "help-offer" ? (item as HelpOffer).contactPreference : ""
  );

  const thumbnail = item.photos?.[0]?.url;

  const handleSave = async () => {
    setSaving(true);

    let url = "";
    let payload = {};

    if (type === "donation") {
      url = `/api/donations/${item.id}`;
      payload = {
        title,
        category,
        description,
      };
    } else {
      url = `/api/help-offers/${item.id}`;
      payload = {
        title,
        type: offerType,
        description,
        availability,
        contactPreference,
      };
    }

    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const updated = await res.json();
    setSaving(false);
    setEditing(false);
    onUpdate?.(updated);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this item?")) return;

    const url =
      type === "donation"
        ? `/api/donations/${item.id}`
        : `/api/help-offers/${item.id}`;

    await fetch(url, { method: "DELETE" });
    onDelete?.(item.id);
  };

  return (
    <div className="border rounded p-4 bg-white shadow-sm">
      {thumbnail && !editing && (
        <img
          src={thumbnail}
          alt={item.title}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      {editing ? (
        <div className="space-y-2">
          <input
            className="border rounded w-full px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border rounded w-full px-2 py-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {type === "donation" && (
            <input
              className="border rounded w-full px-2 py-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          )}

          {type === "help-offer" && (
            <>
              <input
                className="border rounded w-full px-2 py-1"
                value={offerType}
                onChange={(e) => setOfferType(e.target.value)}
                placeholder="Type of help"
              />

              <input
                className="border rounded w-full px-2 py-1"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="Availability"
              />

              <input
                className="border rounded w-full px-2 py-1"
                value={contactPreference}
                onChange={(e) => setContactPreference(e.target.value)}
                placeholder="Contact preference"
              />
            </>
          )}
        </div>
      ) : (
        <>
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-gray-600 capitalize">
            {type === "donation"
              ? (item as Donation).category
              : (item as HelpOffer).type}
          </p>
        </>
      )}

      <div className="flex gap-3 mt-3">
  <Link
    href={`/rst/dashboard/${item.id}`}
    className="bg-gray-200 px-4 py-2 rounded inline-flex items-center justify-center"
  >
    View
  </Link>
</div>
          <>
            <button
              onClick={() => setEditing(true)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Delete
            </button>
          </>
        )}

        {editing && (
          <>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => {
                setEditing(false);
                setTitle(item.title);
                setDescription(item.description || "");

                if (type === "donation") {
                  setCategory((item as Donation).category);
                } else {
                  setOfferType((item as HelpOffer).type);
                  setAvailability((item as HelpOffer).availability);
                  setContactPreference(
                    (item as HelpOffer).contactPreference
                  );
                }
              }}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}