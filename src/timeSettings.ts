import notie from "notie";

export function handleTimerSettings() {
  //set min time for end time input
  const startTimeInput = document.getElementById(
    "start-time"
  ) as HTMLInputElement;

  const endTimeInput = document.getElementById("end-time") as HTMLInputElement;
  startTimeInput.addEventListener("change", function () {
    endTimeInput.min = this.value;
  });


  //notifications
  endTimeInput.addEventListener("change", function () {
    if (endTimeInput.validity.valid) {
        notie.alert({
            type:1,
            text: "Timer set... 🕰️"
          })
    }else{
        notie.alert({
            type:3,
            text: "Invalid time... ⏰"
          })
    }
   
  })
}



