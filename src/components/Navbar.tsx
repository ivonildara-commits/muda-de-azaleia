import React from 'react';
import { Flower2, ShoppingBag, ShieldCheck, HelpCircle } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  return (
    <header id="header-main-nav" className="sticky top-0 z-40 bg-[#fdfaf6]/95 backdrop-blur-md border-b border-[#e5e1d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Brand Logo with Artistic Flair botanical badge */}
          <a href="#" id="brand-logo-link" className="flex items-center gap-3.5 group">
            <div className="w-8 h-8 rounded-full bg-[#5a6b5a] text-[#fdfaf6] flex items-center justify-center shadow-xs group-hover:bg-[#2d3a2f] transition-colors">
              <Flower2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif uppercase tracking-[0.2em] font-bold text-sm text-[#2d3a2f] block leading-none">
                Mondini & Azaleias
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#5a6b5a] font-medium block mt-1">
                Viveiro & Coleção Botânica
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-medium text-[#2d3a2f]">
            <a href="#catalogo" id="nav-link-catalogo" className="opacity-70 hover:opacity-100 hover:text-[#2d3a2f] transition-opacity">
              Catálogo
            </a>
            <a href="#cuidados" id="nav-link-cuidados" className="opacity-70 hover:opacity-100 hover:text-[#2d3a2f] transition-opacity">
              Cuidados
            </a>
            <a href="#garantia" id="nav-link-garantia" className="opacity-70 hover:opacity-100 hover:text-[#2d3a2f] transition-opacity flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5a6b5a]" />
              Garantia
            </a>
            <a href="#faq" id="nav-link-faq" className="opacity-70 hover:opacity-100 hover:text-[#2d3a2f] transition-opacity flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#5a6b5a]" />
              Dúvidas
            </a>
          </nav>

          {/* Actions: Minimalist Cart Counter & CTA */}
          <div className="flex items-center gap-4">
            <button
              id="btn-open-cart"
              onClick={onOpenCart}
              type="button"
              className="relative w-9 h-9 rounded-full border border-[#e5e1d8] hover:border-[#2d3a2f] bg-[#fdfaf6] text-[#2d3a2f] flex items-center justify-center transition-colors cursor-pointer"
              title="Ver sacola de compras"
              aria-label="Ver sacola de compras"
            >
              <ShoppingBag className="w-4 h-4 opacity-80" />
              {cartCount > 0 && (
                <span id="cart-badge-count" className="absolute -top-1 -right-1 bg-[#2d3a2f] text-[#fdfaf6] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href="#catalogo"
              id="nav-cta-button"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-[#2d3a2f] text-[#fdfaf6] hover:bg-[#1f2820] text-[10px] uppercase tracking-widest font-medium transition-colors"
            >
              Comprar Mudas
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
