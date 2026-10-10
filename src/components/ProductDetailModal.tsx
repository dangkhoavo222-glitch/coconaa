import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Zap, Check, Snowflake, Award, Shield } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-[#c0c9c3]/50 z-10 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="bg-[#e9f7ec] rounded-2xl p-4 flex items-center justify-center h-72">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-64 object-contain mx-auto"
            />
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#1b4d3e] text-white text-[11px] font-bold">
                {product.category}
              </span>
              {product.secondaryBadge && (
                <span className="px-2 py-0.5 rounded-full bg-[#a5f4bb] text-[#003629] text-[11px] font-semibold">
                  {product.secondaryBadge}
                </span>
              )}
            </div>

            <h3 className="text-xl font-extrabold text-[#003629] leading-snug">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2">
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

            <p className="text-xs text-[#404945] leading-relaxed">
              {product.longDescription}
            </p>

            <div className="p-3 rounded-xl bg-[#effdf1] border border-[#c0c9c3]/40 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Độ ngọt brix:</span>
                <strong className="text-[#003629]">{product.brix}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bảo quản:</span>
                <strong className="text-[#003629]">{product.shelfLife}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bao bì:</span>
                <strong className="text-[#003629]">{product.packaging}</strong>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-600">Số lượng:</span>
                <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded flex items-center justify-center font-bold hover:bg-gray-200"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded flex items-center justify-center font-bold hover:bg-gray-200"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#e3f1e6] hover:bg-[#c0c9c3] text-[#003629] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Thêm Vào Giỏ</span>
                </button>
                <button
                  onClick={() => {
                    onBuyNow(product, quantity);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <Zap className="w-4 h-4" />
                  <span>Mua Ngay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
