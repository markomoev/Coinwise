import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"

// Import your translation files directly
import enHomeJSON from "./public/locales/en/home/translation.json";
import enDashboardJSON from "./public/locales/en/dashboard/translation.json";
import bgHomeJSON from "./public/locales/bg/home/translation.json";
import bgDashboardJSON from "./public/locales/bg/dashboard/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        translation: {
          ...enHomeJSON,
          ...enDashboardJSON
        } 
      },
      bg: { 
        translation: { 
          ...bgHomeJSON,
          ...bgDashboardJSON
        } 
      }
    },
  
    fallbackLng: "en",

    detection: {
      order: ['localStorage', 'navigator'], 
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;