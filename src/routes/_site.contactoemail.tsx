import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/contactoemail")({
  component: ContactoPageEmail,
});

function ContactoPageEmail() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      e.currentTarget.reset();
    }
  }

  return (
    <section className="w-full max-w-xl mx-auto px-4 py-12">
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
        <h2 className="text-2xl font-display mb-2 text-foreground">Contáctanos</h2>

        <p className="text-muted-foreground text-sm mb-6">
          ¿Tienes dudas o quieres cotizar un mueble? Escríbenos.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Nombre"
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />

          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />

          <textarea
            name="message"
            placeholder="Tu mensaje..."
            required
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary text-primary-foreground py-2 text-sm"
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>

          {success && <p className="text-sm text-green-600">Mensaje enviado correctamente 🙌</p>}
        </form>
      </div>
    </section>
  );
}
