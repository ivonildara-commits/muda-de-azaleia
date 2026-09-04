import React from 'react';
import { PackageCheck, ShieldCheck, Lock, Sprout } from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  const features = [
    {
      icon: <PackageCheck className="w-5 h-5 text-[#2d3a2f]" />,
      title: 'Embalagem Botânica com Hidrogel',
      desc: 'Mudas preparadas com proteção nas raízes e hidrogel umectante, suportando com frescor e segurança viagens de até 12 dias.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#2d3a2f]" />,
      title: 'Garantia de Chegada Viva',
      desc: 'Garantimos que sua muda chegará verde, firme e saudável. Caso ocorra qualquer imprevisto no transporte, reenviamos sem burocracia.',
    },
    {
      icon: <Lock className="w-5 h-5 text-[#2d3a2f]" />,
      title: 'Checkout Seguro Stripe',
      desc: 'Seus dados financeiros são processados pela infraestrutura global do Stripe com criptografia de ponta a ponta.',
    },
    {
      icon: <Sprout className="w-5 h-5 text-[#2d3a2f]" />,
      title: 'Direto do Viveiro Produtor',
      desc: 'Sem intermediários. Você recebe espécimes selecionados a dedo diretamente das estufas de cultivo.',
    },
  ];

  return (
    <section id="garantia" className="py-16 bg-[#fcf8f2] border-y border-[#e5e1d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#5a6b5a] border border-[#e5e1d8] bg-[#fdfaf6] px-3.5 py-1 rounded-full">
            Segurança & Procedência
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2d3a2f] mt-3">
            O Padrão de Cultivo do Viveiro
          </h2>
          <p className="text-xs text-[#5a6b5a] italic mt-1.5">
            Cuidado artesanal do enraizamento à entrega em sua porta
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              id={`trust-feature-${i}`}
              className="p-6 bg-[#fdfaf6] border border-[#e5e1d8] flex flex-col justify-start hover:border-[#2d3a2f] transition-colors"
            >
              <div className="w-10 h-10 border border-[#e5e1d8] bg-white flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-serif font-bold text-sm text-[#2d3a2f] mb-2 tracking-wide">
                {f.title}
              </h3>
              <p className="text-xs text-[#5a6b5a] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
