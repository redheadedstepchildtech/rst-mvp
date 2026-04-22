import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function validateStory(file, json) {
  const errors = [];

  if (!json.name?.trim()) errors.push("Missing name");
  if (!json.category?.trim()) errors.push("Missing category");
  if (!Array.isArray(json.tags)) errors.push("Tags must be an array");
  if (!json.needs?.trim()) errors.push("Missing needs");
  if (!json.story?.trim()) errors.push("Missing story text");
  if (!json.city?.trim()) errors.push("Missing city");
  if (!json.state?.trim()) errors.push("Missing state");

  return errors;
}

function run() {
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));

  console.log(`\nScanning ${files.length} story files...\n`);

  for (const file of files) {
    const fullPath = path.join(dataDir, file);

    let json;
    try {
      const raw = fs.readFileSync(fullPath, "utf8");
      json = JSON.parse(raw);
    } catch (err) {
      console.log(`❌ ${file}: INVALID JSON`);
      continue;
    }

    const errors = validateStory(file, json);

    if (errors.length === 0) {
      console.log(`✔ ${file}: OK`);
    } else {
      console.log(`⚠ ${file}:`);
      errors.forEach((e) => console.log(`   - ${e}`));
    }
  }

  console.log("\nScan complete.\n");
}

run();