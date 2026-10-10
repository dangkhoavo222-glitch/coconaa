import React, { useState } from 'react';
import { MapPin, Warehouse, Phone, Mail, Clock, Send, ShieldCheck, CheckCircle } from 'lucide-react';

interface ContactSectionProps {
  onShowToast: (title: string, desc: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    product: 'Gói Thuê Bao Uống Tuần (Giao mỗi sáng - Giảm 15%)',
    note: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    onShowToast(
      'Đã Gửi Thành Công!',
      `Cảm ơn ${formData.name}! COCONA sẽ liên hệ xác nhận đơn hàng/tư vấn trong vòng 15 phút.`
    );
    setFormData({
      name: '',
      phone: '',
      address: '',
      product: 'Gói Thuê Bao Uống Tuần (Giao mỗi sáng - Giảm 15%)',
      note: '',
    });
  };

  return (
    <section id="lien-he" className="py-16 lg:py-24 bg-white border-b border-[#c0c9c3]/30">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e3f1e6] text-[#1c6c3f] text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            <span>Kết Nối Cùng COCONA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003629]">
            Liên Hệ Đặt Hàng & Tư Vấn Gói Uống Tuần
          </h2>
          <p className="text-sm sm:text-base text-[#404945]">
            Để lại thông tin để nhận ưu đãi giảm 15% cho gói thuê bao nước dừa giao cố định mỗi sáng hoặc liên hệ đặt sỉ.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Thông Tin Trụ Sở & Kho (Col 5) */}
          <div className="lg:col-span-5 bg-[#effdf1] rounded-3xl p-6 sm:p-8 border border-[#c0c9c3]/40 space-y-6">
            <h3 className="text-xl font-bold text-[#003629]">
              Thông Tin Trụ Sở & Điểm Giao Hàng
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#404945]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1c6c3f] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#003629] block">Trụ sở & Nơi sản xuất:</strong>
                  <span>Ấp Hưng Thạnh, Huyện Châu Thành, Tỉnh Bến Tre</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Warehouse className="w-5 h-5 text-[#1c6c3f] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#003629] block">Kho Lạnh Phân Phối TP.HCM:</strong>
                  <span>
                    Giao hàng hỏa tốc trong 2 giờ nội thành TP.HCM (Thùng giữ nhiệt lạnh 2-8°C)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#1c6c3f] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#003629] block">Hotline CSKH & Đặt sỉ:</strong>
                  <span className="text-[#1c6c3f] font-bold text-base">
                    1900 xxxx - (028) 7300 xxxx
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#1c6c3f] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#003629] block">Email chính thức:</strong>
                  <span>lienhe@cocona.vn / sales@cocona.vn</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#1c6c3f] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#003629] block">Thời gian phục vụ:</strong>
                  <span>07:00 – 21:00 hàng ngày (kể cả Thứ Bảy, Chủ Nhật)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#c0c9c3]/30 space-y-1">
              <span className="text-xs font-bold text-[#003629] block">
                Giao Định Kỳ COCONA SUBSCRIPTION
              </span>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Giao đều đặn khung giờ 6:30 - 8:30 sáng mỗi ngày. Bù khoáng tự nhiên trước khi đi làm, hủy hoặc hoãn lịch linh hoạt bất cứ lúc nào.
              </p>
            </div>
          </div>

          {/* Form Liên Hệ & Đặt Hàng (Col 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#c0c9c3]/50 shadow-md">
            <h3 className="text-xl font-bold text-[#003629] mb-4">
              Gửi Yêu Cầu Liên Hệ & Tư Vấn Đặt Hàng
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#003629] mb-1">
                    Họ và tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e] text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#003629] mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0901 xxx xxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e] text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#003629] mb-1">
                  Địa chỉ nhận hàng (TP.HCM hoặc Bến Tre) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Số nhà, đường, phường/xã, quận/huyện"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e] text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#003629] mb-1">
                  Sản phẩm hoặc gói bạn quan tâm
                </label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e] text-sm bg-white cursor-pointer"
                >
                  <option value="Gói Thuê Bao Uống Tuần (Giao mỗi sáng - Giảm 15%)">
                    Gói Thuê Bao Uống Tuần (Giao mỗi sáng - Giảm 15%)
                  </option>
                  <option value="1. COCONA Classic (500ml) - 34.900đ">
                    1. COCONA Classic (500ml) - 34.900đ
                  </option>
                  <option value="2. COCONA Plus Nha Đam (500ml) - 39.900đ">
                    2. COCONA Plus Nha Đam (500ml) - 39.900đ
                  </option>
                  <option value="3. COCONA Gia Đình (1 Lít) - 59.900đ">
                    3. COCONA Gia Đình (1 Lít) - 59.900đ
                  </option>
                  <option value="4. COCONA Combo Set (4 Hộp) - 119.000đ">
                    4. COCONA Combo Set (4 Hộp) - 119.000đ
                  </option>
                  <option value="5. COCONA Premium Limited (500ml) - 65.000đ">
                    5. COCONA Premium Limited (500ml) - 65.000đ
                  </option>
                  <option value="Đặt số lượng lớn / Làm quà tặng doanh nghiệp">
                    Đặt số lượng lớn / Làm quà tặng doanh nghiệp
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#003629] mb-1">
                  Ghi chú hoặc lời nhắn
                </label>
                <textarea
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Ví dụ: Giao trước 8h sáng, liên hệ trước khi đến..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e] text-sm bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Gửi Yêu Cầu Liên Hệ & Tư Vấn</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#1c6c3f]" />
                <span>
                  COCONA cam kết bảo mật 100% thông tin cá nhân. Chuyên viên sẽ gọi xác nhận trong 15 phút.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
