import React, { useEffect, useState, useCallback, Suspense } from 'react';
import Header from './components/Header';
import Converter from './components/Converter';
import LiveRates from './components/LiveRates';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import AdUnit from './components/AdUnit';
import { fetchRates } from './services/currencyService';
import { ExchangeRates } from './types';
import { WifiOff, Cpu, Globe, Loader2, Sparkles } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Lazy load heavy components
const RateChart = React.lazy(() => import('./components/RateChart'));
const LegalPages = React.lazy(() => import('./components/LegalPages'));

// Define view types
type ViewState = 'home' | 'privacy' | 'terms' | 'about' | 'contact';

// Loading Fallback Component
const ComponentLoader = () => (
  <div className="w-full h-[350px] flex items-center justify-center bg-slate-800/30 rounded-3xl border border-white/5 animate-pulse mt-8">
    <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
  </div>
);

// Inner Content Component
const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [ratesData, setRatesData] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isPageVisible, setIsPageVisible] = useState(true);

  // Handle Online/Offline Status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle Visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const getData = useCallback(async (showLoading = true) => {
    if (!navigator.onLine) return;
    
    if (showLoading) {
      setLoading(true);
      setError(null);
    }
    
    try {
      const data = await fetchRates();
      setRatesData(data);
      const date = new Date();
      setLastUpdated(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    } catch (err) {
      if (showLoading) {
        setError('fetch_error'); 
      } else {
        console.warn("Background update skipped due to error");
      }
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    getData(true);
  }, [getData]);

  // Polling
  useEffect(() => {
    if (!isPageVisible) return;

    const interval = setInterval(() => {
      getData(false);
    }, 10000); // 10 seconds polling for stability
    
    return () => clearInterval(interval);
  }, [getData, isPageVisible]);

  const handleManualRefresh = () => {
    getData(true);
  };

  const navigateTo = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-slate-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px] opacity-50"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col min-h-screen">
        
        {!isOnline && (
            <div className="mb-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl flex items-center justify-center gap-2 animate-pulse text-sm font-bold">
                <WifiOff className="w-5 h-5" />
                <span>{t('error_offline')}</span>
            </div>
        )}
        
        <div className="hidden md:block mb-8">
            <AdUnit />
        </div>

        <Header 
            lastUpdated={lastUpdated} 
            sourceTime={ratesData?.time_last_update_utc || null}
            onRefresh={handleManualRefresh} 
            isLoading={loading} 
        />

        {currentView === 'home' ? (
             error && !ratesData ? (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 p-8 rounded-3xl text-center">
                   <p className="text-lg mb-4">{t('error_fetch')}</p>
                   <button 
                       onClick={handleManualRefresh}
                       className="px-6 py-2 bg-rose-600 hover:bg-rose-500 rounded-lg text-white transition-colors"
                   >
                       {t('retry')}
                   </button>
                </div>
           ) : (
               <>
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                       <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                            <Converter ratesData={ratesData} />
                            
                            <AdUnit />

                            <LiveRates ratesData={ratesData} baseCurrency="USD" />
                       </div>
                       <div className="lg:col-span-1">
                           <div className="lg:sticky lg:top-8 space-y-6 lg:space-y-8">
                               <Suspense fallback={<ComponentLoader />}>
                                  <RateChart ratesData={ratesData} />
                               </Suspense>
                               
                               <AdUnit format="rectangle" className="min-h-[250px]" />

                               <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border border-white/10 shadow-lg">
                                   <div className="flex items-center gap-2 mb-3 text-slate-200">
                                       <Cpu className="w-5 h-5 text-emerald-400" />
                                       <h4 className="font-bold">{t('system_mechanism')}</h4>
                                   </div>
                                   <p className="text-sm text-slate-400 leading-relaxed text-justify">
                                       {t('mechanism_desc')}
                                       <span className="block mt-2 text-emerald-400 font-medium">
                                           • {t('mech_point_1')}
                                       </span>
                                       <span className="block mt-1 text-emerald-400 font-medium">
                                           • {t('mech_point_2')}
                                       </span>
                                       <span className="flex items-center gap-2 mt-1 text-emerald-400 font-medium">
                                           • {t('mech_point_3')} <Globe className="w-4 h-4" />
                                       </span>
                                   </p>
                               </div>
                           </div>
                       </div>
                   </div>

                   <article className="mt-12 p-6 md:p-8 bg-slate-800/30 rounded-3xl border border-white/5">
                        <header className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-6 h-6 text-amber-400" />
                            <h2 className="text-xl md:text-2xl font-bold text-white">
                                {t('seo_article_title')}
                            </h2>
                        </header>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                            {t('seo_article_body')}
                        </p>
                   </article>
               </>
           )
        ) : (
            <Suspense fallback={<ComponentLoader />}>
                <LegalPages view={currentView} onBack={() => navigateTo('home')} />
            </Suspense>
        )}

        <Footer onNavigate={navigateTo} />
      </div>

      <CookieConsent />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;