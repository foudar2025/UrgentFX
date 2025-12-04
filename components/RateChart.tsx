import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ExchangeRates, POPULAR_CURRENCIES } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface RateChartProps {
  ratesData: ExchangeRates | null;
}

const RateChart: React.FC<RateChartProps> = ({ ratesData }) => {
  const { t, formatNumber, language, currentDir } = useLanguage();

  if (!ratesData || !ratesData.rates) return null;

  const targetCodes = ['SAR', 'AED', 'QAR', 'EUR', 'GBP'];
  
  const getCurrencyName = (info: typeof POPULAR_CURRENCIES[0] | undefined, code: string) => {
    if (!info) return code;
    return info.translations[language] || info.translations['en'] || code;
  };

  const data = targetCodes.map(code => {
    const rate = ratesData.rates[code];
    const info = POPULAR_CURRENCIES.find(c => c.code === code);
    return {
      name: code,
      nameDisplay: getCurrencyName(info, code),
      rate: rate || 0,
    };
  });

  return (
    <div className="mt-8 bg-slate-800/30 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        {/* Semantic H2 for SEO */}
        <h2 className={`text-lg font-bold text-white ${currentDir === 'rtl' ? 'pr-2 border-r-4' : 'pl-2 border-l-4'} border-emerald-500`}>
            {t('seo_h2_chart')}
        </h2>
        <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 w-fit">
            {t('chart_subtitle')}
        </span>
      </div>

      <div className="h-[300px] w-full" dir="ltr"> 
      {/* dir=ltr is important for recharts to render axes correctly */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
            />
            <YAxis 
                hide 
            />
            <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }}
                itemStyle={{ color: '#fbbf24' }}
                formatter={(value: number) => [formatNumber(value, 4), t('exchange_rate_label')]}
            />
            <Bar dataKey="rate" radius={[10, 10, 0, 0]} barSize={50}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#3b82f6'} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(RateChart);