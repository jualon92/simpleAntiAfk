import { startTyping, stopClicking } from "./actions";
 
document.addEventListener("DOMContentLoaded", function () {

  const startButton = document.getElementById('play-btn') as HTMLElement;
  startButton?.addEventListener("click", function () {
    const isStartButtonON =	startButton.classList.contains("fa-play");

    if (isStartButtonON) {
      startButton.classList.remove("fa-play");
      startButton.classList.add("fa-pause");

      startTyping();
    }else{
      startButton.classList.remove("fa-pause");
      startButton.classList.add("fa-play");
      stopClicking();
    }
  })
	 
 
});
