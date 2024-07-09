export function handleTimerSettings() {
  //set min time for end time input
  const startTimeInput = document.getElementById(
    "start-time"
  ) as HTMLInputElement;

  
  const endTimeInput = document.getElementById("end-time") as HTMLInputElement;
  startTimeInput.addEventListener("change", function () {
    endTimeInput.min = this.value;
  });
}
