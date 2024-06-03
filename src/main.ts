import { invoke } from "@tauri-apps/api/tauri";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

 
document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('startButton')  as HTMLButtonElement;
  const stopButton = document.getElementById('stopButton') as HTMLButtonElement;
  
  startButton?.addEventListener('click', function() {
      // Disable Start button and enable Stop button
      startButton.disabled = true;
      stopButton.disabled = false;
  });
  
  stopButton?.addEventListener('click', function() {
      // Disable Stop button and enable Start button
      startButton.disabled = false;
      stopButton.disabled = true;
  });
});