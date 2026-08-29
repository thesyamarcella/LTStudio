import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { StatusBadge } from './StatusBadge';
import { WorkflowVisualization } from './WorkflowVisualization';
import { AppLogo, APP_LOGO_META } from './AppLogo';
import { useLanguage } from '../context/LanguageContext';
import { X, Cpu, ShieldCheck, Database, Check, ArrowUpRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose
}) => {
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState<number>(0);
  const { t, language } = useLanguage();

  if (!product) return null;

  const currentWorkflowDetail = product.workflowDetails?.[selectedWorkflowStep];
  const logoMeta = APP_LOGO_META[product.id.toLowerCase()];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#1A1A1A]/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-[#F9F8F6] border border-[#1A1A1A] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#F9F8F6] z-20 border-b border-[#E5E5E2] p-4 sm:p-8 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <AppLogo id={product.id} size={56} className="shrink-0" />
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50">
                    LTStudio System Module
                  </span>
                  <span className="text-[#1A1A1A]/20 hidden sm:inline">•</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]">
                    {product.category === 'Personal Life'
                      ? (language === 'id' ? 'Kehidupan Pribadi' : 'Personal Life')
                      : (language === 'id' ? 'Kehidupan Profesional' : 'Professional Life')}
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
                    {product.name}
                  </h2>
                  {logoMeta && (
                    <span
                      className="text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 border"
                      style={{
                        color: logoMeta.accentColor,
                        borderColor: `${logoMeta.accentColor}40`,
                        backgroundColor: `${logoMeta.accentColor}0D`
                      }}
                    >
                      {logoMeta.subtitle}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto sm:ml-0 flex-wrap">
              {product.liveUrl && (
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#D95D7D] text-[#F9F8F6] text-[11px] font-mono uppercase tracking-wider font-bold border border-[#1A1A1A] hover:border-[#D95D7D] transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></span>
                  <span>{language === 'id' ? 'Buka Aplikasi' : 'Launch App'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              <StatusBadge status={product.status} />
              <button
                onClick={onClose}
                className="p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] border border-[#E5E5E2] hover:border-[#1A1A1A] transition-colors cursor-pointer"
                aria-label="Close detail modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-8 space-y-6 sm:space-y-10">
            {/* Tagline & Core Philosophy */}
            <div className="p-4 sm:p-6 bg-[#F4F3F0] border border-[#E5E5E2] space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50">
                  {language === 'id' ? 'Pernyataan Filosofi' : 'Philosophy Statement'}
                </div>
                {product.domain && (
                  <span className="text-[11px] font-mono text-[#1A1A1A]/70 flex items-center gap-1">
                    <span className="text-[#1A1A1A]/40 font-normal">Domain:</span> {product.domain}
                  </span>
                )}
              </div>
              <p className="text-base sm:text-lg font-serif italic text-[#1A1A1A]">
                "{product.tagline}"
              </p>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans pt-2">
                {product.description}
              </p>
            </div>

            {/* Workflow Visualization Inspector */}
            {product.workflow && product.workflow.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E2]">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#1A1A1A]" />
                    {language === 'id' ? 'Rantai Progresi Alur Kerja' : 'Workflow Progression Chain'}
                  </h3>
                  <span className="text-[10px] font-mono text-[#1A1A1A]/50">
                    [ {language === 'id' ? 'Klik tahap untuk melihat logika otomatisasi' : 'Click stage to inspect automation logic'} ]
                  </span>
                </div>

                <WorkflowVisualization
                  workflow={product.workflow}
                  activeStep={selectedWorkflowStep}
                  onStepClick={(index) => setSelectedWorkflowStep(index)}
                />

                {/* Stage Input / Output Logic Panel */}
                {currentWorkflowDetail ? (
                  <div className="p-6 bg-[#F9F8F6] border border-[#1A1A1A] space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 pb-3 border-b border-[#E5E5E2]">
                      <span>Stage 0{selectedWorkflowStep + 1}: <strong className="text-[#1A1A1A]">{currentWorkflowDetail.stage}</strong></span>
                      <span className="text-[#1A1A1A] font-bold">{language === 'id' ? 'Logika Otomatis Aktif' : 'Automated Logic Active'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase text-[#1A1A1A]/50 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#D95D7D] inline-block"></span>
                          {language === 'id' ? 'Pemicu Input Tunggal' : 'Single Input Trigger'}
                        </div>
                        <p className="text-xs font-mono font-semibold text-[#1A1A1A] bg-[#F4F3F0] p-3 border border-[#E5E5E2] border-l-2 border-l-[#D95D7D]">
                          {currentWorkflowDetail.input}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-mono uppercase text-[#1A1A1A]/50 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#D95D7D] inline-block"></span>
                          {language === 'id' ? 'Hasil Output Lanjutan' : 'Downstream Output Result'}
                        </div>
                        <p className="text-xs font-mono font-semibold text-[#1A1A1A] bg-[#F4F3F0] p-3 border border-[#E5E5E2] border-l-2 border-l-[#D95D7D]">
                          {currentWorkflowDetail.output}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E5E5E2] text-xs font-sans text-[#1A1A1A]/80 flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-mono text-[10px] uppercase block text-[#1A1A1A]">
                          {language === 'id' ? 'Catatan Mesin Otomatisasi:' : 'Automation Engine Note:'}
                        </strong>
                        {currentWorkflowDetail.automationNote}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-[#F4F3F0] border border-[#E5E5E2] text-xs font-mono text-[#1A1A1A]/60">
                    {language === 'id'
                      ? 'Pipelines alur kerja konseptual telah diinisialisasi.'
                      : 'Conceptual workflow pipeline initialized. Full operational logic active in Daily Driver deployment.'}
                  </div>
                )}
              </div>
            )}

            {/* Architecture Link Note */}
            {product.architectureNote && (
              <div className="p-5 bg-[#F4F3F0] border border-[#E5E5E2] space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  {language === 'id' ? 'Integrasi Arsitektur Ekosistem' : 'Ecosystem Architecture Integration'}
                </div>
                <p className="text-xs font-mono text-[#1A1A1A] leading-relaxed">
                  {product.architectureNote}
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 bg-[#F4F3F0] border-t border-[#E5E5E2] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#1A1A1A]/60">
              <ShieldCheck className="w-4 h-4 text-[#1A1A1A] shrink-0" />
              <span>{language === 'id' ? 'Sistem Terverifikasi LTStudio • Arsitektur Lokal Mandiri' : 'LTStudio System Verified • Offline First Architecture'}</span>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#1A1A1A] text-[#F9F8F6] text-xs font-mono uppercase tracking-widest font-bold border border-[#1A1A1A] hover:bg-[#D95D7D] hover:border-[#D95D7D] transition-colors cursor-pointer text-center"
            >
              {language === 'id' ? 'Tutup Inspektur' : 'Close Inspector'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
