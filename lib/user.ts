export function getUserId() {
  if (typeof window === "undefined") return null;

  let id = localStorage.getItem("rst_user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("rst_user_id", id);
  }
  return id;
}