import { stopClicking, startTyping } from "./actions";

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton") as HTMLButtonElement;
  const stopButton = document.getElementById("stopButton") as HTMLButtonElement;


  startButton?.addEventListener("click", function () {
    // Disable Start button and enable Stop button
    startButton.disabled = true;
    stopButton.disabled = false;

    startTyping();
  });

  
  stopButton?.addEventListener("click", function () {
    // Disable Stop button and enable Start button
    startButton.disabled = false;
    stopButton.disabled = true;

    stopClicking();
  });
});
