import notie from 'notie'
import { startTyping, stopClicking } from "./actions";
import "./i18n/i18n";

import i18n from 'i18next';

export const play = (startIcon: HTMLElement, statusCircle: HTMLElement) => { 
    const isStartButtonON =	startIcon.classList.contains("fa-play");

    if (isStartButtonON) {
      startIcon.classList.remove("fa-play");
      startIcon.classList.add("fa-pause");

      statusCircle.style.backgroundColor = "#48BB78";
      notie.alert({
        type:1,
        text: i18n.t('appRunning'),
        position: "bottom"
      })
      
      startTyping();
    }else{
      startIcon.classList.remove("fa-pause");
      startIcon.classList.add("fa-play");
      statusCircle.style.backgroundColor = "#F56565";

      notie.alert({
        type:3,
        text: i18n.t('appPaused'),
        position: "bottom",
        
      })
      
      stopClicking();
    } 
}
