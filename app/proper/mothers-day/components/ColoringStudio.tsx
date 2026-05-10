"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import {
  ArrowLeft,
  Brush,
  Download,
  Eraser,
  Heart,
  Images,
  Menu,
  MousePointer2,
  Pencil,
  Printer,
  Redo2,
  Share2,
  Sparkles,
  Type as TypeIcon,
  Undo2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const PALETTE = [
  { name: "Coral Red", value: "#E57A7A" },
  { name: "Soft Orange", value: "#F2A65A" },
  { name: "Pale Yellow", value: "#FCE28B" },
  { name: "Mint Green", value: "#A2D3C2" },
  { name: "Baby Blue", value: "#8BB8E8" },
  { name: "Lavender", value: "#C1A5D8" },
  { name: "Petal Pink", value: "#E8B4CB" },
  { name: "Dusty Rose", value: "#8B4D41" },
  { name: "Sage", value: "#55624F" },
  { name: "Charcoal", value: "#2D3132" },
  { name: "Cream", value: "#F5EFE6" },
];

const STICKERS = ["❤️", "🌸", "🌷", "✨", "⭐", "🦋", "🌟", "💐", "🥰", "🎀"];

type Tool = "brush" | "pencil" | "eraser" | "sticker" | "text" | "pointer";

type StickerItem = {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
};

type TextItem = {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  size: number;
};
type HistoryState = {
  base: ImageData;
  stickers: StickerItem[];
  texts: TextItem[];
};

type ColoringPageImage = {
  id: string;
  title: string;
  filename: string;
  src: string;
  width: number;
  height: number;
};

const CANVAS_WIDTH = 1240;
const DEFAULT_CANVAS_HEIGHT = 1754;
const HISTORY_LIMIT = 40;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

const clampZoom = (value: number) =>
  Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));

