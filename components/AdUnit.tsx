import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AdUnitProps {
  className?: string;
  slotId?: string; // For real AdSense
  format?: 'auto' | 'fluid' | 'rectangle';
}

const AdUnit: React.FC<AdUnitProps> = ({ className = '', slotId, format = 'auto' }) => {
  const { t } = useLanguage();

  return (
    <div className={`w-full bg-slate-800/20 border border-slate-700/50 border-dashed rounded-xl p-4 flex flex-col items-center justify-center min-h-[100px] overflow-hidden ${className}`}>
      {/* 
        This is a placeholder for Google AdSense. 
        In production, you would place the <ins> tag here.
      */}
      <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('sponsored')}</span>
      <span className="text-sm text-slate-400 font-mono">{t('ad_space')}</span>
      
      {/* Actual AdSense Code Structure (Commented out for now) */}
      {/* 
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
           data-ad-slot={slotId}
           data-ad-format={format}
           data-full-width-responsive="true"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script> 
      */}
    </div>
  );
};

export default React.memo(AdUnit);