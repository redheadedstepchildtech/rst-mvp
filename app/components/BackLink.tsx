export function BackLink({ href = "/rst2" }) {
  return (
    <a
      href={href}
      className="text-blue-600 hover:underline inline-block mb-4"
    >
      ← Back
    </a>
  );
}