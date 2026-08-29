import React, { useState } from 'react';
import { ArrowUpRight, Github, Mail } from 'lucide-react';
import { ContactModal } from './ContactModal';
import { useLanguage } from '../context/LanguageContext';
import { AppLogo } from './AppLogo';

export const Footer: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-[#E5E5E2] bg-[#F9F8F6] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-[#E5E5E2]">
          {/* Main Statement */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest font-bold">
              <AppLogo id="ltstudio" size={22} className="rounded-[4px] shadow-2xs" />
              <span>LTStudio</span>
            </div>
            <p className="text-lg sm:text-xl font-light tracking-tight text-[#1A1A1A]/90 max-w-md">
              {t.footer.statement}
            </p>
          </div>

          {/* Identity Distinction Note */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/40">
              {t.footer.identityTitle}
            </div>
            <div className="space-y-1 text-xs font-mono text-[#1A1A1A]/70">
              <p><strong className="text-[#1A1A1A]">LTStudio:</strong> {t.footer.ltstudioDesc}</p>
              <p><strong className="text-[#1A1A1A]">Portfolio:</strong> {t.footer.portfolioDesc}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs uppercase tracking-wider">
            <div className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-2">
              {t.footer.navTitle}
            </div>
            <div>
              <a
                href="https://thesyamarcella.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold border-b border-[#1A1A1A] pb-0.5 hover:text-[#D95D7D] hover:border-[#D95D7D] transition-colors"
              >
                <span>{t.footer.portfolioLink}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
            <div>
              <button
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center gap-1.5 text-[#1A1A1A]/70 hover:text-[#D95D7D] transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{t.footer.contactBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#1A1A1A]/50 gap-4">
          <div>
            <span>{language === 'id' ? 'Dirancang & Dibangun oleh ' : 'Designed & Built by '}</span>
            <strong className="text-[#1A1A1A] font-semibold">Thesya Marcella</strong>
          </div>
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} LTStudio</span>
          </div>
        </div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  );
};
