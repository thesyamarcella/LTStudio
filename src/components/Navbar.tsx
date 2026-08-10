import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        isScrolled
          ? 'bg-[#F9F8F6]/95 backdrop-blur-sm border-[#E5E5E2] py-3 shadow-xs'
          : 'bg-[#F9F8F6] border-[#E5E5E2] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left Brand */}
        <a
          href="#"
          className="group flex items-center gap-2 text-xl font-bold tracking-tighter text-[#1A1A1A]"
        >
          <span className="w-2.5 h-2.5 bg-[#D95D7D] transition-transform group-hover:scale-125"></span>
          LTStudio
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-[#1A1A1A]/70">
          <button
            onClick={() => scrollToSection('mantra')}
            className="hover:text-[#1A1A1A] transition-colors cursor-pointer py-1"
          >
            {language === 'id' ? 'Mantra' : 'Mantra'}
          </button>
          <button
            onClick={() => scrollToSection('why')}
            className="hover:text-[#1A1A1A] transition-colors cursor-pointer py-1"
          >
            {language === 'id' ? 'Mengapa' : 'Why'}
          </button>
          <button
            onClick={() => scrollToSection('workflow-engine')}
            className="hover:text-[#1A1A1A] transition-colors cursor-pointer py-1"
          >
            {language === 'id' ? 'Mesin' : 'Engine'}
          </button>
          <button
            onClick={() => scrollToSection('ecosystem')}
            className="hover:text-[#1A1A1A] transition-colors cursor-pointer py-1"
          >
            {t.navbar.architecture}
          </button>
          <button
            onClick={() => scrollToSection('products')}
            className="hover:text-[#1A1A1A] transition-colors cursor-pointer py-1"
          >
            {t.navbar.products}
          </button>
          <button
            onClick={() => scrollToSection('principles')}
            className="hover:text-[#1A1A1A] transition-colors cursor-pointer py-1"
          >
            {t.navbar.principles}
          </button>
        </nav>

        {/* Right Section: Language Switcher & Engineering Link */}
        <div className="flex items-center gap-4">
          {/* Language Toggle Control */}
          <div className="flex items-center border border-[#E5E5E2] bg-[#F4F3F0] p-0.5 text-[10px] font-mono uppercase tracking-wider">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] font-bold shadow-xs'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
              }`}
              title="English Version"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              className={`px-2 py-0.5 transition-all cursor-pointer ${
                language === 'id'
                  ? 'bg-[#D95D7D] text-[#F9F8F6] font-bold shadow-xs'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
              }`}
              title="Versi Bahasa Indonesia"
            >
              ID
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 border-l border-[#E5E5E2] pl-4">
            <a
              href="https://thesyamarcella.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
              title="Engineering Portfolio & Backend Architecture"
            >
              <span>Portfolio</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1A1A] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F9F8F6] border-b border-[#E5E5E2] px-6 py-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E2]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#D95D7D]" />
              Bahasa / Language
            </span>
            <div className="flex items-center border border-[#E5E5E2] bg-[#F4F3F0] p-0.5 text-xs font-mono uppercase">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 ${
                  language === 'en' ? 'bg-[#1A1A1A] text-white font-bold' : 'text-[#1A1A1A]/60'
                }`}
              >
                English (EN)
              </button>
              <button
                onClick={() => setLanguage('id')}
                className={`px-3 py-1 ${
                  language === 'id' ? 'bg-[#D95D7D] text-white font-bold' : 'text-[#1A1A1A]/60'
                }`}
              >
                Indonesia (ID)
              </button>
            </div>
          </div>

          <button
            onClick={() => scrollToSection('mantra')}
            className="block w-full text-left text-xs uppercase tracking-widest font-semibold py-2 text-[#1A1A1A]"
          >
            Mantra
          </button>
          <button
            onClick={() => scrollToSection('why')}
            className="block w-full text-left text-xs uppercase tracking-widest font-semibold py-2 text-[#1A1A1A]"
          >
            {language === 'id' ? 'Mengapa LTStudio' : 'Why'}
          </button>
          <button
            onClick={() => scrollToSection('workflow-engine')}
            className="block w-full text-left text-xs uppercase tracking-widest font-semibold py-2 text-[#1A1A1A]"
          >
            {language === 'id' ? 'Mesin Alur Kerja' : 'Engine'}
          </button>
          <button
            onClick={() => scrollToSection('ecosystem')}
            className="block w-full text-left text-xs uppercase tracking-widest font-semibold py-2 text-[#1A1A1A]"
          >
            {t.navbar.architecture}
          </button>
          <button
            onClick={() => scrollToSection('products')}
            className="block w-full text-left text-xs uppercase tracking-widest font-semibold py-2 text-[#1A1A1A]"
          >
            {t.navbar.products}
          </button>
          <button
            onClick={() => scrollToSection('principles')}
            className="block w-full text-left text-xs uppercase tracking-widest font-semibold py-2 text-[#1A1A1A]"
          >
            {t.navbar.principles}
          </button>
          <div className="pt-4 border-t border-[#E5E5E2]">
            <a
              href="https://thesyamarcella.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]"
            >
              <span>Engineering Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
