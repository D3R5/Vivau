import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import Banner from "../assets/hero-living.jpg";

export function Popup() {
  const [show, setShow] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      returnFocus.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setShow(true);
    }, 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Dialog.Root open={show} onOpenChange={setShow}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-foreground/45 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:duration-300 data-[state=closed]:duration-200 motion-reduce:animate-none" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[61] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-border/60 bg-background shadow-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:duration-300 data-[state=closed]:duration-200 motion-reduce:animate-none"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            title.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (returnFocus.current?.isConnected) returnFocus.current.focus();
          }}
        >
          <div className="grid min-w-0 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
            <div className="relative isolate h-[clamp(112px,24dvh,192px)] overflow-hidden bg-secondary sm:h-auto sm:min-h-[400px]">
              <img
                src={Banner}
                alt="Un espacio acogedor con muebles de madera y materiales naturales"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
              />
              <div className="absolute bottom-5 left-6 text-white sm:bottom-7 sm:left-7">
                <p className="font-display text-[27px] leading-none tracking-[0.16em] sm:text-[30px]">
                  VIVAU
                </p>
                <p className="mt-2 text-[10px] tracking-[0.12em] text-white/85">
                  Muebles artesanales
                </p>
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center px-6 pb-5 pt-6 sm:px-8 sm:py-12 lg:px-10">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Diseño artesanal
              </p>
              <Dialog.Title
                ref={title}
                tabIndex={-1}
                className="max-w-xs font-display text-3xl leading-[1.1] text-primary outline-none sm:text-4xl"
              >
                Dale vida a tu espacio
              </Dialog.Title>
              <Dialog.Description className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Muebles hechos a mano en maderas nobles. Descubre piezas que aportan calidez y
                personalidad a tu hogar.
              </Dialog.Description>

              <div className="mt-6 flex flex-col gap-1 sm:mt-8">
                <Link
                  to="/catalogo"
                  search={{ ofertas: false, page: 1 }}
                  onClick={() => setShow(false)}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  Ver catálogo
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </Link>
                <Dialog.Close className="inline-flex min-h-11 w-full items-center justify-center rounded-lg px-4 text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none">
                  Seguir explorando
                </Dialog.Close>
              </div>
            </div>
          </div>

          <Dialog.Close
            aria-label="Cerrar bienvenida"
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-border/40 bg-background/95 text-primary shadow-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
