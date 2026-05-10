import { mkdir, appendFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

type DownloadPayload = {
  imageBase64?: string;
  selectedImageId?: string;
  selectedImageFilename?: string;
};

const DATA_DIR = path.join(process.cwd(), "public", "proper", "mothers-day", "downloads");
const INDEX_FILE = path.join(DATA_DIR, "downloads-log.ndjson");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DownloadPayload;

    if (!body.imageBase64 || typeof body.imageBase64 !== "string") {
      return NextResponse.json({ error: "imageBase64 is required" }, { status: 400 });
    }

    const matches = body.imageBase64.match(/^data:image\/(png|jpeg);base64,(.+)$/);
    if (!matches) {
      return NextResponse.json(
        { error: "imageBase64 must be a data URL for png or jpeg" },
        { status: 400 },
      );
    }

    const [, extension, base64Data] = matches;
    const buffer = Buffer.from(base64Data, "base64");
    const timestamp = new Date();
    const id = randomUUID();
    const filename = `${timestamp.toISOString().replace(/[:.]/g, "-")}-${id}.${extension}`;

    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(path.join(DATA_DIR, filename), buffer);

    const logEntry = {
      id,
      createdAt: timestamp.toISOString(),
      filename,
      selectedImageId: body.selectedImageId ?? null,
      selectedImageFilename: body.selectedImageFilename ?? null,
      bytes: buffer.byteLength,
    };

    await appendFile(INDEX_FILE, `${JSON.stringify(logEntry)}\n`, "utf8");

    return NextResponse.json({ ok: true, filename });
  } catch (error) {
    console.error("Failed to save Mother's Day download", error);
    return NextResponse.json({ error: "Failed to save download" }, { status: 500 });
  }
}
