import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { X, ExternalLink, Sun, Droplets, Ruler, ShieldCheck, ShoppingBag, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isAddedToCart: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isAddedToCart,
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      id="product-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#2d3a2f]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div
        id="product-detail-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#fdfaf6] border border-[#e5e1d8] max-w-2xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close button */}
        <button
          id="btn-close-product-modal"
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-[#e5e1d8] bg-[#fdfaf6] hover:bg-[#2d3a2f] text-[#2d3a2f] hover:text-[#fdfaf6] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar janela de detalhes"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image visual */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-[#fcf8f2] flex items-center justify-center min-h-[260px] border-b md:border-b-0 md:border-r border-[#e5e1d8]">
            {!imageError ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center p-8 text-[#2d3a2f] text-center"
              >
                <div className="w-12 h-12 rounded-full border border-[#e5e1d8] bg-white flex items-center justify-center mb-3">
                  <span className="text-xl">🌸</span>
                </div>
                <h4 className="font-serif font-bold text-xl">{product.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-[#5a6b5a] mt-1">{product.category}</p>
              </div>
            )}

            <div className="absolute bottom-3 left-3 bg-[#2d3a2f] text-[#fdfaf6] text-[10px] uppercase tracking-widest px-2.5 py-1 font-mono">
              SKU: {product.sku}
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-[#e5e1d8]"
                  style={{ backgroundColor: product.colorHex }}
                />
                <span className="text-xs font-serif italic text-[#5a6b5a]">
                  {product.category}
                </span>
                {product.highlightTag && (
                  <span className="ml-auto text-[10px] uppercase tracking-widest font-medium text-[#2d3a2f] bg-[#fcf8f2] px-2.5 py-0.5 border border-[#e5e1d8]">
                    {product.highlightTag}
                  </span>
                )}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2d3a2f] leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-[#5a6b5a] leading-relaxed italic">
                {product.description}
              </p>

              {/* Plant specs */}
              <div className="bg-[#fcf8f2] p-4 border border-[#e5e1d8] space-y-2.5 text-xs text-[#5a6b5a]">
                <div className="flex items-center gap-2.5">
                  <Sun className="w-4 h-4 text-[#5a6b5a] shrink-0" />
                  <span><strong>Luz:</strong> {product.sunlight}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Droplets className="w-4 h-4 text-[#5a6b5a] shrink-0" />
                  <span><strong>Rega:</strong> {product.watering}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Ruler className="w-4 h-4 text-[#5a6b5a] shrink-0" />
                  <span><strong>Porte muda:</strong> {product.estimatedHeight}</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-2">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#5a6b5a] block">Preço unitário</span>
                  <span className="font-serif text-3xl font-bold italic text-[#2d3a2f]">
                    {product.formattedPrice}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#5a6b5a] border border-[#e5e1d8] bg-[#fcf8f2] px-2.5 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2d3a2f]" />
                  <span>Muda viva assegurada</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <a
                id={`modal-btn-stripe-pay-${product.id}`}
                href={product.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#2d3a2f] hover:bg-[#1f2820] text-[#fdfaf6] text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-colors border border-[#2d3a2f]"
              >
                Pagar com Stripe Agora ({product.formattedPrice})
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                id={`modal-btn-cart-toggle-${product.id}`}
                type="button"
                onClick={() => onAddToCart(product)}
                className={`w-full py-3 px-4 border text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isAddedToCart
                    ? 'bg-[#2d3a2f] border-[#2d3a2f] text-[#fdfaf6]'
                    : 'border-[#e5e1d8] hover:border-[#2d3a2f] bg-[#fdfaf6] text-[#2d3a2f]'
                }`}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-4 h-4 text-[#d98880]" />
                    Adicionada à Sacola
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Adicionar à Sacola
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
