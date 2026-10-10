import React from 'react';
import { Droplet, Users, Award, Clock, Leaf } from 'lucide-react';

export const OriginSection: React.FC = () => {
  return (
    <section id="vung-nguyen-lieu" className="py-16 lg:py-24 bg-[#effdf1] border-b border-[#c0c9c3]/30">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e3f1e6] border border-[#1c6c3f]/30 text-[#1c6c3f] text-xs font-bold uppercase tracking-wider">
            <Droplet className="w-3.5 h-3.5" />
            <span>Địa Linh Phù Sa Sông Tiền & Sông Hàm Luông</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#003629]">
            Vùng Nguyên Liệu Bến Tre • Cội Nguồn Dưỡng Chất Phù Sa
          </h2>
          <p className="text-sm sm:text-base text-[#404945] leading-relaxed">
            Nằm trọn giữa 3 dải cù lao trù phú Hàm Luông, Cổ Chiên và Ba Tri. Những vườn dừa xiêm bạt ngàn được bồi đắp lượng khoáng chất màu mỡ quanh năm từ mạng lưới sông ngòi mênh mông Tây Nam Bộ.
          </p>
        </div>

        {/* 2 Real Photos from Source Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Hình 11.1 */}
          <div className="bg-white rounded-3xl p-5 border border-[#c0c9c3]/40 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="overflow-hidden rounded-2xl h-72 sm:h-80 bg-gray-100 mb-4 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqYkO8ixpWdZ3Db0-QDU9Yf9H8XKCAVITbYmlAiyvvLm-CRccJixbgr8I9PjPF63lzxwu8xQ2IXsSfcaO0nHfJ91LIR-NUXXM8jqPcckX8jtsnB3aQ0xSvavTIs0mjbXdchwcQ2mD-IaSB37gE0MYqNubxlbTX6LanmonnW6FPasboFapdrk6zmzt8NU3RvPGVSRA4p8j0_Sw5Ew_Fpp6nKqxGGRLFshQ3Q8kSeWdlnzEmp7D4br-E1wpefpTL6rulsg"
                alt="Vườn dừa nguyên liệu tỉnh Bến Tre"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                Châu Thành & Giồng Trôm
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#1c6c3f] uppercase tracking-wider block mb-1">
                Hình 11.1 Vườn dừa nguyên liệu tỉnh Bến Tre
              </span>
              <h3 className="text-lg font-bold text-[#003629]">
                Thổ Nhưỡng Độc Bản & Canh Tác Thuần Sinh Thái
              </h3>
              <p className="text-xs sm:text-sm text-[#404945] mt-1.5 leading-relaxed">
                COCONA ký kết thu hoạch trực tiếp cùng hơn 150 nông hộ đạt chuẩn VietGAP tại Châu Thành và Giồng Trôm. Không sử dụng thuốc trừ sâu hóa học, tận dụng dòng phù sa ngọt lành tự nhiên nuôi dưỡng từng quả dừa.
              </p>
            </div>
          </div>

          {/* Card 2: Hình 11.2 */}
          <div className="bg-white rounded-3xl p-5 border border-[#c0c9c3]/40 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="overflow-hidden rounded-2xl h-72 sm:h-80 bg-gray-100 mb-4 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzfMWgbK2GY6VdAwkgXixBjQnzS7vc9MUxjKwL3FqETV0mWeNqy6jUqbEybFSPWmuhb1Tn2KPaYnPbJSML7KqOF-8kWPySjpFu9niiQ-Rn415HUjvDcsJk9P7rW1iT0sRUhQYP7-z4NImTvJA2HkaaQ4b6NTmBL2hLN9VWbSef05Ldub0k1m8-PB66ko2CwGztdW0X3GXJlLTjd28j13TTNlhDcoLQtT31-o3PmyOn0_1mdkSx_4chikJvFrxclrN6lQ"
                alt="Hoạt động thu hoạch dừa tại vùng nguyên liệu Bến Tre"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                Vận chuyển đường thủy 4h
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#1c6c3f] uppercase tracking-wider block mb-1">
                Hình 11.2 Hoạt động thu hoạch dừa tại vùng nguyên liệu
              </span>
              <h3 className="text-lg font-bold text-[#003629]">
                Ghe Thuyền Vận Chuyển Trong Vòng 4 Tiếng
              </h3>
              <p className="text-xs sm:text-sm text-[#404945] mt-1.5 leading-relaxed">
                Từng buồng dừa được hái bằng tay khi đạt đúng độ tuổi 7-8 tháng (lúc nước ngọt đậm đà nhất). Ghe thuyền len lỏi qua rạch nước vận chuyển về xưởng lạnh trong ngày để ép vô trùng, giữ trọn vị tươi.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Cards Cam Kết Vùng Trồng */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#c0c9c3]/40 text-center space-y-1 shadow-sm">
            <Users className="w-7 h-7 text-[#1c6c3f] mx-auto" />
            <h4 className="font-bold text-[#003629] text-sm">150+ Nông Hộ Hợp Tác</h4>
            <p className="text-xs text-gray-500">Cam kết bao tiêu giá ổn định dài hạn</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#c0c9c3]/40 text-center space-y-1 shadow-sm">
            <Award className="w-7 h-7 text-[#1c6c3f] mx-auto" />
            <h4 className="font-bold text-[#003629] text-sm">Chứng Nhận OCOP 4 Sao</h4>
            <p className="text-xs text-gray-500">Đặc sản nông nghiệp xứ dừa Bến Tre</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#c0c9c3]/40 text-center space-y-1 shadow-sm">
            <Clock className="w-7 h-7 text-[#1c6c3f] mx-auto" />
            <h4 className="font-bold text-[#003629] text-sm">Thu Hoạch 7 - 8 Tháng</h4>
            <p className="text-xs text-gray-500">Thời điểm dừa đạt độ brix hoàn hảo</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#c0c9c3]/40 text-center space-y-1 shadow-sm">
            <Leaf className="w-7 h-7 text-[#1c6c3f] mx-auto" />
            <h4 className="font-bold text-[#003629] text-sm">Nông Nghiệp Tái Sinh</h4>
            <p className="text-xs text-gray-500">Tận dụng vỏ & xơ dừa làm mùn hữu cơ</p>
          </div>
        </div>
      </div>
    </section>
  );
};
