import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate: (view: 'privacy' | 'terms' | 'about' | 'contact') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="mt-12 pt-8 border-t border-white/5 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-start">
        <div className="md:col-span-1">
             <h4 className="text-white font-bold mb-4">{t('app_title')}</h4>
             <p className="text-slate-500 text-sm leading-relaxed">
                 {t('footer_desc')}
             </p>
        </div>
        
        <div className="md:col-span-3 flex flex-wrap justify-center md:justify-end gap-6 md:gap-12">
            <div>
                <h5 className="text-slate-300 font-semibold mb-3 text-sm">{t('about_us')}</h5>
                <ul className="space-y-2 text-sm text-slate-500">
                    <li>
                        <button onClick={() => onNavigate('about')} className="hover:text-emerald-400 transition-colors">
                            {t('about_us')}
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onNavigate('contact')} className="hover:text-emerald-400 transition-colors">
                            {t('contact_us')}
                        </button>
                    </li>
                </ul>
            </div>

            <div>
                <h5 className="text-slate-300 font-semibold mb-3 text-sm">{t('terms_of_service')}</h5>
                <ul className="space-y-2 text-sm text-slate-500">
                     <li>
                        <button onClick={() => onNavigate('privacy')} className="hover:text-emerald-400 transition-colors">
                            {t('privacy_policy')}
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onNavigate('terms')} className="hover:text-emerald-400 transition-colors">
                            {t('terms_of_service')}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
      </div>

      <div className="text-center text-xs text-slate-600 border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
         <span>&copy; {new Date().getFullYear()} {t('copyright')}</span>
         <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500/50"></span>
            ver 2.1.0-stable
         </span>
      </div>
    </footer>
  );
};

export default Footer;