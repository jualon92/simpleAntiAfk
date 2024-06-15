
import { startTyping, stopClicking } from "./actions";
export const play = (startIcon: HTMLElement, statusCircle: HTMLElement) => { 
    const isStartButtonON =	startIcon.classList.contains("fa-play");

    if (isStartButtonON) {
      startIcon.classList.remove("fa-play");
      startIcon.classList.add("fa-pause");
      statusCircle.style.backgroundColor = "#48BB78";
      startTyping();
    }else{
      startIcon.classList.remove("fa-pause");
      startIcon.classList.add("fa-play");
      stopClicking();
      statusCircle.style.backgroundColor = "#F56565";
    } 
}
