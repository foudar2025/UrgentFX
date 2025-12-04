import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CookieConsent: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl p-4 md:flex items-center justify-between gap-6 ring-1 ring-white/10">
        <div className="flex items-start md:items-center gap-4 mb-4 md:mb-0">
          <div className="p-3 bg-emerald-500/10 rounded-xl shrink-0">
            <Cookie className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            {t('cookie_message')}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
           {/* In a real scenario, you might want a 'Decline' or 'Settings' button too */}
          <button 
            onClick={handleAccept}
            className="w-full md:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 whitespace-nowrap"
          >
            {t('accept_cookies')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;