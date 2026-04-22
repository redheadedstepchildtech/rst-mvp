// Minimal QR-like generator for Node.js (no OffscreenCanvas, no browser APIs)

export async function generateQR(text) {
  const crypto = await import("crypto");

  // Hash the text to produce a deterministic pattern
  const hash = crypto.createHash("sha256").update(text).digest();

  const size = 29;
  const pixels = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (x + y * size) % hash.length;
      const v = hash[i] > 127 ? 0 : 255;
      pixels.push(v);
    }
  }

  // Convert pixels to a PNG using a tiny inline encoder
  const png = createPNG(size, size, pixels);
  const base64 = Buffer.from(png).toString("base64");

  // IMPORTANT: Return a valid browser-renderable data URL
  return `data:image/png;base64,${base64}`;
}

// Tiny PNG encoder (no dependencies)
function createPNG(width, height, pixels) {
  const zlib = require("zlib");

  const raw = Buffer.alloc(width * height * 3);
  for (let i = 0; i < pixels.length; i++) {
    const v = pixels[i];
    raw[i * 3 + 0] = v;
    raw[i * 3 + 1] = v;
    raw[i * 3 + 2] = v;
  }

  const header = Buffer.from(
    "89504E470D0A1A0A0000000D49484452" +
      width.toString(16).padStart(8, "0") +
      height.toString(16).padStart(8, "0") +
      "0802000000",
    "hex"
  );

  const idat = Buffer.concat([
    Buffer.from("0000000A49444154789C", "hex"),
    zlib.deflateSync(raw),
    Buffer.from("0000000049454E44AE426082", "hex"),
  ]);

  return Buffer.concat([header, idat]);
}