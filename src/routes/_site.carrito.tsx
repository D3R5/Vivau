import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart, useProducts } from "@/lib/store";
import { effectivePrice, formatMXN } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_site/carrito")({
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove } = useCart();
  const products = useProducts((s) => s.products);

  const lines = items
    .map((i) => {
      const product = products.find((p) => p.id === i.productId);
      return product ? { product, quantity: i.quantity } : null;
    })
    .filter((x): x is { product: NonNullable<ReturnType<typeof products.find>>; quantity: number } => !!x);

  const subtotal = lines.reduce((sum, l) => sum + effectivePrice(l.product) * l.quantity, 0);
  const savings = lines.reduce(
    (sum, l) => sum + (l.product.salePrice ? (l.product.price - l.product.salePrice) * l.quantity : 0),
    0,
  );
  const shipping = subtotal > 15000 || subtotal === 0 ? 0 : 899;
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
        <h1 className="mt-6 font-display text-3xl">Tu carrito está vacío</h1>
        <p className="mt-2 text-muted-foreground">
          Explora nuestra colección y añade tus piezas favoritas.
        </p>
        <Link to="/catalogo">
          <Button className="mt-6">Ir al catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-display text-4xl">Tu carrito</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border border-y border-border">
          {lines.map((l) => (
            <li key={l.product.id} className="flex gap-4 py-6">
              <Link
                to="/producto/$slug"
                params={{ slug: l.product.slug }}
                className="h-28 w-28 shrink-0 overflow-hidden rounded-md bg-secondary"
              >
                <img src={l.product.image} alt={l.product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link
                      to="/producto/$slug"
                      params={{ slug: l.product.slug }}
                      className="font-display text-base hover:underline"
                    >
                      {l.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{l.product.material}</p>
                  </div>
                  <button
                    onClick={() => remove(l.product.id)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Eliminar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      onClick={() => setQty(l.product.id, l.quantity - 1)}
                      className="grid h-9 w-9 place-items-center hover:bg-secondary"
                      aria-label="Disminuir"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{l.quantity}</span>
                    <button
                      onClick={() => setQty(l.product.id, l.quantity + 1)}
                      className="grid h-9 w-9 place-items-center hover:bg-secondary"
                      aria-label="Aumentar"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-medium">
                    {formatMXN(effectivePrice(l.product) * l.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-md border border-border bg-secondary/30 p-6">
          <h2 className="font-display text-xl">Resumen</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatMXN(subtotal)}</dd>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-accent">
                <dt>Ahorros</dt>
                <dd>−{formatMXN(savings)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Envío estimado</dt>
              <dd>{shipping === 0 ? "Gratis" : formatMXN(shipping)}</dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-3 font-display text-lg">
              <dt>Total</dt>
              <dd>{formatMXN(total)}</dd>
            </div>
          </dl>
          <Link to="/checkout">
            <Button size="lg" className="mt-6 w-full">
              Ir a pagar
            </Button>
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Envío gratis en compras mayores a $15,000
          </p>
        </aside>
      </div>
    </div>
  );
}
