import React from 'react';
import { ProductStatus } from '../types';

interface StatusBadgeProps {
  status: ProductStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyle = () => {
    switch (status) {
      case 'Daily Driver':
        return 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D]';
      case 'Live':
        return 'bg-[#FDF0F3] text-[#1A1A1A] border-[#D95D7D] font-bold';
      case 'In Development':
        return 'bg-transparent text-[#1A1A1A] border-[#1A1A1A]/40';
      case 'Future':
        return 'bg-transparent text-[#1A1A1A]/50 border-[#E5E5E2]';
      default:
        return 'bg-[#F4F3F0] text-[#1A1A1A] border-[#E5E5E2]';
    }
  };

  const getBullet = () => {
    switch (status) {
      case 'Daily Driver':
        return <span className="w-1.5 h-1.5 bg-[#D95D7D] inline-block mr-1.5"></span>;
      case 'Live':
        return <span className="w-1.5 h-1.5 bg-[#D95D7D] inline-block mr-1.5"></span>;
      case 'In Development':
        return <span className="w-1.5 h-1.5 border border-[#1A1A1A] inline-block mr-1.5"></span>;
      case 'Future':
        return <span className="w-1.5 h-1.5 border border-[#1A1A1A]/30 inline-block mr-1.5"></span>;
    }
  };

  const px = size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[10px]';

  return (
    <span className={`inline-flex items-center border font-mono uppercase tracking-widest font-semibold ${px} ${getStyle()}`}>
      {getBullet()}
      {status}
    </span>
  );
};
