import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
];

export type LanguageCode = string;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  formatNumber: (num: number, digits?: number) => string;
  currentDir: 'rtl' | 'ltr';
}

const uiTranslations: Record<string, Record<string, string>> = {
  ar: {
    app_title: "UrgentFX",
    seo_page_title: "UrgentFX | أسعار العملات العاجل ومحول العملات المباشر",
    seo_meta_desc: "UrgentFX: تابع أسعار العملات اليوم لحظة بلحظة. أفضل محول عملات دقيق لجميع العملات العالمية (الدولار، اليورو، الريال). تحديث فوري من الأسواق المالية.",
    seo_keywords: "UrgentFX, أسعار العملات, محول العملات, سعر الدولار اليوم, تحويل عملات, أسعار الصرف, فوركس, تداول, ريال سعودي, دولار أمريكي",
    seo_h1: "UrgentFX: أسعار العملات العاجل",
    seo_h2_converter: "محول العملات الفوري",
    seo_h2_rates: "جدول أسعار الصرف الحية",
    seo_h2_chart: "الرسم البياني لأداء العملات",
    seo_article_title: "لماذا يعد UrgentFX خيارك الأفضل؟",
    seo_article_body: "في عالم المال المتسارع، الحصول على سعر الصرف الدقيق هو مفتاح النجاح. يوفر UrgentFX بيانات حية من البنوك المركزية والأسواق العالمية، مما يجعله الأداة المثالية للمسافرين والمستثمرين. سواء كنت تريد تحويل الدولار إلى ريال أو اليورو إلى دولار، فإن أدواتنا توفر لك الدقة والسرعة.",
    // existing
    real_market_data: "بيانات سوق عالمية",
    premium_data: "المعيار الذهبي",
    source_time: "توقيت البورصة",
    system_check: "آخر تحديث للنظام",
    loading: "جاري التحميل...",
    convert_title: "محول العملات العالمي",
    amount_currency: "المبلغ والعملة",
    equivalent: "يعادل",
    current_rate: "سعر الإغلاق اللحظي",
    market_rates_title: "مؤشرات السوق العالمية",
    vs_usd: "مقابل",
    chart_title: "تحليل العملات الرئيسية",
    chart_subtitle: "مؤشر الأداء مقابل الدولار (USD)",
    system_mechanism: "البنية التحتية للنظام",
    mechanism_desc: "يستند نظام UrgentFX إلى بروتوكولات بيانات مالية متقدمة متصلة مباشرة بمراكز الصرف العالمية (Global Exchange Centers).",
    mech_point_1: "تغطية شاملة للأسواق العالمية.",
    mech_point_2: "دقة متناهية في نقل الأسعار.",
    mech_point_3: "بنية تحتية عالية الموثوقية.",
    copyright: "جميع الحقوق محفوظة - شبكة UrgentFX",
    error_offline: "انقطع الاتصال بخوادم البيانات.",
    error_fetch: "تعذر جلب أحدث المؤشرات.",
    retry: "إعادة الاتصال",
    exchange_rate_label: "سعر الصرف",
    trust_quote: "UrgentFX: نقدم بيانات مالية حقيقية وموثوقة بنسبة 100%، تُحدّث لحظياً من قلب الأسواق المالية العالمية لضمان أعلى دقة.",
    footer_desc: "UrgentFX: بوابتك الموثوقة للأسواق المالية العالمية. نوفر أسعار صرف لحظية دقيقة، وأدوات تحويل عملات متطورة، وتحليلات سوق حية لمساعدتك في اتخاذ قرارات استثمارية ومالية صائبة.",
    privacy_policy: "سياسة الخصوصية",
    terms_of_service: "شروط الخدمة",
    about_us: "من نحن",
    contact_us: "اتصل بنا",
    cookie_message: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتقديم إعلانات مخصصة. استمرارك في التصفح يعني موافقتك.",
    accept_cookies: "موافق",
    ad_space: "مساحة إعلانية",
    sponsored: "برعاية",
    home: "الرئيسية"
  },
  en: {
    app_title: "UrgentFX",
    seo_page_title: "UrgentFX | Live Currency Rates & Global Converter",
    seo_meta_desc: "UrgentFX: Track live currency exchange rates instantly. The most accurate global currency converter (USD, EUR, GBP). Real-time charts and instant market updates.",
    seo_keywords: "UrgentFX, currency rates, currency converter, exchange rates, live fx, dollar rate, euro to dollar, forex, money converter",
    seo_h1: "UrgentFX: Live Currency Exchange",
    seo_h2_converter: "Instant Currency Converter",
    seo_h2_rates: "Live Exchange Rates Table",
    seo_h2_chart: "Currency Performance Chart",
    seo_article_title: "Why Choose UrgentFX?",
    seo_article_body: "In the fast-paced financial world, accurate exchange rates are key. UrgentFX provides live data from central banks and global markets, making it the perfect tool for travelers and investors. Whether converting USD to EUR or GBP to USD, our tools offer precision and speed.",
    // existing
    real_market_data: "Global Market Data",
    premium_data: "Gold Standard",
    source_time: "Market Time",
    system_check: "Last Update",
    loading: "Loading...",
    convert_title: "Global Currency Converter",
    amount_currency: "Amount & Currency",
    equivalent: "Equivalent To",
    current_rate: "Live Closing Rate",
    market_rates_title: "Global Market Indices",
    vs_usd: "Against",
    chart_title: "Major Currency Analysis",
    chart_subtitle: "Performance Index vs USD",
    system_mechanism: "System Infrastructure",
    mechanism_desc: "The UrgentFX system is based on advanced financial data protocols directly connected to Global Exchange Centers.",
    mech_point_1: "Comprehensive global market coverage.",
    mech_point_2: "Extreme precision in rate transmission.",
    mech_point_3: "High-reliability infrastructure.",
    copyright: "All Rights Reserved - UrgentFX Network",
    error_offline: "Connection to data servers lost.",
    error_fetch: "Failed to fetch latest indices.",
    retry: "Reconnect",
    exchange_rate_label: "Exchange Rate",
    trust_quote: "UrgentFX: We provide 100% real and reliable financial data, updated instantaneously from the heart of global financial markets.",
    footer_desc: "UrgentFX: Your trusted gateway to global financial markets. We provide accurate real-time exchange rates, advanced currency conversion tools, and live market analytics to help you make smart investment and financial decisions.",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    about_us: "About Us",
    contact_us: "Contact Us",
    cookie_message: "We use cookies to improve your experience and serve personalized ads. By continuing, you agree to our use of cookies.",
    accept_cookies: "Accept",
    ad_space: "Ad Space",
    sponsored: "Sponsored",
    home: "Home"
  },
  fr: {
    app_title: "UrgentFX",
    seo_page_title: "UrgentFX | Taux de Change Urgents & Convertisseur",
    seo_meta_desc: "UrgentFX: Suivez les taux de change en direct. Convertisseur de devises précis (Euro, Dollar). Graphiques en temps réel et mises à jour instantanées.",
    seo_keywords: "UrgentFX, taux de change, convertisseur devises, euro dollar, bourse, forex, taux change direct",
    seo_h1: "UrgentFX: Taux de Change Direct",
    seo_h2_converter: "Convertisseur de Devises Instantané",
    seo_h2_rates: "Tableau des Taux de Change",
    seo_h2_chart: "Graphique de Performance",
    seo_article_title: "Le Meilleur Outil: UrgentFX",
    seo_article_body: "Dans le monde financier rapide, obtenir le taux de change exact est la clé du succès. UrgentFX fournit des données en direct des banques centrales et des marchés mondiaux.",
    // existing
    real_market_data: "Données du Marché",
    premium_data: "Standard Or",
    source_time: "Heure du Marché",
    system_check: "Dernière Mise à Jour",
    loading: "Chargement...",
    convert_title: "Convertisseur Universel",
    amount_currency: "Montant et Devise",
    equivalent: "Équivalent À",
    current_rate: "Taux de Clôture",
    market_rates_title: "Indices du Marché",
    vs_usd: "Contre",
    chart_title: "Analyse des Devises",
    chart_subtitle: "Indice vs USD",
    system_mechanism: "Infrastructure",
    mechanism_desc: "Système UrgentFX basé sur des protocoles de données financières avancés connectés aux Centres d'Échange Mondiaux.",
    mech_point_1: "Couverture complète du marché mondial.",
    mech_point_2: "Précision extrême des taux.",
    mech_point_3: "Infrastructure haute fiabilité.",
    copyright: "Tous droits réservés",
    error_offline: "Connexion perdue.",
    error_fetch: "Échec de la récupération.",
    retry: "Se reconnecter",
    exchange_rate_label: "Taux de Change",
    trust_quote: "UrgentFX: Nous fournissons des données financières 100 % réelles et fiables, mises à jour instantanément.",
    footer_desc: "UrgentFX: Votre passerelle de confiance vers les marchés financiers mondiaux. Nous fournissons des taux de change précis en temps réel.",
    privacy_policy: "Politique de Confidentialité",
    terms_of_service: "Conditions d'Utilisation",
    about_us: "À Propos",
    contact_us: "Contactez-nous",
    cookie_message: "Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation.",
    accept_cookies: "Accepter",
    ad_space: "Espace Publicitaire",
    sponsored: "Sponsorisé",
    home: "Accueil"
  },
  es: {
    app_title: "UrgentFX",
    seo_page_title: "UrgentFX | Tasas de Cambio Urgentes y Conversor",
    seo_meta_desc: "UrgentFX: Tasas de cambio en vivo y conversor de moneda global. Precios del dólar y euro actualizados. Gráficos financieros y datos de mercado precisos.",
    seo_keywords: "UrgentFX, cambio de divisas, conversor moneda, precio dolar, tipo de cambio, forex, finanzas",
    seo_h1: "UrgentFX: Cambio de Divisas Vivo",
    seo_h2_converter: "Conversor de Moneda Instantáneo",
    seo_h2_rates: "Tabla de Tipos de Cambio",
    seo_h2_chart: "Gráfico de Rendimiento",
    seo_article_title: "Líder en Información: UrgentFX",
    seo_article_body: "En el vertiginoso mundo financiero, obtener el tipo de cambio exacto es clave para el éxito. UrgentFX proporciona datos en vivo de bancos centrales y mercados globales.",
    // existing
    real_market_data: "Datos de Mercado",
    premium_data: "Estándar de Oro",
    source_time: "Hora del Mercado",
    system_check: "Última Actualización",
    loading: "Cargando...",
    convert_title: "Conversor Global",
    amount_currency: "Cantidad y Divisa",
    equivalent: "Equivalente A",
    current_rate: "Tasa de Cierre",
    market_rates_title: "Índices Globales",
    vs_usd: "Contra",
    chart_title: "Análisis de Divisas",
    chart_subtitle: "Índice vs USD",
    system_mechanism: "Infraestructura",
    mechanism_desc: "Sistema UrgentFX basado en protocolos de datos financieros avanzados conectados a Centros de Intercambio Globales.",
    mech_point_1: "Cobertura global del mercado.",
    mech_point_2: "Precisión extrema en las tasas.",
    mech_point_3: "Infraestructura de alta fiabilidad.",
    copyright: "Todos los derechos reservados",
    error_offline: "Conexión perdida.",
    error_fetch: "Error al recuperar datos.",
    retry: "Reconectar",
    exchange_rate_label: "Tasa de Cambio",
    trust_quote: "UrgentFX: Proporcionamos datos financieros 100% reales y fiables, actualizados instantáneamente.",
    footer_desc: "UrgentFX: Su puerta de entrada confiable a los mercados financieros globales. Ofrecemos tasas de cambio precisas en tiempo real.",
    privacy_policy: "Política de Privacidad",
    terms_of_service: "Términos de Servicio",
    about_us: "Sobre Nosotros",
    contact_us: "Contáctenos",
    cookie_message: "Usamos cookies para mejorar su experiencia. Al continuar, acepta nuestro uso de cookies.",
    accept_cookies: "Aceptar",
    ad_space: "Espacio Publicitario",
    sponsored: "Patrocinado",
    home: "Inicio"
  },
  de: {
    app_title: "UrgentFX",
    seo_page_title: "UrgentFX | Dringende Wechselkurse & Rechner",
    seo_meta_desc: "UrgentFX: Aktuelle Wechselkurse in Echtzeit. Präziser Währungsrechner für Euro, Dollar und mehr. Live-Charts und Finanzdaten.",
    seo_keywords: "UrgentFX, wechselkurse, währungsrechner, euro dollar kurs, devisen, forex, wechselkursrechner",
    seo_h1: "UrgentFX: Live-Wechselkurse",
    seo_h2_converter: "Sofortiger Währungsrechner",
    seo_h2_rates: "Aktuelle Wechselkurstabelle",
    seo_h2_chart: "Währungsdiagramm",
    seo_article_title: "Ihre Quelle für Finanzdaten",
    seo_article_body: "In der schnelllebigen Finanzwelt ist der genaue Wechselkurs der Schlüssel zum Erfolg. UrgentFX liefert Live-Daten von Zentralbanken und globalen Märkten.",
    // existing
    real_market_data: "Marktdaten",
    premium_data: "Goldstandard",
    source_time: "Marktzeit",
    system_check: "Letztes Update",
    loading: "Laden...",
    convert_title: "Währungsumrechner",
    amount_currency: "Betrag & Währung",
    equivalent: "Entspricht",
    current_rate: "Schlusskurs",
    market_rates_title: "Marktindizes",
    vs_usd: "Gegen",
    chart_title: "Währungsanalyse",
    chart_subtitle: "Index vs USD",
    system_mechanism: "Infrastruktur",
    mechanism_desc: "Dieses System basiert auf fortschrittlichen Finanzdatenprotokollen.",
    mech_point_1: "Umfassende globale Marktabdeckung.",
    mech_point_2: "Extreme Präzision bei Kursen.",
    mech_point_3: "Hochzuverlässige Infrastruktur.",
    copyright: "Alle Rechte vorbehalten",
    error_offline: "Verbindung unterbrochen.",
    error_fetch: "Abruf fehlgeschlagen.",
    retry: "Erneut versuchen",
    exchange_rate_label: "Wechselkurs",
    trust_quote: "UrgentFX: Wir bieten 100% echte und zuverlässige Finanzdaten, die sofort aktualisiert werden.",
    footer_desc: "UrgentFX: Ihr vertrauenswürdiges Tor zu den globalen Finanzmärkten. Wir bieten präzise Echtzeit-Wechselkurse.",
    privacy_policy: "Datenschutz",
    terms_of_service: "Nutzungsbedingungen",
    about_us: "Über Uns",
    contact_us: "Kontakt",
    cookie_message: "Wir verwenden Cookies. Durch die Nutzung stimmen Sie dem zu.",
    accept_cookies: "Akzeptieren",
    ad_space: "Werbung",
    sponsored: "Gesponsert",
    home: "Startseite"
  },
  it: { 
    app_title: "UrgentFX", 
    seo_page_title: "UrgentFX | Tassi di Cambio Urgenti & Convertitore",
    seo_meta_desc: "UrgentFX: Tassi di cambio in tempo reale. Convertitore di valuta preciso (Euro, Dollaro). Grafici forex e aggiornamenti di mercato.",
    seo_keywords: "UrgentFX, tassi cambio, convertitore valuta, cambio euro dollaro, forex, borsa, valute",
    seo_h1: "UrgentFX: Tassi di Cambio Live",
    seo_h2_converter: "Convertitore Valuta Istantaneo",
    seo_h2_rates: "Tabella Tassi di Cambio",
    seo_h2_chart: "Grafico Andamento",
    seo_article_title: "Precisione nei Mercati",
    seo_article_body: "Nel frenetico mondo finanziario, ottenere il tasso di cambio esatto è la chiave del successo. UrgentFX fornisce dati in tempo reale.",
    // existing
    real_market_data: "Dati di Mercato", 
    premium_data: "Standard Aureo", 
    source_time: "Ora del Mercato", 
    system_check: "Ultimo Aggiornamento", 
    loading: "Caricamento...", 
    convert_title: "Convertitore Valuta", 
    amount_currency: "Importo", 
    equivalent: "Equivalente", 
    current_rate: "Tasso Attuale", 
    market_rates_title: "Indici di Mercato", 
    vs_usd: "Contro", 
    chart_title: "Analisi Valutaria", 
    chart_subtitle: "Indice vs USD", 
    system_mechanism: "Infrastruttura", 
    mechanism_desc: "Protocolli finanziari avanzati.", 
    mech_point_1: "Copertura globale del mercato.",
    mech_point_2: "Precisione estrema dei tassi.",
    mech_point_3: "Infrastruttura ad alta affidabilità.",
    copyright: "Tutti i diritti riservati", 
    error_offline: "Offline", 
    error_fetch: "Errore", 
    retry: "Riprova", 
    exchange_rate_label: "Tasso", 
    trust_quote: "UrgentFX: Dati finanziari 100% reali e affidabili.",
    footer_desc: "UrgentFX: La tua porta di accesso affidabile ai mercati finanziari globali.",
    privacy_policy: "Privacy",
    terms_of_service: "Termini",
    about_us: "Chi Siamo",
    contact_us: "Contatti",
    cookie_message: "Utilizziamo i cookie. Continuando, accetti.",
    accept_cookies: "Accetta",
    ad_space: "Pubblicità",
    sponsored: "Sponsorizzato",
    home: "Home"
  },
  ru: { 
    app_title: "UrgentFX", 
    seo_page_title: "UrgentFX | Срочные Курсы Валют и Конвертер",
    seo_meta_desc: "UrgentFX: Курсы валют онлайн в реальном времени. Точный конвертер валют (Доллар, Евро, Рубль). Графики Форекс и новости рынка.",
    seo_keywords: "UrgentFX, курсы валют, конвертер валют, курс доллара, курс евро, обмен валют, форекс",
    seo_h1: "UrgentFX: Курсы Валют Онлайн",
    seo_h2_converter: "Мгновенный Конвертер Валют",
    seo_h2_rates: "Таблица Курсов Валют",
    seo_h2_chart: "График Динамики Валют",
    seo_article_title: "Надежные Финансовые Данные",
    seo_article_body: "В быстро меняющемся финансовом мире точный обменный курс - ключ к успеху. UrgentFX предоставляет данные в реальном времени.",
    // existing
    real_market_data: "Рыночные Данные", 
    premium_data: "Золотой Стандарт", 
    source_time: "Время Рынка", 
    system_check: "Обновление", 
    loading: "Загрузка...", 
    convert_title: "Конвертер Валют", 
    amount_currency: "Сумма", 
    equivalent: "Эквивалент", 
    current_rate: "Текущий Курс", 
    market_rates_title: "Рыночные Индексы", 
    vs_usd: "Против", 
    chart_title: "Анализ Валют", 
    chart_subtitle: "Индекс к USD", 
    system_mechanism: "Инфраструктура", 
    mechanism_desc: "Передовые финансовые протоколы.", 
    mech_point_1: "Глобальный охват рынка.",
    mech_point_2: "Высокая точность курсов.",
    mech_point_3: "Надежная инфраструктура.",
    copyright: "Все права защищены", 
    error_offline: "Нет сети", 
    error_fetch: "Ошибка", 
    retry: "Повтор", 
    exchange_rate_label: "Курс", 
    trust_quote: "UrgentFX: 100% реальные и надежные финансовые данные.",
    footer_desc: "UrgentFX: Ваш надежный шлюз к мировым финансовым рынкам.",
    privacy_policy: "Конфиденциальность",
    terms_of_service: "Условия",
    about_us: "О нас",
    contact_us: "Контакты",
    cookie_message: "Мы используем файлы cookie. Продолжая, вы соглашаетесь.",
    accept_cookies: "Принять",
    ad_space: "Реклама",
    sponsored: "Спонсор",
    home: "Главная"
  },
  zh: { 
    app_title: "UrgentFX", 
    seo_page_title: "UrgentFX | 紧急汇率与实时转换器",
    seo_meta_desc: "UrgentFX: 即时追踪实时汇率。精确的全球货币转换器（美元、欧元、人民币）。实时图表和市场更新。",
    seo_keywords: "UrgentFX, 汇率, 货币转换器, 美元汇率, 实时汇率, 外汇, 兑换",
    seo_h1: "UrgentFX: 实时汇率查询",
    seo_h2_converter: "即时货币转换器",
    seo_h2_rates: "实时汇率表",
    seo_h2_chart: "货币走势图",
    seo_article_title: "您的首选汇率工具",
    seo_article_body: "在瞬息万变的金融世界中，获得准确的汇率是成功的关键。UrgentFX 提供来自中央银行和全球市场的实时数据。",
    // existing
    real_market_data: "全球市场数据", 
    premium_data: "黄金标准", 
    source_time: "市场时间", 
    system_check: "最后更新", 
    loading: "加载中...", 
    convert_title: "全球货币转换器", 
    amount_currency: "金额和货币", 
    equivalent: "相当于", 
    current_rate: "实时收盘汇率", 
    market_rates_title: "全球市场指数", 
    vs_usd: "兑美元", 
    chart_title: "主要货币分析", 
    chart_subtitle: "表现指数", 
    system_mechanism: "系统基础设施", 
    mechanism_desc: "基于连接全球交易中心的先进金融数据协议。", 
    mech_point_1: "全球市场全面覆盖。",
    mech_point_2: "汇率传输极其精准。",
    mech_point_3: "高可靠性基础设施。",
    copyright: "版权所有", 
    error_offline: "连接丢失", 
    error_fetch: "获取失败", 
    retry: "重连", 
    exchange_rate_label: "汇率", 
    trust_quote: "UrgentFX: 我们提供100%真实可靠的金融数据，实时更新。",
    footer_desc: "UrgentFX: 您通往全球金融市场的可信门户。",
    privacy_policy: "隐私政策",
    terms_of_service: "服务条款",
    about_us: "关于我们",
    contact_us: "联系我们",
    cookie_message: "我们使用 cookie。继续即表示您同意。",
    accept_cookies: "接受",
    ad_space: "广告位",
    sponsored: "赞助",
    home: "首页"
  },
  ja: { 
    app_title: "UrgentFX", 
    seo_page_title: "UrgentFX | 緊急為替レート & リアルタイム換算",
    seo_meta_desc: "UrgentFX: リアルタイムの為替レートを瞬時に確認。正確な通貨換算ツール（ドル、ユーロ、円）。ライブチャートと市場ニュース。",
    seo_keywords: "UrgentFX, 為替レート, 通貨換算, ドル円, 外国為替, FX, リアルタイムレート",
    seo_h1: "UrgentFX: リアルタイム為替レート",
    seo_h2_converter: "インスタント通貨換算",
    seo_h2_rates: "為替レート一覧",
    seo_h2_chart: "通貨パフォーマンスチャート",
    seo_article_title: "最も正確な為替アプリ",
    seo_article_body: "動きの速い金融の世界では、正確な為替レートを知ることが成功の鍵です。UrgentFXは中央銀行や世界市場からのリアルタイムデータを提供します。",
    // existing
    real_market_data: "市場データ", 
    premium_data: "ゴールドスタンダード", 
    source_time: "市場時間", 
    system_check: "最終更新", 
    loading: "読み込み中...", 
    convert_title: "通貨コンバーター", 
    amount_currency: "金額と通貨", 
    equivalent: "相当", 
    current_rate: "現在レート", 
    market_rates_title: "市場指数", 
    vs_usd: "対USD", 
    chart_title: "通貨分析", 
    chart_subtitle: "パフォーマンス", 
    system_mechanism: "インフラ", 
    mechanism_desc: "高度な金融データプロトコル。", 
    mech_point_1: "包括的な世界市場カバレッジ。",
    mech_point_2: "極めて正確なレート伝送。",
    mech_point_3: "高信頼性インフラ。",
    copyright: "全著作権所有", 
    error_offline: "オフライン", 
    error_fetch: "エラー", 
    retry: "再試行", 
    exchange_rate_label: "為替レート", 
    trust_quote: "UrgentFX: 100%リアルで信頼性の高い金融データを提供します。",
    footer_desc: "UrgentFX: 世界の金融市場への信頼できるゲートウェイ。",
    privacy_policy: "プライバシーポリシー",
    terms_of_service: "利用規約",
    about_us: "私たちについて",
    contact_us: "お問い合わせ",
    cookie_message: "クッキーを使用しています。続行することで同意したものとみなされます。",
    accept_cookies: "同意する",
    ad_space: "広告スペース",
    sponsored: "スポンサー",
    home: "ホーム"
  },
  tr: { 
    app_title: "UrgentFX", 
    seo_page_title: "UrgentFX | Acil Döviz Kurları ve Çevirici",
    seo_meta_desc: "UrgentFX: Canlı döviz kurlarını anında takip edin. Hassas döviz çevirici (Dolar, Euro, TL). Gerçek zamanlı grafikler ve piyasa verileri.",
    seo_keywords: "UrgentFX, döviz kurları, döviz çevirici, dolar kuru, euro kuru, canlı borsa, forex",
    seo_h1: "UrgentFX: Canlı Döviz Borsası",
    seo_h2_converter: "Anlık Döviz Çevirici",
    seo_h2_rates: "Canlı Döviz Tablosu",
    seo_h2_chart: "Döviz Performans Grafiği",
    seo_article_title: "Neden UrgentFX?",
    seo_article_body: "Hızlı hareket eden finans dünyasında, kesin döviz kurunu almak başarının anahtarıdır. UrgentFX, merkez bankalarından ve küresel piyasalardan canlı veriler sunar.",
    // existing
    real_market_data: "Piyasa Verileri", 
    premium_data: "Altın Standart", 
    source_time: "Piyasa Saati", 
    system_check: "Son Güncelleme", 
    loading: "Yükleniyor...", 
    convert_title: "Döviz Çevirici", 
    amount_currency: "Miktar", 
    equivalent: "Eşdeğer", 
    current_rate: "Canlı Kur", 
    market_rates_title: "Piyasa Endeksleri", 
    vs_usd: "Karşı", 
    chart_title: "Döviz Analizi", 
    chart_subtitle: "Endeks vs USD", 
    system_mechanism: "Altyapı", 
    mechanism_desc: "Gelişmiş finansal veri protokolleri.", 
    mech_point_1: "Kapsamlı küresel pazar.",
    mech_point_2: "Kurlarda kesin doğruluk.",
    mech_point_3: "Yüksek güvenilirlikli altyapı.",
    copyright: "Tüm hakları saklıdır", 
    error_offline: "Çevrimdışı", 
    error_fetch: "Hata", 
    retry: "Tekrar Dene", 
    exchange_rate_label: "Kur", 
    trust_quote: "UrgentFX: %100 gerçek ve güvenilir finansal veriler sağlıyoruz.",
    footer_desc: "UrgentFX: Küresel finans piyasalarına açılan güvenilir kapınız.",
    privacy_policy: "Gizlilik Politikası",
    terms_of_service: "Hizmet Şartları",
    about_us: "Hakkımızda",
    contact_us: "İletişim",
    cookie_message: "Çerez kullanıyoruz. Devam ederek kabul etmiş olursunuz.",
    accept_cookies: "Kabul Et",
    ad_space: "Reklam Alanı",
    sponsored: "Sponsorlu",
    home: "Ana Sayfa"
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Set default language to 'en' (English)
  const [language, setLanguageState] = useState<LanguageCode>('en');

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const t = (key: string) => {
    return uiTranslations[language]?.[key] || uiTranslations['en']?.[key] || key;
  };

  // SEO Injection Logic
  useEffect(() => {
    // 1. Basic HTML Attributes
    document.documentElement.lang = language;
    document.documentElement.dir = currentLangObj.dir;

    // 2. Dynamic Title
    document.title = t('seo_page_title');

    // 3. Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', t('seo_meta_desc'));

    // 4. Dynamic Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', t('seo_keywords'));

    // 5. Dynamic Canonical Tag & Hreflang Tags
    // This is vital for multi-language SEO to avoid duplicate content penalties
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
    }
    // We update canonical to the current URL.
    linkCanonical.setAttribute('href', window.location.origin + window.location.pathname);

    // Hreflang Logic: Remove old ones first to avoid duplication on re-render
    const oldHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    oldHreflangs.forEach(el => el.remove());

    // Add new Hreflang tags
    // Since this is a SPA without separate URLs for languages (yet), we point them to the root
    // In a production SSR environment, these would point to /en, /ar, etc.
    // For now, we signal to Google that we support these languages.
    LANGUAGES.forEach(lang => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang.code);
        // Assuming query param support might be added later, or just base URL for now
        link.setAttribute('href', window.location.origin + window.location.pathname + '?lang=' + lang.code);
        document.head.appendChild(link);
    });
    
    // Add x-default
    const linkDefault = document.createElement('link');
    linkDefault.setAttribute('rel', 'alternate');
    linkDefault.setAttribute('hreflang', 'x-default');
    linkDefault.setAttribute('href', window.location.origin + window.location.pathname);
    document.head.appendChild(linkDefault);


    // 6. JSON-LD Structured Data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": t('app_title'),
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": t('seo_meta_desc'),
        "featureList": "Currency Converter, Live Exchange Rates, Forex Charts"
    };

    let scriptTag = document.getElementById('seo-json-ld');
    if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'seo-json-ld';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
    // 7. Open Graph Dynamic Updates
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if(ogTitle) ogTitle.setAttribute('content', t('seo_page_title'));
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if(ogDesc) ogDesc.setAttribute('content', t('seo_meta_desc'));

    const ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if(ogSiteName) ogSiteName.setAttribute('content', t('app_title'));

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if(ogLocale) ogLocale.setAttribute('content', language === 'en' ? 'en_US' : `${language}_${language.toUpperCase()}`);

  }, [language, currentLangObj]);

  const formatNumber = (num: number, digits: number = 2) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
      useGrouping: true
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatNumber, currentDir: currentLangObj.dir as 'rtl' | 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};