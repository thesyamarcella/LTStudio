import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export const Principles: React.FC = () => {
  const { t, principles, language } = useLanguage();

  return (
    <section id="principles" className="py-24 border-b border-[#E5E5E2] bg-[#F4F3F0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#1A1A1A]/40 mb-3">
            {t.principlesSec.categoryBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#1A1A1A] mb-4">
            {t.principlesSec.title}
          </h2>
          <p className="text-base sm:text-lg text-[#1A1A1A]/70 font-medium">
            {t.principlesSec.subtitle}
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-8 bg-[#F9F8F6] border border-[#E5E5E2] hover:border-[#D95D7D] transition-colors group flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E5E2]">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#F4F3F0] text-[#1A1A1A] border border-[#E5E5E2] group-hover:border-[#D95D7D] group-hover:text-[#D95D7D] transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 group-hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-[#D95D7D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {principle.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
                  {principle.title}
                </h3>

                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                  {principle.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E5E5E2] flex items-center gap-2 text-[10px] font-mono text-[#1A1A1A]/50 group-hover:text-[#D95D7D] transition-colors">
                <span className="w-1.5 h-1.5 bg-[#D95D7D]"></span>
                <span>{language === 'id' ? 'Aturan Sistem Diterapkan' : 'System Rule Enforced'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
