import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"

// Import your translation files directly
import enHomeJSON from "./public/locales/en/home/translation.json";
import enDashboardJSON from "./public/locales/en/dashboard/translation.json";
import enTransactionsJSON from "./public/locales/en/transactions/translation.json";
import enSettingsJSON from "./public/locales/en/settings/translation.json";
import enSidebarJSON from "./public/locales/en/sidebar/translation.json";

import bgHomeJSON from "./public/locales/bg/home/translation.json";
import bgDashboardJSON from "./public/locales/bg/dashboard/translation.json";
import bgTransactionsJSON from "./public/locales/bg/transactions/translation.json";
import bgSettingsJSON from "./public/locales/bg/settings/translation.json";
import bgSidebarJSON from "./public/locales/bg/sidebar/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        translation: {
          ...enHomeJSON,
          ...enDashboardJSON,
          ...enTransactionsJSON,
          ...enSettingsJSON,
          ...enSidebarJSON
        } 
      },
      bg: { 
        translation: { 
          ...bgHomeJSON,
          ...bgDashboardJSON,
          ...bgTransactionsJSON,
          ...bgSettingsJSON,
          ...bgSidebarJSON
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