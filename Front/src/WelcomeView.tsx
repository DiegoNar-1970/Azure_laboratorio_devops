import React, { useState } from 'react';

// Interfaz para las novedades tecnológicas
interface TechNews {
  id: number;
  title: string;
  tag: string;
  description: string;
}

export const WelcomeView: React.FC = () => {
  const [isSiriActive, setIsSiriActive] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<TechNews | null>(null);

  // Datos actualizados sobre tecnologías de IA y móviles
  const techNewsList: TechNews[] = [
    {
      id: 1,
      tag: "Apple Intelligence",
      title: "Siri AI con Contexto en Pantalla",
      description: "Siri AI ahora integra comprensión del contexto personal e interactúa en tiempo real con lo que ves en la pantalla de tu dispositivo."
    },
    {
      id: 2,
      tag: "Procesadores A20",
      title: "Aceleradores Neurales de Redes",
      description: "Los nuevos chips A20 Pro integran aceleradores dedicados para modelos de lenguaje locales con un 50% más de ancho de banda de memoria."
    },
    {
      id: 3,
      tag: "Fotografía y Generación",
      title: "Image Playground fotorrealista",
      description: "Generación de imagen on-device con límites de seguridad mediante Private Cloud Compute y herramientas de edición espacial."
    }
  ];

  const toggleSiri = () => {
    setIsSiriActive((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-black text-white font-sans overflow-hidden p-6 select-none">
      
      {/* 1. EFECTO SIRI GLOW EN LOS BORDES (Apple Intelligence Style) */}
      <div 
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 z-10 ${
          isSiriActive ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          boxShadow: 'inset 0 0 60px 15px rgba(236, 72, 153, 0.6), inset 0 0 100px 30px rgba(99, 102, 241, 0.5), inset 0 0 140px 40px rgba(168, 85, 247, 0.4)'
        }}
      />

      {/* 2. BARRA SUPERIOR (Dynamic Island Style) */}
      <header className="w-full max-w-md flex justify-between items-center pt-2 z-20">
        <div className="mx-auto bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full flex items-center gap-3 shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-gray-200">
            Siri AI Standby
          </span>
        </div>
      </header>

      {/* 3. CONTENIDO PRINCIPAL / BIENVENIDA */}
      <main className="w-full max-w-md flex flex-col items-center text-center my-auto z-20 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Bienvenido
          </h1>
          <p className="text-sm text-gray-400 font-medium max-w-xs mx-auto">
            Explora las últimas innovaciones tecnológicas impulsadas por Inteligencia Artificial.
          </p>
        </div>

        {/* FEED DE NOTICIAS TECNOLÓGICAS (Estilo Tarjetas iOS) */}
        <div className="w-full space-y-3">
          {techNewsList.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group cursor-pointer text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-all duration-300 active:scale-95 shadow-lg"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                {item.tag}
              </span>
              <h3 className="text-base font-semibold text-white mt-2 group-hover:text-indigo-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* 4. BOTÓN INTERACTIVO SIRI / APPLE INTELLIGENCE */}
      <footer className="w-full max-w-md flex flex-col items-center pb-6 z-20 space-y-4">
        <button
          onClick={toggleSiri}
          className="relative group p-1 rounded-full transition-transform active:scale-90 duration-200 focus:outline-none"
        >
          {/* Fondo resplandeciente animado detrás del botón */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 blur-md group-hover:opacity-100 transition duration-500 animate-spin" />
          
          <div className="relative flex items-center gap-3 bg-black/80 backdrop-blur-2xl border border-white/20 px-6 py-3 rounded-full shadow-2xl">
            {/* Esfera con gradiente de color estilo Siri */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-indigo-500 animate-pulse shadow-inner" />
            <span className="text-sm font-medium text-white tracking-wide">
              {isSiriActive ? "Desactivar Siri AI" : "Preguntar a Siri AI"}
            </span>
          </div>
        </button>
        <p className="text-[10px] text-gray-500">Toca para activar el resplandor de Apple Intelligence</p>
      </footer>

      {/* 5. MODAL DETALLE DE NOTICIA (Estilo Sheet de iOS) */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center z-30 p-4 transition-all">
          <div className="bg-neutral-900/90 border border-white/15 w-full max-w-sm rounded-3xl p-6 text-left space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              {selectedNews.tag}
            </span>
            <h2 className="text-xl font-bold text-white">{selectedNews.title}</h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {selectedNews.description}
            </p>
            <button
              onClick={() => setSelectedNews(null)}
              className="w-full py-3 bg-white text-black font-semibold rounded-2xl hover:bg-gray-200 active:scale-95 transition-all text-sm mt-4 shadow-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default WelcomeView;