import React, { useMemo } from 'react';
import { ExchangeRates, POPULAR_CURRENCIES } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LiveRatesProps {
  ratesData: ExchangeRates | null;
  baseCurrency: string; // usually USD
}

const LiveRates: React.FC<LiveRatesProps> = ({ ratesData, baseCurrency }) => {
  const { t, language, formatNumber, currentDir } = useLanguage();

  const displayCurrencies = useMemo(() => {
    return POPULAR_CURRENCIES
      .filter(c => c.code !== baseCurrency)
      .sort((a, b) => {
        const nameA = a.translations[language] || a.translations['en'] || a.code;
        const nameB = b.translations[language] || b.translations['en'] || b.code;
        return nameA.localeCompare(nameB, language);
      });
  }, [baseCurrency, language]);

  const getCurrencyName = (currency: typeof POPULAR_CURRENCIES[0]) => {
     return currency.translations[language] || currency.translations['en'] || currency.code;
  };

  // Skeleton Loader for CLS prevention
  if (!ratesData || !ratesData.rates) {
    return (
      <div className="mt-8 animate-pulse">
         <div className={`h-7 w-48 bg-slate-800 rounded-lg mb-4 ${currentDir === 'rtl' ? 'mr-0' : 'ml-0'}`}></div>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-slate-800/20 rounded-2xl p-4 h-24 border border-white/5"></div>
            ))}
         </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Semantic H2 for SEO */}
      <h2 className={`text-lg font-bold text-white mb-4 ${currentDir === 'rtl' ? 'pr-2 border-r-4' : 'pl-2 border-l-4'} border-amber-500`}>
        {t('seo_h2_rates')} <span className="text-slate-400 text-sm font-normal">({t('vs_usd')} {baseCurrency})</span>
      </h2>
      
      {/* Responsive Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {displayCurrencies.map((currency) => {
          const rate = ratesData.rates[currency.code];
          if (!rate) return null;

          return (
            <div 
                key={currency.code}
                className="group relative bg-slate-800/40 hover:bg-slate-700/60 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300 cursor-default"
            >
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-xl md:text-2xl shrink-0" role="img" aria-label={currency.code}>{currency.flag}</span>
                        <div className="overflow-hidden">
                            <div className="font-bold text-white text-sm md:text-base">{currency.code}</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[80px] md:max-w-[100px]">
                              {getCurrencyName(currency)}
                            </div>
                        </div>
                    </div>
                    <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                        <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                    </div>
                </div>
                
                <div className="text-xl md:text-2xl font-mono font-medium text-slate-100 mt-2 group-hover:text-emerald-300 transition-colors">
                    {formatNumber(rate, 3)}
                </div>
                <div className="text-[10px] md:text-xs text-slate-500 mt-1 font-mono" dir="ltr">
                    1 {baseCurrency} = {formatNumber(rate, 3)} {currency.code}
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(LiveRates);