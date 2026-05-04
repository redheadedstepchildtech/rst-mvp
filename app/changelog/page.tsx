import fs from "fs";
import path from "path";
import React from "react";

export default function ChangelogPage() {
  const changelogPath = path.join(process.cwd(), "CHANGELOG.md");
  const changelog = fs.readFileSync(changelogPath, "utf8");

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Changelog</h1>

      <article className="prose prose-gray max-w-none whitespace-pre-wrap">
        {changelog}
      </article>
    </div>
  );
}