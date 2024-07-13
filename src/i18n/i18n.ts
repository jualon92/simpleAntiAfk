import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Timer",
       "dashboard": "Dashboard"
    }
  },
  es: {
    translation: {
      "title-timer": "Temporizador",
      "dashboard": "Panel de control"
    }
  }
};

i18n
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
