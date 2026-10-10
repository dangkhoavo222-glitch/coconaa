import React from 'react';
import { ShoppingCart, Compass, CheckCircle2, Snowflake, Zap, ShieldAlert, Sparkles, ArrowDown } from 'lucide-react';
import { Product } from '../types';

interface HeroSectionProps {
  heroProduct: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroProduct,
  onAddToCart,
  onBuyNow,
  onNavigateSection,
  onOpenProductDetail,
}) => {
  return (
    <section
      id="trang-chu"
      className="relative overflow-hidden bg-gradient-to-b from-[#e9f7ec] via-[#effdf1] to-[#effdf1] py-10 lg:py-16 border-b border-[#c0c9c3]/30"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cold-Chain Express Announcement Strip */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#003629] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#a5f4bb] text-[#003629] flex items-center justify-center font-bold shrink-0">
              <Snowflake className="w-5 h-5" />
            </span>
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-[#a5f4bb] uppercase tracking-wide mr-2">
                Chuỗi Lạnh Khép Kín 2°C – 8°C
              </span>
              <span className="text-gray-200">
                Giao hỏa tốc trong 2 giờ nội thành TP.HCM • Đảm bảo độ ngọt thanh và vi chất bù điện giải tự nhiên.
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigateSection('san-pham')}
            className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#a5f4bb] text-[#003629] font-bold text-xs hover:bg-white transition-colors flex items-center gap-1 shadow-sm"
          >
            <span>Khám Phá Menu</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e3f1e6] border border-[#1c6c3f]/30 text-[#1c6c3f] text-xs font-bold tracking-wide uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Tự Nhiên • Chiết Xuất Từ Dừa Xiêm Tuyển Chọn Bến Tre</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#003629] tracking-tight leading-[1.15]">
              COCONA – Vị Tươi Thuần Khiết Từ Xứ Dừa Bến Tre
            </h1>

            <p className="text-base sm:text-lg text-[#404945] leading-relaxed max-w-2xl">
              Nước dừa tươi đóng chai vô trùng được thu hoạch tươi mới mỗi sáng tại cù lao Bến Tre. Tuyệt đối không đường pha, không chất bảo quản công nghiệp, giữ trọn vẹn khoáng chất Kali và Magie bù điện giải tự nhiên cho cơ thể khỏe khoắn.
            </p>

            {/* 4 Policy Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/80 border border-[#c0c9c3]/40 shadow-sm text-center">
                <span className="text-[#1c6c3f] text-2xl mb-1 block">🥥</span>
                <p className="text-xs font-bold text-[#003629]">100% Nguyên Chất</p>
                <p className="text-[11px] text-gray-500">Không pha đường</p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-[#c0c9c3]/40 shadow-sm text-center">
                <span className="text-[#1c6c3f] text-2xl mb-1 block">🌿</span>
                <p className="text-xs font-bold text-[#003629]">0% Chất Bảo Quản</p>
                <p className="text-[11px] text-gray-500">An toàn tuyệt đối</p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-[#c0c9c3]/40 shadow-sm text-center">
                <Snowflake className="w-6 h-6 text-[#1c6c3f] mx-auto mb-1" />
                <p className="text-xs font-bold text-[#003629]">Chuỗi Lạnh 2-8°C</p>
                <p className="text-[11px] text-gray-500">Tươi nguyên 7 ngày</p>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-[#c0c9c3]/40 shadow-sm text-center">
                <Zap className="w-6 h-6 text-[#1c6c3f] mx-auto mb-1" />
                <p className="text-xs font-bold text-[#003629]">Giao Hỏa Tốc 2H</p>
                <p className="text-[11px] text-gray-500">Nội thành TP.HCM</p>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onBuyNow(heroProduct, 1)}
                className="px-7 py-3.5 rounded-full bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Đặt Hàng Ngay</span>
              </button>
              <button
                onClick={() => onNavigateSection('vung-nguyen-lieu')}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#e3f1e6] text-[#003629] font-bold text-sm sm:text-base border border-[#c0c9c3]/60 transition-all flex items-center gap-2"
              >
                <Compass className="w-5 h-5 text-[#1c6c3f]" />
                <span>Khám Phá Vùng Trồng</span>
              </button>
            </div>
          </div>

          {/* Hero Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border-4 border-[#e3f1e6] group">
              <div className="absolute -top-3 -right-3 bg-[#1c6c3f] text-white text-xs font-black uppercase px-3.5 py-1.5 rounded-full shadow-md z-10">
                Best Seller #1
              </div>

              <div
                onClick={() => onOpenProductDetail(heroProduct)}
                className="cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-[#e9f7ec] to-white p-2"
              >
                <img
                  src={heroProduct.imageUrl}
                  alt={heroProduct.name}
                  className="w-full h-auto max-h-[380px] object-contain rounded-2xl mx-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-[#e3f1e6] flex items-center justify-between">
                <div>
                  <h3
                    onClick={() => onOpenProductDetail(heroProduct)}
                    className="font-bold text-[#003629] text-base hover:text-[#1c6c3f] cursor-pointer"
                  >
                    {heroProduct.name}
                  </h3>
                  <p className="text-xs text-gray-500">{heroProduct.packaging}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#1b4d3e]">
                    {heroProduct.price.toLocaleString('vi-VN')}đ
                  </span>
                  <p className="text-[11px] text-[#1c6c3f] font-semibold">Chuẩn VietGAP</p>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => onAddToCart(heroProduct, 1)}
                  className="flex-1 py-2 rounded-xl bg-[#e3f1e6] text-[#003629] hover:bg-[#c0c9c3] text-xs font-bold transition-colors"
                >
                  Thêm Vào Giỏ
                </button>
                <button
                  onClick={() => onBuyNow(heroProduct, 1)}
                  className="flex-1 py-2 rounded-xl bg-[#1b4d3e] text-white hover:bg-[#003629] text-xs font-bold transition-colors shadow"
                >
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
