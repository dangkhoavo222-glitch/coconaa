import React, { useState } from 'react';
import { ListCollapse, ChevronRight, ArrowUp, Sparkles } from 'lucide-react';

interface FloatingTOCProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

export const FloatingTOC: React.FC<FloatingTOCProps> = ({
  activeSection,
  onNavigateSection,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const tocItems = [
    { id: 'trang-chu', label: '1. Đầu Trang & Hero' },
    { id: 'san-pham', label: '2. Menu Sản Phẩm' },
    { id: 'vung-nguyen-lieu', label: '3. Vùng Nguyên Liệu' },
    { id: 'cau-chuyen', label: '4. Câu Chuyện COCONA' },
    { id: 'cam-ket', label: '5. Cam Kết Chất Lượng' },
    { id: 'lien-he', label: '6. Đặt Hàng & Liên Hệ' },
  ];

  return (
    <aside
      aria-label="Mục lục trang tự động"
      className="fixed right-4 bottom-24 z-40 hidden lg:flex flex-col items-end pointer-events-none"
    >
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#c0c9c3]/60 rounded-2xl p-2.5 shadow-2xl transition-all duration-300 w-56 hover:w-60 hover:shadow-[0_12px_32px_rgba(0,54,41,0.18)]">
        <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-[#e3f1e6]">
          <div className="flex items-center gap-1.5">
            <ListCollapse className="w-4 h-4 text-[#1b4d3e]" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#003629]">
              Mục Lục Tự Động
            </span>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[10px] text-[#1c6c3f] font-semibold bg-[#e3f1e6] px-1.5 py-0.5 rounded-full hover:bg-[#c0c9c3] transition-colors"
            title={collapsed ? 'Mở rộng' : 'Thu gọn'}
          >
            {collapsed ? 'Mở' : 'Quick Jump'}
          </button>
        </div>

        {!collapsed && (
          <nav className="flex flex-col space-y-1 text-xs">
            {tocItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigateSection(item.id)}
                  className={`flex items-center justify-between w-full text-left px-2.5 py-1.5 rounded-xl transition-all text-xs font-semibold ${
                    isActive
                      ? 'bg-[#1b4d3e] text-white shadow-md'
                      : 'text-[#404945] hover:text-[#003629] hover:bg-[#effdf1]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                        isActive ? 'bg-[#a5f4bb]' : 'bg-[#c0c9c3]'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#a5f4bb] shrink-0" />}
                </button>
              );
            })}
          </nav>
        )}

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-2 w-full py-1 text-[11px] font-bold text-[#1b4d3e] bg-[#effdf1] hover:bg-[#e3f1e6] rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Về Đầu Trang</span>
        </button>
      </div>
    </aside>
  );
};
