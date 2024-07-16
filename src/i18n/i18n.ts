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
      "appPaused": "App is paused",
      "appRunning": "App is running",
      "hideApp": "Hiding in the shadows... 😶‍🌫️"
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
        "appPaused":  "La aplicación está en pausa",
        "appRunning": "La aplicación está en ejecución",
        "hideApp": "Ocultandose en las sombras... 🥷ññ+.."

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
