// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::State;
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration; 
use enigo::{
    Direction::{Press},
    Enigo, Key, Keyboard, Settings
};
use tauri::SystemTray;

#[tauri::command]
fn start_typing(interval_secs: u64, state: State<'_, AppState>) {
    let running = state.running.clone();
    let interval = state.interval.clone();

    *interval.lock().unwrap() = interval_secs;
    *running.lock().unwrap() = true;

    thread::spawn(move || {
        let mut enigo = Enigo::new(&Settings::default()).unwrap();
        loop {
            {
                let running = running.lock().unwrap();
                if !*running {
                    break;
                }
            }
            thread::sleep(Duration::from_secs(interval_secs));
            enigo.key(Key::F24, Press).unwrap();
           
        }
    });
}
#[tauri::command]
fn stop_mouse_click(state: State<'_, AppState>) {
    let mut running = state.running.lock().unwrap();
    *running = false;
}

struct AppState {
    running: Arc<Mutex<bool>>,
    interval: Arc<Mutex<u64>>,
}

fn main() {
    let tray = SystemTray::new();

    tauri::Builder::default()
        .manage(AppState {
            running: Arc::new(Mutex::new(false)),
            interval: Arc::new(Mutex::new(60)),
        })
        .system_tray(tray)
        .invoke_handler(tauri::generate_handler![stop_mouse_click, start_typing])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}