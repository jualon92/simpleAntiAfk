import { initFlowbite } from "flowbite";
import { handleTimerSettings } from "./timeSettings";
import { stopClicking } from "./actions";
import "./i18n/i18n";

import i18n from "i18next";
import notie from "notie";
initFlowbite();

document.addEventListener("DOMContentLoaded", async function () {
  const clearDatesButton = document.getElementById(
    "clear-offtimer-btn"
  ) as HTMLElement;

  setTranslate();

  await stopClicking();
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

  clearDatesButton.addEventListener("click", function () {
    window.localStorage.clear();
    //clear inputs
    startTimeInput.value = "";
    endTimeInput.value = "";
    notie.alert({
      type: 1,
      text: "Timer cleared",
      position: "bottom",
    });
  });

  handleTimerSettings(startTimeInput, endTimeInput);
});

function setTranslate() {
  const offButton = document.getElementById("set-offtimer-btn") as HTMLElement;
  offButton.innerText = i18n.t("offButton");
  const disabledMessage = document.getElementById(
    "disabled-message"
  ) as HTMLElement;
  disabledMessage.innerHTML = i18n.t("disabledMessage");

  const fromTime = document.getElementById("start-time-label") as HTMLElement;
  fromTime.innerText = i18n.t("fromTime");
  const toTime = document.getElementById("end-time-label") as HTMLElement;
  toTime.innerText = i18n.t("toTime");

  const clearButton = document.getElementById(
    "clear-offtimer-btn"
  ) as HTMLElement;
  clearButton.innerText = i18n.t("clearButton");
}
