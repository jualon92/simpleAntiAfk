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
use tauri::AppHandle;
use tauri::Manager;

#[tauri::command]
fn start_typing(interval_secs: u64, state: State<'_, AppState>) {
    let running = state.running.clone();
    let interval = state.interval.clone();

    *interval.lock().unwrap() = interval_secs;
    *running.lock().unwrap() = true;

    let app_handle = &state.app_handle;
    app_handle.tray_handle().set_icon(tauri::Icon::Raw(include_bytes!("../icons/power-on.png").to_vec())).unwrap();
     

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
    let app_handle = &state.app_handle;
    app_handle.tray_handle().set_icon(tauri::Icon::Raw(include_bytes!("../icons/power-off.png").to_vec())).unwrap();
     
}


struct AppState {
    running: Arc<Mutex<bool>>,
    interval: Arc<Mutex<u64>>,
    app_handle: AppHandle,
}

fn main() {
    let tray = SystemTray::new();

    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.app_handle(); // Obtener AppHandle
            app.manage(AppState {
                running: Arc::new(Mutex::new(false)),
                interval: Arc::new(Mutex::new(60)),
                app_handle, // Almacenar AppHandle en AppState
            });
            Ok(())
        })
        .system_tray(tray)
        .invoke_handler(tauri::generate_handler![stop_mouse_click, start_typing])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}