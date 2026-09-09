import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { categories } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-15 place-items-center rounded-sm bg-primary text-primary-foreground font-display">
              VIVAU
            </span>
            <span className="font-display text-xl">Muebles VIVAU</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Muebles artesanales fabricados con maderas nobles en el corazón de Chile. Piezas
            duraderas para transformar cada espacio de tu hogar.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              aria-label="Instagram"
              href="#"
              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-background"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              aria-label="Facebook"
              href="#"
              className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-background"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">Categorías</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/catalogo"
                  search={{ categoria: c.slug }}
                  className="hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">Contacto</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>San Fernando, Pelequen, San Vicente, Chile</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+56 9 1234 5678</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Contactovivau@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Muebles VIVAU. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
