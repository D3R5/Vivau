import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { categories } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer className="mt-16 w-full min-w-0 border-t border-border/70 bg-secondary/30 sm:mt-20">
      <div className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 gap-9 px-4 py-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-16 lg:px-8 lg:py-16">
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <div className="flex w-fit flex-col gap-1.5 text-primary">
            <span className="font-display text-[30px] leading-none tracking-[0.16em]">VIVAU</span>
            <span className="text-[10px] leading-none tracking-[0.12em] text-muted-foreground">
              Muebles artesanales
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Muebles artesanales fabricados con maderas nobles en el corazón de Chile. Piezas
            duraderas para transformar cada espacio de tu hogar.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <a
              aria-label="Instagram"
              href="#"
              className="grid h-11 w-11 place-items-center rounded-full border border-border/80 text-primary transition-colors hover:border-primary/30 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <Instagram className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a
              aria-label="Facebook"
              href="#"
              className="grid h-11 w-11 place-items-center rounded-full border border-border/80 text-primary transition-colors hover:border-primary/30 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <Facebook className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav
          aria-labelledby="footer-categories-title"
          className="min-w-0 border-t border-border/60 pt-7 sm:border-0 sm:pt-0"
        >
          <h2 id="footer-categories-title" className="font-display text-xl text-primary">
            Categorías
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 text-sm sm:grid-cols-1">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/catalogo"
                  search={{ categoria: c.slug }}
                  className="flex min-h-11 w-fit items-center rounded-sm text-muted-foreground transition-colors hover:text-primary hover:underline hover:decoration-primary/30 hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none lg:min-h-9"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section
          aria-labelledby="footer-contact-title"
          className="min-w-0 border-t border-border/60 pt-7 sm:border-0 sm:pt-0"
        >
          <h2 id="footer-contact-title" className="font-display text-xl text-primary">
            Contacto
          </h2>
          <ul className="mt-5 space-y-5 text-sm leading-relaxed text-muted-foreground">
            <li className="flex min-w-0 items-start gap-3">
              <MapPin
                className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary/70"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="min-w-0 break-words">
                San Fernando, Pelequén, San Vicente, Chile
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone
                className="h-[18px] w-[18px] shrink-0 text-primary/70"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>+56 9 8711 1409</span>
            </li>
            <li className="flex min-w-0 items-start gap-3">
              <Mail
                className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary/70"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="min-w-0 [overflow-wrap:anywhere]">Contactovivau@gmail.com</span>
            </li>
          </ul>
        </section>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-col gap-1.5 border-t border-border/70 py-6 pr-16 text-[11px] leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p>© {new Date().getFullYear()} Muebles VIVAU.</p>
          <p>Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
