import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, useProducts } from "@/lib/store";
import { effectivePrice, formatMXN } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/_site/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clear } = useCart();
  const products = useProducts((s) => s.products);
  const [payment, setPayment] = useState("card");

  const lines = items
    .map((i) => {
      const p = products.find((pr) => pr.id === i.productId);
      return p ? { p, quantity: i.quantity } : null;
    })
    .filter((x): x is { p: NonNullable<ReturnType<typeof products.find>>; quantity: number } => !!x);

  const subtotal = lines.reduce((sum, l) => sum + effectivePrice(l.p) * l.quantity, 0);
  const shipping = subtotal > 15000 || subtotal === 0 ? 0 : 899;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `MR-${Math.floor(Math.random() * 90000 + 10000)}`;
    clear();
    navigate({ to: "/confirmacion", search: { orderId } });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-display text-4xl">Finalizar compra</h1>
      <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 font-display text-xl">Información del cliente</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="lastName">Apellidos</Label>
                <Input id="lastName" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" required className="mt-1.5" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl">Dirección de envío</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="street">Calle y número</Label>
                <Input id="street" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="state">Estado</Label>
                <Input id="state" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="zip">Código postal</Label>
                <Input id="zip" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="country">País</Label>
                <Input id="country" defaultValue="México" required className="mt-1.5" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl">Método de pago</h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="space-y-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-4 has-[[data-state=checked]]:border-primary">
                <RadioGroupItem value="card" id="card" />
                <div>
                  <p className="text-sm font-medium">Tarjeta de crédito o débito</p>
                  <p className="text-xs text-muted-foreground">Visa, Mastercard, AMEX</p>
                </div>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-4 has-[[data-state=checked]]:border-primary">
                <RadioGroupItem value="transfer" id="transfer" />
                <div>
                  <p className="text-sm font-medium">Transferencia bancaria</p>
                  <p className="text-xs text-muted-foreground">Recibirás los datos por correo</p>
                </div>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-4 has-[[data-state=checked]]:border-primary">
                <RadioGroupItem value="cash" id="cash" />
                <div>
                  <p className="text-sm font-medium">Pago contra entrega</p>
                  <p className="text-xs text-muted-foreground">Disponible en zonas seleccionadas</p>
                </div>
              </label>
            </RadioGroup>
          </section>
        </div>

        <aside className="h-fit rounded-md border border-border bg-secondary/30 p-6">
          <h2 className="font-display text-xl">Tu pedido</h2>
          <ul className="mt-4 divide-y divide-border">
            {lines.map((l) => (
              <li key={l.p.id} className="flex gap-3 py-3">
                <img src={l.p.image} alt="" className="h-14 w-14 rounded object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-medium leading-tight">{l.p.name}</p>
                  <p className="text-xs text-muted-foreground">Cantidad: {l.quantity}</p>
                </div>
                <span className="text-sm">{formatMXN(effectivePrice(l.p) * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatMXN(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Envío</dt>
              <dd>{shipping === 0 ? "Gratis" : formatMXN(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-display text-lg">
              <dt>Total</dt>
              <dd>{formatMXN(total)}</dd>
            </div>
          </dl>
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={lines.length === 0}>
            Confirmar pedido
          </Button>
        </aside>
      </form>
    </div>
  );
}
