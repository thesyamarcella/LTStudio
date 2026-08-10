import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export const BuiltForMeFirst: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 border-b border-[#E5E5E2] bg-gradient-to-b from-[#F9F8F6] via-[#FDF0F3]/30 to-[#F9F8F6] relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#D95D7D] font-bold mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#D95D7D] rounded-full"></span>
            {t.builtForMe.categoryBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A]">
            {t.builtForMe.title}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-14 bg-[#F9F8F6] border border-[#E5E5E2] space-y-8 relative overflow-hidden shadow-xs"
        >
          {/* Ambient Soft Pink Gradient Aura */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(217,93,125,0.08)_0%,_transparent_70%)] pointer-events-none"></div>

          {/* Subtle Decorative Bracket */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#D95D7D]"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#D95D7D]"></div>

          <div className="space-y-4 text-center sm:text-left relative z-10">
            <p className="text-xl sm:text-2xl font-light text-[#1A1A1A]/70 leading-relaxed">
              {t.builtForMe.p1}
            </p>
            <p className="text-2xl sm:text-3xl font-medium text-[#1A1A1A] leading-relaxed">
              {t.builtForMe.p2}
            </p>
          </div>

          <div className="pt-6 border-t border-[#E5E5E2] space-y-6 relative z-10">
            <p className="text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed font-sans">
              {t.builtForMe.p3}
            </p>

            <p className="text-lg sm:text-xl font-normal text-[#1A1A1A] font-serif italic border-l-2 border-[#D95D7D] pl-4 py-1">
              "{t.builtForMe.quote}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
