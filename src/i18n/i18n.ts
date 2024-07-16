import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Timer",
       "dashboard": "Dashboard",
      "hideButton": "Hide",
      "offButton": "Schedule downtime",
      "disabledMessage": 'The app will be <strong>disabled</strong> during these hours',
      "fromTime": "Off From",
      "toTime": "To",
    }
  },
  es: {
    translation: {
      "title-timer": "Temporizador",
      "dashboard": "Panel",
       "hideButton": "Ocultar",
       "offButton": "Programar apagado",
        "disabledMessage": 'La aplicación estará <strong>desactivada</strong> durante estas horas',
      "fromTime": "Apagar desde",
      "toTime": "Hasta",
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
