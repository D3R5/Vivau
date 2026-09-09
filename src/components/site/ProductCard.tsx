import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { type Product, discountPct, effectivePrice, formatMXN } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const pct = discountPct(product);
  const price = effectivePrice(product);

  return (
    <div className="group flex flex-col">
      <Link
        to="/producto/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-[4/5] overflow-hidden rounded-md bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {pct > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium tracking-wide text-primary-foreground">
            −{pct}%
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium">
            Agotado
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="sm" variant="secondary" className="pointer-events-auto w-full gap-2">
            <Eye className="h-3.5 w-3.5" /> Vista rápida
          </Button>
        </div>
      </Link>
      <div className="mt-3 flex flex-col gap-0.5">
        <Link
          to="/producto/$slug"
          params={{ slug: product.slug }}
          className="font-display text-base leading-tight hover:underline"
        >
          {product.name}
        </Link>
        <p className="text-xs text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-base font-medium">{formatMXN(price)}</span>
          {product.salePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatMXN(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
