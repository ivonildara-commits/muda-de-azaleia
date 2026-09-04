import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CareGuideSection } from './components/CareGuideSection';
import { TrustFeatures } from './components/TrustFeatures';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Search, SlidersHorizontal, Check, ExternalLink, Sparkles, Filter } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | '7.50' | '8.50' | 'bicolor'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger brief feedback toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`"${product.name}" adicionada à sua sacola!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Category / Price filter match
      if (selectedFilter === '7.50') {
        return item.price === 7.50;
      }
      if (selectedFilter === '8.50') {
        return item.price === 8.50;
      }
      if (selectedFilter === 'bicolor') {
        return (
          item.category.includes('BRANCA') ||
          item.category.includes('C/') ||
          item.name.toLowerCase().includes('branca')
        );
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedFilter, sortBy]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfaf6] text-[#2d3a2f] selection:bg-[#e5e1d8] selection:text-[#2d3a2f]">
      
      {/* Top Notification Banner */}
      <div id="top-announcement-bar" className="bg-[#2d3a2f] text-[#fdfaf6] text-[10px] uppercase tracking-[0.2em] py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#d98880]" />
        <span>
          Mudas botânicas selecionadas para envio em todo o Brasil — Pagamento individual oficial via Stripe
        </span>
      </div>

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('catalogo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Trust Badges Section */}
      <TrustFeatures />

      {/* Catalog Section */}
      <main id="catalogo" className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Catalog Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#e5e1d8]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 border border-[#2d3a2f]/20 bg-[#fcf8f2] text-[#2d3a2f] text-[10px] font-medium tracking-[0.2em] uppercase rounded-full mb-2">
              Prontas para Plantio
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2d3a2f]">
              Catálogo da Coleção de Azaleias
            </h2>
            <p className="text-[#5a6b5a] italic text-sm mt-1">
              9 variedades vigorosas com compra direta e individual através do checkout oficial do Stripe.
            </p>
          </div>

          <div className="text-[11px] uppercase tracking-wider text-[#5a6b5a] bg-[#fcf8f2] border border-[#e5e1d8] px-4 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5a6b5a]" />
            <span>Exibindo <strong>{filteredProducts.length}</strong> de 9 variedades</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2" id="catalog-filter-chips">
            <button
              id="filter-chip-all"
              type="button"
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 text-[10px] uppercase tracking-widest font-medium transition-colors cursor-pointer border ${
                selectedFilter === 'all'
                  ? 'bg-[#2d3a2f] border-[#2d3a2f] text-[#fdfaf6]'
                  : 'bg-[#fdfaf6] border-[#e5e1d8] text-[#2d3a2f] hover:border-[#2d3a2f]'
              }`}
            >
              Todas as Cores (9)
            </button>

            <button
              id="filter-chip-750"
              type="button"
              onClick={() => setSelectedFilter('7.50')}
              className={`px-3.5 py-1.5 text-[10px] uppercase tracking-widest font-medium transition-colors cursor-pointer border ${
                selectedFilter === '7.50'
                  ? 'bg-[#2d3a2f] border-[#2d3a2f] text-[#fdfaf6]'
                  : 'bg-[#fdfaf6] border-[#e5e1d8] text-[#2d3a2f] hover:border-[#2d3a2f]'
              }`}
            >
              R$ 7,50 (Clássicas)
            </button>

            <button
              id="filter-chip-850"
              type="button"
              onClick={() => setSelectedFilter('8.50')}
              className={`px-3.5 py-1.5 text-[10px] uppercase tracking-widest font-medium transition-colors cursor-pointer border ${
                selectedFilter === '8.50'
                  ? 'bg-[#2d3a2f] border-[#2d3a2f] text-[#fdfaf6]'
                  : 'bg-[#fdfaf6] border-[#e5e1d8] text-[#2d3a2f] hover:border-[#2d3a2f]'
              }`}
            >
              R$ 8,50 (Especiais)
            </button>

            <button
              id="filter-chip-bicolor"
              type="button"
              onClick={() => setSelectedFilter('bicolor')}
              className={`px-3.5 py-1.5 text-[10px] uppercase tracking-widest font-medium transition-colors cursor-pointer border ${
                selectedFilter === 'bicolor'
                  ? 'bg-[#2d3a2f] border-[#2d3a2f] text-[#fdfaf6]'
                  : 'bg-[#fdfaf6] border-[#e5e1d8] text-[#2d3a2f] hover:border-[#2d3a2f]'
              }`}
            >
              Bicolores & Mescladas
            </button>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-[#5a6b5a] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="search-products-input"
                type="text"
                placeholder="Buscar por cor, SKU ou tipo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#e5e1d8] text-xs text-[#2d3a2f] placeholder-[#5a6b5a]/60 focus:outline-none focus:border-[#2d3a2f] transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5a6b5a] hover:text-[#2d3a2f]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort select */}
            <div className="relative">
              <select
                id="sort-products-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-3.5 py-2 bg-white border border-[#e5e1d8] text-xs text-[#2d3a2f] focus:outline-none focus:border-[#2d3a2f] transition cursor-pointer appearance-none pr-8"
              >
                <option value="default">Ordenação padrão</option>
                <option value="price-asc">Menor preço (R$)</option>
                <option value="price-desc">Maior preço (R$)</option>
                <option value="name">Nome da flor (A-Z)</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#5a6b5a] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Product Grid */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white border border-[#e5e1d8] p-8 space-y-3">
              <Filter className="w-8 h-8 text-[#5a6b5a] mx-auto opacity-50" />
              <h3 className="font-serif font-bold text-lg text-[#2d3a2f]">
                Nenhuma muda encontrada
              </h3>
              <p className="text-xs text-[#5a6b5a] max-w-sm mx-auto italic">
                Tente ajustar os filtros ou pesquisar por outro termo como "rosa", "vermelha" ou SKU como "A 050".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                className="mt-2 px-4 py-2 bg-[#2d3a2f] text-[#fdfaf6] text-xs uppercase tracking-widest font-medium transition-colors hover:bg-[#1f2820]"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          ) : (
            <div
              id="products-grid-container"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProducts.map((product) => {
                const isAdded = cart.some((item) => item.product.id === product.id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetails={(p) => setSelectedProduct(p)}
                    onAddToCart={handleAddToCart}
                    isAddedToCart={isAdded}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Special Bundle Banner */}
        <div className="mt-16 bg-[#2d3a2f] text-[#fdfaf6] p-8 sm:p-10 border border-[#2d3a2f] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center lg:text-left">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#d98880] border border-[#e5e1d8]/30 px-3 py-1 inline-block">
              Coleção Completa
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-tight">
              Deseja colecionar todas as 9 cores de Azaleia?
            </h3>
            <p className="text-[#e5e1d8] text-xs sm:text-sm italic leading-relaxed opacity-90">
              Adicione cada cor desejada à sua sacola para organizar seu pedido e conclua as compras individuais diretamente no Stripe com segurança total.
            </p>
          </div>

          <button
            id="btn-bundle-view-cart"
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="shrink-0 px-6 py-3.5 bg-[#fdfaf6] text-[#2d3a2f] hover:bg-white text-xs uppercase tracking-widest font-medium transition-colors border border-[#e5e1d8] flex items-center gap-2 cursor-pointer"
          >
            Ver Minha Sacola ({totalCartCount} mudas)
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </main>

      {/* Care Guide Section */}
      <CareGuideSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isAddedToCart={
          selectedProduct ? cart.some((i) => i.product.id === selectedProduct.id) : false
        }
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Feedback Toast */}
      {toastMessage && (
        <div
          id="cart-toast-alert"
          className="fixed bottom-6 right-6 z-50 bg-[#2d3a2f] text-[#fdfaf6] px-4 py-3 border border-[#3d4d3f] shadow-xl flex items-center gap-2.5 text-xs font-serif italic animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          <div className="w-5 h-5 rounded-full border border-[#d98880] text-[#d98880] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
