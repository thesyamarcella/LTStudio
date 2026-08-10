import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, ArrowRight } from 'lucide-react';

export const WorkflowIntelligence: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const { t, engineStages, language } = useLanguage();

  return (
    <section id="workflow-engine" className="py-24 border-b border-[#E5E5E2] bg-[#F4F3F0] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F9F8F6] border border-[#E5E5E2] text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/70 mb-4">
            <Cpu className="w-3 h-3 text-[#1A1A1A]" />
            {t.workflowIntel.categoryBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1A1A1A] mb-3">
            {t.workflowIntel.title}
          </h2>
          <p className="text-base sm:text-lg font-medium text-[#1A1A1A]/80 font-sans">
            {t.workflowIntel.subtitle}
          </p>
        </div>

        {/* 5-Node Visual Process Diagram */}
        <div className="mb-12">
          {/* Horizontal Desktop Progression Nodes */}
          <div className="hidden lg:grid grid-cols-5 gap-3 relative">
            {/* Connecting Horizontal Spine */}
            <div className="absolute top-1/2 left-8 right-8 h-px bg-[#E5E5E2] -translate-y-1/2 z-0"></div>

            {engineStages.map((stage, idx) => {
              const isSelected = selectedStage === idx;
              return (
                <button
                  key={stage.number}
                  onClick={() => setSelectedStage(idx)}
                  className={`relative z-10 text-left p-5 transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D] shadow-[0_0_18px_rgba(217,93,125,0.2)] -translate-y-1 ring-1 ring-[#D95D7D]'
                      : 'bg-[#F9F8F6] text-[#1A1A1A] border-[#E5E5E2] hover:border-[#D95D7D]/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 border ${
                        isSelected
                          ? 'bg-[#D95D7D] text-[#F9F8F6] border-[#D95D7D]'
                          : 'bg-[#F4F3F0] text-[#1A1A1A] border-[#E5E5E2]'
                      }`}
                    >
                      {stage.number}
                    </span>
                    {idx < engineStages.length - 1 && (
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-colors ${
                          isSelected ? 'text-[#D95D7D]' : 'text-[#1A1A1A]/30'
                        }`}
                      />
                    )}
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight mb-1">
                    {stage.title}
                  </h3>
                  <p
                    className={`text-[11px] leading-tight line-clamp-2 ${
                      isSelected ? 'text-[#F9F8F6]/80' : 'text-[#1A1A1A]/60'
                    }`}
                  >
                    {stage.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Mobile Vertical Process Nodes */}
          <div className="lg:hidden space-y-3">
            {engineStages.map((stage, idx) => {
              const isSelected = selectedStage === idx;
              return (
                <div
                  key={stage.number}
                  onClick={() => setSelectedStage(idx)}
                  className={`p-4 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D]'
                      : 'bg-[#F9F8F6] text-[#1A1A1A] border-[#E5E5E2]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${
                      isSelected ? 'bg-[#D95D7D] text-[#F9F8F6] border-[#D95D7D]' : 'bg-[#F4F3F0] text-[#1A1A1A]'
                    }`}>
                      {stage.number}
                    </span>
                    <h3 className="text-sm font-semibold">{stage.title}</h3>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed font-sans">
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Focus Card */}
        <motion.div
          key={selectedStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-10 bg-[#F9F8F6] border border-[#1A1A1A] border-t-2 border-t-[#D95D7D] relative shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">
                <span className="w-1.5 h-1.5 bg-[#D95D7D] rounded-full"></span>
                <span>{t.workflowIntel.engineStageLabel} {engineStages[selectedStage]?.number}</span>
                <span>—</span>
                <span className="font-bold text-[#D95D7D]">{t.workflowIntel.activeProcessingLayer}</span>
              </div>
              <h3 className="text-2xl font-normal text-[#1A1A1A]">
                {engineStages[selectedStage]?.title}
              </h3>
              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                {engineStages[selectedStage]?.description}
              </p>
            </div>

            <div className="md:col-span-5 bg-[#F4F3F0] p-5 border border-[#E5E5E2] border-l-2 border-l-[#D95D7D] relative overflow-hidden space-y-2">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle,_rgba(217,93,125,0.08)_0%,_transparent_70%)] pointer-events-none"></div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D95D7D] font-bold flex items-center gap-1.5 relative z-10">
                <span className="w-1.5 h-1.5 bg-[#D95D7D] inline-block"></span>
                {t.workflowIntel.concreteExampleLabel}
              </div>
              <p className="text-xs text-[#1A1A1A] font-mono leading-relaxed relative z-10">
                "{engineStages[selectedStage]?.example}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Closing Engine Statement */}
        <div className="mt-12 text-center">
          <p className="text-sm font-mono uppercase tracking-widest text-[#1A1A1A]/60 font-medium">
            {language === 'id'
              ? 'Ini adalah mesin utama di balik setiap produk dalam ekosistem LTStudio.'
              : 'This is the engine behind every product in the ecosystem.'}
          </p>
        </div>
      </div>
    </section>
  );
};
