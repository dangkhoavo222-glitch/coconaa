import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { ViewMode } from '../types';

interface FooterProps {
  onSelectViewMode: (mode: ViewMode) => void;
  onNavigateSection: (sectionId: string) => void;
  onShowToast: (title: string, desc: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectViewMode,
  onNavigateSection,
  onShowToast,
}) => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onShowToast('Đã Đăng Ký Bản Tin!', `Cảm ơn bạn! Ưu đãi độc quyền sẽ gửi về ${email}.`);
    setEmail('');
  };

  const handleNav = (sectionId: string, view: ViewMode) => {
    onSelectViewMode(view);
    setTimeout(() => {
      onNavigateSection(sectionId);
    }, 50);
  };

  return (
    <footer className="w-full bg-[#003629] text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1: Logo & Giới thiệu */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#a5f4bb] text-[#003629] flex items-center justify-center font-bold">
                🌿
              </span>
              <span className="text-2xl font-black text-white tracking-tight">COCONA</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Nước dừa tươi đóng hộp vô trùng 100% tự nhiên từ thủ phủ dừa Bến Tre. Giữ trọn vị ngọt mát thuần khiết và vi chất khoáng tự nhiên.
            </p>
            <div className="text-xs text-gray-300 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#a5f4bb]" />
                <span>Hotline: 1900 xxxx - (028) 7300 xxxx</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#a5f4bb]" />
                <span>Email: lienhe@cocona.vn</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#a5f4bb]" />
                <span>Ấp Hưng Thạnh, Huyện Châu Thành, Bến Tre</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Điều hướng nhanh */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#a5f4bb] uppercase tracking-wider">
              Điều Hướng Nhanh
            </h4>
            <ul className="text-xs text-gray-300 space-y-2">
              <li>
                <button
                  onClick={() => handleNav('trang-chu', 'landing')}
                  className="hover:text-white transition-colors"
                >
                  Trang Chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('san-pham', 'catalog')}
                  className="hover:text-white transition-colors"
                >
                  Sản Phẩm & Giá Bán (Bộ Lọc)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('vung-nguyen-lieu', 'landing')}
                  className="hover:text-white transition-colors"
                >
                  Vùng Nguyên Liệu Bến Tre
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cau-chuyen', 'landing')}
                  className="hover:text-white transition-colors"
                >
                  Câu Chuyện Thương Hiệu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cam-ket', 'landing')}
                  className="hover:text-white transition-colors"
                >
                  Cam Kết Chất Lượng
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('lien-he', 'landing')}
                  className="hover:text-white transition-colors"
                >
                  Liên Hệ Đặt Hàng & Gói Tuần
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 3: Tiêu chuẩn & Chứng nhận */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#a5f4bb] uppercase tracking-wider">
              Tiêu Chuẩn Nông Nghiệp
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Tuân thủ nghiêm ngặt quy trình canh tác sạch, bền vững vì sức khỏe cộng đồng.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/20">
                VietGAP
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/20">
                Organic USDA
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/20">
                Chuỗi Lạnh 2-8°C
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/20">
                Hộp Giấy Kraft Eco
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold border border-white/20">
                Chai R-PET 100%
              </span>
            </div>
          </div>

          {/* Cột 4: Đăng ký nhận tin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#a5f4bb] uppercase tracking-wider">
              Đăng Ký Nhận Ưu Đãi
            </h4>
            <p className="text-xs text-gray-300">
              Nhận thông báo mùa dừa ngọt nhất và các mã coupon giảm giá trực tiếp.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn..."
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:border-[#a5f4bb] placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-[#a5f4bb] text-[#003629] font-bold text-xs hover:bg-white transition-colors shrink-0 flex items-center gap-1"
              >
                <span>Gửi</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
            <div className="pt-2 text-[11px] text-gray-400">
              Hotline hỗ trợ 24/7: <strong className="text-[#a5f4bb]">1900 xxxx</strong>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2024 Công Ty Cổ Phần COCONA Bến Tre. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors">Chính Sách Bảo Mật</button>
            <button className="hover:text-white transition-colors">Điều Khoản Mua Hàng</button>
            <button className="hover:text-white transition-colors">Chính Sách Đổi Trả 100%</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
