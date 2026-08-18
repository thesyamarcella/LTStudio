import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Layers, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Ecosystem3DCanvas } from './Ecosystem3DCanvas';
import { Product } from '../types';

interface HeroProps {
  onOpenProductDetail?: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProductDetail }) => {
  const { t } = useLanguage();

  const scrollToEcosystem = () => {
    const el = document.getElementById('mantra');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#E5E5E2] bg-[#F9F8F6] overflow-hidden">
      {/* Background Atmospheric Radial Pink Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(217,93,125,0.06)_0%,_transparent_65%)]"></div>

      {/* Background Architectural Grid Subtlety */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column - Headline & Editorial Copy */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F3F0] border border-[#E5E5E2] text-[11px] uppercase font-mono tracking-widest text-[#1A1A1A]/70 mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 bg-[#D95D7D] rounded-full"></span>
                {t.hero.identityBadge}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-light text-[#1A1A1A] tracking-tight leading-[1.08] mb-6">
                {t.hero.headlinePrefix} <br className="hidden sm:inline" />
                <span className="font-normal italic">{t.hero.headlineHighlight}</span>
              </h1>

              <p className="text-base sm:text-lg text-[#1A1A1A]/70 font-normal leading-relaxed max-w-xl mb-6 sm:mb-8">
                {t.hero.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={scrollToEcosystem}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#1A1A1A] text-[#F9F8F6] text-xs font-mono uppercase tracking-widest font-bold border border-[#1A1A1A] hover:bg-[#D95D7D] hover:border-[#D95D7D] hover:text-[#F9F8F6] transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-3 shadow-xs"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <span className="text-xs text-[#1A1A1A]/50 font-mono tracking-wider sm:ml-2">
                  {t.hero.systemArch}
                </span>
              </div>
            </motion.div>

            {/* Core Premise Block */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="pt-6 border-t border-[#E5E5E2] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase font-mono tracking-widest text-[#1A1A1A]/50 mb-1.5">
                  <span className="w-1.5 h-1.5 bg-[#D95D7D]"></span>
                  {t.hero.corePremiseTitle}
                </div>
                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans border-l-2 border-[#D95D7D] pl-3 py-0.5">
                  {t.hero.corePremiseText}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/70 bg-[#F4F3F0] p-3.5 border border-[#E5E5E2]">
                <div>
                  <div className="text-[#1A1A1A]/40 mb-0.5">{t.hero.foundingPrincipleLabel}</div>
                  <div className="font-semibold text-[#1A1A1A]">{t.hero.foundingPrincipleVal}</div>
                </div>
                <div>
                  <div className="text-[#1A1A1A]/40 mb-0.5">{t.hero.workflowArchLabel}</div>
                  <div className="font-semibold text-[#1A1A1A]">{t.hero.workflowArchVal}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Interactive 3D Ecosystem Visualization */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full"
            >
              {/* 3D Canvas Frame */}
              <Ecosystem3DCanvas onOpenProductDetail={onOpenProductDetail} />

              {/* Caption Bar */}
              <div className="mt-2.5 px-1 py-1 flex items-center justify-between text-[10px] font-mono text-[#1A1A1A]/60">
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-[#D95D7D]" />
                  <span className="uppercase tracking-wider font-bold text-[#1A1A1A]">
                    {t.hero.figCaption}
                  </span>
                </div>
                <span className="text-[#1A1A1A]/50 uppercase tracking-widest hidden sm:inline">
                  {t.hero.figSub}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


