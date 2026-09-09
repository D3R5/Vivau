import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, effectivePrice } from "@/lib/mock-data";
import { useProducts } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

type CatalogSearch = {
  categoria?: string;
  ofertas?: boolean;
  q?: string;
  page?: number;
};

export const Route = createFileRoute("/_site/catalogo")({
  validateSearch: (s: Record<string, unknown>): CatalogSearch => ({
    categoria: typeof s.categoria === "string" ? s.categoria : undefined,
    ofertas: s.ofertas === true || s.ofertas === "true",
    q: typeof s.q === "string" ? s.q : undefined,
    page: typeof s.page === "number" ? s.page : Number(s.page) || 1,
  }),
  component: CatalogPage,
});

const PAGE_SIZE = 8;

function CatalogPage() {
  const { categoria, ofertas, q, page = 1 } = Route.useSearch();
  const navigate = Route.useNavigate();
  const all = useProducts((s) => s.products);

  const activeAll = all.filter((p) => p.active);
  const maxPrice = Math.max(...activeAll.map((p) => p.price));
  const [priceRange, setPriceRange] = useState<[number]>([maxPrice]);
  const [query, setQuery] = useState(q ?? "");

  const filtered = useMemo(() => {
    return activeAll.filter((p) => {
      if (categoria && p.categorySlug !== categoria) return false;
      if (ofertas && !p.salePrice) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (effectivePrice(p) > priceRange[0]) return false;
      return true;
    });
  }, [activeAll, categoria, ofertas, query, priceRange]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Catálogo</p>
        <h1 className="mt-2 font-display text-4xl">Nuestra colección</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          {filtered.length} piezas disponibles. Filtra por categoría, precio u ofertas.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar producto"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                navigate({ search: (s: CatalogSearch) => ({ ...s, q: e.target.value || undefined, page: 1 }) });
              }}
              className="pl-9"
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Categorías</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  to="/catalogo"
                  search={{ ofertas }}
                  className={`block rounded px-2 py-1.5 ${!categoria ? "bg-secondary" : "hover:bg-secondary/60"}`}
                >
                  Todas
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/catalogo"
                    search={{ categoria: c.slug, ofertas }}
                    className={`block rounded px-2 py-1.5 ${categoria === c.slug ? "bg-secondary" : "hover:bg-secondary/60"}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between text-sm">
              <h3 className="font-semibold">Precio máximo</h3>
              <span className="text-muted-foreground">
                ${priceRange[0].toLocaleString("es-MX")}
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={(v) => setPriceRange([v[0]])}
              min={1000}
              max={maxPrice}
              step={500}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!ofertas}
                onChange={(e) =>
                  navigate({ search: (s: CatalogSearch) => ({ ...s, ofertas: e.target.checked || undefined, page: 1 }) })
                }
                className="h-4 w-4 accent-primary"
              />
              Solo con oferta
            </label>
          </div>
        </aside>

        <div>
          {paged.length === 0 ? (
            <div className="grid place-items-center rounded-md border border-dashed border-border py-24 text-center">
              <p className="font-display text-xl">No encontramos piezas con estos filtros.</p>
              <p className="mt-2 text-sm text-muted-foreground">Ajusta los filtros o borra la búsqueda.</p>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {paged.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    navigate({ search: (s: CatalogSearch) => ({ ...s, page: i + 1 }) })
                  }
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
