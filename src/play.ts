import notie from 'notie'
import { startTyping, stopClicking } from "./actions";
export const play = (startIcon: HTMLElement, statusCircle: HTMLElement) => { 
    const isStartButtonON =	startIcon.classList.contains("fa-play");

    if (isStartButtonON) {
      startIcon.classList.remove("fa-play");
      startIcon.classList.add("fa-pause");

      statusCircle.style.backgroundColor = "#48BB78";
      notie.alert({
        type:1,
        text: "app is running in the background",
        position: "bottom"
      })
      
      startTyping();
    }else{
      startIcon.classList.remove("fa-pause");
      startIcon.classList.add("fa-play");
      statusCircle.style.backgroundColor = "#F56565";

      notie.alert({
        type:3,
        text: "app is paused",
        position: "bottom"
      })
      
      stopClicking();
    } 
}
