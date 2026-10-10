import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onOpenProductDetail: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onOpenProductDetail,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return products;
    const lower = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.volume.toLowerCase().includes(lower)
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-4 pt-20">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 overflow-hidden shadow-2xl border border-[#c0c9c3]/50 z-10 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#1c6c3f]" />
            <h3 className="font-extrabold text-[#003629] text-base">Tìm Kiếm Sản Phẩm COCONA</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm 'Classic', 'Nha đam', '1 Lít', 'Combo'..."
            className="w-full px-4 py-3 rounded-2xl bg-[#effdf1] text-sm border border-[#c0c9c3]/50 focus:outline-none focus:border-[#1b4d3e] font-medium"
          />
        </div>

        <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              Không tìm thấy sản phẩm phù hợp với từ khóa &ldquo;{query}&rdquo;.
            </div>
          ) : (
            searchResults.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-[#effdf1] border border-gray-200 transition-colors group"
              >
                <div
                  onClick={() => {
                    onOpenProductDetail(product);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer min-w-0"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 object-contain rounded-lg bg-white p-1 shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-[#003629] group-hover:text-[#1c6c3f] truncate">
                      {product.name}
                    </h5>
                    <p className="text-[11px] text-gray-500 truncate">{product.volume} • {product.price.toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onOpenProductDetail(product);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-white text-gray-600 hover:text-[#003629] border border-gray-200"
                    title="Chi tiết"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      onAddToCart(product, 1);
                      onClose();
                    }}
                    className="px-3 py-2 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Mua</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
