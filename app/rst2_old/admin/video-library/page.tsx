import fs from "fs";
import path from "path";
import UpgradeModal from "@/app/rst2/components/UpgradeModal";

const searchParams = new URL(req.url).searchParams;
const error = searchParams.get("error");
const [showModal, setShowModal] = useState(!!modalMessage);
const search = searchParams.get("search")?.toLowerCase() || "";
const filteredVideos = videos.filter(v =>
  v.title.toLowerCase().includes(search) ||
  (v.description || "").toLowerCase().includes(search) ||
  (v.categories || []).some(c => c.toLowerCase().includes(search)) ||
  (v.tags || []).some(t => t.toLowerCase().includes(search))
);

/*  
if (uploadTooLarge) {
  modalMessage = "This video file is too large for your current plan.";
}

if (videoTooLong) {
  modalMessage = "This video is longer than your plan allows.";
}

if (uploadLimitReached) {
  modalMessage = "You have reached your video upload limit for this plan.";
}
*/

<a
  href="/rst2/admin/video-library/tags"
  className="px-3 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
>
  Browse Tags
</a>

<a
  href="/rst2/admin/video-library/categories"
  className="px-3 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
>
  Browse Categories
</a>

<div className="flex flex-wrap gap-1 mt-1">
  {(video.tags || []).slice(0, 3).map(tag => (
    <span
      key={tag}
      className="text-xs bg-gray-100 px-2 py-0.5 rounded-full border"
    >
      #{tag}
    </span>
  ))}
</div>

<form method="GET" className="mb-4">
  <input
    type="text"
    name="search"
    placeholder="Search videos..."
    className="w-full p-3 border rounded-lg"
    defaultValue={searchParams.get("search") || ""}
  />
</form>

{showModal && (
  <UpgradeModal
    message={modalMessage}
    onClose={() => setShowModal(false)}
  />
)}

function getVideoLimit(subscription) {
  switch (subscription) {
    case "free":
      return 1;
    case "basic":
      return 5;
    case "premium":
      return 9999; // unlimited
    case "legacy":
      return 9999; // unlimited
    default:
      return 1;
  }
}

export default function VideoLibrary() {
  const videoDir = path.join(process.cwd(), "data", "videos");
const userPath = path.join(process.cwd(), "data", "users", "user123.json");
const user = JSON.parse(fs.readFileSync(userPath, "utf8"));

const videoLimit = getVideoLimit(user.subscription);
const canUpload = videos.length < videoLimit;

  // Ensure folder exists
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const files = fs.readdirSync(videoDir);

  const videos = files.map((file) => {
    const filePath = path.join(videoDir, file);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back to Dashboard */}
        <a
          href="/rst2/admin"
          className="inline-block px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-300"
        >
          ← Back to Dashboard
        </a>

        <h1 className="text-3xl font-bold text-gray-900">Video Library</h1>
        <p className="text-gray-600">Your saved videos and premium features.</p>

        {canUpload ? (
  <a
    href="/rst2/admin/video-library/upload"
    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
  >
    Upload New Video
  </a>
) : (
  <div className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md">
    Video limit reached — Upgrade to add more
  </div>
)}
        {/* Video Grid */}
        <div key={video.id} className="bg-white p-3 rounded-lg shadow-sm border">
  <img
    src={video.thumbnail}
    className="w-full h-32 object-cover rounded-md border"
  />

  <p className="mt-2 text-sm font-semibold text-gray-800">
    {video.title}
  </p>

  <p className="text-xs text-gray-500">
    {new Date(video.createdAt).toLocaleDateString()}
  </p>

<a href={`/rst2/admin/video-library/${video.id}`}>
  <div className="bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition">
    <img src={video.thumbnail} className="w-full h-32 object-cover rounded-md border" />
    <p className="mt-2 text-sm font-semibold text-gray-800">{video.title}</p>
    <p className="text-xs text-gray-500">{new Date(video.createdAt).toLocaleDateString()}</p>
  </div>
</a>

  <video
    src={video.url}
    controls
    className="w-full mt-2 rounded-md"
  />
</div>
          ))}

          {Array.from({ length: videoLimit - videos.length }).map((_, i) => (
  <div
    key={`locked-${i}`}
    className="bg-gray-100 p-3 rounded-lg border flex items-center justify-center text-gray-400 text-sm"
  >
    Locked — Upgrade Plan
  </div>
))}

<div className="mt-6 p-4 bg-white rounded-lg shadow-sm border">
  <h3 className="text-lg font-semibold">Upgrade Your Plan</h3>
  <p className="text-gray-600 mt-1">Unlock more video slots and premium features.</p>

  <div className="flex flex-wrap gap-2 mt-3">
    <a href="/rst2/subscribe/basic" className="px-3 py-2 bg-purple-600 text-white rounded-md">
      Basic — $5/mo
    </a>
    <a href="/rst2/subscribe/premium" className="px-3 py-2 bg-purple-700 text-white rounded-md">
      Premium — $10/mo
    </a>
    <a href="/rst2/subscribe/legacy" className="px-3 py-2 bg-purple-800 text-white rounded-md">
      Legacy Vault — $20/mo
    </a>
  </div>
</div>