import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { useProducts } from "@/lib/store";
import { effectivePrice, formatMXN } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/")({
  loader: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

function AdminDashboard() {
  const products = useProducts((s) => s.products);
  const active = products.filter((p) => p.active);
  const totalInventoryValue = active.reduce(
    (sum, p) => sum + effectivePrice(p) * p.stock,
    0,
  );
  const lowStock = active.filter((p) => p.stock > 0 && p.stock <= 3);
  const outOfStock = active.filter((p) => p.stock === 0);
  const recent = [...products]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  const stats = [
    { label: "Productos totales", value: products.length, icon: Package },
    {
      label: "Valor de inventario",
      value: formatMXN(totalInventoryValue),
      icon: DollarSign,
    },
    { label: "Stock bajo", value: lowStock.length, icon: AlertTriangle },
    { label: "Ventas del mes", value: "142", icon: TrendingUp, sub: "+18% vs mes anterior" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl">Panel general</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Resumen de tu inventario y actividad reciente.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-md border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-3 font-display text-2xl">{s.value}</p>
            {s.sub && <p className="mt-1 text-xs text-accent">{s.sub}</p>}
          </div>
        ))}
      </div>

      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="mt-8 rounded-md border border-accent/40 bg-accent/5 p-5">
          <div className="flex items-center gap-2 text-accent">
            <AlertTriangle className="h-4 w-4" />
            <h2 className="font-medium">Alertas de inventario</h2>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm">
            {outOfStock.map((p) => (
              <li key={p.id}>
                <span className="font-medium">{p.name}</span> —{" "}
                <span className="text-destructive">agotado</span>
              </li>
            ))}
            {lowStock.map((p) => (
              <li key={p.id}>
                <span className="font-medium">{p.name}</span> — quedan {p.stock} piezas
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">Productos recientes</h2>
          <Link to="/admin/productos" className="text-sm hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="overflow-hidden rounded-md border border-border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="flex items-center gap-3">
                    <img src={p.image} alt="" className="h-9 w-9 rounded object-cover" />
                    <span className="font-medium">{p.name}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.sku}</TableCell>
                  <TableCell>{formatMXN(effectivePrice(p))}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>
                    {p.active ? (
                      <Badge variant="secondary">Activo</Badge>
                    ) : (
                      <Badge variant="outline">Inactivo</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
