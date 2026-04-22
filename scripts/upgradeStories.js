import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function upgradeStory(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  const now = new Date();
  const iso = now.toISOString();
  const human = now.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  // Add missing fields
  if (!data.category) data.category = "Other";
  if (!data.tags) data.tags = [];

  if (!data.lastUpdatedISO) data.lastUpdatedISO = iso;
  if (!data.lastUpdatedHuman) data.lastUpdatedHuman = human;

  if (!data.analytics) {
    data.analytics = {
      views: 0,
      qrScans: 0,
      shares: {
        facebook: 0,
        nextdoor: 0,
        reddit: 0,
        email: 0,
        sms: 0,
        messenger: 0,
      },
    };
  }

  // Save updated file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function run() {
  const files = fs.readdirSync(dataDir);

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(dataDir, file);
      console.log("Upgrading:", file);
      upgradeStory(filePath);
    }
  });

  console.log("Upgrade complete.");
}

run();