import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Truck, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#fdfaf6] py-16 sm:py-24 border-b border-[#e5e1d8]">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#e5e1d8]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#d98880]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#2d3a2f]/20 bg-[#fcf8f2] text-[#2d3a2f] text-[10px] font-medium tracking-[0.2em] uppercase rounded-full">
              <Sparkles className="w-3 h-3 text-[#5a6b5a]" />
              Coleção Botânica Exclusiva
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#2d3a2f] tracking-tight leading-[1.12]">
              Flores de Época: <br />
              <span className="italic text-[#5a6b5a]">Mudas de Azaleias</span> <br />
              a partir de <span className="font-bold italic text-[#2d3a2f]">R$ 7,50</span>
            </h1>

            <p className="text-base sm:text-lg italic text-[#5a6b5a] max-w-2xl leading-relaxed">
              Uma seleção curada de Azaleias e espécimes floríferos cultivados com paciência e técnica botânica. Explore as tonalidades, texturas e formas da nossa coleção exclusiva com pagamento seguro no Stripe.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-btn-explore"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#2d3a2f] hover:bg-[#1f2820] text-[#fdfaf6] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer border border-[#2d3a2f]"
              >
                Ver Coleção Completa (9 Cores)
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#cuidados"
                id="hero-btn-care-guide"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#fdfaf6] text-[#2d3a2f] border border-[#e5e1d8] hover:border-[#2d3a2f] text-xs uppercase tracking-widest font-medium transition-colors"
              >
                Guia de Cultivo
              </a>
            </div>

            {/* Trust bullet badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#e5e1d8]">
              <div className="flex items-center gap-2 text-xs text-[#5a6b5a]">
                <CheckCircle2 className="w-4 h-4 text-[#2d3a2f] shrink-0" />
                <span className="uppercase tracking-wider text-[11px]">Mudas Enraizadas</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#5a6b5a]">
                <Truck className="w-4 h-4 text-[#2d3a2f] shrink-0" />
                <span className="uppercase tracking-wider text-[11px]">Embalagem Especial</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#5a6b5a]">
                <Shield className="w-4 h-4 text-[#2d3a2f] shrink-0" />
                <span className="uppercase tracking-wider text-[11px]">Checkout Stripe Seguro</span>
              </div>
            </div>
          </div>

          {/* Featured Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white p-6 border border-[#e5e1d8]">
              <div className="aspect-4/3 overflow-hidden bg-[#fcf8f2] relative mb-5 border border-[#e5e1d8]">
                <img
                  src="https://mondiniplantas.cdn.magazord.com.br/img/2025/06/produto/7128/muda-de-azaleia.jpg"
                  alt="Muda de Azaleia em Flor"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                    const parent = (e.target as HTMLElement).parentElement;
                    if (parent) {
                      parent.classList.add('bg-[#5a6b5a]');
                    }
                  }}
                />
                <span className="absolute top-3 left-3 bg-[#2d3a2f] text-[#fdfaf6] text-[10px] uppercase tracking-widest font-medium px-2.5 py-1">
                  Destaque da Estação
                </span>
                <span className="absolute bottom-3 right-3 bg-[#fdfaf6] text-[#2d3a2f] text-[11px] font-serif font-bold italic px-2.5 py-1 border border-[#e5e1d8]">
                  A partir de R$ 7,50
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#2d3a2f]">Coleção Botânica Azaleia</h2>
                    <p className="text-xs text-[#5a6b5a] italic mt-0.5">Espécimes selecionados com substrato nutritivo</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-[#e5e1d8] text-[#5a6b5a]">
                    A020 – A140
                  </span>
                </div>

                <div className="p-4 bg-[#fcf8f2] border border-[#e5e1d8] text-xs text-[#5a6b5a] space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Altura das mudas:</span>
                    <strong className="text-[#2d3a2f] font-serif">20 a 35 cm</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Floração:</span>
                    <strong className="text-[#2d3a2f] font-serif italic">Imediata / 1ª Estação</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Garantia de planta viva:</span>
                    <strong className="text-[#2d3a2f] font-serif">100% Assegurada</strong>
                  </div>
                </div>

                <a
                  href="#catalogo"
                  id="hero-card-cta"
                  className="w-full py-3 px-4 bg-[#2d3a2f] hover:bg-[#1f2820] text-[#fdfaf6] text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  Explorar as 9 Tonalidades
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