export default function ColoringStudio({ images }: { images: ColoringPageImage[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const lineArtRef = useRef<HTMLImageElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<ColoringPageImage | null>(null);
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState<string>(PALETTE[0].value);
  const [brushSize, setBrushSize] = useState<number>(18);
  const [pageZoom, setPageZoom] = useState<number>(MIN_ZOOM);
  const [activeSticker, setActiveSticker] = useState<string>(STICKERS[0]);
  const [showStickers, setShowStickers] = useState(false);
  const [showTextDialog, setShowTextDialog] = useState(false);
  const [textInput, setTextInput] = useState("Happy Mother's Day, Mom ❤");
  const [textPlacement, setTextPlacement] =
    useState<{ x: number; y: number } | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [exportedDataUrl, setExportedDataUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [lineArtReady, setLineArtReady] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const historyRef = useRef<HistoryState[]>([]);
  const futureRef = useRef<HistoryState[]>([]);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const stickersRef = useRef<StickerItem[]>([]);
  const textsRef = useRef<TextItem[]>([]);
  const dragRef = useRef<
    | { kind: "sticker" | "text"; id: string; dx: number; dy: number }
    | null
  >(null);
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(
    new Map(),
  );
  const pinchRef = useRef<{
    startCenter: { x: number; y: number };
    startDistance: number;
    startScrollLeft: number;
    startScrollTop: number;
    startZoom: number;
  } | null>(null);
  const [, setOverlayVersion] = useState(0);

  const canvasSize = useMemo(() => {
    if (!selectedImage) {
      return { width: CANVAS_WIDTH, height: DEFAULT_CANVAS_HEIGHT };
    }

    return {
      width: CANVAS_WIDTH,
      height: Math.round(CANVAS_WIDTH * (selectedImage.height / selectedImage.width)),
    };
  }, [selectedImage]);

  const syncOverlayFromState = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    for (const sticker of stickersRef.current) {
      ctx.save();
      ctx.font = `${sticker.size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sticker.emoji, sticker.x, sticker.y);
      ctx.restore();
    }

    for (const item of textsRef.current) {
      ctx.save();
      ctx.font = `600 ${item.size}px "Quicksand", "Inter", system-ui, sans-serif`;
      ctx.fillStyle = item.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
      ctx.shadowBlur = 8;
      ctx.fillText(item.text, item.x, item.y);
      ctx.restore();
    }
    setOverlayVersion((v) => v + 1);
  }, [canvasSize.height, canvasSize.width]);

  /* ------------------------------- history ----------------------------- */

  const pushHistory = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const snap: HistoryState = {
      base: ctx.getImageData(0, 0, canvasSize.width, canvasSize.height),
      stickers: stickersRef.current.map((item) => ({ ...item })),
      texts: textsRef.current.map((item) => ({ ...item })),
    };
    historyRef.current.push(snap);
    if (historyRef.current.length > HISTORY_LIMIT) {
      historyRef.current.shift();
    }
    futureRef.current = [];
  }, [canvasSize.height, canvasSize.width]);

  const undo = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || historyRef.current.length <= 1) return;
    const current = historyRef.current.pop()!;
    futureRef.current.push(current);
    const previous = historyRef.current[historyRef.current.length - 1];
    ctx.putImageData(previous.base, 0, 0);
    stickersRef.current = previous.stickers.map((item) => ({ ...item }));
    textsRef.current = previous.texts.map((item) => ({ ...item }));
    syncOverlayFromState();
  }, [syncOverlayFromState]);

  const redo = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || futureRef.current.length === 0) return;
    const next = futureRef.current.pop()!;
    historyRef.current.push(next);
    ctx.putImageData(next.base, 0, 0);
    stickersRef.current = next.stickers.map((item) => ({ ...item }));
    textsRef.current = next.texts.map((item) => ({ ...item }));
    syncOverlayFromState();
  }, [syncOverlayFromState]);

  /* ----------------------------- canvas init ---------------------------- */

  useEffect(() => {
    const base = canvasRef.current;
    const overlay = overlayRef.current;
    if (!base || !overlay || !selectedImage) return;

    base.width = canvasSize.width;
    base.height = canvasSize.height;
    overlay.width = canvasSize.width;
    overlay.height = canvasSize.height;

    const ctx = base.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    const overlayCtx = overlay.getContext("2d");
    overlayCtx?.clearRect(0, 0, canvasSize.width, canvasSize.height);
    historyRef.current = [];
    futureRef.current = [];
    stickersRef.current = [];
    textsRef.current = [];
    dragRef.current = null;
    activePointersRef.current.clear();
    pinchRef.current = null;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    setPageZoom(MIN_ZOOM);
    setShowWelcome(true);
    setOverlayVersion((version) => version + 1);
    pushHistory();
  }, [canvasSize.height, canvasSize.width, pushHistory, selectedImage]);

  /* ----------------------------- coordinates --------------------------- */

  const getCanvasPoint = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return { x: 0, y: 0 };
      const rect = wrapper.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * canvasSize.width;
      const y = ((event.clientY - rect.top) / rect.height) * canvasSize.height;
      return { x, y };
    },
    [canvasSize.height, canvasSize.width],
  );

  /* ------------------------------ drawing ------------------------------ */

  const drawLine = useCallback(
    (from: { x: number; y: number }, to: { x: number; y: number }) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = brushSize * 1.6;
        ctx.strokeStyle = "rgba(0,0,0,1)";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.lineWidth = tool === "pencil" ? Math.max(2, brushSize * 0.4) : brushSize;
        ctx.strokeStyle = color;
        ctx.globalAlpha = tool === "pencil" ? 0.85 : 1;
      }
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      ctx.restore();
    },
    [brushSize, color, tool],
  );

  /* ------------------------- hit testing (pointer) --------------------- */

  const measureTextWidth = (text: string, size: number) => {
    const overlay = overlayRef.current;
    if (!overlay) return text.length * size * 0.55;
    const ctx = overlay.getContext("2d");
    if (!ctx) return text.length * size * 0.55;
    ctx.save();
    ctx.font = `600 ${size}px "Quicksand", "Inter", system-ui, sans-serif`;
    const width = ctx.measureText(text).width;
    ctx.restore();
    return width;
  };

  const hitTest = (
    point: { x: number; y: number },
  ):
    | { kind: "sticker"; item: StickerItem }
    | { kind: "text"; item: TextItem }
    | null => {
    for (let i = textsRef.current.length - 1; i >= 0; i--) {
      const t = textsRef.current[i];
      const w = measureTextWidth(t.text, t.size);
      const halfW = w / 2 + 24;
      const halfH = t.size / 2 + 16;
      if (
        point.x >= t.x - halfW &&
        point.x <= t.x + halfW &&
        point.y >= t.y - halfH &&
        point.y <= t.y + halfH
      ) {
        return { kind: "text", item: t };
      }
    }
    for (let i = stickersRef.current.length - 1; i >= 0; i--) {
      const s = stickersRef.current[i];
      const half = s.size / 2 + 8;
      if (
        point.x >= s.x - half &&
        point.x <= s.x + half &&
        point.y >= s.y - half &&
        point.y <= s.y + half
      ) {
        return { kind: "sticker", item: s };
      }
    }
    return null;
  };

  /* ----------------------------- mobile zoom --------------------------- */

  const getTouchPoints = () => Array.from(activePointersRef.current.values());

  const getPointDistance = (
    first: { x: number; y: number },
    second: { x: number; y: number },
  ) => Math.hypot(second.x - first.x, second.y - first.y);

  const getPointCenter = (
    first: { x: number; y: number },
    second: { x: number; y: number },
  ) => ({
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
  });

  const startPinchZoom = useCallback(() => {
    const [first, second] = getTouchPoints();
    if (!first || !second) return;

    const viewport = viewportRef.current;
    pinchRef.current = {
      startCenter: getPointCenter(first, second),
      startDistance: getPointDistance(first, second),
      startScrollLeft: viewport?.scrollLeft ?? 0,
      startScrollTop: viewport?.scrollTop ?? 0,
      startZoom: pageZoom,
    };
    isDrawingRef.current = false;
    lastPointRef.current = null;
    dragRef.current = null;
  }, [pageZoom]);

  const updatePinchZoom = useCallback(() => {
    const pinch = pinchRef.current;
    const [first, second] = getTouchPoints();
    if (!pinch || !first || !second) return;

    const distance = getPointDistance(first, second);
    const center = getPointCenter(first, second);
    const nextZoom = clampZoom(
      pinch.startZoom * (distance / Math.max(1, pinch.startDistance)),
    );

    setPageZoom(nextZoom);

    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollLeft =
        pinch.startScrollLeft - (center.x - pinch.startCenter.x);
      viewport.scrollTop =
        pinch.startScrollTop - (center.y - pinch.startCenter.y);
    }
  }, []);

  const updateZoom = useCallback((nextZoom: number) => {
    setPageZoom(clampZoom(nextZoom));
    setTool("pointer");
  }, []);

  /* -------------------------- pointer handlers ------------------------- */

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!selectedImage) return;

    event.currentTarget.setPointerCapture?.(event.pointerId);

    if (event.pointerType === "touch") {
      activePointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      if (activePointersRef.current.size >= 2) {
        startPinchZoom();
        return;
      }
    }

    if (showWelcome) setShowWelcome(false);
    const point = getCanvasPoint(event);

    if (tool === "pointer") {
      const hit = hitTest(point);
      if (!hit) return;
      dragRef.current = {
        kind: hit.kind,
        id: hit.item.id,
        dx: point.x - hit.item.x,
        dy: point.y - hit.item.y,
      };
      return;
    }
    if (tool === "sticker") {
      placeSticker(point.x, point.y);
      return;
    }
    if (tool === "text") {
      setTextPlacement(point);
      setShowTextDialog(true);
      return;
    }

    isDrawingRef.current = true;
    lastPointRef.current = point;
    if (event.pointerType !== "touch") {
      drawLine(point, point);
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" && activePointersRef.current.has(event.pointerId)) {
      activePointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      if (pinchRef.current) {
        updatePinchZoom();
        return;
      }
    }

    const point = getCanvasPoint(event);

    if (dragRef.current) {
      const drag = dragRef.current;
      const nx = point.x - drag.dx;
      const ny = point.y - drag.dy;
      if (drag.kind === "sticker") {
        stickersRef.current = stickersRef.current.map((s) =>
          s.id === drag.id ? { ...s, x: nx, y: ny } : s,
        );
      } else {
        textsRef.current = textsRef.current.map((t) =>
          t.id === drag.id ? { ...t, x: nx, y: ny } : t,
        );
      }
      renderOverlay();
      return;
    }

    if (!isDrawingRef.current) return;
    if (lastPointRef.current) {
      drawLine(lastPointRef.current, point);
    }
    lastPointRef.current = point;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const wasPinching = pinchRef.current !== null;

    if (event.pointerType === "touch") {
      activePointersRef.current.delete(event.pointerId);
      if (activePointersRef.current.size < 2) {
        pinchRef.current = null;
      }
    }

    if (wasPinching) {
      isDrawingRef.current = false;
      lastPointRef.current = null;
      dragRef.current = null;
      return;
    }

    if (dragRef.current) {
      dragRef.current = null;
      pushHistory();
      return;
    }
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    pushHistory();
  };

  /* ------------------------------ stickers ----------------------------- */

  const renderOverlay = useCallback(() => {
    syncOverlayFromState();
  }, [syncOverlayFromState]);

  const placeSticker = (x: number, y: number) => {
    const item: StickerItem = {
      id: `${Date.now()}-${Math.random()}`,
      emoji: activeSticker,
      x,
      y,
      size: 96,
    };
    stickersRef.current = [...stickersRef.current, item];
    renderOverlay();
    pushHistory();
    setTool("pointer");
    setShowStickers(false);
  };

  const removeLastSticker = () => {
    stickersRef.current = stickersRef.current.slice(0, -1);
    renderOverlay();
    pushHistory();
  };

  /* -------------------------------- text ------------------------------- */

  const commitText = () => {
    const placement = textPlacement;
    const value = textInput.trim();
    if (!placement || !value) {
      setShowTextDialog(false);
      return;
    }
    const item: TextItem = {
      id: `${Date.now()}-${Math.random()}`,
      text: value,
      x: placement.x,
      y: placement.y,
      color,
      size: 64,
    };
    textsRef.current = [...textsRef.current, item];
    renderOverlay();
    pushHistory();
    setShowTextDialog(false);
    setTextPlacement(null);
    setTool("pointer");
  };

  /* ------------------------------- export ------------------------------ */

  const buildExportCanvas = useCallback(async (): Promise<HTMLCanvasElement> => {
    const out = document.createElement("canvas");
    out.width = canvasSize.width;
    out.height = canvasSize.height;
    const ctx = out.getContext("2d")!;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    const base = canvasRef.current;
    if (base) ctx.drawImage(base, 0, 0);

    const overlay = overlayRef.current;
    if (overlay) ctx.drawImage(overlay, 0, 0);

    const lineArt = lineArtRef.current;
    if (lineArt && lineArt.complete) {
      ctx.save();
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(lineArt, 0, 0, canvasSize.width, canvasSize.height);
      ctx.restore();
    }

    return out;
  }, [canvasSize.height, canvasSize.width]);

  const exportDataUrl = useCallback(async () => {
    setIsExporting(true);
    try {
      const out = await buildExportCanvas();
      return out.toDataURL("image/png");
    } finally {
      setIsExporting(false);
    }
  }, [buildExportCanvas]);

  const saveDownloadForAnalytics = async (imageBase64: string) => {
    if (!selectedImage) return;

    const response = await fetch("/api/mothers-day/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64,
        selectedImageId: selectedImage.id,
        selectedImageFilename: selectedImage.filename,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save download analytics");
    }
  };

  const handleDownload = async () => {
    if (!selectedImage) return;

    const url = await exportDataUrl();

    try {
      await saveDownloadForAnalytics(url);
    } catch {
      toast.message("Download worked, but analytics snapshot could not be saved.");
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = "wish-for-mom.png";
    link.click();
    toast.success("Saved! Your wish is on its way.");
  };

  const handlePrint = async () => {
    if (!selectedImage) return;

    const url = await exportDataUrl();
    const win = window.open("", "_blank");
    if (!win) {
      toast.error("Pop-ups are blocked. Please allow them to print.");
      return;
    }
    win.document.write(`
      <html>
        <head>
          <title>A Wish for Mom</title>
          <style>
            body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #fff; }
            img { max-width: 100%; max-height: 100vh; }
            @media print { body { min-height: auto; } }
          </style>
        </head>
        <body>
          <img src="${url}" alt="A Wish for Mom" onload="setTimeout(() => window.print(), 250)" />
        </body>
      </html>
    `);
    win.document.close();
  };

  const handleShare = async () => {
    if (!selectedImage) return;

    const url = await exportDataUrl();
    setExportedDataUrl(url);
    setShowShareDialog(true);
  };

  const shareViaWebShare = async () => {
    if (!exportedDataUrl) return;
    try {
      const blob = await (await fetch(exportedDataUrl)).blob();
      const file = new File([blob], "wish-for-mom.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "A Wish for Mom",
          text: "Made with love for Mother's Day ❤",
        });
      } else {
        toast.message("This device can't share images directly. Try Save and upload.");
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        toast.error("Couldn't open the share sheet.");
      }
    }
  };

  const shareToWhatsApp = async () => {
    await shareViaWebShare();
    if (!navigator.canShare) {
      const message = encodeURIComponent(
        "I made a wish for Mom this Mother's Day ❤ Color one too:",
      );
      window.open(
        `https://wa.me/?text=${message}%20${encodeURIComponent(window.location.href)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  const shareToInstagram = async () => {
    await shareViaWebShare();
    if (!navigator.canShare) {
      toast.message("Save your art, then upload to Instagram.");
    }
  };

  /* -------------------------- keyboard shortcuts ----------------------- */

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if (
        (meta && event.key === "z" && event.shiftKey) ||
        (meta && event.key === "y")
      ) {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  /* ----------------------------- derived UI ---------------------------- */

  const cursorStyle = useMemo<CSSProperties>(() => {
    if (tool === "sticker") return { cursor: "copy" };
    if (tool === "text") return { cursor: "text" };
    if (tool === "pointer") return { cursor: "grab" };
    return { cursor: "crosshair" };
  }, [tool]);

  const canvasWrapperStyle = useMemo(
    () =>
      ({
        ...cursorStyle,
        "--md-canvas-ratio": `${canvasSize.width} / ${canvasSize.height}`,
        "--md-canvas-mobile-width": `${pageZoom * 92}%`,
      }) as CSSProperties,
    [canvasSize.height, canvasSize.width, cursorStyle, pageZoom],
  );

  const handleSelectImage = (image: ColoringPageImage) => {
    setLineArtReady(false);
    setShowStickers(false);
    setShowTextDialog(false);
    setShowShareDialog(false);
    setPageZoom(MIN_ZOOM);
    setSelectedImage(image);
  };

  const handleChooseAnother = () => {
    const hasArtwork =
      historyRef.current.length > 1 ||
      stickersRef.current.length > 0 ||
      textsRef.current.length > 0;

    if (
      hasArtwork &&
      !window.confirm("Choose another page? Your current artwork will be cleared.")
    ) {
      return;
    }

    setSelectedImage(null);
    setShowStickers(false);
    setShowTextDialog(false);
    setShowShareDialog(false);
    setPageZoom(MIN_ZOOM);
  };

  return (
    <div className="md-studio">
      {/* ------------------ Top App Bar ------------------ */}
      <header className="md-topbar">
        <div className="md-topbar__left">
          <Link
            href="/"
            aria-label="Back to Properganda"
            className="md-icon-btn"
          >
            <ArrowLeft size={20} />
          </Link>
          <Menu size={18} className="md-topbar__menu-icon" aria-hidden="true" />
          <h1 className="md-topbar__title">A Wish for Mom</h1>
        </div>
        <div className="md-topbar__right">
          {selectedImage && (
            <>
              <button
                type="button"
                onClick={handleChooseAnother}
                aria-label="Choose another page"
                className="md-icon-btn"
              >
                <Images size={20} />
              </button>
              <button
                type="button"
                onClick={undo}
                aria-label="Undo"
                className="md-icon-btn"
              >
                <Undo2 size={20} />
              </button>
              <button
                type="button"
                onClick={redo}
                aria-label="Redo"
                className="md-icon-btn"
              >
                <Redo2 size={20} />
              </button>
              <span className="md-topbar__divider" />
              <button
                type="button"
                onClick={handleDownload}
                aria-label="Save artwork"
                className="md-icon-btn"
              >
                <Download size={20} />
              </button>
              <button
                type="button"
                onClick={handlePrint}
                aria-label="Print artwork"
                className="md-icon-btn md-action-print"
              >
                <Printer size={20} />
              </button>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share artwork"
                className="md-icon-btn md-icon-btn--primary"
              >
                <Share2 size={20} />
              </button>
            </>
          )}
        </div>
      </header>

      {/* ------------------ Main Workspace ------------------ */}
      {selectedImage ? (
        <>
          <main className="md-main">
            {/* Brush size slider */}
            <aside className="md-side md-side--left" aria-label="Brush size">
              <div className="md-slider">
                <span className="md-slider__cap" aria-hidden="true">
                  <span className="md-slider__cap-dot md-slider__cap-dot--lg" />
                </span>
                <input
                  type="range"
                  min={2}
                  max={64}
                  value={brushSize}
                  onChange={(event) => setBrushSize(Number(event.target.value))}
                  aria-label="Brush size"
                  className="md-slider__input"
                />
                <span className="md-slider__cap" aria-hidden="true">
                  <span className="md-slider__cap-dot md-slider__cap-dot--sm" />
                </span>
              </div>
            </aside>

            {/* Canvas */}
            <section className="md-canvas-section">
              <div
                ref={viewportRef}
                className="md-canvas-viewport"
                data-zoomed={pageZoom > MIN_ZOOM ? "true" : undefined}
              >
                <div
                  ref={wrapperRef}
                  className="md-canvas-wrapper"
                  data-testid="coloring-canvas"
                  style={canvasWrapperStyle}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                >
                  <canvas ref={canvasRef} className="md-canvas md-canvas--paint" />
                  <canvas
                    ref={overlayRef}
                    className="md-canvas md-canvas--overlay"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={selectedImage.id}
                    ref={lineArtRef}
                    src={selectedImage.src}
                    alt={`${selectedImage.title} line art`}
                    draggable={false}
                    onLoad={() => setLineArtReady(true)}
                    className="md-canvas md-canvas--lineart"
                  />
                  {showWelcome && lineArtReady && (
                    <div className="md-welcome" role="status">
                      <Heart size={20} aria-hidden="true" />
                      <p>Pick a color, then paint your wish.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Color palette */}
            <aside className="md-side md-side--right" aria-label="Colors">
              <div className="md-palette">
                {PALETTE.map((swatch) => {
                  const isActive = swatch.value === color;
                  return (
                    <button
                      key={swatch.value}
                      type="button"
                      onClick={() => setColor(swatch.value)}
                      aria-label={`Select ${swatch.name}`}
                      aria-pressed={isActive}
                      className={`md-swatch${isActive ? " md-swatch--active" : ""}`}
                      style={{ backgroundColor: swatch.value }}
                    />
                  );
                })}
                <label
                  className="md-swatch md-swatch--picker"
                  aria-label="Pick a custom color"
                >
                  <span className="md-swatch__plus">+</span>
                  <input
                    type="color"
                    value={color}
                    onChange={(event) => setColor(event.target.value)}
                  />
                </label>
              </div>
            </aside>
          </main>

          <div className="md-mobile-controls" aria-label="Paint controls">
            <div className="md-mobile-palette" aria-label="Colors">
              {PALETTE.map((swatch) => {
                const isActive = swatch.value === color;
                return (
                  <button
                    key={swatch.value}
                    type="button"
                    onClick={() => setColor(swatch.value)}
                    aria-label={`Select ${swatch.name}`}
                    aria-pressed={isActive}
                    className={`md-swatch${isActive ? " md-swatch--active" : ""}`}
                    style={{ backgroundColor: swatch.value }}
                  />
                );
              })}
              <label
                className="md-swatch md-swatch--picker"
                aria-label="Pick a custom color"
              >
                <span className="md-swatch__plus">+</span>
                <input
                  type="color"
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                />
              </label>
            </div>

            <div className="md-mobile-control-row">
              <label className="md-mobile-slider" aria-label="Brush size">
                <Brush size={18} aria-hidden="true" />
                <input
                  type="range"
                  min={2}
                  max={64}
                  value={brushSize}
                  onChange={(event) => setBrushSize(Number(event.target.value))}
                  aria-label="Brush size"
                  className="md-mobile-slider__input"
                />
                <span
                  className="md-mobile-slider__preview"
                  aria-hidden="true"
                  style={{
                    width: Math.max(8, Math.min(24, brushSize * 0.5)),
                    height: Math.max(8, Math.min(24, brushSize * 0.5)),
                  }}
                />
              </label>

              <div className="md-mobile-zoom" aria-label="Zoom controls">
                <button
                  type="button"
                  onClick={() => updateZoom(pageZoom - ZOOM_STEP)}
                  disabled={pageZoom <= MIN_ZOOM}
                  aria-label="Zoom out"
                  className="md-zoom-btn"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => updateZoom(pageZoom + ZOOM_STEP)}
                  disabled={pageZoom >= MAX_ZOOM}
                  aria-label="Zoom in"
                  className="md-zoom-btn"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------ Bottom Toolbar ------------------ */}
          <nav className="md-toolbar" aria-label="Drawing tools">
            <ToolButton
              label="Pointer"
              active={tool === "pointer"}
              onClick={() => setTool("pointer")}
              icon={<MousePointer2 size={22} />}
            />
            <ToolButton
              label="Pencil"
              active={tool === "pencil"}
              onClick={() => setTool("pencil")}
              icon={<Pencil size={22} />}
            />
            <ToolButton
              label="Brush"
              active={tool === "brush"}
              onClick={() => setTool("brush")}
              icon={<Brush size={22} />}
            />
            <ToolButton
              label="Eraser"
              active={tool === "eraser"}
              onClick={() => setTool("eraser")}
              icon={<Eraser size={22} />}
            />
            <ToolButton
              label="Sticker"
              active={tool === "sticker"}
              onClick={() => {
                setTool("sticker");
                setShowStickers(true);
              }}
              icon={<Sparkles size={22} />}
            />
            <ToolButton
              label="Text"
              active={tool === "text"}
              onClick={() => setTool("text")}
              icon={<TypeIcon size={22} />}
            />
          </nav>
        </>
      ) : (
        <main className="md-main md-main--picker">
          <section className="md-picker" data-testid="coloring-picker">
            <div className="md-picker__intro">
              <span className="md-picker__eyebrow">Mother&apos;s Day</span>
              <h2 className="md-picker__title">Pick a page to paint</h2>
              <p className="md-picker__copy">
                Choose one image to start your artwork.
              </p>
            </div>

            {images.length > 0 ? (
              <div className="md-picker__grid" aria-label="Coloring pages">
                {images.map((image) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => handleSelectImage(image)}
                    className="md-picker-card"
                    data-testid={`coloring-page-option-${image.id}`}
                  >
                    <span className="md-picker-card__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt=""
                        draggable={false}
                        loading="eager"
                      />
                    </span>
                    <span className="md-picker-card__label">{image.title}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="md-picker__empty">
                Add PNG coloring pages to
                public/proper/mothers-day/coloring-pages to begin.
              </p>
            )}
          </section>
        </main>
      )}

      {/* ------------------ Sticker Drawer ------------------ */}
      {showStickers && (
        <div className="md-sticker-drawer" role="dialog" aria-label="Pick a sticker">
          <div className="md-sticker-drawer__head">
            <span>Pick a sticker</span>
            <button
              type="button"
              onClick={() => setShowStickers(false)}
              aria-label="Close stickers"
              className="md-icon-btn"
            >
              <X size={18} />
            </button>
          </div>
          <div className="md-sticker-grid">
            {STICKERS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className={`md-sticker-pill${activeSticker === emoji ? " md-sticker-pill--active" : ""}`}
                onClick={() => {
                  setActiveSticker(emoji);
                  setShowStickers(false);
                }}
              >
                <span>{emoji}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={removeLastSticker}
            className="md-sticker-drawer__undo"
          >
            Remove last sticker
          </button>
        </div>
      )}

      {/* ------------------ Text Dialog ------------------ */}
      {showTextDialog && (
        <div
          className="md-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Write a wish"
        >
          <div className="md-modal__card">
            <h2 className="md-modal__title">Write a wish for Mom</h2>
            <textarea
              value={textInput}
              onChange={(event) => setTextInput(event.target.value)}
              rows={3}
              maxLength={120}
              autoFocus
              className="md-modal__textarea"
            />
            <div className="md-modal__actions">
              <button
                type="button"
                onClick={() => {
                  setShowTextDialog(false);
                  setTextPlacement(null);
                }}
                className="md-btn md-btn--ghost"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={commitText}
                className="md-btn md-btn--primary"
              >
                Add to artwork
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------ Share Dialog ------------------ */}
      {showShareDialog && (
        <div
          className="md-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Share your artwork"
        >
          <div className="md-modal__card md-modal__card--share">
            <button
              type="button"
              onClick={() => setShowShareDialog(false)}
              aria-label="Close share dialog"
              className="md-modal__close md-icon-btn"
            >
              <X size={18} />
            </button>
            <h2 className="md-modal__title">Share the love</h2>
            <p className="md-modal__copy">
              Send your artwork to Mom — or save it for later.
            </p>
            {exportedDataUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={exportedDataUrl}
                alt="Your artwork preview"
                className="md-modal__preview"
              />
            )}
            <div className="md-share-grid">
              <button
                type="button"
                onClick={shareToWhatsApp}
                className="md-share-btn md-share-btn--whatsapp"
              >
                <WhatsAppIcon size={20} />
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={shareToInstagram}
                className="md-share-btn md-share-btn--instagram"
              >
                <InstagramIcon size={20} />
                <span>Instagram</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!exportedDataUrl) return;
                  const link = document.createElement("a");
                  link.href = exportedDataUrl;
                  link.download = "wish-for-mom.png";
                  link.click();
                }}
                className="md-share-btn md-share-btn--save"
              >
                <Download size={20} />
                <span>Save image</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="md-share-btn md-share-btn--print"
              >
                <Printer size={20} />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isExporting && (
        <div className="md-toast" role="status">
          Composing your artwork…
        </div>
      )}
    </div>
  );
}

function ToolButton({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`md-tool${active ? " md-tool--active" : ""}`}
    >
      <span className="md-tool__icon">{icon}</span>
      <span className="md-tool__label">{label}</span>
    </button>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
