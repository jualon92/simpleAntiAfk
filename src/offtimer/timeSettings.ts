import notie from "notie";

export function handleTimerSettings(startTimeInput: HTMLInputElement, endTimeInput: HTMLInputElement) {
   startTimeInput.addEventListener("change", function () {
    /* endTimeInput.min = this.value; */
  });

  const setOffTimerButton = document.getElementById("set-offtimer-btn") as HTMLElement
 

  //notifications
   setOffTimerButton.addEventListener("click", function () {
    if (endTimeInput.validity.valid) {
        notie.alert({
            type:1,
            text: `App will be inactive from: \n ${startTimeInput.value} to ${endTimeInput.value} ... 🕰️`,
               position: "bottom"
          })

         //save on localstorage
         window.localStorage.setItem("endTime", endTimeInput.value);
         window.localStorage.setItem("startTime", startTimeInput.value);
  
    }else{
        notie.alert({
            type:3,
            text: "Invalid time... ⏰",
            position: "bottom"
          })
    }
   
  })
}



