import React, { useState } from 'react';
import { X, MapPin, Snowflake, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

interface DeliveryAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DISTRICTS = [
  { name: 'Quận 1', time: '30 - 45 phút', hub: 'Hub Trung Tâm - Pasteur', status: 'Hỏa tốc 2H sẵn sàng' },
  { name: 'Quận 3', time: '35 - 50 phút', hub: 'Hub Trung Tâm - Điện Biên Phủ', status: 'Hỏa tốc 2H sẵn sàng' },
  { name: 'Quận Bình Thạnh', time: '30 - 45 phút', hub: 'Hub Bình Thạnh - Xô Viết Nghệ Tĩnh', status: 'Hỏa tốc 2H sẵn sàng' },
  { name: 'Quận Phú Nhuận', time: '35 - 50 phút', hub: 'Hub Phú Nhuận - Phan Xích Long', status: 'Hỏa tốc 2H sẵn sàng' },
  { name: 'Quận 7', time: '45 - 60 phút', hub: 'Hub Nam Sài Gòn - Nguyễn Thị Thập', status: 'Hỏa tốc 2H sẵn sàng' },
  { name: 'TP. Thủ Đức', time: '45 - 75 phút', hub: 'Hub Thủ Đức - Võ Văn Ngân', status: 'Hỏa tốc 2H sẵn sàng' },
  { name: 'Quận 10 & 11', time: '40 - 55 phút', hub: 'Hub Quận 10 - Ba Tháng Hai', status: 'Hỏa tốc 2H sẵn sàng' },
  { name: 'Quận Tân Bình & Tân Phú', time: '45 - 65 phút', hub: 'Hub Tân Bình - Cộng Hòa', status: 'Hỏa tốc 2H sẵn sàng' },
  { name: 'Quận Gò Vấp', time: '50 - 70 phút', hub: 'Hub Gò Vấp - Quang Trung', status: 'Hỏa tốc 2H sẵn sàng' },
  { name: 'Quận 8 & Bình Chánh (gần)', time: '55 - 80 phút', hub: 'Hub Nam Sài Gòn', status: 'Giao lạnh hẹn giờ' },
  { name: 'Thành Phố Bến Tre & Châu Thành', time: '20 - 40 phút', hub: 'Xưởng Sản Xuất Trực Tiếp Bến Tre', status: 'Giao trực tiếp từ xưởng' },
];

export const DeliveryAreaModal: React.FC<DeliveryAreaModalProps> = ({ isOpen, onClose }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS[0].name);

  if (!isOpen) return null;

  const currentInfo = DISTRICTS.find((d) => d.name === selectedDistrict) || DISTRICTS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />

      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-[#c0c9c3]/50 z-10 space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1b4d3e] text-[#a5f4bb] flex items-center justify-center font-bold">
              <Snowflake className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-[#003629] text-base">
              Tra Cứu Khu Vực Giao Lạnh 2H
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#003629] mb-1.5">
            Chọn Quận / Huyện của bạn:
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#1b4d3e] text-sm bg-white cursor-pointer font-semibold text-[#003629]"
          >
            {DISTRICTS.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status result card */}
        <div className="p-4 rounded-2xl bg-[#effdf1] border border-[#a5f4bb] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#003629] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1c6c3f]" />
              <span>{currentInfo.status}</span>
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1c6c3f] text-white">
              Cold-Chain 2°C - 8°C
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-[#404945]">
            <div className="flex justify-between">
              <span>Thời gian giao dự kiến:</span>
              <strong className="text-[#003629] font-mono">{currentInfo.time}</strong>
            </div>
            <div className="flex justify-between">
              <span>Trạm lạnh phụ trách:</span>
              <strong className="text-[#003629]">{currentInfo.hub}</strong>
            </div>
            <div className="flex justify-between">
              <span>Chính sách phí giao:</span>
              <strong className="text-[#1c6c3f]">Miễn phí đơn từ 150.000đ</strong>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-gray-500 space-y-1">
          <p>
            * Đơn hàng được giữ trong thùng giữ nhiệt chuyên dụng kèm gel lạnh bảo ôn. Khách hàng được quyền đo nhiệt độ hoặc thử độ lạnh trước khi nhận hàng.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-[#1b4d3e] text-white font-bold text-xs hover:bg-[#003629] transition-colors shadow"
        >
          Đã Hiểu & Đặt Hàng Ngay
        </button>
      </div>
    </div>
  );
};
