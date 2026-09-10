import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import { discountPct, effectivePrice, formatMXN, categories } from "@/lib/mock-data";
import { useCart, useProducts } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);

  //Zoom
  const [isZoomed, setIsZoomed] = useState(false);
  const [blockZoom, setBlockZoom] = useState(false);

  // 🖼️ Slider state
  const images = [product.image, ...(product.gallery || []).filter((img) => img !== product.image)];
  const [currentIndex, setCurrentIndex] = useState(0);

  // 👆 Swipe / drag state
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // 📱 Touch (móvil)
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) nextImage();
    else if (endX - startX > 50) prevImage();
    if (Math.abs(startX - endX) < 10) {
      setIsZoomed(true);
    }
  };

  // 🖱️ Mouse drag (desktop)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  const blockZoomRef = useRef(false);
  const handleMouseUp = (e) => {
    if (e.target.closest("button")) return;

    if (blockZoomRef.current) {
      blockZoomRef.current = false;
      return;
    }

    const endX = e.clientX;
    const diff = startX - endX;

    if (Math.abs(diff) < 5) {
      setIsZoomed(true);
    } else if (diff > 50) {
      nextImage();
    } else if (diff < -50) {
      prevImage();
    }

    setIsDragging(false);
  };
  const pct = discountPct(product);
  const price = effectivePrice(product);
  const category = categories.find((c) => c.slug === product.categorySlug);

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id && p.active)
    .slice(0, 4);

  const handleAdd = () => {
    add(product.id, qty);
    toast.success(`${product.name} añadido al carrito`);
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
        <div>
          <div
            className="relative aspect-square overflow-hidden rounded-md bg-secondary select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
          >
            <img
              src={images[currentIndex]}
              alt={product.name}
              className="h-full w-full object-cover pointer-events-none cursor-zoom-in"
            />

            {images.length > 1 && (
              <>
                {/* ← */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 evita zoom
                    blockZoomRef.current = true;

                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                >
                  ‹
                </button>

                {/* → */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 🔥 evita zoom
                    blockZoomRef.current = true;

                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Miniaturas */}
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`aspect-square overflow-hidden rounded-md border-2 ${
                    currentIndex === i ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

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

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl">{formatMXN(price)}</span>
            {product.salePrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatMXN(product.price)}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-md leading-relaxed text-foreground/80">{product.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-y-3 border-t border-border pt-6 text-sm">
            <dt className="text-muted-foreground">Material</dt>
            <dd>{product.material}</dd>
            <dt className="text-muted-foreground">Dimensiones</dt>
            <dd>{product.dimensions}</dd>
            <dt className="text-muted-foreground">Peso</dt>
            <dd>{product.weight}</dd>
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
                <p className="text-xs text-muted-foreground">5–10 días hábiles</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-secondary/50 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Garantía 6 Meses</p>
                <p className="text-xs text-muted-foreground">En estructura de madera</p>
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
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <img
            src={images[currentIndex]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain cursor-zoom-out transition-transform duration-300 scale-100"
          />
        </div>
      )}
    </div>
  );
}
