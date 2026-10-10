import React, { useState } from 'react';
import { Phone, ShoppingBag, ArrowRight, Search, Menu, X, Check, LayoutGrid, Home } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  viewMode,
  onSelectViewMode,
  onNavigateSection,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'trang-chu', label: 'Trang Chủ', view: 'landing' as ViewMode },
    { id: 'san-pham', label: 'Sản Phẩm', view: 'catalog' as ViewMode },
    { id: 'vung-nguyen-lieu', label: 'Vùng Nguyên Liệu', view: 'landing' as ViewMode },
    { id: 'cau-chuyen', label: 'Câu Chuyện Thương Hiệu', view: 'landing' as ViewMode },
    { id: 'cam-ket', label: 'Cam Kết Chất Lượng', view: 'landing' as ViewMode },
    { id: 'lien-he', label: 'Liên Hệ', view: 'landing' as ViewMode },
  ];

  const handleLinkClick = (id: string, view: ViewMode) => {
    setMobileMenuOpen(false);
    if (viewMode !== view) {
      onSelectViewMode(view);
    }
    setTimeout(() => {
      onNavigateSection(id);
    }, 50);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#effdf1]/95 backdrop-blur-md border-b border-[#c0c9c3]/30 shadow-[0_4px_20px_-4px_rgba(27,77,62,0.08)] transition-all duration-300">
      <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleLinkClick('trang-chu', 'landing')}
            className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#1b4d3e] text-[#a5f4bb] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-lg">🌿</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-[#003629] leading-none">
                COCONA
              </span>
              <span className="text-[10px] font-bold text-[#1c6c3f] tracking-widest uppercase mt-0.5">
                Bến Tre Pure
              </span>
            </div>
          </button>

          {/* Screen Switcher Badge */}
          <div className="hidden lg:flex items-center bg-[#e3f1e6] p-1 rounded-full border border-[#c0c9c3]/40 ml-2">
            <button
              onClick={() => onSelectViewMode('landing')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                viewMode === 'landing'
                  ? 'bg-[#1b4d3e] text-white shadow-sm'
                  : 'text-[#404945] hover:text-[#003629]'
              }`}
              title="Giao diện Trang Chủ & Giới Thiệu"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Trang Chủ</span>
            </button>
            <button
              onClick={() => onSelectViewMode('catalog')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                viewMode === 'catalog'
                  ? 'bg-[#1b4d3e] text-white shadow-sm'
                  : 'text-[#404945] hover:text-[#003629]'
              }`}
              title="Giao diện Cửa Hàng & Bộ Lọc Sản Phẩm"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cửa Hàng</span>
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
          {navLinks.map((link) => {
            const isActive =
              (viewMode === 'catalog' && link.id === 'san-pham') ||
              (viewMode === 'landing' && activeSection === link.id);

            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.view)}
                className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1b4d3e] text-white shadow-sm'
                    : 'text-[#121e17] hover:bg-[#e3f1e6] hover:text-[#003629]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons Zone */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full text-[#404945] hover:text-[#003629] hover:bg-[#e3f1e6] transition-colors"
            title="Tìm kiếm sản phẩm"
          >
            <Search className="w-5 h-5" />
          </button>

          <a
            href="tel:1900xxxx"
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#e3f1e6] text-[#003629] hover:bg-[#1b4d3e] hover:text-white transition-all text-xs font-bold border border-[#c0c9c3]/40"
          >
            <Phone className="w-3.5 h-3.5 text-[#1c6c3f]" />
            <span>Hotline: 1900 xxxx</span>
          </a>

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-white text-[#003629] hover:bg-[#e3f1e6] transition-colors border border-[#c0c9c3]/40 shadow-sm flex items-center"
            title="Xem giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5 text-[#003629]" />
            <span
              className={`absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#1c6c3f] text-white rounded-full text-[11px] font-bold flex items-center justify-center leading-none shadow-sm transition-transform ${
                cartCount > 0 ? 'scale-100' : 'scale-90'
              }`}
            >
              {cartCount}
            </span>
          </button>

          {/* Quick Buy CTA */}
          <button
            onClick={() => handleLinkClick('san-pham', 'catalog')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1b4d3e] text-white hover:bg-[#003629] transition-all text-xs font-bold shadow hover:shadow-md"
          >
            <span>Mua Nhanh</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#003629] hover:bg-[#e3f1e6]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 border-b border-[#c0c9c3]/50 px-4 py-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-500 uppercase">Chế độ xem màn hình:</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onSelectViewMode('landing');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  viewMode === 'landing' ? 'bg-[#1b4d3e] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Trang Chủ
              </button>
              <button
                onClick={() => {
                  onSelectViewMode('catalog');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  viewMode === 'catalog' ? 'bg-[#1b4d3e] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Cửa Hàng Lọc
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.view)}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#003629] hover:bg-[#effdf1] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Hotline: 1900 xxxx (24/7)</span>
            <button
              onClick={() => {
                onOpenCart();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-[#1b4d3e] underline"
            >
              Mở giỏ hàng ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
