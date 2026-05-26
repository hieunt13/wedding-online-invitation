/* eslint-disable @typescript-eslint/no-require-imports */
const { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync, readdirSync } = require("fs");
const { join } = require("path");
const { spawn } = require("child_process");

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

function runYtDlp(extraArgs) {
  const args = [
    url,
    "-o",
    outputTemplate,
    "--no-playlist",
    "--no-warnings",
    "--prefer-free-formats",
    ...extraArgs,
  ];

  return new Promise((resolve, reject) => {
    const proc = spawn("yt-dlp", args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";

    proc.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      process.stderr.write(chunk);
    });

    proc.stdout.on("data", (chunk) => process.stdout.write(chunk));

    proc.on("error", (error) => {
      if (error.code === "ENOENT") {
        reject(
          new Error(
            "yt-dlp not found. Install it first, e.g. `brew install yt-dlp`, then run `npm run download-music` again."
          )
        );
        return;
      }
      reject(error);
    });

    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr.trim() || `yt-dlp exited with code ${code}`));
    });
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
    await runYtDlp(["-x", "--audio-format", "mp3", "--audio-quality", "0"]);
  } catch (error) {
    const message = String(error?.message || error);
    if (!/ffmpeg|ffprobe/i.test(message)) {
      throw error;
    }

    console.log("ffmpeg not found — downloading best audio without conversion…");
    await runYtDlp(["-f", "bestaudio[ext=m4a]/bestaudio/best"]);
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
  console.error("Download failed:", error?.message || error);
  process.exit(1);
});
