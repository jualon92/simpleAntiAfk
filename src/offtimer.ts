
import { initFlowbite } from 'flowbite'
import { handleTimerSettings } from './timeSettings';

initFlowbite();

document.addEventListener("DOMContentLoaded", function () {
    
    const startTimeInput = document.getElementById(
        "start-time"
      ) as HTMLInputElement;
    
      const endTimeInput = document.getElementById("end-time") as HTMLInputElement;
    
    const storedInitialTime = window.localStorage.getItem("startTime");
    const storedEndTime = window.localStorage.getItem("endTime");
    if (storedInitialTime && storedEndTime) {
        startTimeInput.value = storedInitialTime;
        endTimeInput.value = storedEndTime;
    }


    handleTimerSettings(startTimeInput, endTimeInput);
 
  });


 