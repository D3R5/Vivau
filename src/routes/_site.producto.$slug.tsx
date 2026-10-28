import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import { discountPct, effectivePrice, formatCL, categories, type Product } from "@/lib/mock-data";
import { useCart, useProducts } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/site/ProductGallery";
import { ProductCard } from "@/components/site/ProductCard";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { resolveProduct } from "@/lib/product-variants";

export const Route = createFileRoute("/_site/producto/$slug")({
  component: ProductDetailPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Producto no encontrado</h1>
      <p className="mt-2 text-muted-foreground">La pieza que buscas no está disponible.</p>
      <Link to="/catalogo">
        <Button className="mt-6">Volver al catálogo</Button>
      </Link>
    </div>
  ),
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const products = useProducts((s) => s.products);
  const product = products.find((p) => p.slug === slug);
  if (!product) throw notFound();
  return <ProductDetail key={product.id} baseProduct={product} products={products} />;
}

function ProductDetail({ baseProduct, products }: { baseProduct: Product; products: Product[] }) {
  const [variantSku, setVariantSku] = useState(baseProduct.variants?.[0]?.sku);
  const selectedSku = baseProduct.variants?.some((variant) => variant.sku === variantSku)
    ? variantSku
    : baseProduct.variants?.[0]?.sku;
  const product = resolveProduct(baseProduct, selectedSku)!;
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);

  const images = [...new Set([product.image, ...(product.gallery ?? [])])];

  const pct = discountPct(product);
  const price = effectivePrice(product);
  const category = categories.find((c) => product.categorySlugs.includes(c.slug));

  const related = products
    .filter(
      (p) =>
        p.categorySlugs.some((slug) => product.categorySlugs.includes(slug)) &&
        p.id !== product.id &&
        p.active,
    )
    .slice(0, 4);

  const handleAdd = () => {
    if (add(product.id, qty, selectedSku)) {
      toast.success(`${product.name} añadido al carrito`);
    } else {
      toast.error("No se pudo agregar: revisa la disponibilidad de esta opción en tu carrito.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Inicio
        </Link>
        <span>/</span>
        <Link to="/catalogo" className="hover:text-foreground">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery key={product.sku} images={images} name={product.name} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {category && <Badge variant="secondary">{category.name}</Badge>}
            {pct > 0 && <Badge className="bg-accent text-accent-foreground">−{pct}%</Badge>}
            {product.stock === 0 ? (
              <Badge variant="outline">Agotado</Badge>
            ) : product.stock <= 3 ? (
              <Badge variant="outline">Últimas {product.stock} piezas</Badge>
            ) : (
              <Badge variant="outline">En existencia</Badge>
            )}
          </div>
          <h1 className="mt-4 font-display text-4xl leading-tight">{product.name}</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
            SKU: {product.sku}
          </p>

          {baseProduct.variants?.length ? (
            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-medium">Escoge una variante</legend>
              <div className="flex flex-wrap gap-3">
                {baseProduct.variants.map((variant) => (
                  <label
                    key={variant.sku}
                    className={`cursor-pointer rounded-md border px-4 py-3 text-sm transition-colors focus-within:ring-2 focus-within:ring-ring ${
                      selectedSku === variant.sku
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    <input
                      type="radio"
                      name="product-variant"
                      value={variant.sku}
                      checked={selectedSku === variant.sku}
                      onChange={() => {
                        setVariantSku(variant.sku);
                        setQty(1);
                      }}
                      className="sr-only"
                    />
                    {variant.name}
                    {(variant.stock ?? baseProduct.stock) === 0 && (
                      <span className="ml-2 text-xs text-muted-foreground">Agotado</span>
                    )}
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}

          <div aria-live="polite" className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl">{formatCL(price)}</span>
            {product.salePrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatCL(product.price)}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-md leading-relaxed text-foreground/80">{product.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-y-3 border-t border-border pt-6 text-sm">
            <dt className="text-muted-foreground">Material</dt>
            <dd>{product.material}</dd>
            <dt className="text-muted-foreground">Dimensiones</dt>
            <dd>{product.dimensions}</dd>
            {/* <dt className="text-muted-foreground">Peso</dt>
            <dd>{product.weight}</dd> */}
            <dt className="text-muted-foreground">Marca</dt>
            <dd>{product.brand}</dd>
          </dl>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-md border border-border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid h-11 w-11 place-items-center hover:bg-secondary"
                aria-label="Disminuir"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty(Math.min(product.stock || 1, qty + 1))}
                className="grid h-11 w-11 place-items-center hover:bg-secondary"
                aria-label="Aumentar"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1 gap-2"
              disabled={product.stock === 0}
              onClick={handleAdd}
            >
              <ShoppingBag className="h-4 w-4" />
              {product.stock === 0 ? "Agotado" : "Añadir al carrito"}
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3 rounded-md bg-secondary/50 p-4">
              <Truck className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Envío a domicilio</p>
                <p className="text-xs text-muted-foreground">
                  Retiro o envío a coordinar con comprador
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-secondary/50 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Garantía 6 Meses</p>
                <p className="text-xs text-muted-foreground">En detalles de estructura</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 font-display text-2xl">Piezas relacionadas</h2>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
