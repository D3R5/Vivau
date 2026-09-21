"use client";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const phone = "56920995401";

  const createLink = (text: string) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  const faqs = [
    {
      question: "¿Tienen stock disponible?",
      answer:
        "Hola! Si, todos los productos que ves en la web están disponibles. Si quieres, podemos ayudarte a elegir el producto ideal según tu espacio y estilo.",
    },
    {
      question: "¿Hacen envíos?",
      answer:
        "Hola! Sí, hacemos envíos a todo el país. La entrega se realiza coordinando contigo según tu ubicación y disponibilidad.",
    },
    {
      question: "¿Qué medios de pago aceptan?",
      answer: "Hola! Aceptamos pagos en efectivo, transferencia bancaria.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-72 rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-green-500 px-4 py-3 text-white">
            <span className="font-semibold">¿Necesitas ayuda?</span>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-4 space-y-2">
            <p className="text-sm text-gray-600">Respuestas rápidas:</p>

            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border overflow-hidden">
                {/* Pregunta */}
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
                >
                  {faq.question}
                </button>

                {/* Respuesta */}
                {activeIndex === i && (
                  <div className="px-3 pb-3 text-xs text-gray-600 space-y-2">
                    <p>{faq.answer}</p>

                    <a
                      href={createLink(faq.answer)}
                      target="_blank"
                      className="inline-block text-green-600 font-medium hover:underline"
                    >
                      Enviar por WhatsApp →
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* CTA principal */}
            <a
              href={createLink("Hola! Quiero hablar con un ejecutivo")}
              target="_blank"
              className="mt-3 block w-full rounded-lg bg-green-500 px-4 py-2 text-center text-white font-medium hover:bg-green-600 transition"
            >
              Hablar con un ejecutivo
            </a>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-[9999] flex items-center justify-center rounded-full bg-[#25D366] p-4 text-white shadow-lg active:scale-95"
      >
        <FaWhatsapp size={26} />

        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
      </button>

      {/* Animación */}
      <style>{`
        @keyframes shake {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(10deg);
          }
          20% {
            transform: rotate(-10deg);
          }
          30% {
            transform: rotate(8deg);
          }
          40% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(4deg);
          }
          60% {
            transform: rotate(-4deg);
          }
          70% {
            transform: rotate(2deg);
          }
          80% {
            transform: rotate(-2deg);
          }
          90% {
            transform: rotate(1deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes attention {
          0%,
          85%,
          100% {
            transform: rotate(0deg);
          }
          88% {
            transform: rotate(8deg);
          }
          91% {
            transform: rotate(-8deg);
          }
          94% {
            transform: rotate(6deg);
          }
          97% {
            transform: rotate(-6deg);
          }
        }
      `}</style>
    </>
  );
}
