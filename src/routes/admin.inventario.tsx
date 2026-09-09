import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Save } from "lucide-react";
import { useProducts } from "@/lib/store";
import { categories, effectivePrice, formatMXN } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/inventario")({
  loader: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

function AdminInventory() {
  const { products, updateStock } = useProducts();
  const [drafts, setDrafts] = useState<Record<string, number>>({});

  const active = products.filter((p) => p.active);
  const lowStock = active.filter((p) => p.stock > 0 && p.stock <= 3);
  const outOfStock = active.filter((p) => p.stock === 0);
  const totalValue = active.reduce((s, p) => s + effectivePrice(p) * p.stock, 0);
  const totalUnits = active.reduce((s, p) => s + p.stock, 0);

  const save = (id: string) => {
    const next = drafts[id];
    if (typeof next === "number" && !Number.isNaN(next)) {
      updateStock(id, next);
      setDrafts((d) => {
        const { [id]: _, ...rest } = d;
        return rest;
      });
      toast.success("Stock actualizado");
    }
  };

  const renderTable = (rows: typeof active) => (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock actual</TableHead>
            <TableHead>Nuevo stock</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => {
            const draft = drafts[p.id];
            return (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="h-9 w-9 rounded object-cover" />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{p.sku}</TableCell>
                <TableCell>{categories.find((c) => c.slug === p.categorySlug)?.name}</TableCell>
                <TableCell>{formatMXN(effectivePrice(p))}</TableCell>
                <TableCell>
                  {p.stock === 0 ? (
                    <Badge variant="destructive">Agotado</Badge>
                  ) : p.stock <= 3 ? (
                    <Badge className="bg-accent text-accent-foreground">{p.stock}</Badge>
                  ) : (
                    <span>{p.stock}</span>
                  )}
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={draft ?? p.stock}
                    onChange={(e) =>
                      setDrafts((d) => ({ ...d, [p.id]: Number(e.target.value) }))
                    }
                    className="h-8 w-24"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant={draft !== undefined && draft !== p.stock ? "default" : "ghost"}
                    disabled={draft === undefined || draft === p.stock}
                    onClick={() => save(p.id)}
                    className="gap-1.5"
                  >
                    <Save className="h-3.5 w-3.5" /> Guardar
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                Sin productos en esta lista.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl">Inventario</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Actualiza el stock y monitorea alertas.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-background p-5">
          <p className="text-sm text-muted-foreground">Unidades en stock</p>
          <p className="mt-2 font-display text-2xl">{totalUnits}</p>
        </div>
        <div className="rounded-md border border-border bg-background p-5">
          <p className="text-sm text-muted-foreground">Valor de inventario</p>
          <p className="mt-2 font-display text-2xl">{formatMXN(totalValue)}</p>
        </div>
        <div className="rounded-md border border-accent/40 bg-accent/5 p-5">
          <p className="flex items-center gap-1.5 text-sm text-accent">
            <AlertTriangle className="h-4 w-4" /> Alertas
          </p>
          <p className="mt-2 font-display text-2xl">{lowStock.length + outOfStock.length}</p>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos ({active.length})</TabsTrigger>
          <TabsTrigger value="low">Stock bajo ({lowStock.length})</TabsTrigger>
          <TabsTrigger value="out">Agotados ({outOfStock.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {renderTable(active)}
        </TabsContent>
        <TabsContent value="low" className="mt-4">
          {renderTable(lowStock)}
        </TabsContent>
        <TabsContent value="out" className="mt-4">
          {renderTable(outOfStock)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
