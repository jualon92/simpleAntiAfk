// Purpose: Main entry point for the application.
import { play } from "./play";
 
document.addEventListener("DOMContentLoaded", function () {

  const startButton = document.getElementById('play-btn') as HTMLElement;
  const startIcon = document.getElementById('play-icon') as HTMLElement;
  const statusCircle = document.getElementById('status-circle') as HTMLElement;
  startButton?.addEventListener("click",  () => play(startIcon, statusCircle));
	 
});
 
