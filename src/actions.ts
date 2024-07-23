import { invoke } from "@tauri-apps/api";
import notie from "notie";
import i18n from "./i18n/i18n";

 

// actions.ts
const TIME_INTERVAL = 60 * 5; // 5min
export async function stopClicking() {
  try {
    await invoke("stop_mouse_click");
  } catch (e) {
    console.error("Failed to stop clicking:", e);
  }
}

export async function startTyping() {
  try {
    await invoke("start_typing", { intervalSecs: TIME_INTERVAL });
  } catch (e) {
    console.error("Failed to start typing:", e);
  }
}


export async function hideApp() {
  try {
    await invoke("hide_app");
  } catch (e) {
    console.error("Failed to hide", e);
  }
}

export async function setTimerOff(startTime: string, endTime: string) {
  try {
    console.log("Setting timer off", startTime, endTime);
    await invoke("set_timer_off", { startTime, endTime });
  } catch (e) {
    console.error("Failed to set timer off", e);
  }
}

export function hideMyApp() {
  notie.alert({
    type:2,
    text: i18n.t('hideApp'),
    position: "bottom"
  })
  setTimeout(() => hideApp(), 1500);  

}
   