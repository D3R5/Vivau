import { effectivePrice, type Product } from "./mock-data";
import { productOptions } from "./product-variants";

export type CatalogSearch = {
  categoria?: string;
  ofertas?: boolean;
  q?: string;
  precioMax?: number;
  orden?: "precio-asc" | "precio-desc";
  page?: number;
};

export function parseCatalogSearch(search: Record<string, unknown>): CatalogSearch {
  const price =
    typeof search.precioMax === "number" || typeof search.precioMax === "string"
      ? Number(search.precioMax)
      : NaN;
  const page =
    typeof search.page === "number" || typeof search.page === "string" ? Number(search.page) : 1;
  return {
    categoria:
      typeof search.categoria === "string" && search.categoria ? search.categoria : undefined,
    ofertas: search.ofertas === true || search.ofertas === "true" || undefined,
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    precioMax:
      search.precioMax !== "" && Number.isFinite(price) && price >= 0
        ? Math.floor(price)
        : undefined,
    orden:
      search.orden === "precio-asc" || search.orden === "precio-desc" ? search.orden : undefined,
    page: Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1,
  };
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function filterCatalog(products: Product[], search: CatalogSearch): Product[] {
  const query = normalize(search.q?.trim() ?? "");
  const filtered = products.filter((product) => {
    if (!product.active) return false;
    if (search.categoria && !product.categorySlugs.includes(search.categoria)) return false;
    if (query && !normalize(product.name).includes(query)) return false;
    return productOptions(product).some(
      (option) =>
        (search.precioMax === undefined || effectivePrice(option) <= search.precioMax) &&
        (!search.ofertas || option.salePrice !== undefined),
    );
  });
  if (search.orden) {
    // Use the "Desde" price shown on the cards, including variant discounts.
    const price = (product: Product) => Math.min(...productOptions(product).map(effectivePrice));
    const direction = search.orden === "precio-asc" ? 1 : -1;
    filtered.sort((a, b) => direction * (price(a) - price(b)));
  }
  return filtered;
}

export function paginateCatalog<T>(products: T[], page = 1, pageSize = 9) {
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const currentPage = Math.max(1, Math.min(page, totalPages));
  return {
    currentPage,
    totalPages,
    items: products.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  };
}
