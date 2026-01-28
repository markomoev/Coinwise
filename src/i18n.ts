import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"

// Import your translation files directly
import enJSON from "./public/locales/en/translation.json";
import bgHomeMainJSON from "./public/locales/bg/home/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enJSON },
      bg: { 
        translation: { 
          ...bgHomeMainJSON 
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