import React from 'react';
import { RefreshCw, Wallet, Globe, ShieldCheck, Quote, ChevronDown } from 'lucide-react';
import { useLanguage, LANGUAGES } from '../contexts/LanguageContext';

interface HeaderProps {
  lastUpdated: string | null;
  sourceTime: string | null;
  onRefresh: () => void;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ lastUpdated, sourceTime, onRefresh, isLoading }) => {
  const { t, setLanguage, language, currentDir } = useLanguage();

  const formattedSourceTime = sourceTime 
    ? new Date(sourceTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) 
    : '---';

  const formattedLastUpdated = lastUpdated
    ? lastUpdated.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString()) 
    : t('loading');

  return (
    <div className="w-full mb-4 md:mb-8 flex flex-col gap-4 md:gap-6">
      
      {/* Trust Quote Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-900/40 via-slate-800/40 to-emerald-900/40 border-y border-emerald-500/20 py-2.5 px-4 text-center backdrop-blur-md">
        <p className="text-emerald-100 text-xs md:text-sm font-light italic flex items-center justify-center gap-2">
            <Quote className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 transform rotate-180 shrink-0" />
            <span className="break-words max-w-[90%] md:max-w-none">{t('trust_quote')}</span>
            <Quote className="w-3 h-3 md:w-4 md:h-4 text-emerald-500 shrink-0" />
        </p>
      </div>

      <header className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-start">
          <div className="p-3 bg-gradient-to-tr from-amber-400 to-orange-600 rounded-2xl shadow-lg shadow-amber-500/20 shrink-0">
            <Wallet className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div className="text-center lg:text-start">
            {/* Semantic H1 for SEO */}
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
              {t('seo_h1')}
            </h1>
            <p className="text-[10px] md:text-xs text-slate-400 font-light tracking-wide flex items-center justify-center lg:justify-start gap-2">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{t('real_market_data')}</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="hidden sm:inline text-amber-400 font-medium">{t('premium_data')}</span>
            </p>
          </div>
        </div>

        {/* Stats & Actions Bar - Scrollable on mobile to fit everything */}
        <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 lg:pb-0">
          <div className="flex items-center gap-3 md:gap-4 bg-slate-800/50 rounded-2xl p-2 pl-4 pr-2 border border-white/5 min-w-max mx-auto lg:mx-0">
            
            {/* Language Select Dropdown - Improved Touch Target */}
            <div className="relative group shrink-0">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-600 transition-colors border-r border-slate-600/50 cursor-pointer">
                <Globe className="w-4 h-4 text-emerald-400" />
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-slate-200 text-sm font-bold font-mono outline-none appearance-none cursor-pointer w-20 md:w-24 text-center py-0.5"
                >
                  {LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code} className="bg-slate-800 text-slate-200">
                          {lang.flag} {lang.name}
                      </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none absolute right-1 md:right-2" />
              </div>
            </div>

            {/* Source Time */}
            <div className={`flex flex-col items-end px-3 md:px-4 ${currentDir === 'rtl' ? 'border-r' : 'border-l'} border-slate-700/50 shrink-0`}>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3" />
                 {t('source_time')}
              </span>
              <span className="text-xs md:text-sm font-mono text-amber-400 font-medium">
                {formattedSourceTime}
              </span>
            </div>

            {/* Local Check Time */}
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">{t('system_check')}</span>
              <span className="text-xs md:text-sm font-mono text-emerald-400 font-medium">
                {formattedLastUpdated}
              </span>
            </div>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              className={`p-3 md:p-3.5 rounded-xl transition-all duration-300 shrink-0 ${
                isLoading 
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-slate-700 hover:bg-slate-600 text-white hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95'
              }`}
              title={t('retry')}
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default React.memo(Header);