import { randomUUID } from "node:crypto";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

type DownloadPayload = {
  imageBase64?: string;
  selectedImageId?: string;
  selectedImageFilename?: string;
};

type BlobAccess = "private" | "public";

const BLOB_BASE_PATH = "proper/mothers-day/downloads";
const BLOB_ACCESS: BlobAccess =
  process.env.MOTHERS_DAY_BLOB_ACCESS === "private" ? "private" : "public";

function toPathSegment(value: string | null | undefined) {
  return value?.replace(/[^a-zA-Z0-9-]/g, "-").replace(/-+/g, "-").toLowerCase() || "unknown";
}

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
    const selectedImageId = body.selectedImageId ?? null;
    const selectedImageFilename = body.selectedImageFilename ?? null;
    const pathname = `${BLOB_BASE_PATH}/${toPathSegment(selectedImageId)}/${filename}`;

    const blob = await put(pathname, buffer, {
      access: BLOB_ACCESS,
      contentType: `image/${extension}`,
    });

    return NextResponse.json({
      ok: true,
      id,
      filename,
      pathname: blob.pathname,
      url: blob.url,
      createdAt: timestamp.toISOString(),
      selectedImageId,
      selectedImageFilename,
      bytes: buffer.byteLength,
    });
  } catch (error) {
    console.error("Failed to save Mother's Day download", error);
    return NextResponse.json({ error: "Failed to save download" }, { status: 500 });
  }
}
