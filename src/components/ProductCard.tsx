import React, { useState } from 'react';
import { Product } from '../types';
import { ExternalLink, Eye, Plus, Check, Flower2, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAddedToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToCart,
  isAddedToCart = false,
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const isSpecial = product.price > 7.5 || product.category.includes('BRANCA') || product.category.includes('C/');

  return (
    <article
      id={`product-card-${product.id}`}
      className={`group border border-[#e5e1d8] hover:border-[#2d3a2f] transition-all duration-300 flex flex-col overflow-hidden relative ${
        isSpecial ? 'bg-[#fcf8f2]' : 'bg-white'
      }`}
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.highlightTag && (
          <span className="px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] bg-[#2d3a2f] text-[#fdfaf6] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#d98880]" />
            {product.highlightTag}
          </span>
        )}
        <span className="px-2 py-0.5 text-[10px] font-mono border border-[#e5e1d8] bg-[#fdfaf6]/90 text-[#5a6b5a]">
          SKU: {product.sku}
        </span>
      </div>

      {/* Color indicator pip on top right */}
      <div className="absolute top-3 right-3 z-10">
        <div
          className="w-6 h-6 rounded-full border border-[#e5e1d8] shadow-xs flex items-center justify-center"
          style={{ backgroundColor: product.colorHex }}
          title={`Tonalidade da flor: ${product.category}`}
        >
          <span className="sr-only">{product.category}</span>
        </div>
      </div>

      {/* Image Area with Fallback */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-[#fdfaf6] flex items-center justify-center cursor-pointer border-b border-[#e5e1d8]"
        onClick={() => onOpenDetails(product)}
      >
        {!imageFailed ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#2d3a2f] bg-[#fcf8f2]"
          >
            <Flower2 className="w-10 h-10 mb-2 text-[#5a6b5a] animate-pulse" />
            <span className="font-serif font-bold text-lg leading-tight">{product.name}</span>
            <span className="text-[10px] text-[#5a6b5a] mt-1 uppercase tracking-widest">{product.category}</span>
          </div>
        )}

        {/* Quick hover action overlay */}
        <div className="absolute inset-0 bg-[#2d3a2f]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            id={`btn-view-details-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="px-4 py-2 bg-[#fdfaf6] text-[#2d3a2f] text-[10px] uppercase tracking-widest font-medium border border-[#2d3a2f] flex items-center gap-1.5 shadow-xs hover:bg-[#2d3a2f] hover:text-[#fdfaf6] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Detalhes
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2 flex items-center justify-between text-xs text-[#5a6b5a]">
          <span className="font-serif italic text-xs text-[#5a6b5a]">
            {product.category}
          </span>
          <span className="text-[11px] font-mono">{product.estimatedHeight}</span>
        </div>

        <h3
          onClick={() => onOpenDetails(product)}
          className="font-serif font-bold text-lg text-[#2d3a2f] group-hover:text-[#5a6b5a] transition-colors line-clamp-1 cursor-pointer"
          title={product.name}
        >
          {product.name}
        </h3>

        <p className="text-xs text-[#5a6b5a] mt-1.5 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price Tag */}
        <div className="mt-4 pt-3 border-t border-[#e5e1d8] flex items-baseline justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#5a6b5a] block">Preço unitário</span>
            <span className="font-serif text-2xl font-bold italic text-[#2d3a2f]">
              {product.formattedPrice}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#5a6b5a] border border-[#e5e1d8] px-2 py-0.5">
            Muda Viva
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Primary Action: Direct Stripe Checkout */}
          <a
            id={`btn-stripe-buy-${product.id}`}
            href={product.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-[#2d3a2f] hover:bg-[#1f2820] text-[#fdfaf6] text-[11px] uppercase tracking-widest font-medium flex items-center justify-center gap-1.5 transition-colors border border-[#2d3a2f] text-center"
            title="Comprar diretamente via Stripe com cartão ou boleto"
          >
            Comprar
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Secondary Action: Add to Bag or View */}
          <button
            id={`btn-add-to-cart-${product.id}`}
            type="button"
            onClick={() => onAddToCart(product)}
            className={`w-full py-2.5 px-3 text-[11px] uppercase tracking-widest font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
              isAddedToCart
                ? 'bg-[#2d3a2f] border-[#2d3a2f] text-[#fdfaf6]'
                : 'border-[#e5e1d8] hover:border-[#2d3a2f] bg-[#fdfaf6] text-[#2d3a2f] hover:bg-white'
            }`}
          >
            {isAddedToCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#d98880]" />
                Na Sacola
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 opacity-70" />
                Sacola
              </>
            )}
          </button>
        </div>

        {/* Safe Stripe mention */}
        <p className="text-[10px] text-[#5a6b5a] text-center mt-2.5 opacity-80">
          Pagamento seguro via Stripe Checkout
        </p>
      </div>
    </article>
  );
};
