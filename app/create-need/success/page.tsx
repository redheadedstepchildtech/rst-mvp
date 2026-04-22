export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-sm">
        
        <div className="text-6xl text-emerald-400">✓</div>

        <h1 className="text-3xl font-bold">Your need is live!</h1>

        <p className="text-slate-300">
          Thank you for sharing your story. You can now share your listing or visit your dashboard.
        </p>

        <div className="space-y-3">
          <button className="w-full py-3 rounded-xl bg-emerald-400 text-slate-900 font-bold text-lg">
            Share My Need
          </button>

          <a
            href="/dashboard"
            className="block w-full py-3 rounded-xl bg-slate-700 text-white font-bold text-lg"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}