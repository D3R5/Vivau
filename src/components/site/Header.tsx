import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, ShoppingBag, Menu, Search } from "lucide-react";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/catalogo", label: "Ofertas", search: { ofertas: true } },
  { to: "/contactoemail", label: "Contacto" },
] as const;

const actionClass =
  "relative inline-flex h-11 w-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full text-foreground/80 transition-colors hover:bg-secondary/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none lg:w-auto";

export function Header() {
  const items = useCart((s) => s.items);
  const count = items.reduce((a, b) => a + b.quantity, 0);
  const [open, setOpen] = useState(false);
  const location = useRouterState({ select: (state) => state.location });
  const offers = (location.search as { ofertas?: boolean | string }).ofertas;
  const showingOffers = offers === true || offers === "true";
  const isCurrent = (item: (typeof nav)[number]) =>
    location.pathname.replace(/\/$/, "") === item.to.replace(/\/$/, "") &&
    (item.to !== "/catalogo" || (item.label === "Ofertas" ? showingOffers : !showingOffers));
  const cartLabel =
    count > 0 ? `Carrito, ${count} ${count === 1 ? "producto" : "productos"}` : "Carrito";

  return (
    <header className="sticky top-0 z-40 w-full min-w-0 max-w-full border-b border-border/60 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto grid h-[76px] w-full min-w-0 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:h-[88px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-8 lg:px-8">
        <Link
          to="/"
          aria-label="Muebles VIVAU, inicio"
          className="flex w-fit min-w-0 max-w-full flex-col gap-1 rounded-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          <span className="truncate font-display text-[27px] leading-none tracking-[0.16em] sm:text-[30px]">
            VIVAU
          </span>
          <span className="truncate text-[9px] leading-none tracking-[0.12em] text-muted-foreground sm:text-[10px]">
            Muebles artesanales
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden h-full items-center gap-7 lg:flex xl:gap-9"
        >
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              search={"search" in item ? item.search : undefined}
              activeOptions={{ exact: true }}
              aria-current={isCurrent(item) ? "page" : undefined}
              className={`relative inline-flex h-full items-center text-[13px] tracking-[0.025em] transition-colors after:absolute after:inset-x-0 after:bottom-5 after:h-px after:origin-center after:bg-primary after:transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none motion-reduce:after:transition-none ${
                isCurrent(item)
                  ? "font-medium text-primary after:scale-x-100"
                  : "text-muted-foreground after:scale-x-0 hover:text-primary hover:after:scale-x-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 shrink-0 items-center justify-self-end sm:gap-2">
          <Link to="/catalogo" aria-label="Buscar productos" className={`${actionClass} xl:px-3`}>
            <Search className="h-[19px] w-[19px]" strokeWidth={1.5} aria-hidden="true" />
            <span className="hidden text-xs xl:inline">Buscar</span>
          </Link>
          <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border/80 lg:block" />
          <Link to="/carrito" aria-label={cartLabel} className={`${actionClass} xl:px-3`}>
            <span className="relative">
              <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.5} aria-hidden="true" />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2.5 -top-2.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[9px] font-medium leading-none text-primary-foreground ring-2 ring-background"
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </span>
            <span className="hidden text-xs xl:inline">Carrito</span>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`${actionClass} lg:hidden`}
                aria-label="Abrir menú de navegación"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex h-dvh w-[min(88vw,360px)] flex-col gap-0 overflow-y-auto border-border/60 p-0 sm:max-w-[360px] motion-reduce:animate-none motion-reduce:transition-none [&>button]:right-4 [&>button]:top-4 [&>button]:grid [&>button]:h-11 [&>button]:w-11 [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-secondary/50 [&>button]:opacity-100 [&>button>svg]:h-5 [&>button>svg]:w-5"
            >
              <div className="border-b border-border/60 px-7 pb-6 pt-8 pr-16">
                <SheetTitle className="font-display text-[27px] font-normal leading-none tracking-[0.16em] text-primary">
                  VIVAU
                </SheetTitle>
                <SheetDescription className="mt-2 text-xs text-muted-foreground">
                  Muebles artesanales
                </SheetDescription>
              </div>
              <nav aria-label="Navegación móvil" className="px-4 py-7">
                <p className="mb-3 px-4 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Explora
                </p>
                <div className="space-y-1">
                  {nav.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      search={"search" in item ? item.search : undefined}
                      activeOptions={{ exact: true }}
                      aria-current={isCurrent(item) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`group flex min-h-14 items-center justify-between gap-4 rounded-lg px-4 py-3 font-display text-[23px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none ${isCurrent(item) ? "bg-secondary/70 text-primary" : "text-foreground/80 hover:bg-secondary/40 hover:text-primary"}`}
                    >
                      {item.label}
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 ${isCurrent(item) ? "text-primary" : "text-muted-foreground/50"}`}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="mt-auto border-t border-border/60 px-7 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <p className="text-xs text-muted-foreground">Muebles hechos a mano en Chile.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
