import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Check } from 'lucide-react';

export const Mantra: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const { t, mantraStages } = useLanguage();

  return (
    <section id="mantra" className="py-24 border-b border-[#E5E5E2] bg-[#F4F3F0] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#1A1A1A]/40 mb-3">
            {t.mantra.categoryBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A] uppercase">
            {t.mantra.title}
          </h2>
          <p className="text-sm text-[#1A1A1A]/60 max-w-lg mx-auto mt-3 font-mono">
            {t.mantra.subtitle}
          </p>
        </div>

        {/* Clean Architectural Vertical Timeline */}
        <div className="relative pl-6 sm:pl-16 space-y-8">
          {/* Vertical Spine Line */}
          <div className="absolute left-3 sm:left-8 top-6 bottom-6 w-px bg-[#1A1A1A]/20"></div>

          {mantraStages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setActiveStage(idx)}
                className="relative group cursor-pointer"
              >
                {/* Timeline Node Badge on the left spine */}
                <div
                  className={`absolute -left-6 sm:-left-16 top-4 -translate-x-1/2 w-8 h-8 flex items-center justify-center font-mono text-[10px] font-bold border transition-all duration-200 z-10 ${
                    isActive
                      ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D] scale-110 shadow-sm'
                      : 'bg-[#F9F8F6] text-[#1A1A1A] border-[#E5E5E2] group-hover:border-[#D95D7D]'
                  }`}
                >
                  {stage.number}
                </div>

                {/* Stage Card */}
                <div
                  className={`p-6 sm:p-8 bg-[#F9F8F6] border relative overflow-hidden transition-all duration-200 ${
                    isActive
                      ? 'border-[#D95D7D] shadow-xs'
                      : 'border-[#E5E5E2] group-hover:border-[#D95D7D]/50'
                  }`}
                >
                  {/* Soft Blurred Ambient Pink Gradient Accent for active/stage 04 */}
                  {(isActive || stage.number === '04') && (
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-[radial-gradient(circle,_rgba(217,93,125,0.12)_0%,_transparent_70%)] pointer-events-none blur-xl"></div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-[#E5E5E2] relative z-10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A]/60 flex items-center gap-1.5">
                      {stage.number === '04' && <span className="w-1.5 h-1.5 bg-[#D95D7D] rounded-full inline-block"></span>}
                      {t.mantra.stageLabel} {stage.number} // {stage.subtitle}
                    </span>
                    {isActive && (
                      <span className="font-mono text-[10px] uppercase font-bold text-[#D95D7D] flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#D95D7D]" />
                        {t.mantra.activeFocus}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3 tracking-tight relative z-10">
                    {stage.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1A1A1A]/75 leading-relaxed font-sans max-w-2xl relative z-10">
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Causality Summary Footer */}
        <div className="mt-16 text-center max-w-2xl mx-auto p-6 sm:p-8 bg-[#F9F8F6] border border-[#1A1A1A] space-y-2">
          <div className="text-[10px] uppercase font-mono tracking-widest text-[#1A1A1A]/50">
            {t.mantra.valueChainTitle}
          </div>
          <p className="text-xs sm:text-sm text-[#1A1A1A] leading-relaxed font-mono">
            {t.mantra.valueChainText}
          </p>
        </div>
      </div>
    </section>
  );
};

