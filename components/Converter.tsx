import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRightLeft, TrendingUp, TrendingDown, Coins } from 'lucide-react';
import { ExchangeRates, POPULAR_CURRENCIES } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ConverterProps {
  ratesData: ExchangeRates | null;
}

const Converter: React.FC<ConverterProps> = ({ ratesData }) => {
  const { t, language, formatNumber } = useLanguage();
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('SAR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  // Helper to get name
  const getCurrencyName = (code: string) => {
    const details = POPULAR_CURRENCIES.find(c => c.code === code);
    if (!details) return code;
    return details.translations[language] || details.translations['en'] || code;
  };

  // Sort currencies alphabetically based on current language
  const sortedCurrencies = useMemo(() => {
    return [...POPULAR_CURRENCIES].sort((a, b) => {
      const nameA = a.translations[language] || a.translations['en'] || a.code;
      const nameB = b.translations[language] || b.translations['en'] || b.code;
      return nameA.localeCompare(nameB, language);
    });
  }, [language]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    if (ratesData && ratesData.rates) {
      const fromRate = ratesData.rates[fromCurrency] || 1;
      const toRate = ratesData.rates[toCurrency] || 1;
      const result = (amount / fromRate) * toRate;
      setConvertedAmount(result);
    }
  }, [amount, fromCurrency, toCurrency, ratesData]);

  const oneUnitRate = useMemo(() => {
     if (!convertedAmount || amount === 0) return 0;
     return convertedAmount / amount;
  }, [convertedAmount, amount]);

  return (
    <div className="relative overflow-hidden w-full bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl">
        {/* Background Decorative Elements */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
            {/* Semantic H2 for SEO */}
            <h2 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Coins className="text-amber-400" />
                {t('seo_h2_converter')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                {/* From Section */}
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 transition-all focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/10">
                    <label className="text-slate-400 text-xs md:text-sm mb-2 block">{t('amount_currency')}</label>
                    <div className="flex gap-2">
                        <input 
                            type="number" 
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                            className="w-full bg-transparent text-xl md:text-2xl font-bold text-white outline-none placeholder-slate-600 font-mono"
                            placeholder="0.00"
                            style={{direction: 'ltr'}} 
                        />
                        <select 
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="bg-slate-800 text-white text-base rounded-xl px-3 py-2 outline-none border border-slate-700 cursor-pointer hover:bg-slate-700 max-w-[100px] md:max-w-none transition-colors"
                        >
                            {sortedCurrencies.map(curr => (
                                <option key={`from-${curr.code}`} value={curr.code}>
                                    {curr.flag} {curr.code}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="text-[10px] md:text-xs text-slate-500 mt-1 truncate">
                        {getCurrencyName(fromCurrency)}
                    </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-2 md:my-0 z-10">
                    <button 
                        onClick={handleSwap}
                        className="p-3 md:p-4 bg-slate-700/80 md:bg-slate-700/50 hover:bg-emerald-500 hover:text-white rounded-full transition-all duration-300 border border-white/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] group active:scale-90"
                    >
                        <ArrowRightLeft className="w-5 h-5 text-slate-300 group-hover:text-white transition-transform group-hover:rotate-180" />
                    </button>
                </div>

                {/* To Section */}
                <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                    <label className="text-slate-400 text-xs md:text-sm mb-2 block">{t('equivalent')}</label>
                    <div className="flex gap-2 justify-between items-center">
                        <div className="text-xl md:text-2xl font-bold text-emerald-400 overflow-hidden text-ellipsis font-mono">
                            {convertedAmount !== null ? formatNumber(convertedAmount, 3) : '---'}
                        </div>
                        <select 
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="bg-slate-800 text-white text-base rounded-xl px-3 py-2 outline-none border border-slate-700 cursor-pointer hover:bg-slate-700 max-w-[100px] md:max-w-none transition-colors"
                        >
                             {sortedCurrencies.map(curr => (
                                <option key={`to-${curr.code}`} value={curr.code}>
                                    {curr.flag} {curr.code}
                                </option>
                            ))}
                        </select>
                    </div>
                     <div className="text-[10px] md:text-xs text-slate-500 mt-1 truncate">
                        {getCurrencyName(toCurrency)}
                    </div>
                </div>
            </div>

            {/* Info Footer */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-sm bg-white/5 p-3 rounded-xl gap-2 sm:gap-0">
                 <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {t('current_rate')}
                 </div>
                 <div className="font-mono text-amber-400 flex items-center gap-2" dir="ltr">
                    1 {fromCurrency} = {formatNumber(oneUnitRate, 4)} {toCurrency}
                    {oneUnitRate > 1 ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingDown className="w-4 h-4 text-rose-500" />}
                 </div>
            </div>
        </div>
    </div>
  );
};

export default React.memo(Converter);