import { invoke } from "@tauri-apps/api";

// actions.ts
const TIME_INTERVAL = 60 * 5; // 5min
export async function stopClicking() {
  try {
    console.log("Stop Clicking function called"); // Debugging
    await invoke("stop_mouse_click");
  } catch (e) {
    console.error("Failed to stop clicking:", e);
  }
}

export async function startTyping() {
  try {
    console.log("Start Typing function called"); // Debugging
    await invoke("start_typing", { intervalSecs: TIME_INTERVAL });
  } catch (e) {
    console.error("Failed to start typing:", e);
  }
}