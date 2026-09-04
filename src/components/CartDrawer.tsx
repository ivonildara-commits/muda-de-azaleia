import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ExternalLink, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div
      id="cart-drawer-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#2d3a2f]/50 backdrop-blur-xs flex justify-end"
    >
      <div
        id="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#fdfaf6] h-full shadow-2xl flex flex-col justify-between border-l border-[#e5e1d8] animate-in slide-in-from-right duration-250"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e5e1d8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#2d3a2f]" />
            <h3 className="font-serif font-normal text-lg text-[#2d3a2f]">
              Sua Sacola de Mudas
            </h3>
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#5a6b5a] border border-[#e5e1d8] px-2 py-0.5">
              {totalItems} {totalItems === 1 ? 'muda' : 'mudas'}
            </span>
          </div>

          <button
            id="btn-close-cart-drawer"
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full border border-[#e5e1d8] flex items-center justify-center text-[#5a6b5a] hover:text-[#2d3a2f] hover:border-[#2d3a2f] transition-colors cursor-pointer"
            aria-label="Fechar sacola"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#e5e1d8]">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-full border border-[#e5e1d8] bg-[#fcf8f2] text-[#5a6b5a] mx-auto flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="font-serif text-[#2d3a2f]">Sua sacola está vazia</p>
              <p className="text-xs text-[#5a6b5a] max-w-xs mx-auto italic">
                Escolha suas variedades de azaleia no catálogo e adicione aqui para organizar seu pedido.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 px-5 py-2.5 bg-[#2d3a2f] text-[#fdfaf6] text-xs uppercase tracking-widest font-medium hover:bg-[#1f2820] transition-colors cursor-pointer border border-[#2d3a2f]"
              >
                Explorar Coleção
              </button>
            </div>
          ) : (
            cartItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                id={`cart-item-${product.id}`}
                className="pt-4 first:pt-0 flex gap-3.5 items-start"
              >
                {/* Product thumbnail */}
                <div className="w-16 h-16 bg-[#fcf8f2] overflow-hidden shrink-0 border border-[#e5e1d8]">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif font-bold text-sm text-[#2d3a2f] truncate">
                      {product.name}
                    </h4>
                    <button
                      id={`btn-remove-cart-${product.id}`}
                      type="button"
                      onClick={() => onRemoveItem(product.id)}
                      className="text-[#5a6b5a] hover:text-[#d98880] transition p-1"
                      title="Remover da sacola"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] font-mono text-[#5a6b5a]">SKU: {product.sku}</p>

                  <div className="mt-2 flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#e5e1d8] bg-[#fcf8f2]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        className="px-2 py-1 text-[#2d3a2f] hover:bg-[#e5e1d8] transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-mono font-bold text-[#2d3a2f]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        className="px-2 py-1 text-[#2d3a2f] hover:bg-[#e5e1d8] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-sm font-bold italic text-[#2d3a2f]">
                        R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Direct checkout button for this specific item link */}
                  <div className="mt-2.5">
                    <a
                      id={`btn-direct-pay-cart-${product.id}`}
                      href={product.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 px-2.5 bg-[#fdfaf6] hover:bg-[#2d3a2f] text-[#2d3a2f] hover:text-[#fdfaf6] border border-[#2d3a2f] text-[10px] uppercase tracking-widest font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Pagar Item no Stripe ({product.formattedPrice})
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#e5e1d8] bg-[#fcf8f2] space-y-3">
            <div className="flex justify-between items-center text-xs uppercase tracking-widest text-[#5a6b5a]">
              <span>Subtotal estimado</span>
              <span className="text-xl font-bold font-serif italic text-[#2d3a2f]">
                R$ {totalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <div className="p-3 bg-[#fdfaf6] border border-[#e5e1d8] text-xs text-[#5a6b5a] space-y-1">
              <div className="font-medium text-[#2d3a2f] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2d3a2f]" />
                <span>Links Individuais de Checkout Stripe</span>
              </div>
              <p className="text-[11px] italic leading-snug">
                Cada espécime botânico tem checkout dedicado no Stripe. Clique nos botões acima para processar seu pedido com total segurança.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                id="btn-clear-cart"
                type="button"
                onClick={onClearCart}
                className="py-2.5 px-3 border border-[#e5e1d8] hover:border-[#2d3a2f] text-[#5a6b5a] hover:text-[#2d3a2f] text-[10px] uppercase tracking-widest font-medium transition-colors cursor-pointer"
              >
                Limpar
              </button>

              {cartItems[0] && (
                <a
                  id="btn-checkout-primary-item"
                  href={cartItems[0].product.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-[#2d3a2f] hover:bg-[#1f2820] text-[#fdfaf6] text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-1.5 transition-colors border border-[#2d3a2f]"
                >
                  Pagar 1ª Muda no Stripe
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
