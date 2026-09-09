import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { name, email, message } = body;

          const data = await resend.emails.send({
            from: "Contacto <onboarding@resend.dev>", // luego cambio esto
            to: ["contactovivau@gmail.com"],
            subject: `Nuevo mensaje de ${name}`,
            html: `
              <h2>Mensaje de contacto VIVAU</h2>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Mensaje:</strong></p>
              <p>${message}</p>
            `,
          });

          return new Response(JSON.stringify({ ok: true, data }), {
            status: 200,
          });
        } catch (error) {
          console.error(error);
          return new Response(JSON.stringify({ error: "Error enviando email" }), {
            status: 500,
          });
        }
      },
    },
  },
});
