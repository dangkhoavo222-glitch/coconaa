import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Store,
  Boxes,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  ChevronsUpDown,
  Eye,
  Info,
} from 'lucide-react';
import { Product } from '../types';

interface StorefrontSectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onOpenProductDetail: (product: Product) => void;
}

export const StorefrontSection: React.FC<StorefrontSectionProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onOpenProductDetail,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQty = (id: string) => quantities[id] || 1;

  const setQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const scrollCarousel = (offset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const scrollToProduct = (productId: string) => {
    const el = document.getElementById(`product-vertical-${productId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="san-pham" className="py-16 lg:py-24 bg-white border-b border-[#c0c9c3]/30">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e3f1e6] pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1c6c3f] mb-1">
              <Store className="w-4 h-4" />
              <span>Cửa Hàng Trực Tuyến COCONA</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003629]">
              Danh Mục Sản Phẩm Nước Dừa Tươi
            </h2>
            <p className="text-sm sm:text-base text-[#404945] mt-1 max-w-2xl">
              Đúng giá niêm yết • Lướt xem qua lại hoặc lướt lên xuống tiện lợi • Đặt mua và thêm giỏ hàng trực tiếp ngay trên mỗi sản phẩm!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-[#e3f1e6] text-[#003629] font-bold text-xs flex items-center gap-1">
              <Boxes className="w-4 h-4 text-[#1c6c3f]" />
              <span>5 Dòng Sản Phẩm Sẵn Có</span>
            </span>
          </div>
        </div>

        {/* ================= A) CAROUSEL LƯỚT NGANG ================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-[#1b4d3e]">↔</span>
              <h3 className="text-lg font-bold text-[#003629]">
                Lướt Ngang Nhanh (Carousel 5 Sản Phẩm)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel(-340)}
                className="w-9 h-9 rounded-full bg-[#e3f1e6] hover:bg-[#1b4d3e] hover:text-white text-[#003629] flex items-center justify-center transition-colors shadow-sm"
                title="Cuộn sang trái"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollCarousel(340)}
                className="w-9 h-9 rounded-full bg-[#e3f1e6] hover:bg-[#1b4d3e] hover:text-white text-[#003629] flex items-center justify-center transition-colors shadow-sm"
                title="Cuộn sang phải"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
          >
            {products.map((product) => {
              const qtyKey = `c_${product.id}`;
              const qty = getQty(qtyKey);

              return (
                <div
                  key={product.id}
                  className="w-[300px] sm:w-[320px] shrink-0 snap-start bg-[#effdf1] rounded-2xl p-4 border border-[#c0c9c3]/50 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    <div
                      onClick={() => onOpenProductDetail(product)}
                      className="relative bg-white rounded-xl p-3 h-52 flex items-center justify-center overflow-hidden mb-3 cursor-pointer"
                    >
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#1b4d3e] text-white text-[10px] font-bold z-10">
                        {product.badge}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProductDetail(product);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-gray-600 hover:text-[#003629] hover:bg-white shadow-sm z-10"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <h4
                      onClick={() => onOpenProductDetail(product)}
                      className="font-bold text-[#003629] text-base hover:text-[#1c6c3f] cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                    <div className="mt-2.5 flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-[#1b4d3e]">
                        {product.price.toLocaleString('vi-VN')} VNĐ
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#c0c9c3]/30 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center bg-white rounded-lg border border-gray-300 px-2 py-1">
                        <button
                          onClick={() => setQty(qtyKey, -1)}
                          className="text-gray-600 font-bold px-1.5 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold text-xs text-center min-w-[20px] text-[#003629]">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty(qtyKey, 1)}
                          className="text-gray-600 font-bold px-1.5 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onAddToCart(product, qty)}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-[#e3f1e6] hover:bg-[#c0c9c3] text-[#003629] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Thêm Giỏ</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onBuyNow(product, qty)}
                      className="w-full py-2 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white text-xs font-bold transition-colors shadow"
                    >
                      Mua Ngay
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= B) LƯỚT XEM DỌC CHI TIẾT ================= */}
        <div className="space-y-4 pt-6 border-t border-[#e3f1e6]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChevronsUpDown className="w-5 h-5 text-[#1b4d3e]" />
              <h3 className="text-lg font-bold text-[#003629]">
                Lướt Dọc Chi Tiết & Đặt Trực Tiếp (Vertical Scroll View)
              </h3>
            </div>
            <span className="text-xs text-gray-500 hidden sm:inline">
              Kéo lên/xuống để xem toàn bộ thông số và thao tác mua
            </span>
          </div>

          {/* Quick Jump Bar between products */}
          <div className="flex flex-wrap items-center gap-2 py-1">
            <span className="text-xs font-bold text-[#003629]">Chuyển nhanh:</span>
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => scrollToProduct(p.id)}
                className="px-2.5 py-1 rounded-lg bg-[#effdf1] hover:bg-[#1b4d3e] hover:text-white text-xs font-semibold text-[#003629] border border-[#c0c9c3]/40 transition-colors"
              >
                {p.name.replace('COCONA ', '')}
              </button>
            ))}
          </div>

          {/* Vertical Scroll Container */}
          <div className="max-h-[660px] overflow-y-auto custom-scroll-y pr-2 space-y-5 rounded-2xl p-2 bg-[#effdf1]/50 border border-[#c0c9c3]/40">
            {products.map((product) => {
              const qtyKey = `v_${product.id}`;
              const qty = getQty(qtyKey);

              return (
                <div
                  key={product.id}
                  id={`product-vertical-${product.id}`}
                  className="bg-white rounded-2xl p-5 border border-[#c0c9c3]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-center"
                >
                  <div
                    onClick={() => onOpenProductDetail(product)}
                    className="w-full md:w-56 h-56 bg-[#e9f7ec] rounded-xl p-3 flex items-center justify-center shrink-0 cursor-pointer group"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#1b4d3e] text-white text-xs font-bold">
                        {product.category}
                      </span>
                      {product.secondaryBadge && (
                        <span className="px-2 py-0.5 rounded-full bg-[#a5f4bb] text-[#003629] text-xs font-medium">
                          {product.secondaryBadge}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {product.volume} • {product.shelfLife}
                      </span>
                    </div>

                    <h4
                      onClick={() => onOpenProductDetail(product)}
                      className="text-xl font-bold text-[#003629] hover:text-[#1c6c3f] cursor-pointer"
                    >
                      {product.name}
                    </h4>

                    <p className="text-sm text-[#404945]">{product.longDescription}</p>

                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-2xl font-black text-[#1b4d3e]">
                        {product.price.toLocaleString('vi-VN')} VNĐ
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {product.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      )}
                      <span className="text-xs text-gray-500">/ {product.volume}</span>
                    </div>
                  </div>

                  <div className="w-full md:w-56 flex flex-col gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-gray-200 md:pl-5">
                    <label className="text-xs text-gray-500 font-semibold">Chọn số lượng:</label>
                    <div className="flex items-center bg-[#effdf1] rounded-xl border border-gray-300 p-1">
                      <button
                        onClick={() => setQty(qtyKey, -1)}
                        className="w-9 h-9 rounded-lg bg-white text-[#003629] font-bold hover:bg-gray-100 flex items-center justify-center shadow-sm"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="flex-1 text-center font-bold text-sm text-[#003629]">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty(qtyKey, 1)}
                        className="w-9 h-9 rounded-lg bg-white text-[#003629] font-bold hover:bg-gray-100 flex items-center justify-center shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onAddToCart(product, qty)}
                      className="w-full py-2.5 rounded-xl bg-[#e3f1e6] hover:bg-[#1b4d3e] hover:text-white text-[#003629] font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Thêm Giỏ Hàng</span>
                    </button>

                    <button
                      onClick={() => onBuyNow(product, qty)}
                      className="w-full py-2.5 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Mua Ngay Trực Tiếp</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
