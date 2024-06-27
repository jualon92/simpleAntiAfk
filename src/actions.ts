import { invoke } from "@tauri-apps/api";
import notie from "notie";

 

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


export function hideMyApp() {
  notie.alert({
    type:2,
    text: "hiding in the shadows... 😶‍🌫️"
  })
  setTimeout(() => hideApp(), 1500);  

}
   