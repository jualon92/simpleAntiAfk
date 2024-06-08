import { startTyping, stopClicking } from "./actions";
 
document.addEventListener("DOMContentLoaded", function () {

  const startButton = document.getElementById('play-btn') as HTMLElement;
  const startIcon = document.getElementById('play-icon') as HTMLElement;
  startButton?.addEventListener("click", function () {
    const isStartButtonON =	startIcon.classList.contains("fa-play");

    if (isStartButtonON) {
      startIcon.classList.remove("fa-play");
      startIcon.classList.add("fa-pause");

      startTyping();
    }else{
      startIcon.classList.remove("fa-pause");
      startIcon.classList.add("fa-play");
      stopClicking();
    }
  })
	 
 
});
