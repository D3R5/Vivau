import type { Product } from "./mock-data";

/** Resolve one purchasable option. Unknown selections must never become another option. */
export function resolveProduct(product: Product, variantSku?: string): Product | undefined {
  if (!product.variants?.length) return variantSku ? undefined : product;
  const variant = variantSku
    ? product.variants.find((option) => option.sku === variantSku)
    : product.variants[0];
  if (!variant) return undefined;
  return {
    ...product,
    ...variant,
    name: `${product.name} — ${variant.name}`,
    salePrice: variant.salePrice,
    stock: variant.stock ?? product.stock,
    image: variant.image ?? variant.gallery?.[0] ?? product.image,
    gallery: variant.gallery ?? (variant.image ? [variant.image] : product.gallery),
  };
}

export function productOptions(product: Product): Product[] {
  return product.variants?.length
    ? product.variants.map((variant) => resolveProduct(product, variant.sku)!)
    : [product];
}

export function cartItemKey(item: { productId: string; variantSku?: string }): string {
  return JSON.stringify([item.productId, item.variantSku ?? null]);
}
