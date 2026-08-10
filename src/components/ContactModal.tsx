import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Send, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { language } = useLanguage();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-[#F9F8F6] border border-[#1A1A1A] max-w-lg w-full p-5 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E2] mb-5 sm:mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/40 block mb-1">
                {language === 'id' ? 'Komunikasi Langsung' : 'Direct Communication'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
                {language === 'id' ? 'Hubungi LTStudio' : 'Contact LTStudio'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] border border-[#E5E5E2] hover:border-[#1A1A1A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-[#1A1A1A] text-[#F9F8F6] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-[#D95D7D]" />
              </div>
              <h4 className="text-lg font-bold text-[#1A1A1A]">
                {language === 'id' ? 'Pesan Terkirim' : 'Message Transmitted'}
              </h4>
              <p className="text-xs text-[#1A1A1A]/70 font-sans max-w-xs mx-auto">
                {language === 'id'
                  ? 'Terima kasih telah menghubungi. Thesya Marcella akan meninjau pesan Anda.'
                  : 'Thank you for reaching out. Thesya Marcella will review your inquiry.'}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 bg-[#1A1A1A] text-[#F9F8F6] text-xs font-mono uppercase tracking-widest font-bold border border-[#1A1A1A] hover:bg-[#D95D7D] transition-colors"
              >
                {language === 'id' ? 'Selesai' : 'Done'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/60 mb-1">
                  {language === 'id' ? 'Nama' : 'Name'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'id' ? 'Nama Anda' : 'Your Name'}
                  className="w-full p-3 text-xs bg-[#F4F3F0] border border-[#E5E5E2] focus:border-[#D95D7D] outline-none text-[#1A1A1A] font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/60 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full p-3 text-xs bg-[#F4F3F0] border border-[#E5E5E2] focus:border-[#D95D7D] outline-none text-[#1A1A1A] font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/60 mb-1">
                  {language === 'id' ? 'Pertanyaan Alur Kerja / Sistem' : 'Workflow / System Inquiry'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'id' ? 'Jelaskan pertanyaan sistem atau diskusi perangkat lunak Anda...' : 'Describe your system inquiry or software discussion...'}
                  className="w-full p-3 text-xs bg-[#F4F3F0] border border-[#E5E5E2] focus:border-[#D95D7D] outline-none text-[#1A1A1A] font-sans"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-[#E5E5E2] flex items-center justify-between">
                <a
                  href="mailto:thesyamarcella@gmail.com"
                  className="text-[10px] font-mono text-[#1A1A1A]/60 underline hover:text-[#D95D7D] flex items-center gap-1"
                >
                  <Mail className="w-3 h-3 text-[#D95D7D]" />
                  {language === 'id' ? 'Email Langsung' : 'Direct Email'}
                </a>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1A1A1A] text-[#F9F8F6] text-xs font-mono uppercase tracking-widest font-bold border border-[#1A1A1A] hover:bg-[#D95D7D] hover:border-[#D95D7D] transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{language === 'id' ? 'Kirim Pesan' : 'Send Message'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
