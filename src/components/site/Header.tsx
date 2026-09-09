import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, Search } from "lucide-react";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/catalogo", label: "Ofertas", search: { ofertas: true } },
  { to: "/contactoemail", label: "Contacto" },
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
  className="text-sm text-foreground/80 transition-colors hover:text-foreground"
  activeProps={{ className: "text-foreground font-medium" }}
>
  {n.label}
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
