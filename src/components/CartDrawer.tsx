import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Snowflake,
  CheckCircle,
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onShowToast: (title: string, desc: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowToast,
}) => {
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    paymentMethod: 'cod',
  });

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 150000;
  const progressPercent = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));
  const shippingFee = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0 ? 0 : 25000;
  const discountAmount = Math.round(rawSubtotal * (discountPercent / 100));
  const totalAmount = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (code === 'COCONA15' || code === 'GIAM15') {
      setDiscountPercent(15);
      onShowToast('Áp Dụng Mã Giảm 15%!', 'Đã trừ 15% vào tổng đơn hàng.');
    } else if (code === 'FREESHIP' || code === 'COCONA2H') {
      setDiscountPercent(10);
      onShowToast('Áp Dụng Mã Khuyến Mãi!', 'Giảm thêm 10% và ưu tiên giao lạnh 2 giờ.');
    } else {
      onShowToast('Mã Không Hợp Lệ', 'Vui lòng thử mã COCONA15 hoặc GIAM15.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) return;
    setCheckoutStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#effdf1]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1b4d3e] text-[#a5f4bb] flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-[#003629] text-base">
                Giỏ Hàng Của Bạn ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {checkoutStep === 'success' ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#a5f4bb] text-[#003629] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-[#003629]">Đặt Hàng Thành Công!</h4>
                <p className="text-xs text-[#404945] leading-relaxed max-w-xs mx-auto">
                  Mã đơn: <strong className="text-[#1b4d3e]">#CCN-{Date.now().toString().slice(-5)}</strong>
                  <br />
                  COCONA sẽ đóng gói vào thùng giữ nhiệt lạnh 2°C – 8°C và điều phối tài xế giao hỏa tốc đến {customerInfo.address}.
                </p>
                <div className="p-4 rounded-2xl bg-[#effdf1] border border-[#c0c9c3]/50 text-left text-xs space-y-1.5">
                  <p><strong>Người nhận:</strong> {customerInfo.name} ({customerInfo.phone})</p>
                  <p><strong>Tổng thanh toán:</strong> {totalAmount.toLocaleString('vi-VN')} VNĐ</p>
                  <p><strong>Hình thức:</strong> Thanh toán tiền mặt khi nhận hàng (COD)</p>
                </div>
                <button
                  onClick={() => {
                    onClearCart();
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="w-full py-3 rounded-full bg-[#1b4d3e] text-white font-bold text-xs"
                >
                  Tiếp Tục Mua Hàng
                </button>
              </div>
            ) : checkoutStep === 'checkout' ? (
              /* Checkout Form */
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <span className="font-bold text-sm text-[#003629]">Thông Tin Giao Hàng</span>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="text-xs text-[#1c6c3f] font-semibold underline"
                  >
                    Quay lại giỏ hàng
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#003629] mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#003629] mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="0901 xxx xxx"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#003629] mb-1">Địa chỉ nhận hàng tại TP.HCM *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    placeholder="Số nhà, tên đường, phường, quận"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#003629] mb-1">Ghi chú giao hàng</label>
                  <textarea
                    rows={2}
                    value={customerInfo.note}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, note: e.target.value })}
                    placeholder="Ví dụ: Giao lên lầu 3, gọi trước khi giao..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e]"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-[#effdf1] border border-[#c0c9c3]/50 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#003629]">
                    <Snowflake className="w-4 h-4 text-[#1c6c3f]" />
                    <span>Cam kết bảo quản lạnh:</span>
                  </div>
                  <p className="text-gray-600">
                    Sản phẩm giao trong thùng giữ nhiệt chuyên dụng 2°C – 8°C. Được kiểm tra độ lạnh trước khi nhận và thanh toán.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#1b4d3e] text-white hover:bg-[#003629] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Xác Nhận Đặt Hàng ({totalAmount.toLocaleString('vi-VN')} VNĐ)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Normal Cart Items View */
              <>
                {/* Free Shipping Progress */}
                <div className="bg-[#effdf1] p-3.5 rounded-2xl border border-[#c0c9c3]/40 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#003629]">
                      {rawSubtotal >= freeShippingThreshold
                        ? '🎉 Chúc mừng! Bạn được MIỄN PHÍ VẬN CHUYỂN'
                        : `Mua thêm ${(freeShippingThreshold - rawSubtotal).toLocaleString('vi-VN')}đ để Freeship`}
                    </span>
                    <span className="font-mono font-bold text-[#1c6c3f]">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1c6c3f] transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="text-4xl">🥥</div>
                    <p className="text-sm font-bold text-[#003629]">Giỏ hàng của bạn đang trống</p>
                    <p className="text-xs text-gray-500">
                      Hãy chọn sản phẩm nước dừa tươi Bến Tre nguyên chất để thưởng thức ngay.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-16 h-16 object-contain rounded-lg bg-[#e9f7ec] p-1 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-xs text-[#003629] truncate">
                            {item.product.name}
                          </h5>
                          <span className="text-[11px] text-gray-500 font-mono">
                            {item.product.price.toLocaleString('vi-VN')}đ
                          </span>

                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                                }
                                className="w-6 h-6 rounded flex items-center justify-center text-xs hover:bg-gray-200"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="w-6 h-6 rounded flex items-center justify-center text-xs hover:bg-gray-200"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex flex-col justify-between items-end h-16">
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Xóa sản phẩm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-xs text-[#1b4d3e] font-mono">
                            {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Coupon Code Input */}
                {cartItems.length > 0 && (
                  <form onSubmit={handleApplyCoupon} className="pt-2">
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">
                      Mã giảm giá (Thử: COCONA15)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Nhập mã ưu đãi..."
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#e3f1e6] hover:bg-[#c0c9c3] text-[#003629] text-xs font-bold rounded-xl transition-colors shrink-0"
                      >
                        Áp Dụng
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>

          {/* Footer Summary */}
          {cartItems.length > 0 && checkoutStep === 'cart' && (
            <div className="p-5 border-t border-gray-200 bg-[#effdf1] space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Tạm tính hàng:</span>
                  <span className="font-mono font-semibold text-gray-900">
                    {rawSubtotal.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#1c6c3f] font-semibold">
                    <span>Giảm giá ({discountPercent}%):</span>
                    <span className="font-mono">-{discountAmount.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao lạnh 2H TP.HCM:</span>
                  <span className="font-mono font-semibold">
                    {shippingFee === 0 ? (
                      <span className="text-[#1c6c3f]">MIỄN PHÍ</span>
                    ) : (
                      `${shippingFee.toLocaleString('vi-VN')} VNĐ`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#003629] pt-2 border-t border-gray-200">
                  <span>Tổng thanh toán:</span>
                  <span className="text-base text-[#1b4d3e] font-mono">
                    {totalAmount.toLocaleString('vi-VN')} VNĐ
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 rounded-full bg-[#1b4d3e] text-white hover:bg-[#003629] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Tiến Hành Đặt Hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
