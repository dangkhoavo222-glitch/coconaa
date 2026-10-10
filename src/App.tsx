import React, { useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ViewMode } from './types';
import { Header } from './components/Header';
import { FloatingTOC } from './components/FloatingTOC';
import { HeroSection } from './components/HeroSection';
import { StorefrontSection } from './components/StorefrontSection';
import { CatalogScreen } from './components/CatalogScreen';
import { OriginSection } from './components/OriginSection';
import { BrandStorySection } from './components/BrandStorySection';
import { QualitySection } from './components/QualitySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { DeliveryAreaModal } from './components/DeliveryAreaModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activeSection, setActiveSection] = useState('trang-chu');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start with 1 default combo set or classic to make the app feel alive and populated
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[3], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const [toast, setToast] = useState({
    show: false,
    title: '',
    desc: '',
  });

  const showToast = useCallback((title: string, desc: string) => {
    setToast({ show: true, title, desc });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        closeToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.show, closeToast]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    const totalMoney = (product.price * quantity).toLocaleString('vi-VN');
    showToast(
      'Đã Thêm Vào Giỏ Hàng!',
      `Đã thêm ${quantity}x ${product.name} (${totalMoney} VNĐ).`
    );
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Đã Xóa Sản Phẩm', 'Giỏ hàng đã được cập nhật thành công.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scrollspy for sections
  useEffect(() => {
    if (viewMode !== 'landing') return;

    const sectionIds = [
      'trang-chu',
      'san-pham',
      'vung-nguyen-lieu',
      'cau-chuyen',
      'cam-ket',
      'lien-he',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [viewMode]);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#effdf1] text-[#121e17] font-sans antialiased selection:bg-[#a5f4bb] selection:text-[#003629]">
      {/* Top Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
        onNavigateSection={handleNavigateSection}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      <main className="w-full pt-20">
        {viewMode === 'landing' ? (
          <>
            {/* Screen 1: Brand Landing & Interactive Storefront (Image 2 & 14) */}
            <HeroSection
              heroProduct={PRODUCTS[0]}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onNavigateSection={handleNavigateSection}
              onOpenProductDetail={setDetailProduct}
            />

            <StorefrontSection
              products={PRODUCTS}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onOpenProductDetail={setDetailProduct}
            />

            <OriginSection />

            <BrandStorySection />

            <QualitySection onNavigateSection={handleNavigateSection} />

            <ContactSection onShowToast={showToast} />

            {/* Floating TOC for quick navigation */}
            <FloatingTOC
              activeSection={activeSection}
              onNavigateSection={handleNavigateSection}
            />
          </>
        ) : (
          /* Screen 2: Dedicated Catalog Screen with Left Filter Sidebar (Image 12) */
          <CatalogScreen
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenProductDetail={setDetailProduct}
            onOpenDeliveryModal={() => setIsDeliveryModalOpen(true)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectViewMode={setViewMode}
        onNavigateSection={handleNavigateSection}
        onShowToast={showToast}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onShowToast={showToast}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Cold Chain Delivery Area Modal */}
      <DeliveryAreaModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        products={PRODUCTS}
        onOpenProductDetail={setDetailProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}
