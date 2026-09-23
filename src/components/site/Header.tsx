import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, Search } from "lucide-react";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "INICIO" },
  { to: "/catalogo", label: "CATÁLOGO" },
  { to: "/catalogo", label: "OFERTAS", search: { ofertas: true } },
  { to: "/contactoemail", label: "CONTACTO" },
  //{ to: "/admin", label: "Admin" }, //
];

export function Header() {
  const items = useCart((s) => s.items);
  const count = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-15 place-items-center rounded-sm bg-primary text-primary-foreground font-display text-sm">
            VIVAU
          </span>
          <span className="font-display text-lg tracking-tight">Muebles VIVAU</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n, i) => (
            <Link
              key={i}
              to={n.to}
              search={n.search}
              className="group relative px-2 py-1 text-sm font-medium text-foreground/70 transition-all duration-300 hover:text-foreground"
              activeProps={{
                className: "text-foreground font-semibold",
              }}
            >
              <span className="inline-block transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                {n.label}
              </span>

              {/* sombra sutil abajo */}
              <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-6" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/catalogo">
            <Button variant="ghost" size="icon" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/carrito" className="relative">
            <Button variant="ghost" size="icon" aria-label="Carrito">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-1">
                {nav.map((n, i) => (
                  <Link
                    key={i}
                    to={n.to}
                    className="rounded-md px-3 py-2 text-base hover:bg-secondary"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
