/* eslint-disable @typescript-eslint/no-require-imports */
const { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync, readdirSync } = require("fs");
const { join } = require("path");
const youtubedl = require("yt-dlp-exec");

const root = join(__dirname, "..");
const configPath = join(root, "src", "config", "wedding.config.json");
const config = JSON.parse(readFileSync(configPath, "utf8"));

const sourceUrl = config.music?.src?.trim();
const outputName = "wedding-music";

if (!sourceUrl) {
  console.log("music.src is empty — skip download.");
  process.exit(0);
}

function normalizeYoutubeUrl(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      if (id) return `https://www.youtube.com/watch?v=${id}`;
    }

    if (host === "music.youtube.com" || host === "youtube.com" || host === "m.youtube.com") {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/watch?v=${videoId}`;
    }
  } catch {
    /* keep original */
  }

  return url;
}

function isRemoteMediaUrl(url) {
  return /^https?:\/\//i.test(url);
}

if (!isRemoteMediaUrl(sourceUrl)) {
  console.log("music.src is already a local path — skip download.");
  process.exit(0);
}

const url = normalizeYoutubeUrl(sourceUrl);
const outDir = join(root, "public", "audio");

mkdirSync(outDir, { recursive: true });

for (const file of readdirSync(outDir)) {
  if (file.startsWith(`${outputName}.`)) {
    unlinkSync(join(outDir, file));
  }
}

const outputTemplate = join(outDir, `${outputName}.%(ext)s`);

async function download(flags) {
  return youtubedl(url, {
    output: outputTemplate,
    noPlaylist: true,
    noWarnings: true,
    preferFreeFormats: true,
    ...flags,
  });
}

function findDownloadedFile() {
  return readdirSync(outDir).find((file) => file.startsWith(`${outputName}.`));
}

function updateConfigFile(publicPath) {
  if (!config.music) config.music = { src: sourceUrl, enabled: true };
  config.music.file = publicPath;
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
}

async function main() {
  console.log(`Downloading audio from:\n  ${url}`);

  try {
    await download({
      extractAudio: true,
      audioFormat: "mp3",
      audioQuality: 0,
    });
  } catch (error) {
    const message = String(error?.stderr || error?.message || error);
    if (!/ffmpeg|ffprobe/i.test(message)) {
      throw error;
    }

    console.log("ffmpeg not found — downloading best audio without conversion…");
    await download({
      format: "bestaudio[ext=m4a]/bestaudio/best",
    });
  }

  const downloaded = findDownloadedFile();
  if (!downloaded) {
    console.error("Download finished but output file was not found.");
    process.exit(1);
  }

  const publicPath = `/audio/${downloaded}`;
  updateConfigFile(publicPath);

  console.log(`Done → public${publicPath}`);
  console.log(`Updated music.file in wedding.config.json`);
}

main().catch((error) => {
  console.error("Download failed:", error?.stderr || error?.message || error);
  process.exit(1);
});
