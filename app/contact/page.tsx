export default function ContactSupport() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold">Contact & Support</h1>

      <p className="text-gray-700 leading-relaxed">
        Support features are coming soon. RST will eventually include a simple way 
        to ask questions, report issues, or get help using the platform.
      </p>

      <p className="text-gray-700 leading-relaxed">
        For now, please check the <a href="/about#faq" className="text-blue-600 underline">FAQ section</a> 
        for answers to common questions.
      </p>

      <div className="mt-6 p-4 bg-gray-100 rounded border">
        <p className="text-gray-600">
          RST is currently in early development. Support tools will be added in a future update.
        </p>
      </div>
    </div>
  );
}