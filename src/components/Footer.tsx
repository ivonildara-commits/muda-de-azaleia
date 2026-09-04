import React from 'react';
import { Flower2, ShieldCheck, CreditCard, Lock, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#2d3a2f] text-[#e5e1d8] pt-16 pb-12 border-t border-[#3d4d3f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3d4d3f]">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#e5e1d8]/40 bg-[#fdfaf6] text-[#2d3a2f] flex items-center justify-center">
                <Flower2 className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg tracking-wide text-[#fdfaf6]">
                Viveiro das Azaleias
              </span>
            </div>
            <p className="text-xs text-[#e5e1d8]/70 leading-relaxed italic">
              Especialistas na condução e distribuição de espécimes botânicos enraizados de Rhododendron simsii (azaleia) com procedência assegurada.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#d98880] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantia botânica de espécime vivo</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-[#fdfaf6]">
              Navegação Botânica
            </h4>
            <ul className="space-y-2 text-xs text-[#e5e1d8]/70">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">Coleção de 9 Variedades</a>
              </li>
              <li>
                <a href="#cuidados" className="hover:text-white transition-colors">Guia de Sol, Rega & Poda</a>
              </li>
              <li>
                <a href="#garantia" className="hover:text-white transition-colors">Embalagem Climatizada Anti-Impacto</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Dúvidas Frequentes</a>
              </li>
            </ul>
          </div>

          {/* Varieties SKU Index */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-[#fdfaf6]">
              Registro de Cultivares
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#e5e1d8]/70 font-mono">
              <span>• Vermelha (A050)</span>
              <span>• Rosa (A030)</span>
              <span>• Pink (A020)</span>
              <span>• Rosa Claro (A060)</span>
              <span>• Pink Escuro (A040)</span>
              <span>• Branca/Rosa (A100)</span>
              <span>• Branca/Verm. (A120)</span>
              <span>• Branca/Salmão (A130)</span>
              <span>• Lilás Lavanda (A140)</span>
            </div>
          </div>

          {/* Security & Payments */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] text-[#fdfaf6]">
              Transação Criptografada
            </h4>
            <div className="bg-[#1f2820] p-4 border border-[#3d4d3f] space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#fdfaf6]">
                <Lock className="w-3.5 h-3.5 text-[#d98880]" />
                <span className="font-serif">Checkout Stripe Protegido</span>
              </div>
              <p className="text-[11px] text-[#e5e1d8]/70 italic leading-snug">
                Pagamentos operados com padrão bancário PCI-DSS Nível 1 e criptografia TLS 256-bit ponta a ponta.
              </p>
              <div className="flex items-center gap-2 text-[#e5e1d8]/60 text-[11px] pt-1 border-t border-[#3d4d3f]">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Cartões & Métodos Oficiais Stripe</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#e5e1d8]/50">
          <p>© {new Date().getFullYear()} Viveiro das Azaleias. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider">
            <span>SKUs A020 - A140</span>
            <span>•</span>
            <span>Mudas Vivas Enraizadas</span>
            <span>•</span>
            <span className="text-[#d98880]">Stripe Checkout Oficial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
