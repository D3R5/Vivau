import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, TreePine, Headphones, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { categories } from "@/lib/mock-data";
import { useProducts } from "@/lib/store";
import heroImg from "@/assets/hero-living.jpg";

export const Route = createFileRoute("/_site/")({
  component: HomePage,
});

const benefits = [
  {
    icon: Headphones,
    title: "Compra asistida",
    text: "Te ayudamos a elegir el producto ideal según tu espacio y estilo.",
  },
  {
    icon: Truck,
    title: "Envío a coordinar",
    text: "Coordinamos despacho contigo según tu ubicación y disponibilidad.",
  },
  {
    icon: TreePine,
    title: "Materiales de calidad",
    text: "Trabajamos con maderas seleccionadas y terminaciones duraderas.",
  },
  {
    icon: ShieldCheck,
    title: "Compra con confianza",
    text: "Te contactamos antes de confirmar cualquier pedido o pago.",
  },
];

const testimonials = [
  {
    name: "Arnold Schwazenegger",
    location: "USA",
    text: "El sofá que compré transformó por completo mi sala. La calidad de la madera y el acabado son impecables.",
  },
  {
    name: "Keanu Reeves",
    location: "Perú",
    text: "Compramos la mesa de comedor Hacienda para toda la familia. Es una pieza que va a durar generaciones.",
  },
  {
    name: "Felipe Camiroaga",
    location: "Chile",
    text: "Servicio impecable, entrega puntual y una calidad que se siente al tocarla. Regresaré por más.",
  },
];

function HomePage() {
  const products = useProducts((s) => s.products);
  const featured = products.filter((p) => p.featured && p.active).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative isolate overflow-hidden">
          <img
            src={heroImg}
            alt="Sala rústica con muebles de madera de Muebles VIVAU"
            width={1920}
            height={1200}
            className="h-[78vh] max-h-[820px] min-h-[560px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl">
                <span className="text-xs uppercase tracking-[0.2em] text-foreground/70">
                  Colección 2026
                </span>
                <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  Muebles que transforman tu hogar
                </h1>
                <p className="mt-5 max-w-md text-base text-foreground/75">
                  Piezas artesanales fabricadas en madera noble, hechas para acompañarte durante
                  generaciones.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/catalogo">
                    <Button size="lg" className="gap-2">
                      Ver Catálogo <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/catalogo" search={{ ofertas: true }}>
                    <Button size="lg" variant="outline">
                      Ofertas
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">Explora por espacio</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Muebles pensados para cada rincón de tu hogar.
            </p>
          </div>
        </div>
        <div
          className="
    flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4
    px-4
    sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:overflow-visible sm:px-0
  "
        >
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/catalogo"
              search={{ categoria: c.slug }}
              className={`
        group relative block overflow-hidden rounded-md
        min-w-[calc(100%-1rem)] snap-center
        sm:min-w-0
        ${i === 0 ? "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2" : ""}
      `}
            >
              <div
                className={`relative ${i === 0 ? "aspect-[4/5]" : "aspect-[4/5] lg:aspect-square"}`}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-xl text-white">{c.name}</h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-white/80">
                    Ver colección <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Selección
              </span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Productos destacados</h2>
            </div>
            <Link to="/catalogo" className="hidden text-sm hover:underline sm:block">
              Ver todo →
            </Link>
          </div>
          <div
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory 
px-[7.5%] justify-start 
sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible"
          >
            {featured.map((p) => (
              <div key={p.id} className="min-w-[85%] flex justify-center snap-center sm:min-w-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section
        aria-labelledby="benefits-title"
        className="relative isolate overflow-hidden bg-primary text-primary-foreground"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-primary-foreground/5 via-transparent to-accent/10"
        />
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground/65 sm:text-xs">
                La experiencia VIVAU
              </p>
              <h2 id="benefits-title" className="font-display text-3xl leading-tight sm:text-4xl">
                Nuestros beneficios
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-primary-foreground/75 lg:justify-self-end lg:text-base">
              Te acompañamos desde la elección de tu mueble hasta la coordinación de su entrega.
            </p>
          </div>

          <ul className="mt-8 grid min-w-0 grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-4">
            {benefits.map((benefit) => (
              <li
                key={benefit.title}
                className="flex min-w-0 items-start gap-4 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 sm:flex-col sm:gap-5 sm:p-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary-foreground/15 bg-secondary text-primary">
                  <benefit.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg leading-snug sm:text-xl">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                    {benefit.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonios */}
      {/* <section className="bg-primary/95 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl">Lo que dicen nuestros clientes</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col gap-4">
                <div className="flex text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-base leading-relaxed text-primary-foreground/85">
                  "{t.text}"
                </blockquote>
                <figcaption className="text-sm text-primary-foreground/70">
                  {t.name} · {t.location}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}
