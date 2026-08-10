import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { StatusBadge } from './StatusBadge';
import { WorkflowVisualization } from './WorkflowVisualization';
import { Product } from '../types';
import { ArrowRight, Layers } from 'lucide-react';

interface ProductsProps {
  onOpenProduct: (product: Product) => void;
}

export const Products: React.FC<ProductsProps> = ({ onOpenProduct }) => {
  const { t, products, language } = useLanguage();

  const personalProducts = products.filter((p) => p.category === 'Personal Life');
  const professionalProducts = products.filter((p) => p.category === 'Professional Life');

  return (
    <section id="products" className="py-24 border-b border-[#E5E5E2] bg-[#F4F3F0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
        {/* Section Header */}
        <div>
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#1A1A1A]/40 mb-3">
            {t.productsSec.categoryBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#1A1A1A]">
            {t.productsSec.title}
          </h2>
        </div>

        {/* 1. PERSONAL LIFE PRODUCTS */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-[#E5E5E2]">
            <span className="w-2.5 h-2.5 bg-[#1A1A1A]"></span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A]">
              {language === 'id' ? 'Kehidupan Pribadi' : 'Personal Life'}
            </h3>
            <span className="text-xs font-mono text-[#1A1A1A]/40">
              [{language === 'id' ? ' Modul Rumah Tangga, Keluarga, Acara & Kebugaran ' : ' Household, Family, Event & Wellness Stack '}]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {personalProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={() => onOpenProduct(product)}
              />
            ))}
          </div>
        </div>

        {/* 2. PROFESSIONAL LIFE PRODUCTS */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 pb-4 border-b border-[#E5E5E2]">
            <span className="w-2.5 h-2.5 border border-[#1A1A1A]"></span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-[#1A1A1A]">
              {language === 'id' ? 'Kehidupan Profesional' : 'Professional Life'}
            </h3>
            <span className="text-xs font-mono text-[#1A1A1A]/40">
              [{language === 'id' ? ' Produktivitas Pribadi & Arsitektur Studio ' : ' Personal Productivity & Studio Architecture '}]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {professionalProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={() => onOpenProduct(product)}
                isProfessional
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  onOpenProduct: () => void;
  isProfessional?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenProduct,
  isProfessional
}) => {
  const { t, language } = useLanguage();
  const isSubdued = product.isSubdued || product.status === 'Future';
  const isDailyDriver = product.status === 'Daily Driver';

  return (
    <div
      className={`p-5 sm:p-8 bg-[#F9F8F6] border relative overflow-hidden flex flex-col justify-between transition-all duration-200 group ${
        isDailyDriver
          ? 'border-[#D95D7D]/60 hover:border-[#D95D7D] shadow-xs'
          : isSubdued
          ? 'border-[#E5E5E2] opacity-85 hover:opacity-100 hover:border-[#D95D7D]/50'
          : 'border-[#1A1A1A]/20 hover:border-[#D95D7D] shadow-xs'
      }`}
    >
      {/* Soft Ambient Pink Radial Blur Accent */}
      {isDailyDriver && (
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[radial-gradient(circle,_rgba(217,93,125,0.08)_0%,_transparent_70%)] pointer-events-none blur-md"></div>
      )}

      <div>
        {/* Top Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 flex items-center gap-1.5 mb-1">
              {isDailyDriver && <span className="w-1.5 h-1.5 bg-[#D95D7D] rounded-full inline-block"></span>}
              {product.category === 'Personal Life'
                ? (language === 'id' ? 'Kehidupan Pribadi' : 'Personal Life')
                : (language === 'id' ? 'Kehidupan Profesional' : 'Professional Life')}
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight group-hover:text-[#1A1A1A]">
              {product.name}
            </h4>
          </div>
          <StatusBadge status={product.status} />
        </div>

        {/* Tagline / Philosophy */}
        <p className="text-sm font-medium text-[#1A1A1A] mb-3 sm:mb-4 italic font-serif">
          "{product.tagline}"
        </p>

        {/* Description */}
        <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans mb-6 sm:mb-8">
          {product.description}
        </p>

        {/* Workflow Visualization */}
        {product.workflow && product.workflow.length > 0 && (
          <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 bg-[#F4F3F0] border border-[#E5E5E2] group-hover:border-[#E8B8C6]/60 transition-colors">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#D95D7D]" />
              {t.productsSec.connectedWorkflowChain}
            </div>
            <WorkflowVisualization workflow={product.workflow} compact />
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="pt-4 sm:pt-6 border-t border-[#E5E5E2] flex flex-wrap items-center justify-between gap-3">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/50">
          {product.status === 'Future'
            ? (language === 'id' ? 'Node Konseptual' : 'Conceptual Node')
            : (language === 'id' ? 'Modul Ekosistem' : 'Ecosystem Module')}
        </span>

        <button
          onClick={onOpenProduct}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-[#1A1A1A] text-[#F9F8F6] text-[11px] font-mono uppercase tracking-widest font-bold hover:bg-[#D95D7D] hover:text-[#F9F8F6] border border-[#1A1A1A] hover:border-[#D95D7D] transition-all cursor-pointer w-full sm:w-auto"
        >
          <span>{t.productsSec.openProduct}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
