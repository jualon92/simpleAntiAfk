// Purpose: Main entry point for the application.
import { hideMyApp } from "./actions";
import { play } from "./play";
import { handleTimerSettings } from "./timeSettings";
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
initFlowbite();

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("play-btn") as HTMLElement;
  const startIcon = document.getElementById("play-icon") as HTMLElement;
  const statusCircle = document.getElementById("status-circle") as HTMLElement;
  const hideButton = document.getElementById("hide-btn") as HTMLElement;
  startButton?.addEventListener("click", () => play(startIcon, statusCircle));
  hideButton?.addEventListener("click", () => {
    hideMyApp();
  });

 

});

 
//@ts-ignore
window.__TAURI__.event.listen('hide-window', () => {
  // Llama a la función que deseas ejecutar cuando se reciba el evento
  console.log("El backend indica ocultar la ventana");
  // Aquí puedes llamar a cualquier función, por ejemplo:
  // hideMyWindowFunction();
  hideMyApp();
  
});

 
 