// Builds optimised public images from the original app screenshots in assets/source.
// Run with: npm run images   (outputs are committed in public/images)
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const src = (f) => path.join(root, "assets", "source", f);
const out = (f) => path.join(root, "public", f);
await mkdir(out("images"), { recursive: true });

/** Blur rectangular regions so real tenant data is not published on the marketing site. */
async function redact(file, regions) {
  let base = sharp(src(file));
  const layers = [];
  for (const r of regions) {
    const patch = await sharp(src(file)).extract(r).blur(16).modulate({ saturation: 0.9 }).toBuffer();
    layers.push({ input: patch, left: r.left, top: r.top });
  }
  return base.composite(layers).png().toBuffer();
}

const shots = [
  {
    name: "food-app",
    // Crop above the "Reorder" area (personal order history).
    buffer: await readFile(src("food-app.png")),
    crop: { left: 0, top: 0, width: 750, height: 1290 },
  },
  {
    name: "work-app",
    // Crop above the live complex statistics; blur the featured tenant's name, description and rating.
    buffer: await redact("work-app.png", [
      { left: 18, top: 500, width: 440, height: 195 },
      { left: 596, top: 672, width: 116, height: 62 },
    ]),
    crop: { left: 0, top: 0, width: 754, height: 1240 },
  },
];

for (const s of shots) {
  const cropped = await sharp(s.buffer).extract(s.crop).png().toBuffer();
  for (const w of [380, 760]) {
    await sharp(cropped)
      .resize({ width: w })
      .webp({ quality: 82, effort: 6 })
      .toFile(out(`images/${s.name}-${w}.webp`));
  }
  s.cropped = cropped;
}

// ---- Brand mark (assets/brand/logo-source.png, supplied by the owner) ----
// Clears faint anti-alias specks around the artwork, trims it, then renders lossless PNGs at the
// exact pixel sizes the header and footer display (1x/2x/3x) so the mark stays sharp.
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
const markTall = await (async () => {
  const { data, info } = await sharp(path.join(root, "assets", "brand", "logo-source.png"))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) if (data[i] < 60) data[i] = 0;
  const png = await sharp(data, { raw: info }).png().toBuffer();
  return sharp(png).trim({ threshold: 1 }).png().toBuffer();
})();
// Square version (centred) for icons, the share image and structured data.
const mark = await (async () => {
  const { width, height } = await sharp(markTall).metadata();
  const side = Math.max(width, height);
  return sharp({ create: { width: side, height: side, channels: 4, background: transparent } })
    .composite([{ input: markTall, gravity: "center" }])
    .png()
    .toBuffer();
})();
await mkdir(out("brand"), { recursive: true });
// Keep in sync with MARK_HEIGHTS in components/Logo.tsx.
for (const [h, w] of [[44, 36], [56, 45]]) {
  for (const d of [1, 2, 3]) {
    await sharp(markTall)
      .resize({ width: w * d, height: h * d, fit: "contain", background: transparent, kernel: "lanczos3" })
      .png({ compressionLevel: 9 })
      .toFile(out(`brand/logo-mark-${h * d}.png`));
  }
}
await sharp(mark).resize(512, 512).png({ compressionLevel: 9 }).toFile(out("brand/logo-mark-512.png"));

// ---- Open Graph image (1200x630) ----
const phone = async (buf, h) =>
  sharp(buf)
    .resize({ height: h })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${Math.round((h * 750) / 1290)}" height="${h}"><rect width="100%" height="100%" rx="34" ry="34"/></svg>`,
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#FBF5EC"/>
  <rect x="660" y="0" width="270" height="630" fill="#FF7A1A"/>
  <rect x="930" y="0" width="270" height="630" fill="#1E0B38"/>
  <g font-family="Segoe UI, Helvetica, Arial, sans-serif">
    <text x="72" y="110" font-size="22" font-weight="700" fill="#7A4A1E" letter-spacing="3">FOOD · SERVICES · BUSINESS DISCOVERY</text>
    <text x="72" y="230" font-size="64" font-weight="900" fill="#17121F">Your Complex.</text>
    <text x="72" y="320" font-size="64" font-weight="900" fill="#17121F">More <tspan fill="#E2600A">Connected.</tspan></text>
    <text x="72" y="400" font-size="27" font-weight="500" fill="#4A4152">One platform for the businesses</text>
    <text x="72" y="438" font-size="27" font-weight="500" fill="#4A4152">inside your commercial complex.</text>
    <text x="150" y="560" font-size="36" font-weight="800" fill="#17121F">thebizz<tspan fill="#6B2BD9">360</tspan></text>
  </g>
</svg>`;

const foodPhone = await phone(shots[0].cropped, 520);
const workPhone = await phone(shots[1].cropped, 520);
await sharp(Buffer.from(ogSvg))
  .composite([
    { input: foodPhone, left: 680, top: 70 },
    { input: workPhone, left: 950, top: 70 },
    { input: await sharp(mark).resize(68, 68).png().toBuffer(), left: 70, top: 512 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(out("og-image.png"));

// ---- Icons (generated from the brand mark above) ----
const icon = async (size, file, pad = 0.08) => {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(mark).resize(inner, inner, { fit: "contain", background: transparent }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#FBF5EC" } })
    .composite([{ input: m, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(out(file));
};
await icon(180, "apple-touch-icon.png");
await icon(512, "icon-512.png");
await icon(192, "icon-192.png");
// Small favicon: transparent, tight padding so the building reads at tab size.
await sharp(mark).resize(48, 48, { fit: "contain", background: transparent }).png().toFile(out("favicon-48.png"));

// ---- Photography (Unsplash License, see assets/source/photos/CREDITS.md) ----
const photos = ["food-thali", "food-desk", "food-snacks", "work-tower", "work-lobby", "work-meeting-room", "work-lounge"];
for (const p of photos) {
  for (const w of [720, 1400]) {
    await sharp(path.join(root, "assets", "source", "photos", `${p}.jpg`))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 74, effort: 6 })
      .toFile(out(`images/${p}-${w}.webp`));
  }
}

console.log("Images built.");
