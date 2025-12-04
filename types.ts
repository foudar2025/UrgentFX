export interface ExchangeRates {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  rates: { [key: string]: number };
}

export interface CurrencyInfo {
  code: string;
  flag: string;
  translations: { [langCode: string]: string };
}

// Helper to fill missing translations if needed
const t = (ar: string, en: string, fr: string, es: string, de: string, it: string, ru: string, zh: string, ja: string, tr: string) => ({
  ar, en, fr, es, de, it, ru, zh, ja, tr
});

export const POPULAR_CURRENCIES: CurrencyInfo[] = [
  { 
    code: 'USD', 
    flag: '🇺🇸', 
    translations: t('دولار أمريكي', 'US Dollar', 'Dollar américain', 'Dólar estadounidense', 'US-Dollar', 'Dollaro statunitense', 'Доллар США', '美元', '米ドル', 'ABD Doları') 
  },
  { 
    code: 'EUR', 
    flag: '🇪🇺', 
    translations: t('يورو', 'Euro', 'Euro', 'Euro', 'Euro', 'Euro', 'Евро', '欧元', 'ユーロ', 'Euro') 
  },
  { 
    code: 'GBP', 
    flag: '🇬🇧', 
    translations: t('جنيه إسترليني', 'British Pound', 'Livre sterling', 'Libra esterlina', 'Britisches Pfund', 'Sterlina britannica', 'Британский фунт', '英镑', '英ポンド', 'İngiliz Sterlini') 
  },
  { 
    code: 'JPY', 
    flag: '🇯🇵', 
    translations: t('ين ياباني', 'Japanese Yen', 'Yen japonais', 'Yen japonés', 'Japanischer Yen', 'Yen giapponese', 'Японская иена', '日元', '日本円', 'Japon Yeni') 
  },
  { 
    code: 'CHF', 
    flag: '🇨🇭', 
    translations: t('فرنك سويسري', 'Swiss Franc', 'Franc suisse', 'Franco suizo', 'Schweizer Franken', 'Franco svizzero', 'Швейцарский франк', '瑞士法郎', 'スイスフラン', 'İsviçre Frangı') 
  },
  { 
    code: 'CAD', 
    flag: '🇨🇦', 
    translations: t('دولار كندي', 'Canadian Dollar', 'Dollar canadien', 'Dólar canadiense', 'Kanadischer Dollar', 'Dollaro canadese', 'Канадский доллар', '加元', 'カナダドル', 'Kanada Doları') 
  },
  { 
    code: 'AUD', 
    flag: '🇦🇺', 
    translations: t('دولار أسترالي', 'Australian Dollar', 'Dollar australien', 'Dólar australiano', 'Australischer Dollar', 'Dollaro australiano', 'Австралийский доллар', '澳元', '豪ドル', 'Avustralya Doları') 
  },
  { 
    code: 'CNY', 
    flag: '🇨🇳', 
    translations: t('يوان صيني', 'Chinese Yuan', 'Yuan chinois', 'Yuan chino', 'Chinesischer Yuan', 'Yuan cinese', 'Китайский юань', '人民币', '中国人民元', 'Çin Yuanı') 
  },
  { 
    code: 'SAR', 
    flag: '🇸🇦', 
    translations: t('ريال سعودي', 'Saudi Riyal', 'Riyal saoudien', 'Riyal saudí', 'Saudi-Riyal', 'Riyal saudita', 'Саудовский риял', '沙特里亚尔', 'サウジアラビアリヤル', 'Suudi Arabistan Riyali') 
  },
  { 
    code: 'AED', 
    flag: '🇦🇪', 
    translations: t('درهم إماراتي', 'UAE Dirham', 'Dirham des Émirats', 'Dírham de los EAU', 'VAE-Dirham', 'Dirham degli EAU', 'Дирхам ОАЭ', '阿联酋迪拉姆', 'UAEディルハム', 'BAE Dirhemi') 
  },
  { 
    code: 'KWD', 
    flag: '🇰🇼', 
    translations: t('دينار كويتي', 'Kuwaiti Dinar', 'Dinar koweïtien', 'Dinar kuwaití', 'Kuwait-Dinar', 'Dinaro kuwaitiano', 'Кувейтский динар', '科威特第纳尔', 'クウェートディナール', 'Kuveyt Dinarı') 
  },
  { 
    code: 'QAR', 
    flag: '🇶🇦', 
    translations: t('ريال قطري', 'Qatari Riyal', 'Riyal qatari', 'Riyal qatarí', 'Katar-Riyal', 'Riyal del Qatar', 'Катарский риал', '卡塔尔里亚尔', 'カタールリヤル', 'Katar Riyali') 
  },
  { 
    code: 'BHD', 
    flag: '🇧🇭', 
    translations: t('دينار بحريني', 'Bahraini Dinar', 'Dinar bahreïni', 'Dinar bahreiní', 'Bahrain-Dinar', 'Dinaro del Bahrein', 'Бахрейнский динар', '巴林第纳尔', 'バーレーンディナール', 'Bahreyn Dinarı') 
  },
  { 
    code: 'OMR', 
    flag: '🇴🇲', 
    translations: t('ريال عماني', 'Omani Rial', 'Rial omanais', 'Rial omaní', 'Omanischer Rial', 'Rial dell\'Oman', 'Оманский риал', '阿曼里亚尔', 'オマーンリアル', 'Umman Riyali') 
  },
  { 
    code: 'EGP', 
    flag: '🇪🇬', 
    translations: t('جنيه مصري', 'Egyptian Pound', 'Livre égyptienne', 'Libra egipcia', 'Ägyptisches Pfund', 'Sterlina egiziana', 'Египетский фунт', '埃及镑', 'エジプトポンド', 'Mısır Lirası') 
  },
  { 
    code: 'JOD', 
    flag: '🇯🇴', 
    translations: t('دينار أردني', 'Jordanian Dinar', 'Dinar jordanien', 'Dinar jordano', 'Jordanischer Dinar', 'Dinaro giordano', 'Иорданский динар', '约旦第纳尔', 'ヨルダンディナール', 'Ürdün Dinarı') 
  },
  { 
    code: 'TRY', 
    flag: '🇹🇷', 
    translations: t('ليرة تركية', 'Turkish Lira', 'Lire turque', 'Lira turca', 'Türkische Lira', 'Lira turca', 'Турецкая лира', '土耳其里拉', 'トルコリラ', 'Türk Lirası') 
  },
  { 
    code: 'INR', 
    flag: '🇮🇳', 
    translations: t('روبية هندية', 'Indian Rupee', 'Roupie indienne', 'Rupia india', 'Indische Rupie', 'Rupia indiana', 'Индийская рупия', '印度卢比', 'インドルピー', 'Hindistan Rupisi') 
  },
  { 
    code: 'RUB', 
    flag: '🇷🇺', 
    translations: t('روبل روسي', 'Russian Ruble', 'Rouble russe', 'Rublo ruso', 'Russischer Rubel', 'Rublo russo', 'Российский рубль', '俄罗斯卢布', 'ロシアルーブル', 'Rus Rublesi') 
  },
  { 
    code: 'KRW', 
    flag: '🇰🇷', 
    translations: t('وون كوري جنوبي', 'South Korean Won', 'Won sud-coréen', 'Won surcoreano', 'Südkoreanischer Won', 'Won sudcoreano', 'Южнокорейская вона', '韩元', '韓国ウォン', 'Güney Kore Wonu') 
  },
  { 
    code: 'BRL', 
    flag: '🇧🇷', 
    translations: t('ريال برازيلي', 'Brazilian Real', 'Réal brésilien', 'Real brasileño', 'Brasilianischer Real', 'Real brasiliano', 'Бразильский реал', '巴西雷亚尔', 'ブラジルレアル', 'Brezilya Reali') 
  },
  { 
    code: 'MXN', 
    flag: '🇲🇽', 
    translations: t('بيزو مكسيكي', 'Mexican Peso', 'Peso mexicain', 'Peso mexicano', 'Mexikanischer Peso', 'Peso messicano', 'Мексиканское песо', '墨西哥比索', 'メキシコペソ', 'Meksika Pesosu') 
  },
  { 
    code: 'IDR', 
    flag: '🇮🇩', 
    translations: t('روبية إندونيسية', 'Indonesian Rupiah', 'Roupie indonésienne', 'Rupia indonesia', 'Indonesische Rupiah', 'Rupia indonesiana', 'Индонезийская рупия', '印尼盾', 'インドネシアルピア', 'Endonezya Rupiahı') 
  },
  { 
    code: 'SEK', 
    flag: '🇸🇪', 
    translations: t('كرونة سويدية', 'Swedish Krona', 'Couronne suédoise', 'Corona sueca', 'Schwedische Krone', 'Corona svedese', 'Шведская крона', '瑞典克朗', 'スウェーデンクローナ', 'İsveç Kronu') 
  }
];