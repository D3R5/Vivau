import { createFileRoute } from "@tanstack/react-router";
import { useId, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, effectivePrice, formatCL } from "@/lib/mock-data";
import { productOptions } from "@/lib/product-variants";
import {
  filterCatalog,
  paginateCatalog,
  parseCatalogSearch,
  type CatalogSearch,
} from "@/lib/catalog";
import { useProducts } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/_site/catalogo")({
  validateSearch: parseCatalogSearch,
  component: CatalogPage,
});

function CatalogPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const all = useProducts((state) => state.products);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const active = all.filter((product) => product.active);
  const maxPrice = Math.max(
    0,
    ...active.flatMap((product) => productOptions(product).map(effectivePrice)),
  );
  const categoryCounts = Object.fromEntries(
    categories.map((category) => [
      category.slug,
      active.filter((product) => product.categorySlugs.includes(category.slug)).length,
    ]),
  );
  const filtered = filterCatalog(all, search);
  const { items: paged, currentPage, totalPages } = paginateCatalog(filtered, search.page);
  const priceActive = search.precioMax !== undefined && search.precioMax < maxPrice;
  const filterCount =
    Number(Boolean(search.categoria)) + Number(Boolean(search.ofertas)) + Number(priceActive);
  const hasFilters = filterCount > 0 || Boolean(search.q);
  const update = (patch: Partial<CatalogSearch>, replace = false) => {
    navigate({
      search: (previous) => ({ ...previous, ...patch, page: 1 }),
      replace,
      resetScroll: false,
    });
  };
  const clearFilters = () =>
    update({ categoria: undefined, ofertas: undefined, precioMax: undefined, q: undefined });
  const controls = { search, maxPrice, categoryCounts, onChange: update };
  const chips = [
    ...(search.q
      ? [{ label: `Búsqueda: ${search.q}`, remove: () => update({ q: undefined }) }]
      : []),
    ...(search.categoria
      ? [
          {
            label:
              categories.find((category) => category.slug === search.categoria)?.name ??
              search.categoria,
            remove: () => update({ categoria: undefined }),
          },
        ]
      : []),
    ...(priceActive
      ? [
          {
            label: `Hasta ${formatCL(search.precioMax!)}`,
            remove: () => update({ precioMax: undefined }),
          },
        ]
      : []),
    ...(search.ofertas
      ? [{ label: "En oferta", remove: () => update({ ofertas: undefined }) }]
      : []),
  ];

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-7 sm:mb-10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
          Catálogo
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">Nuestra colección</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Encuentra muebles para cada espacio de tu hogar.
        </p>
      </div>

      <div className="grid min-w-0 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <aside
          aria-label="Filtros del catálogo"
          className="hidden min-w-0 self-start rounded-xl border border-border/70 bg-secondary/15 p-5 lg:block"
        >
          <h2 className="mb-6 flex items-center gap-2 font-display text-xl text-primary">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filtros
          </h2>
          <FilterControls {...controls} />
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 min-h-11 text-xs text-muted-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Limpiar filtros
            </button>
          )}
        </aside>

        <div className="min-w-0">
          <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div className="relative min-w-0">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                aria-label="Buscar productos"
                placeholder="Buscar un mueble…"
                value={search.q ?? ""}
                onChange={(event) => update({ q: event.target.value || undefined }, true)}
                className="h-11 w-full rounded-lg bg-background pl-10 pr-11 text-base sm:text-sm"
              />
              {search.q && (
                <button
                  type="button"
                  onClick={() => update({ q: undefined })}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-0 top-0 grid h-11 w-11 place-items-center rounded-lg text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex min-w-0 gap-3">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 min-w-0 flex-1 gap-2 rounded-lg lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                    Filtros
                    {filterCount > 0 && (
                      <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                        {filterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="flex h-dvh w-[min(92vw,400px)] flex-col gap-0 p-0 sm:max-w-[400px] motion-reduce:animate-none [&>button]:right-4 [&>button]:top-4 [&>button]:grid [&>button]:h-11 [&>button]:w-11 [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-secondary/60"
                >
                  <div className="shrink-0 border-b border-border/70 px-6 pb-5 pt-7 pr-16">
                    <SheetTitle className="font-display text-2xl font-normal text-primary">
                      Filtrar productos
                    </SheetTitle>
                    <SheetDescription className="mt-2 text-xs leading-relaxed">
                      Elige categoría, precio y ofertas.
                    </SheetDescription>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
                    <FilterControls {...controls} />
                  </div>
                  <div className="flex shrink-0 gap-3 border-t border-border/70 bg-background px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <Button
                      variant="outline"
                      className="h-12 rounded-lg"
                      onClick={clearFilters}
                      disabled={!hasFilters}
                    >
                      Limpiar
                    </Button>
                    <Button
                      className="h-12 min-w-0 flex-1 rounded-lg"
                      onClick={() => setFiltersOpen(false)}
                    >
                      Ver {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <label className="block min-w-0 flex-1 sm:w-44 sm:flex-none">
                <span className="sr-only">Ordenar productos</span>
                <select
                  value={search.orden ?? "recomendados"}
                  onChange={(event) =>
                    update({
                      orden:
                        event.target.value === "precio-asc" || event.target.value === "precio-desc"
                          ? event.target.value
                          : undefined,
                    })
                  }
                  className="h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
                >
                  <option value="recomendados">Sin ordenar</option>
                  <option value="precio-asc">Menor precio</option>
                  <option value="precio-desc">Mayor precio</option>
                </select>
              </label>
            </div>
          </div>

          {chips.length > 0 && (
            <div
              aria-label="Filtros seleccionados"
              className="mt-4 flex min-w-0 flex-wrap items-center gap-2"
            >
              {chips.map((chip, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={chip.remove}
                  aria-label={`Quitar filtro: ${chip.label}`}
                  className="inline-flex min-h-9 max-w-full items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-2 text-xs text-primary transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                >
                  <span className="truncate">{chip.label}</span>
                  <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </button>
              ))}
              <button
                type="button"
                onClick={clearFilters}
                className="min-h-9 rounded-sm px-2 text-xs text-muted-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Limpiar todo
              </button>
            </div>
          )}

          <p role="status" aria-live="polite" className="mb-6 mt-5 text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "pieza encontrada" : "piezas encontradas"}
          </p>

          {paged.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-secondary/15 px-5 py-16 text-center">
              <Search
                className="mx-auto mb-4 h-6 w-6 text-muted-foreground"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="font-display text-xl">No encontramos piezas con estos filtros.</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prueba otra búsqueda o amplía el rango de precio.
              </p>
              {hasFilters && (
                <Button variant="outline" className="mt-6 min-h-11" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="grid min-w-0 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {paged.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Páginas del catálogo"
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  className="h-11 min-w-11"
                  aria-label={`Ir a página ${index + 1}`}
                  aria-current={currentPage === index + 1 ? "page" : undefined}
                  onClick={() =>
                    navigate({ search: (previous) => ({ ...previous, page: index + 1 }) })
                  }
                >
                  {index + 1}
                </Button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterControls({
  search,
  maxPrice,
  categoryCounts,
  onChange,
}: {
  search: CatalogSearch;
  maxPrice: number;
  categoryCounts: Record<string, number>;
  onChange: (patch: Partial<CatalogSearch>, replace?: boolean) => void;
}) {
  const id = useId();
  const price = Math.min(search.precioMax ?? maxPrice, maxPrice);
  return (
    <div className="space-y-7">
      <fieldset>
        <legend className="mb-3 text-sm font-medium">Categorías</legend>
        <div className="space-y-1">
          {[{ slug: "", name: "Todas" }, ...categories].map((category) => (
            <label
              key={category.slug}
              className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors focus-within:ring-2 focus-within:ring-ring motion-reduce:transition-none ${(search.categoria ?? "") === category.slug ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-secondary/50"}`}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <input
                  type="radio"
                  name={`${id}-category`}
                  value={category.slug}
                  checked={(search.categoria ?? "") === category.slug}
                  onChange={() => onChange({ categoria: category.slug || undefined })}
                  className="h-4 w-4 shrink-0 accent-primary"
                />
                {category.name}
              </span>
              {category.slug && (
                <span className="text-xs tabular-nums text-muted-foreground">
                  {categoryCounts[category.slug] ?? 0}
                </span>
              )}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="border-t border-border/70 pt-6">
        <label
          htmlFor={`${id}-price`}
          className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium"
        >
          <span>Precio máximo</span>
          <span className="text-xs font-normal tabular-nums text-muted-foreground">
            {formatCL(price)}
          </span>
        </label>
        <input
          id={`${id}-price`}
          type="range"
          min={0}
          max={Math.max(1, maxPrice)}
          step={1}
          value={price}
          disabled={maxPrice === 0}
          onChange={(event) =>
            onChange(
              {
                precioMax:
                  Number(event.target.value) >= maxPrice ? undefined : Number(event.target.value),
              },
              true,
            )
          }
          aria-valuetext={formatCL(price)}
          className="mt-2 min-h-11 w-full cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default"
        />
        <div
          aria-hidden="true"
          className="flex items-center justify-between text-[11px] text-muted-foreground"
        >
          <span>{formatCL(0)}</span>
          <span>{formatCL(maxPrice)}</span>
        </div>
      </div>

      <label className="flex min-h-11 cursor-pointer items-center gap-3 border-t border-border/70 pt-5 text-sm">
        <input
          type="checkbox"
          checked={Boolean(search.ofertas)}
          onChange={(event) => onChange({ ofertas: event.target.checked || undefined })}
          className="h-4 w-4 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        Solo con oferta
      </label>
    </div>
  );
}
