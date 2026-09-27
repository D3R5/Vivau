"use client";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import Banner from "../assets/hero-living.jpg";

export function Popup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem("popupShown");

    if (!alreadySeen) {
      setTimeout(() => {
        setShow(true);
        localStorage.setItem("popupShown", "true");
      }, 500); // delay elegante
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Card */}
      <div className="relative w-[90%] max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_.4s_ease]">
        {/* Imagen */}
        <div className="h-48 w-full overflow-hidden relative">
          <img src={Banner} alt="VIVAU muebles" className="w-full h-full object-cover" />
        </div>

        {/* Contenido */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Dale vida a tu espacio</h2>

          <p className="text-gray-600 mb-5">
            Muebles hechos a mano con diseño único. Calidad real, sin producción en masa.
          </p>

          {/* CTA */}

          <Link href="/catalogo?ofertas=false&page=1">
            <button
              onClick={() => setShow(false)}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
            >
              Ver Catálogo
            </button>
          </Link>

          {/* secundario */}
          <button
            onClick={() => setShow(false)}
            className="mt-3 text-sm text-gray-500 hover:text-black"
          >
            Seguir explorando
          </button>
        </div>

        {/* Close */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-4 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
