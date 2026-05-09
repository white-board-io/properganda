import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type ColoringPageAsset = {
  id: string;
  title: string;
  filename: string;
  src: string;
  width: number;
  height: number;
};

const COLORING_PAGES_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "proper",
  "mothers-day",
  "coloring-pages",
);
const IMAGE_FILENAME_PATTERN = /^Mothers-Day-\d+\.png$/i;
const PNG_SIGNATURE = "89504e470d0a1a0a";

function getMothersDayImagePath(filename: string) {
  if (!IMAGE_FILENAME_PATTERN.test(filename) || path.basename(filename) !== filename) {
    return null;
  }

  return path.join(COLORING_PAGES_DIRECTORY, filename);
}

export async function getMothersDayColoringPages(): Promise<ColoringPageAsset[]> {
  let files: string[];

  try {
    files = await readdir(COLORING_PAGES_DIRECTORY);
  } catch {
    return [];
  }

  const pages = await Promise.all(
    files
      .filter((filename) => getMothersDayImagePath(filename))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map(async (filename) => {
        const filePath = getMothersDayImagePath(filename);
        if (!filePath) return null;

        const { width, height } = await readPngSize(filePath);
        const pageNumber = filename.match(/\d+/)?.[0] ?? "";

        return {
          id: filename.replace(/\.[^.]+$/, "").toLowerCase(),
          title: pageNumber ? `Page ${pageNumber}` : "Coloring page",
          filename,
          src: `/proper/mothers-day/coloring-pages/${encodeURIComponent(filename)}`,
          width,
          height,
        };
      }),
  );

  return pages.filter((page): page is ColoringPageAsset => page !== null);
}

async function readPngSize(filePath: string) {
  const buffer = await readFile(filePath);

  if (buffer.subarray(0, 8).toString("hex") !== PNG_SIGNATURE) {
    throw new Error(`Unsupported image format: ${filePath}`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}
