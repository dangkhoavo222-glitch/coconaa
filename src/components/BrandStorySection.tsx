import React from 'react';
import { History, Sparkles, QrCode, Recycle, HeartHandshake } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="cau-chuyen" className="py-16 lg:py-24 bg-white border-b border-[#c0c9c3]/30">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Story Text (Col 6) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e3f1e6] text-[#1c6c3f] text-xs font-bold uppercase tracking-wider">
              <History className="w-3.5 h-3.5" />
              <span>Hành Trình Giữ Trọn Giọt Mật Phù Sa</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003629] leading-tight">
              Câu Chuyện COCONA • Từ Vườn Cây Bến Tre Đến Bàn Ăn
            </h2>

            <p className="text-sm sm:text-base text-[#404945] leading-relaxed">
              COCONA sinh ra từ trăn trở: Làm sao để người tiêu dùng đô thị được uống nước dừa tươi nguyên bản đúng chuẩn như vừa chặt tại gốc – mà không cần phải dùng dừa đun sôi tiệt trùng ở nhiệt độ cao làm mất đi vị thanh dịu và khoáng chất tự nhiên?
            </p>

            <p className="text-sm sm:text-base text-[#404945] leading-relaxed">
              Giải pháp của COCONA là kết hợp công nghệ chiết rót lạnh khép kín, lọc siêu vi 3 cấp độ và chuỗi giao hàng lạnh giữ nhiệt 2°C – 8°C. Chúng tôi tôn trọng nguyên bản tự nhiên, không thêm một hạt đường, không chất bảo quản công nghiệp, và triệt tiêu bao bì nhựa dùng một lần.
            </p>

            {/* 4 Giá Trị Cốt Lõi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#effdf1] border border-[#c0c9c3]/30">
                <span className="text-[#1c6c3f] text-xl font-bold">🌱</span>
                <div>
                  <h4 className="font-bold text-[#003629] text-xs sm:text-sm">1. Thuần Khiết Tự Nhiên</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Tuyệt đối không pha hương liệu</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#effdf1] border border-[#c0c9c3]/30">
                <QrCode className="w-5 h-5 text-[#1c6c3f] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#003629] text-xs sm:text-sm">2. Minh Bạch Nguồn Gốc</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Truy xuất mã lô VietGAP</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#effdf1] border border-[#c0c9c3]/30">
                <Recycle className="w-5 h-5 text-[#1c6c3f] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#003629] text-xs sm:text-sm">3. Bao Bì Sinh Thái Kraft</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Quai xách xơ dừa thân thiện</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#effdf1] border border-[#c0c9c3]/30">
                <HeartHandshake className="w-5 h-5 text-[#1c6c3f] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#003629] text-xs sm:text-sm">4. Đồng Hành Cùng Nông Dân</h4>
                  <p className="text-[11px] text-gray-600 mt-0.5">Giá thu mua ổn định bền vững</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo & Identity Graphic (Col 6) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="bg-[#effdf1] rounded-3xl p-5 sm:p-6 border border-[#c0c9c3]/40 shadow-lg w-full max-w-lg">
              <div className="overflow-hidden rounded-2xl bg-white shadow-inner mb-4 flex items-center justify-center p-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsGy6jKCUbJtx-A6sLofB0TYHoQzfeONcVgKQMWOPah4alWHmbkBZZ9W6cfkSuFFzMuL1hW-YoZSJbPCdsmm037lZ1W-Ay_hPw4eolESdn1j0HbiYEcNHQsWvd4YYKqW5u6710ubpUqJ_G1DWjPdQexLrK4BmL2DdZ9UmTqxUsUo6iqOs6az-t6D1qatKWxWp63M28neTj-1o4sW4kXkiXuFvgV6AmGSVUBPdQCWz9IY9PKlhRTj8UxSAdK39ryXhpFg"
                  alt="Bộ nhận diện thương hiệu COCONA Bến Tre"
                  className="w-full h-auto object-contain max-h-[300px] hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center space-y-1.5">
                <span className="text-xs font-bold text-[#1c6c3f] uppercase tracking-wider block">
                  Hình 1.1 Logo & Bộ Nhận Diện COCONA
                </span>
                <p className="text-xs text-[#404945] leading-relaxed">
                  Tone màu xanh rêu nguyên bản (#1B4D3E) biểu trưng cho vườn dừa bạt ngàn, hòa quyện sắc xanh non tươi mát và chất giấy Kraft thủ công mộc mạc của xứ dừa Nam Bộ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
