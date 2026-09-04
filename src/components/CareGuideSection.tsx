import React from 'react';
import { Sun, Droplets, Sprout, Scissors, Sparkles, HeartHandshake } from 'lucide-react';
import { CARE_TIPS } from '../data/products';

export const CareGuideSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#2d3a2f]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#2d3a2f]" />;
      case 'Sprout':
        return <Sprout className="w-5 h-5 text-[#2d3a2f]" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-[#2d3a2f]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#2d3a2f]" />;
    }
  };

  return (
    <section id="cuidados" className="py-20 bg-[#fcf8f2] border-t border-[#e5e1d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#5a6b5a] border border-[#e5e1d8] bg-[#fdfaf6] px-3.5 py-1 rounded-full">
            Técnicas de Cultivo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2d3a2f]">
            Como Conduzir e Cuidar das Suas Azaleias
          </h2>
          <p className="text-[#5a6b5a] text-xs sm:text-sm italic leading-relaxed">
            Nossas mudas são entregues vigorosas e enraizadas. Com estas recomendações botânicas simples, você terá florações ricas e duradouras.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARE_TIPS.map((tip, idx) => (
            <div
              key={tip.title}
              id={`care-tip-card-${idx}`}
              className="bg-[#fdfaf6] p-6 border border-[#e5e1d8] hover:border-[#2d3a2f] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 border border-[#e5e1d8] bg-white flex items-center justify-center mb-4">
                  {getIcon(tip.icon)}
                </div>
                <h3 className="font-serif font-bold text-base text-[#2d3a2f] mb-2">
                  {tip.title}
                </h3>
                <p className="text-xs text-[#5a6b5a] leading-relaxed">
                  {tip.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#e5e1d8] flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#5a6b5a]">
                <HeartHandshake className="w-3.5 h-3.5 text-[#2d3a2f]" />
                <span>Espécime rústico e resiliente</span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner with nursery advice */}
        <div className="mt-12 bg-[#2d3a2f] text-[#fdfaf6] p-8 sm:p-10 border border-[#2d3a2f] relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#d98880] border border-[#e5e1d8]/30 px-3 py-1 inline-block">
              Solo & Vasos
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight">
              Vai plantar em vasos de terracota ou diretamente no canteiro?
            </h3>
            <p className="text-[#e5e1d8] text-xs sm:text-sm italic leading-relaxed opacity-90">
              As azaleias se adaptam perfeitamente a ambos! Em vasos, utilize recipientes com furos de drenagem e uma camada de brita ou argila expandida no fundo. No canteiro, deixe espaçamento de 40 a 50 cm entre cada muda para formar um renque floral denso e equilibrado.
            </p>
            <div className="pt-2">
              <a
                href="#catalogo"
                id="btn-care-catalog-redirect"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fdfaf6] text-[#2d3a2f] hover:bg-white text-xs uppercase tracking-widest font-medium transition-colors border border-[#e5e1d8]"
              >
                Retornar ao Catálogo de Mudas
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
