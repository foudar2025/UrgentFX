import React from 'react';
import { Shield, FileText, Info, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalPagesProps {
  view: 'privacy' | 'terms' | 'about' | 'contact';
  onBack: () => void;
}

const LegalPages: React.FC<LegalPagesProps> = ({ view, onBack }) => {
  const { t, language, currentDir } = useLanguage();

  // Helper function to generate content structure for other languages based on the English template but with translated strings
  // Note: In a full production app, these would be in separate JSON files. Here we ensure they are present.
  
  const content: Record<string, any> = {
    en: {
      privacy: {
        intro: "At <strong>Urgent Currency Rates</strong>, we prioritize the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by our app and how we use it.",
        sections: [
           { title: "Log Files", text: "We follow a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes IP addresses, browser type, ISP, date/time stamp, referring/exit pages, and possibly the number of clicks." },
           { title: "Cookies and Web Beacons", text: "Like any other website, we use 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited." },
           { title: "Google DoubleClick DART Cookie", text: "Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors." }
        ]
      },
      terms: {
        intro: "By accessing this application, you agree to be bound by these Terms and Conditions of Use.",
        sections: [
            { title: "1. Disclaimer", text: "The materials on <strong>Urgent Currency Rates</strong> are provided 'as is'. We make no warranties, expressed or implied." },
            { title: "2. Limitations", text: "In no event shall we or our suppliers be liable for any damages arising out of the use or inability to use the materials on our app." }
        ],
        disclaimer: "<strong>Financial Disclaimer:</strong> Data provided is for informational purposes only and should not be considered as financial advice."
      },
      about: {
        text1: "Welcome to <strong>Urgent Currency Rates</strong>, your number one source for all things related to currency exchange rates and financial market data.",
        text2: "We're dedicated to giving you the very best of financial data, with a focus on accuracy, speed, and reliability.",
        text3: "Founded in 2024, we now serve customers all over the world."
      },
      contact: {
        text: "If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us via the email below.",
        title: "Contact Info"
      }
    },
    ar: {
      privacy: {
        intro: "في <strong>سعر العملات العاجل</strong>، نولي أهمية قصوى لخصوصية زوارنا. توجز وثيقة سياسة الخصوصية هذه أنواع المعلومات التي يجمعها تطبيقنا وكيفية استخدامنا لها.",
        sections: [
           { title: "ملفات السجل", text: "نتبع إجراءً قياسياً يتمثل في استخدام ملفات السجل. تتضمن المعلومات التي يتم جمعها عناوين بروتوكول الإنترنت (IP)، ونوع المتصفح، وموفر خدمة الإنترنت." },
           { title: "ملفات تعريف الارتباط", text: "نستخدم 'ملفات تعريف الارتباط' لتخزين المعلومات بما في ذلك تفضيلات الزوار، والصفحات التي قام الزائر بالوصول إليها." },
           { title: "إعلانات جوجل", text: "يستخدم جوجل ملفات تعريف الارتباط DART لعرض الإعلانات لزوار موقعنا بناءً على زيارتهم لموقعنا." }
        ]
      },
      terms: {
        intro: "من خلال الوصول إلى هذا التطبيق، فإنك توافق على الالتزام بشروط وأحكام الاستخدام هذه.",
        sections: [
            { title: "1. إخلاء المسؤولية", text: "يتم توفير المواد الموجودة على الموقع 'كما هي'. لا نقدم أي ضمانات، صريحة أو ضمنية." },
            { title: "2. القيود", text: "لا نتحمل نحن أو موردونا بأي حال من الأحوال المسؤولية عن أي أضرار ناجمة عن استخدام أو عدم القدرة على استخدام المواد." }
        ],
        disclaimer: "<strong>إخلاء مسؤولية:</strong> البيانات المقدمة هي لأغراض المعلومات فقط ولا ينبغي اعتبارها نصيحة مالية."
      },
      about: {
        text1: "مرحباً بكم في <strong>سعر العملات العاجل</strong>، مصدرك الأول لكل ما يتعلق بأسعار صرف العملات.",
        text2: "نحن ملتزمون بتقديم أفضل البيانات المالية لك، مع التركيز على الدقة والسرعة.",
        text3: "تأسسنا في عام 2024، ونحن نخدم الآن العملاء في جميع أنحاء العالم."
      },
      contact: {
        text: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر البريد الإلكتروني أدناه.",
        title: "بيانات التواصل"
      }
    },
    fr: {
      privacy: {
        intro: "Chez <strong>Taux de Change Urgents</strong>, la confidentialité de nos visiteurs est primordiale. Ce document décrit les types d'informations collectées.",
        sections: [
           { title: "Fichiers journaux", text: "Nous utilisons des fichiers journaux standards. Les informations collectées incluent les adresses IP, le type de navigateur et le FAI." },
           { title: "Cookies", text: "Comme tout autre site, nous utilisons des cookies pour stocker les préférences des visiteurs." },
           { title: "Cookie DART Google", text: "Google utilise des cookies DART pour diffuser des annonces aux visiteurs de notre site." }
        ]
      },
      terms: {
        intro: "En accédant à cette application, vous acceptez d'être lié par ces conditions d'utilisation.",
        sections: [
            { title: "1. Clause de non-responsabilité", text: "Les documents sur <strong>Taux de Change Urgents</strong> sont fournis 'tels quels'. Nous ne donnons aucune garantie." },
            { title: "2. Limitations", text: "En aucun cas, nous ne serons responsables des dommages résultant de l'utilisation de notre application." }
        ],
        disclaimer: "<strong>Avis financier :</strong> Les données sont à titre informatif uniquement et ne constituent pas un conseil financier."
      },
      about: {
        text1: "Bienvenue sur <strong>Taux de Change Urgents</strong>, votre source numéro un pour les taux de change.",
        text2: "Nous nous engageons à vous fournir les meilleures données financières, en mettant l'accent sur la précision.",
        text3: "Fondée en 2024, nous servons maintenant des clients partout dans le monde."
      },
      contact: {
        text: "Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter.",
        title: "Contact"
      }
    },
    es: {
      privacy: {
        intro: "En <strong>Tasas de Cambio Urgentes</strong>, priorizamos la privacidad de nuestros visitantes. Este documento contiene los tipos de información recopilada.",
        sections: [
           { title: "Archivos de registro", text: "Seguimos un procedimiento estándar de uso de archivos de registro. La información incluye direcciones IP y tipo de navegador." },
           { title: "Cookies", text: "Utilizamos cookies para almacenar información, incluidas las preferencias de los visitantes." },
           { title: "Cookie de Google DART", text: "Google utiliza cookies DART para publicar anuncios a nuestros visitantes." }
        ]
      },
      terms: {
        intro: "Al acceder a esta aplicación, acepta estar sujeto a estos Términos y condiciones de uso.",
        sections: [
            { title: "1. Descargo de responsabilidad", text: "Los materiales se proporcionan 'tal cual'. No ofrecemos garantías, expresas o implícitas." },
            { title: "2. Limitaciones", text: "En ningún caso seremos responsables de ningún daño que surja del uso de nuestra aplicación." }
        ],
        disclaimer: "<strong>Descargo financiero:</strong> Los datos son solo para fines informativos y no deben considerarse asesoramiento financiero."
      },
      about: {
        text1: "Bienvenido a <strong>Tasas de Cambio Urgentes</strong>, su fuente número uno para tasas de cambio.",
        text2: "Nos dedicamos a brindarle los mejores datos financieros, con un enfoque en la precisión.",
        text3: "Fundada en 2024, ahora servimos a clientes de todo el mundo."
      },
      contact: {
        text: "Si tiene alguna pregunta sobre esta Política de privacidad, contáctenos.",
        title: "Información de contacto"
      }
    },
    de: {
        privacy: {
            intro: "Bei <strong>Dringende Wechselkurse</strong> hat die Privatsphäre unserer Besucher Priorität.",
            sections: [
                { title: "Logdateien", text: "Wir verwenden Standard-Logdateien. Zu den gesammelten Informationen gehören IP-Adressen und Browsertyp." },
                { title: "Cookies", text: "Wir verwenden Cookies, um Besucherpräferenzen zu speichern." },
                { title: "Google DART Cookie", text: "Google verwendet DART-Cookies, um Anzeigen zu schalten." }
            ]
        },
        terms: {
            intro: "Durch den Zugriff auf diese App stimmen Sie diesen Nutzungsbedingungen zu.",
            sections: [
                { title: "1. Haftungsausschluss", text: "Die Materialien werden 'wie besehen' zur Verfügung gestellt." },
                { title: "2. Beschränkungen", text: "Wir haften keinesfalls für Schäden, die aus der Nutzung unserer App entstehen." }
            ],
            disclaimer: "<strong>Finanzhinweis:</strong> Daten dienen nur zu Informationszwecken."
        },
        about: {
            text1: "Willkommen bei <strong>Dringende Wechselkurse</strong>, Ihrer Nummer eins für Wechselkurse.",
            text2: "Wir widmen uns der Bereitstellung der besten Finanzdaten.",
            text3: "Gegründet im Jahr 2024, bedienen wir Kunden weltweit."
        },
        contact: {
            text: "Bei Fragen kontaktieren Sie uns bitte.",
            title: "Kontakt"
        }
    },
    it: {
        privacy: {
            intro: "Su <strong>Tassi di Cambio Urgenti</strong>, la privacy dei nostri visitatori è una priorità.",
            sections: [
                { title: "File di registro", text: "Utilizziamo file di registro standard. Le informazioni includono indirizzi IP e tipo di browser." },
                { title: "Cookie", text: "Utilizziamo i cookie per memorizzare le preferenze dei visitatori." },
                { title: "Cookie Google DART", text: "Google utilizza i cookie DART per pubblicare annunci." }
            ]
        },
        terms: {
            intro: "Accedendo a questa app, accetti di essere vincolato da questi Termini e Condizioni.",
            sections: [
                { title: "1. Esclusione di responsabilità", text: "I materiali sono forniti 'così come sono'." },
                { title: "2. Limitazioni", text: "In nessun caso saremo responsabili per eventuali danni derivanti dall'uso dell'app." }
            ],
            disclaimer: "<strong>Disclaimer finanziario:</strong> I dati sono solo a scopo informativo."
        },
        about: {
            text1: "Benvenuti su <strong>Tassi di Cambio Urgenti</strong>, la vostra fonte numero uno per i tassi di cambio.",
            text2: "Ci dedichiamo a fornirvi i migliori dati finanziari.",
            text3: "Fondata nel 2024, serviamo clienti in tutto il mondo."
        },
        contact: {
            text: "Se hai domande, contattaci.",
            title: "Contatto"
        }
    },
    ru: {
        privacy: {
            intro: "В <strong>Срочные Курсы Валют</strong> мы уделяем первостепенное внимание конфиденциальности.",
            sections: [
                { title: "Лог-файлы", text: "Мы используем стандартные лог-файлы. Информация включает IP-адреса и тип браузера." },
                { title: "Cookies", text: "Мы используем куки для хранения настроек посетителей." },
                { title: "Google DART", text: "Google использует куки DART для показа рекламы." }
            ]
        },
        terms: {
            intro: "Используя это приложение, вы соглашаетесь с данными Условиями использования.",
            sections: [
                { title: "1. Отказ от ответственности", text: "Материалы предоставляются «как есть»." },
                { title: "2. Ограничения", text: "Мы не несем ответственности за любой ущерб, возникший в результате использования приложения." }
            ],
            disclaimer: "<strong>Финансовый отказ:</strong> Данные только для информационных целей."
        },
        about: {
            text1: "Добро пожаловать в <strong>Срочные Курсы Валют</strong>, ваш источник номер один курсов валют.",
            text2: "Мы стремимся предоставить вам лучшие финансовые данные.",
            text3: "Основанная в 2024 году, мы обслуживаем клиентов по всему миру."
        },
        contact: {
            text: "Если у вас есть вопросы, свяжитесь с нами.",
            title: "Контакты"
        }
    },
    zh: {
        privacy: {
            intro: "在<strong>紧急汇率</strong>，我们优先考虑访客的隐私。",
            sections: [
                { title: "日志文件", text: "我们使用标准日志文件。收集的信息包括IP地址和浏览器类型。" },
                { title: "Cookie", text: "我们使用 cookie 来存储访客偏好。" },
                { title: "Google DART", text: "Google 使用 DART cookie 投放广告。" }
            ]
        },
        terms: {
            intro: "访问此应用程序即表示您同意受这些使用条款的约束。",
            sections: [
                { title: "1. 免责声明", text: "材料按“原样”提供。我们不作任何保证。" },
                { title: "2. 限制", text: "在任何情况下，我们要不对因使用我们的应用程序而造成的任何损害负责。" }
            ],
            disclaimer: "<strong>财务免责声明：</strong>数据仅供参考。"
        },
        about: {
            text1: "欢迎来到<strong>紧急汇率</strong>，这是您获取汇率的第一来源。",
            text2: "我们致力于为您提供最好的金融数据。",
            text3: "成立于 2024 年，我们现在为全球客户提供服务。"
        },
        contact: {
            text: "如果您有任何问题，请联系我们。",
            title: "联系方式"
        }
    },
    ja: {
        privacy: {
            intro: "<strong>緊急為替レート</strong>では、訪問者のプライバシーを優先しています。",
            sections: [
                { title: "ログファイル", text: "標準的なログファイルを使用しています。情報にはIPアドレスが含まれます。" },
                { title: "クッキー", text: "訪問者の設定を保存するためにクッキーを使用しています。" },
                { title: "Google DART", text: "GoogleはDARTクッキーを使用して広告を配信しています。" }
            ]
        },
        terms: {
            intro: "このアプリにアクセスすることで、利用規約に同意したことになります。",
            sections: [
                { title: "1. 免責事項", text: "資料は「現状のまま」提供されます。保証はいたしません。" },
                { title: "2. 制限", text: "当社はいかなる損害についても責任を負いません。" }
            ],
            disclaimer: "<strong>金融免責事項:</strong> データは情報提供のみを目的としています。"
        },
        about: {
            text1: "<strong>緊急為替レート</strong>へようこそ。為替レートの第一の情報源です。",
            text2: "最高の金融データを提供することに専念しています。",
            text3: "2024年に設立され、世界中のお客様にサービスを提供しています。"
        },
        contact: {
            text: "ご質問がある場合は、お問い合わせください。",
            title: "連絡先"
        }
    },
    tr: {
        privacy: {
            intro: "<strong>Acil Döviz Kurları</strong> olarak ziyaretçilerimizin gizliliğine öncelik veriyoruz.",
            sections: [
                { title: "Log Dosyaları", text: "Standart log dosyaları kullanıyoruz. Bilgiler IP adreslerini içerir." },
                { title: "Çerezler", text: "Ziyaretçi tercihlerini saklamak için çerezleri kullanıyoruz." },
                { title: "Google DART", text: "Google, reklam sunmak için DART çerezlerini kullanır." }
            ]
        },
        terms: {
            intro: "Bu uygulamaya erişerek Kullanım Koşullarını kabul etmiş olursunuz.",
            sections: [
                { title: "1. Sorumluluk Reddi", text: "Materyaller 'olduğu gibi' sunulmaktadır. Garanti vermiyoruz." },
                { title: "2. Sınırlamalar", text: "Uygulamamızın kullanımından doğacak zararlardan sorumlu değiliz." }
            ],
            disclaimer: "<strong>Finansal Uyarı:</strong> Veriler sadece bilgi amaçlıdır."
        },
        about: {
            text1: "<strong>Acil Döviz Kurları</strong>'na hoş geldiniz, döviz kurları için bir numaralı kaynağınız.",
            text2: "Size en iyi finansal verileri sunmaya kendimizi adadık.",
            text3: "2024 yılında kurulduk ve şimdi tüm dünyadaki müşterilere hizmet veriyoruz."
        },
        contact: {
            text: "Herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin.",
            title: "İletişim Bilgileri"
        }
    }
  };

  const activeContent = content[language] || content['en'];

  const renderContent = () => {
    switch (view) {
      case 'privacy':
        return (
          <div className="space-y-6 text-slate-300 leading-relaxed">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="text-emerald-400" /> {t('privacy_policy')}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: activeContent.privacy.intro }} />
            
            {activeContent.privacy.sections.map((sec: any, idx: number) => (
                <div key={idx}>
                    <h3 className="text-xl font-semibold text-white mt-4">{sec.title}</h3>
                    <p>{sec.text}</p>
                </div>
            ))}
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-6 text-slate-300 leading-relaxed">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="text-amber-400" /> {t('terms_of_service')}
            </h2>
            <p>{activeContent.terms.intro}</p>
            
            {activeContent.terms.sections.map((sec: any, idx: number) => (
                <div key={idx}>
                    <h3 className="text-xl font-semibold text-white mt-4">{sec.title}</h3>
                    <p>{sec.text}</p>
                </div>
            ))}

            <p className="p-4 bg-slate-800 rounded-lg border-l-4 border-amber-500" dangerouslySetInnerHTML={{ __html: activeContent.terms.disclaimer }} />
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6 text-slate-300 leading-relaxed">
             <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Info className="text-blue-400" /> {t('about_us')}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: activeContent.about.text1 }} />
            <p>{activeContent.about.text2}</p>
            <p dangerouslySetInnerHTML={{ __html: activeContent.about.text3 }} />
          </div>
        );
      case 'contact': {
        return (
          <div className="space-y-8">
            <div className="space-y-4 text-slate-300 leading-relaxed">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Mail className="text-rose-400" /> {t('contact_us')}
                </h2>
                <p>{activeContent.contact.text}</p>
            </div>

            <div className="flex justify-center w-full">
                <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 w-full max-w-lg shadow-xl">
                    <h3 className="text-lg font-semibold text-white mb-6 border-b border-white/5 pb-2 text-center">{activeContent.contact.title}</h3>
                    <ul className="space-y-6">
                        <li className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl hover:bg-slate-900 transition-colors">
                            <div className="p-3 bg-emerald-500/10 rounded-xl">
                                <Mail className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</span>
                                <a href="mailto:foudarahmad@gmail.com" className="text-slate-200 font-mono hover:text-emerald-400 transition-colors text-lg break-all">
                                    foudarahmad@gmail.com
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border border-white/10 p-5 md:p-10 min-h-[60vh] animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold text-sm bg-slate-800/50 px-4 py-2 rounded-xl"
      >
        {currentDir === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        {t('home')}
      </button>
      
      <div className="max-w-4xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default LegalPages;