// Purpose: Main entry point for the application.
import { hideApp } from "./actions";
import { play } from "./play";
import notie from 'notie'
document.addEventListener("DOMContentLoaded", function () {

  const startButton = document.getElementById('play-btn') as HTMLElement;
  const startIcon = document.getElementById('play-icon') as HTMLElement;
  const statusCircle = document.getElementById('status-circle') as HTMLElement;
  const hideButton = document.getElementById('hide-btn') as HTMLElement;
  startButton?.addEventListener("click",  () => play(startIcon, statusCircle));
	hideButton?.addEventListener("click", () => {
    notie.alert({
      type:2,
      text: "hiding in the shadows... 😶‍🌫️"
    })
    setTimeout(() => 
      hideApp(), 1500);  
  });
})
 
