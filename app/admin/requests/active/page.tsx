<form
  action="/api/requests/fulfill"
  method="POST"
  className="space-y-2"
>
  <input type="hidden" name="id" value={req.id} />

  <input
    type="text"
    name="fulfilledBy"
    placeholder="Who fulfilled this? (Partner, donor, or 'Anonymous')"
    className="w-full border p-2 rounded"
    required
  />

  <textarea
    name="note"
    placeholder="Fulfillment note (optional)"
    className="w-full border p-2 rounded h-20"
  />

  <button
    type="submit"
    className="bg-green-700 text-white px-4 py-2 rounded"
  >
    Mark as Fulfilled
  </button>
</form>