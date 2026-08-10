import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Heart, Stethoscope, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Why: React.FC = () => {
  const { t } = useLanguage();

  const examples = [
    {
      icon: ShoppingCart,
      title: t.why.domain1Title,
      description: t.why.domain1Desc
    },
    {
      icon: Heart,
      title: t.why.domain2Title,
      description: t.why.domain2Desc
    },
    {
      icon: Stethoscope,
      title: t.why.domain3Title,
      description: t.why.domain3Desc
    }
  ];

  return (
    <section id="why" className="py-24 border-b border-[#E5E5E2] bg-[#F9F8F6]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#1A1A1A]/40 mb-3">
            {t.why.categoryBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#1A1A1A] mb-4">
            {t.why.title}
          </h2>
        </div>

        {/* Premise Lead Typography */}
        <div className="space-y-6 mb-16 border-l-2 border-[#D95D7D] pl-6 sm:pl-8 py-2">
          <p className="text-2xl sm:text-3xl font-light text-[#1A1A1A]/60 tracking-tight">
            {t.why.lead1}
          </p>
          <p className="text-4xl sm:text-6xl font-normal text-[#1A1A1A] tracking-tight">
            {t.why.lead2}
          </p>
        </div>

        {/* 3 Real Life Connected Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {examples.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-8 bg-[#F4F3F0] border border-[#E5E5E2] flex flex-col justify-between group hover:border-[#D95D7D] transition-colors"
              >
                <div>
                  <div className="w-10 h-10 bg-[#1A1A1A] text-[#F9F8F6] flex items-center justify-center mb-6 group-hover:bg-[#D95D7D] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium text-[#1A1A1A] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E5E5E2] text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 group-hover:text-[#D95D7D] transition-colors flex items-center justify-between">
                  <span>{t.why.connectedDomainLabel}</span>
                  <ArrowRight className="w-3 h-3 text-[#D95D7D]" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Problem Explanation & Conclusion */}
        <div className="p-8 sm:p-12 bg-[#1A1A1A] text-[#F9F8F6] border border-[#1A1A1A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_rgba(217,93,125,0.25)_0%,_transparent_70%)] pointer-events-none"></div>
          <div className="max-w-2xl relative z-10 space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#F9F8F6]/50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#D95D7D] inline-block"></span>
              {t.why.disconnectTitle}
            </div>
            <p className="text-base sm:text-lg font-light text-[#F9F8F6]/80 leading-relaxed">
              {t.why.disconnectText}
            </p>
            <div className="pt-6 border-t border-[#F9F8F6]/20">
              <h4 className="text-2xl sm:text-3xl font-light tracking-tight text-[#F9F8F6]">
                {t.why.reconnectPrefix} <span className="font-semibold underline underline-offset-8 decoration-2 decoration-[#D95D7D]">{t.why.reconnectHighlight}</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
