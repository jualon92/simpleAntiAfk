// Purpose: Main entry point for the application.
import { hideMyApp, setTimerOff, stopClicking } from "./actions";
import { play } from "./play";
import { handleTimerSettings } from "./timeSettings";
import { initFlowbite } from 'flowbite'
import "./i18n/i18n";

import i18n from 'i18next';
// initialize components based on data attribute selectors
initFlowbite();

//TODO: refactor this
document.addEventListener("DOMContentLoaded", async function () {


  //timer settings
  await stopClicking(); 

  const startTime = window.localStorage.getItem("startTime");
  const endTime = window.localStorage.getItem("endTime");

    if (startTime && endTime) {
    await setTimerOff(startTime, endTime);
  }


  //play app
  const startButton = document.getElementById("play-btn") as HTMLElement;
  const startIcon = document.getElementById("play-icon") as HTMLElement;
  const statusCircle = document.getElementById("status-circle") as HTMLElement;
  const hideButton = document.getElementById("hide-btn") as HTMLElement;
  startButton?.addEventListener("click", () => play(startIcon, statusCircle));
  hideButton?.addEventListener("click", () => {
    hideMyApp();
  });

  //translates
  const welcomeElement = document.getElementById('title-timer') as HTMLElement;
  welcomeElement.innerText = i18n.t('title-timer');
  const dashboardElement = document.getElementById('dashboard') as HTMLElement;
  dashboardElement.innerText = i18n.t('dashboard');

});

 


//@ts-ignore
window.__TAURI__.event.listen('hide-window', () => {
  // Llama a la función que deseas ejecutar cuando se reciba el evento
  console.log("El backend indica ocultar la ventana");
  // Aquí puedes llamar a cualquier función, por ejemplo:
  // hideMyWindowFunction();
  hideMyApp();
  
});

 
 