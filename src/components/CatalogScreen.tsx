import React, { useState, useMemo } from 'react';
import {
  Snowflake,
  MapPin,
  Check,
  CheckCircle2,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ShoppingCart,
  Zap,
  Plus,
  Minus,
  Sparkles,
  ShieldCheck,
  Clock,
  RefreshCw,
  Send,
  Eye,
} from 'lucide-react';
import { Product, FilterState } from '../types';

interface CatalogScreenProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onOpenProductDetail: (product: Product) => void;
  onOpenDeliveryModal: () => void;
  onShowToast: (title: string, desc: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onOpenProductDetail,
  onOpenDeliveryModal,
  onShowToast,
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    volume: 'all',
    priceRanges: [],
    standards: [],
    searchQuery: '',
    sortBy: 'default',
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');

  const getQty = (id: string) => quantities[id] || 1;

  const setQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const resetFilters = () => {
    setFilterState({
      category: 'all',
      volume: 'all',
      priceRanges: [],
      standards: [],
      searchQuery: '',
      sortBy: 'default',
    });
    onShowToast('Đã Đặt Lại Bộ Lọc', 'Đang hiển thị toàn bộ 5 dòng sản phẩm tươi mới.');
  };

  const handlePriceToggle = (range: string) => {
    setFilterState((prev) => {
      const exists = prev.priceRanges.includes(range);
      const next = exists
        ? prev.priceRanges.filter((r) => r !== range)
        : [...prev.priceRanges, range];
      return { ...prev, priceRanges: next };
    });
  };

  const handleStandardToggle = (standard: string) => {
    setFilterState((prev) => {
      const exists = prev.standards.includes(standard);
      const next = exists
        ? prev.standards.filter((s) => s !== standard)
        : [...prev.standards, standard];
      return { ...prev, standards: next };
    });
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (filterState.category !== 'all') {
          if (filterState.category === 'classic' && !product.id.includes('classic')) return false;
          if (filterState.category === 'plus' && !product.id.includes('plus')) return false;
          if (filterState.category === 'giadinh' && !product.id.includes('giadinh')) return false;
          if (filterState.category === 'combo' && !product.id.includes('combo')) return false;
          if (filterState.category === 'premium' && !product.id.includes('premium')) return false;
        }

        // Volume filter
        if (filterState.volume !== 'all') {
          if (filterState.volume === '500' && !product.volume.includes('500ml')) return false;
          if (filterState.volume === '1000' && !product.volume.includes('1 Lít')) return false;
          if (filterState.volume === 'combo' && !product.volume.includes('4 x 500ml')) return false;
        }

        // Price ranges filter
        if (filterState.priceRanges.length > 0) {
          const matchPrice = filterState.priceRanges.some((range) => {
            if (range === 'under40' && product.price < 40000) return true;
            if (range === '40to70' && product.price >= 40000 && product.price <= 70000) return true;
            if (range === 'over100' && product.price > 100000) return true;
            return false;
          });
          if (!matchPrice) return false;
        }

        // Standards filter
        if (filterState.standards.length > 0) {
          const matchStandard = filterState.standards.every((std) =>
            product.standards.includes(std)
          );
          if (!matchStandard) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'price-asc') return a.price - b.price;
        if (filterState.sortBy === 'price-desc') return b.price - a.price;
        if (filterState.sortBy === 'popular') return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
        return 0;
      });
  }, [products, filterState]);

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone.trim()) return;
    onShowToast(
      'Đăng Ký Tư Vấn Thành Công!',
      `Chuyên viên COCONA sẽ gọi đến SĐT ${leadPhone} trong 15 phút.`
    );
    setLeadName('');
    setLeadPhone('');
  };

  return (
    <div className="w-full bg-[#effdf1] min-h-screen pb-20">
      {/* 1. Cold-Chain Express & 2H Delivery Banner */}
      <section className="w-full bg-[#e3f1e6] py-4 border-b border-[#c0c9c3]/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#003629] text-white rounded-2xl p-4 lg:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#a5f4bb] text-[#003629] flex items-center justify-center shrink-0">
                <Snowflake className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1c6c3f] text-white font-bold uppercase tracking-wider">
                    Cold-Chain Express
                  </span>
                  <span className="text-xs text-[#9ed1bd]">Nhiệt độ tối ưu 2°C – 8°C</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold mt-1 text-white">
                  Giao Hàng Lạnh Hỏa Tốc Trong 2 Giờ
                </h2>
                <p className="text-xs sm:text-sm text-[#9ed1bd] mt-0.5">
                  Thùng giữ nhiệt chân không đảm bảo độ tươi thuần khiết và vi chất bù điện giải tự nhiên đến tận tay bạn.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#1c6c3f] pt-3 md:pt-0">
              <div className="hidden xl:flex flex-col text-right">
                <span className="text-xs text-[#a5f4bb] font-semibold">Freeship nội thành TP.HCM</span>
                <span className="text-sm font-bold text-white">Đơn từ 150.000 VNĐ</span>
              </div>
              <button
                onClick={onOpenDeliveryModal}
                className="w-full md:w-auto px-5 py-2.5 rounded-full bg-[#a5f4bb] text-[#003629] text-xs font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>Tra Cứu Khu Vực</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Breadcrumbs & Title */}
      <section className="w-full pt-8 pb-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#404945] uppercase tracking-wider mb-1">
                <span>Trang chủ</span>
                <span>/</span>
                <span className="text-[#003629] font-extrabold">Sản Phẩm COCONA</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#003629] tracking-tight">
                Danh Mục Nước Dừa Tươi
              </h1>
              <p className="text-sm sm:text-base text-[#404945] mt-1.5 max-w-2xl">
                Chiết xuất trực tiếp từ những trái dừa tuyển chọn tại Bến Tre. Tự nhiên 100%, không chất bảo quản công nghiệp, giàu khoáng vi lượng bù điện giải nhanh chóng.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="px-3.5 py-1.5 rounded-full bg-[#e3f1e6] text-xs font-bold text-[#1c6c3f] border border-[#c0c9c3]/50 flex items-center gap-1.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>5 Dòng Sản Phẩm Sẵn Sàng</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Catalog Layout: Left Filter Sidebar + Right Products List */}
      <section className="w-full py-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* SIDEBAR FILTERS (Col 3-4) */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="bg-white rounded-2xl p-5 space-y-6 shadow-sm border border-[#c0c9c3]/40 sticky top-24">
                {/* Header Filter */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#1c6c3f]" />
                    <span className="font-bold text-base text-[#003629]">Bộ Lọc Tìm Kiếm</span>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="text-xs font-semibold text-[#1c6c3f] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Đặt lại</span>
                  </button>
                </div>

                {/* Filter 1: Dòng Sản Phẩm */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#003629] uppercase tracking-wider block">
                    Dòng Sản Phẩm
                  </span>
                  <div className="space-y-1">
                    {[
                      { key: 'all', label: 'Tất cả sản phẩm', count: 5 },
                      { key: 'classic', label: 'COCONA Classic (Cốt lõi)', count: 1 },
                      { key: 'plus', label: 'COCONA Plus (Nha đam)', count: 1 },
                      { key: 'giadinh', label: 'COCONA Gia Đình (1 Lít)', count: 1 },
                      { key: 'combo', label: 'Combo Set Giấy Kraft', count: 1 },
                      { key: 'premium', label: 'Premium Limited Edition', count: 1 },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className={`flex items-center justify-between p-2 rounded-xl cursor-pointer text-xs transition-colors ${
                          filterState.category === item.key
                            ? 'bg-[#e3f1e6] text-[#003629] font-bold'
                            : 'hover:bg-gray-50 text-[#404945]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="category"
                            checked={filterState.category === item.key}
                            onChange={() => setFilterState({ ...filterState, category: item.key })}
                            className="accent-[#1b4d3e] w-4 h-4"
                          />
                          <span>{item.label}</span>
                        </div>
                        <span className="text-gray-400 font-mono">{item.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter 2: Dung Tích Đóng Hộp */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#003629] uppercase tracking-wider block">
                    Dung Tích Đóng Hộp
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFilterState({
                          ...filterState,
                          volume: filterState.volume === '500' ? 'all' : '500',
                        })
                      }
                      className={`py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${
                        filterState.volume === '500'
                          ? 'bg-[#1b4d3e] text-white shadow-sm'
                          : 'bg-[#e3f1e6] text-[#003629] hover:bg-[#c0c9c3]'
                      }`}
                    >
                      500 ml
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFilterState({
                          ...filterState,
                          volume: filterState.volume === '1000' ? 'all' : '1000',
                        })
                      }
                      className={`py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${
                        filterState.volume === '1000'
                          ? 'bg-[#1b4d3e] text-white shadow-sm'
                          : 'bg-[#e3f1e6] text-[#003629] hover:bg-[#c0c9c3]'
                      }`}
                    >
                      1 Lít (1000ml)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFilterState({
                          ...filterState,
                          volume: filterState.volume === 'combo' ? 'all' : 'combo',
                        })
                      }
                      className={`col-span-2 py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${
                        filterState.volume === 'combo'
                          ? 'bg-[#1b4d3e] text-white shadow-sm'
                          : 'bg-[#e3f1e6] text-[#003629] hover:bg-[#c0c9c3]'
                      }`}
                    >
                      Set 4 Hộp (4 x 500ml)
                    </button>
                  </div>
                </div>

                {/* Filter 3: Mức Giá */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#003629] uppercase tracking-wider block">
                    Mức Giá
                  </span>
                  <div className="space-y-1">
                    {[
                      { key: 'under40', label: 'Dưới 40.000 VNĐ' },
                      { key: '40to70', label: '40.000đ – 70.000 VNĐ' },
                      { key: 'over100', label: 'Trên 100.000 VNĐ' },
                    ].map((p) => (
                      <label
                        key={p.key}
                        className="flex items-center gap-2 p-1.5 rounded-lg text-xs cursor-pointer hover:bg-[#effdf1] text-[#404945]"
                      >
                        <input
                          type="checkbox"
                          checked={filterState.priceRanges.includes(p.key)}
                          onChange={() => handlePriceToggle(p.key)}
                          className="accent-[#1b4d3e] rounded w-4 h-4"
                        />
                        <span>{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter 4: Tiêu Chuẩn & Thành Phần */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#003629] uppercase tracking-wider block">
                    Tiêu Chuẩn & Thành Phần
                  </span>
                  <div className="space-y-1">
                    {[
                      { key: '100% Nước Dừa Tươi', label: '100% Nước Dừa Tươi' },
                      { key: '100% Organic USDA', label: '100% Organic USDA' },
                      { key: 'Chứng nhận VietGAP', label: 'Chứng nhận VietGAP' },
                      { key: 'Bao bì Kraft thân thiện', label: 'Bao bì Kraft thân thiện' },
                    ].map((s) => (
                      <label
                        key={s.key}
                        className="flex items-center gap-2 p-1.5 rounded-lg text-xs cursor-pointer hover:bg-[#effdf1] text-[#404945]"
                      >
                        <input
                          type="checkbox"
                          checked={filterState.standards.includes(s.key)}
                          onChange={() => handleStandardToggle(s.key)}
                          className="accent-[#1b4d3e] rounded w-4 h-4"
                        />
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Box Yêu Cầu Bảo Quản */}
                <div className="p-3.5 rounded-xl bg-[#deece0] border border-[#c0c9c3]/50 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#1c6c3f] font-bold text-xs">
                    <Snowflake className="w-4 h-4" />
                    <span>Yêu Cầu Bảo Quản</span>
                  </div>
                  <p className="text-[11px] text-[#404945] leading-relaxed">
                    Luôn giữ lạnh 2°C – 8°C. Không tiếp xúc trực tiếp ánh nắng gắt để duy trì chất khoáng tự nhiên.
                  </p>
                </div>
              </div>
            </aside>

            {/* PRODUCT GRID & FEED (Col 8-9) */}
            <main className="lg:col-span-8 xl:col-span-9 space-y-6">
              {/* Sort Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl shadow-sm border border-[#c0c9c3]/40">
                <span className="text-xs sm:text-sm text-[#404945]">
                  Hiển thị <strong className="text-[#003629]">{filteredProducts.length}</strong> sản phẩm tươi mới thu hoạch
                </span>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs font-bold text-[#404945]">Sắp xếp:</span>
                  <select
                    value={filterState.sortBy}
                    onChange={(e) =>
                      setFilterState({
                        ...filterState,
                        sortBy: e.target.value as FilterState['sortBy'],
                      })
                    }
                    className="bg-[#e3f1e6] text-[#003629] text-xs font-bold px-3 py-1.5 rounded-xl border-none focus:ring-1 focus:ring-[#1b4d3e] cursor-pointer"
                  >
                    <option value="default">Đề xuất cho bạn (Mặc định)</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="popular">Bán chạy nhất (Combo)</option>
                  </select>
                </div>
              </div>

              {/* Products List matching Image 12 layout */}
              <div className="space-y-6">
                {filteredProducts.map((product) => {
                  const qty = getQty(product.id);

                  return (
                    <article
                      key={product.id}
                      className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm hover:shadow-md transition-all border border-[#c0c9c3]/40 flex flex-col lg:flex-row gap-6 group"
                    >
                      {/* Product Image Column */}
                      <div
                        onClick={() => onOpenProductDetail(product)}
                        className="relative w-full lg:w-2/5 h-64 lg:h-72 rounded-xl bg-[#e9f7ec] overflow-hidden flex items-center justify-center shrink-0 cursor-pointer p-3"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#1b4d3e] text-white font-bold shadow-sm">
                            {product.category}
                          </span>
                          {product.secondaryBadge && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#a5f4bb] text-[#003629] font-semibold">
                              {product.secondaryBadge}
                            </span>
                          )}
                        </div>
                        <span className="absolute bottom-2 right-2 text-[11px] px-2.5 py-0.5 rounded-full bg-[#d8e6db] text-[#003629] font-bold">
                          {product.volume}
                        </span>
                      </div>

                      {/* Info Column */}
                      <div className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[#1c6c3f] text-xs font-semibold">
                            <span className="text-sm">💧</span>
                            <span>{product.ingredients}</span>
                          </div>

                          <h2
                            onClick={() => onOpenProductDetail(product)}
                            className="text-xl lg:text-2xl font-bold text-[#003629] group-hover:text-[#1c6c3f] transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h2>

                          <p className="text-xs sm:text-sm text-[#404945] leading-relaxed">
                            {product.longDescription}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-1">
                            <span className="px-2.5 py-1 rounded-full bg-[#e3f1e6] text-[11px] text-[#1c6c3f] font-semibold flex items-center gap-1">
                              <Snowflake className="w-3 h-3" />
                              <span>{product.shelfLife}</span>
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-[#e3f1e6] text-[11px] text-[#404945]">
                              {product.packaging}
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-[#e3f1e6] text-[11px] text-[#404945]">
                              {product.brix}
                            </span>
                          </div>
                        </div>

                        {/* Price & Action Row */}
                        <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-col">
                            <span className="text-[11px] text-gray-500">
                              {product.originalPrice ? 'Giá ưu đãi' : 'Giá niêm yết chính hãng'}
                            </span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl lg:text-3xl font-black text-[#003629]">
                                {product.price.toLocaleString('vi-VN')}
                              </span>
                              <span className="text-xs font-semibold text-gray-500">
                                VNĐ / {product.volume.split(' ')[0]}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                  {product.originalPrice.toLocaleString('vi-VN')}đ
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            {/* Quantity selector */}
                            <div className="flex items-center justify-between bg-[#effdf1] rounded-full p-1 border border-gray-200 shrink-0">
                              <button
                                onClick={() => setQty(product.id, -1)}
                                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#003629] hover:bg-gray-100 transition-colors font-bold shadow-sm"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-[#003629]">
                                {qty}
                              </span>
                              <button
                                onClick={() => setQty(product.id, 1)}
                                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#003629] hover:bg-gray-100 transition-colors font-bold shadow-sm"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onAddToCart(product, qty)}
                              className="px-4 py-2.5 rounded-full bg-[#deece0] text-[#003629] hover:bg-[#c0c9c3] transition-colors text-xs font-bold flex items-center justify-center gap-1.5"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span>Thêm Giỏ</span>
                            </button>

                            <button
                              onClick={() => onBuyNow(product, qty)}
                              className="px-5 py-2.5 rounded-full bg-[#1b4d3e] text-white hover:bg-[#003629] transition-colors text-xs font-bold flex items-center justify-center gap-1.5 shadow"
                            >
                              <Zap className="w-4 h-4" />
                              <span>Mua Ngay</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* 4. Comparison Table (Image 12) */}
      <section className="w-full bg-[#e9f7ec] py-14 border-t border-[#c0c9c3]/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#1c6c3f] uppercase tracking-widest">
              Minh Bạch Tiêu Chuẩn
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003629]">
              Bảng So Sánh Các Dòng Sản Phẩm COCONA
            </h2>
            <p className="text-xs sm:text-sm text-[#404945]">
              Tất cả sản phẩm đều tuân thủ cam kết 0% chất bảo quản – 0% hương liệu nhân tạo.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#c0c9c3]/40 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#e3f1e6] text-[#003629] font-bold border-b border-[#c0c9c3]/40">
                  <th className="p-4">Dòng Sản Phẩm</th>
                  <th className="p-4">Dung Tích</th>
                  <th className="p-4">Thành Phần Chính</th>
                  <th className="p-4">Quy Cách Đóng Gói</th>
                  <th className="p-4">Hạn Sử Dụng</th>
                  <th className="p-4 text-right">Đơn Giá</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#effdf1] transition-colors">
                    <td className="p-4 font-bold text-[#003629]">{p.name}</td>
                    <td className="p-4 font-mono">{p.volume}</td>
                    <td className="p-4 text-[#404945]">{p.ingredients}</td>
                    <td className="p-4 text-[#404945]">{p.packaging}</td>
                    <td className="p-4 text-[#404945]">{p.shelfLife}</td>
                    <td className="p-4 text-right font-black text-[#1b4d3e] font-mono">
                      {p.price.toLocaleString('vi-VN')}đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3 Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-5 rounded-2xl border border-[#c0c9c3]/40 space-y-2 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#a5f4bb] text-[#003629] flex items-center justify-center font-bold">
                <Snowflake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#003629]">1. Duy Trì Nhiệt Độ 2°C – 8°C</h3>
              <p className="text-xs text-[#404945] leading-relaxed">
                Do hoàn toàn không dùng chất bảo quản hóa học, nước dừa phải luôn được bảo quản ở ngăn mát tủ lạnh ngay sau khi nhận hàng để giữ trọn vị thanh ngọt.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#c0c9c3]/40 space-y-2 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#a5f4bb] text-[#003629] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#003629]">2. Sử Dụng Tốt Nhất Trong 24H</h3>
              <p className="text-xs text-[#404945] leading-relaxed">
                Sau khi mở nắp hộp, nên uống hết trong vòng 24 giờ. Đậy kín nắp nếu chưa dùng hết và bảo quản đứng trong ngăn mát tủ lạnh.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#c0c9c3]/40 space-y-2 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#a5f4bb] text-[#003629] flex items-center justify-center font-bold">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#003629]">3. Cam Kết Đổi Trả 100%</h3>
              <p className="text-xs text-[#404945] leading-relaxed">
                Hoàn tiền hoặc đổi sản phẩm mới ngay lập tức nếu khi nhận hàng thùng không đủ lạnh, tem niêm phong rách hoặc hộp có hiện tượng rò rỉ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gói Định Kỳ Subscription Banner (Image 12) */}
      <section className="w-full py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1b4d3e] text-white rounded-3xl p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a5f4bb] text-[#003629] text-xs font-bold">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Gói Định Kỳ COCONA SUBSCRIPTION</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Đặt Nước Dừa Định Kỳ Mỗi Sáng
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                Tiết kiệm thêm 15% cùng dịch vụ giao hàng chu kỳ vào khung giờ 6:30 – 8:30 sáng mỗi ngày. Bù khoáng tự nhiên khởi đầu ngày làm việc tràn đầy sức sống.
              </p>
              <div className="flex flex-wrap gap-4 pt-1 text-xs text-[#a5f4bb]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Hủy hoặc đổi lịch bất cứ lúc nào</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Tặng 1 túi Kraft cao cấp</span>
                </div>
              </div>
            </div>

            {/* Lead capture form */}
            <div className="bg-white text-[#121e17] p-6 rounded-2xl w-full lg:w-96 shadow-lg space-y-3 shrink-0">
              <h3 className="font-bold text-base text-[#003629]">Tư Vấn Gói Uống Tuần</h3>
              <p className="text-xs text-[#404945]">
                Để lại số điện thoại, nhân viên COCONA sẽ thiết kế gói uống phù hợp với gia đình bạn.
              </p>
              <form onSubmit={handleSubscriptionSubmit} className="space-y-3">
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="Họ và tên của bạn"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#effdf1] text-xs border border-gray-300 focus:outline-none focus:border-[#1b4d3e]"
                  required
                />
                <input
                  type="tel"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder="Số điện thoại nhận tư vấn *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#effdf1] text-xs border border-gray-300 focus:outline-none focus:border-[#1b4d3e]"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#003629] text-white hover:bg-[#1b4d3e] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Đăng Ký Tư Vấn Miễn Phí</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <span className="text-[10px] text-gray-500 block text-center">
                Bảo mật thông tin khách hàng tuyệt đối.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
