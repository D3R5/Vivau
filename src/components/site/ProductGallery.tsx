import { useRef, useState, type PointerEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Expand, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";

type GalleryProps = { images: string[]; name: string };
type Point = { x: number; y: number };
type View = Point & { scale: number };
const initialView: View = { scale: 1, x: 0, y: 0 };
const controlClass =
  "inline-flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30 motion-reduce:transition-none";

export function ProductGallery({ images, name }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const swipe = useRef<Point | null>(null);
  const suppressClick = useRef(false);
  const current = Math.min(index, images.length - 1);
  const go = (direction: number) => setIndex((current + direction + images.length) % images.length);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div>
        <div className="relative overflow-hidden rounded-xl bg-secondary">
          <button
            ref={trigger}
            type="button"
            aria-label={`Ampliar foto ${current + 1} de ${name}`}
            aria-haspopup="dialog"
            className="group relative block aspect-square w-full touch-pan-y cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            onPointerDown={(event) => {
              swipe.current = { x: event.clientX, y: event.clientY };
              suppressClick.current = false;
            }}
            onPointerUp={(event) => {
              if (!swipe.current) return;
              const dx = event.clientX - swipe.current.x;
              const dy = event.clientY - swipe.current.y;
              suppressClick.current = Math.hypot(dx, dy) > 10;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && images.length > 1) {
                go(dx < 0 ? 1 : -1);
              }
              swipe.current = null;
            }}
            onPointerCancel={() => {
              swipe.current = null;
              suppressClick.current = true;
            }}
            onClick={(event) => {
              if (event.detail === 0 || !suppressClick.current) setOpen(true);
              suppressClick.current = false;
            }}
          >
            <img
              src={images[current]}
              alt={`${name}, foto ${current + 1}`}
              draggable={false}
              className="h-full w-full select-none object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:transform-none"
            />
            <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/30 bg-background/95 px-4 py-2.5 text-xs font-medium text-foreground shadow-sm">
              <Expand className="h-4 w-4" aria-hidden="true" />
              Toca o haz clic para ampliar
            </span>
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-background/95 shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-background/95 shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
              <span
                className="absolute right-3 top-3 rounded-full bg-background/95 px-3 py-1.5 text-xs tabular-nums"
                aria-live="polite"
              >
                {current + 1} / {images.length}
              </span>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div className="mt-3 flex gap-3 overflow-x-auto p-1" aria-label="Fotos del producto">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-pressed={i === current}
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${i === current ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={src} alt="" draggable={false} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content
          className="fixed inset-0 z-[101] h-dvh bg-[#181613] text-white outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-200 motion-reduce:animate-none"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            trigger.current?.focus();
          }}
          onKeyDown={(event) => {
            if (images.length > 1 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
              event.preventDefault();
              go(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <ImageViewer
            key={images[current]}
            images={images}
            name={name}
            index={current}
            onChange={setIndex}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ImageViewer({
  images,
  name,
  index,
  onChange,
}: GalleryProps & { index: number; onChange: (index: number) => void }) {
  const [view, setView] = useState(initialView);
  const viewRef = useRef(initialView);
  const viewport = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<{ start: Point; moved: boolean; multiple: boolean } | null>(null);
  const lastTap = useRef<{ time: number; point: Point } | null>(null);
  const lastPointerType = useRef("");
  const [dragging, setDragging] = useState(false);

  const updateView = (next: View) => {
    const scale = Math.max(1, Math.min(4, next.scale));
    const frame = viewport.current;
    const photo = image.current;
    let maxX = 0;
    let maxY = 0;
    if (frame && photo?.naturalWidth && photo.naturalHeight) {
      const fit = Math.min(
        frame.clientWidth / photo.naturalWidth,
        frame.clientHeight / photo.naturalHeight,
      );
      maxX = Math.max(0, (photo.naturalWidth * fit * scale - frame.clientWidth) / 2);
      maxY = Math.max(0, (photo.naturalHeight * fit * scale - frame.clientHeight) / 2);
    }
    const nextView = {
      scale,
      x: Math.max(-maxX, Math.min(maxX, next.x)),
      y: Math.max(-maxY, Math.min(maxY, next.y)),
    };
    viewRef.current = nextView;
    setView(nextView);
  };
  const zoom = (scale: number) => updateView({ ...viewRef.current, scale });
  const go = (direction: number) => onChange((index + direction + images.length) % images.length);
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    lastPointerType.current = event.pointerType;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 1) {
      gesture.current = {
        start: { x: event.clientX, y: event.clientY },
        moved: false,
        multiple: false,
      };
    } else if (gesture.current) {
      gesture.current.multiple = true;
    }
    setDragging(true);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const previous = pointers.current.get(event.pointerId);
    if (!previous) return;
    const next = { x: event.clientX, y: event.clientY };
    const before = [...pointers.current.values()];
    pointers.current.set(event.pointerId, next);
    if (
      gesture.current &&
      Math.hypot(next.x - gesture.current.start.x, next.y - gesture.current.start.y) > 10
    ) {
      gesture.current.moved = true;
    }
    if (pointers.current.size === 2) {
      const after = [...pointers.current.values()];
      const distance = (points: Point[]) =>
        Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      if (distance(before) > 0) zoom((viewRef.current.scale * distance(after)) / distance(before));
    } else if (pointers.current.size === 1 && viewRef.current.scale > 1) {
      updateView({
        ...viewRef.current,
        x: viewRef.current.x + next.x - previous.x,
        y: viewRef.current.y + next.y - previous.y,
      });
    }
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size > 0) return;
    setDragging(false);
    const active = gesture.current;
    gesture.current = null;
    if (!active || active.multiple) {
      lastTap.current = null;
      return;
    }
    const dx = event.clientX - active.start.x;
    const dy = event.clientY - active.start.y;
    if (
      viewRef.current.scale === 1 &&
      Math.abs(dx) > 50 &&
      Math.abs(dx) > Math.abs(dy) &&
      images.length > 1
    ) {
      go(dx < 0 ? 1 : -1);
    } else if (!active.moved && event.pointerType === "touch") {
      const point = { x: event.clientX, y: event.clientY };
      if (
        lastTap.current &&
        Date.now() - lastTap.current.time < 300 &&
        Math.hypot(point.x - lastTap.current.point.x, point.y - lastTap.current.point.y) < 30
      ) {
        zoom(viewRef.current.scale > 1 ? 1 : 2);
        lastTap.current = null;
      } else {
        lastTap.current = { time: Date.now(), point };
      }
    }
  };

  return (
    <div className="flex h-full flex-col pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <Dialog.Title className="truncate text-sm font-medium sm:text-base">{name}</Dialog.Title>
          <p aria-live="polite" className="mt-1 text-xs text-white/60">
            Foto {index + 1} de {images.length}
          </p>
        </div>
        <Dialog.Close className={`${controlClass} text-sm`} aria-label="Cerrar visor de fotos">
          <X className="h-5 w-5" />
          <span className="hidden sm:inline">Cerrar</span>
        </Dialog.Close>
      </header>
      <div className="relative min-h-0 flex-1">
        <div
          ref={viewport}
          className={`flex h-full touch-none select-none items-center justify-center overflow-hidden ${view.scale > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={(event) => {
            pointers.current.delete(event.pointerId);
            gesture.current = null;
            lastTap.current = null;
            setDragging(false);
          }}
          onDoubleClick={() => {
            if (lastPointerType.current !== "touch") {
              zoom(viewRef.current.scale > 1 ? 1 : 2);
            }
          }}
        >
          <img
            ref={image}
            src={images[index]}
            alt={`${name}, foto ${index + 1} ampliada`}
            draggable={false}
            className={`h-full w-full object-contain will-change-transform ${dragging ? "" : "transition-transform duration-200 ease-out motion-reduce:transition-none"}`}
            style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
          />
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior en el visor"
              className={`${controlClass} absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 sm:left-6`}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto siguiente en el visor"
              className={`${controlClass} absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 sm:right-6`}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      <footer className="shrink-0 border-t border-white/10 bg-[#181613] px-4 py-4 sm:px-6">
        <div
          className="flex items-center justify-center gap-2 sm:gap-3"
          role="group"
          aria-label="Controles de ampliación"
        >
          <button
            type="button"
            onClick={() => zoom(view.scale - 0.5)}
            disabled={view.scale <= 1}
            aria-label="Reducir imagen"
            className={controlClass}
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <span aria-live="polite" className="w-14 text-center text-sm tabular-nums">
            {Math.round(view.scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => zoom(view.scale + 0.5)}
            disabled={view.scale >= 4}
            aria-label="Ampliar imagen"
            className={controlClass}
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => updateView(initialView)}
            disabled={view.scale === 1}
            className={`${controlClass} ml-2 text-xs`}
            aria-label="Restablecer imagen al tamaño original"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Restablecer</span>
          </button>
        </div>
        <Dialog.Description className="mt-3 text-center text-xs leading-relaxed text-white/60">
          <span className="sm:hidden">
            Pellizca o toca dos veces para ampliar. Arrastra para explorar.
          </span>
          <span className="hidden sm:inline">
            Doble clic para ampliar · Arrastra para explorar · Esc para cerrar
          </span>
          {images.length > 1 && (
            <span className="mt-1 block">
              Desliza sin zoom o usa las flechas para cambiar de foto.
            </span>
          )}
        </Dialog.Description>
      </footer>
    </div>
  );
}
