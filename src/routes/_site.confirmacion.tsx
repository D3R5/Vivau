import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_site/confirmacion")({
  validateSearch: (s: Record<string, unknown>) => ({
    orderId: typeof s.orderId === "string" ? s.orderId : "MR-00000",
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { orderId } = Route.useSearch();
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
      <h1 className="mt-6 font-display text-4xl">¡Gracias por tu compra!</h1>
      <p className="mt-3 text-muted-foreground">
        Tu pedido <span className="font-medium text-foreground">{orderId}</span> fue recibido.
        Te enviaremos un correo con los detalles de envío.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/">
          <Button variant="outline">Volver al inicio</Button>
        </Link>
        <Link to="/catalogo">
          <Button>Seguir comprando</Button>
        </Link>
      </div>
    </div>
  );
}
