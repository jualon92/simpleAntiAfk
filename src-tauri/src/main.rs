// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::State;
use std::sync::{ Arc, Mutex };
use std::thread;
use std::time::Duration;
use enigo::{ Direction::{ Press }, Enigo, Key, Keyboard, Settings };
use tauri::SystemTray;
use tauri::AppHandle;
use tauri::{ CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent };
use tauri::Manager;
use chrono::NaiveTime;
use chrono::Timelike; 
use lazy_static::lazy_static;

// Estructura para almacenar los tiempos de inicio y fin
struct TimerOff {
    start_time: NaiveTime,
    end_time: NaiveTime,
}

// Usando lazy_static para almacenar los tiempos de manera segura entre hilos
lazy_static! {
    static ref TIMER_OFF: Mutex<Option<TimerOff>> = Mutex::new(None);
}

#[tauri::command]
fn set_timer_off(start_time: &str, end_time: &str) {
    let start_time = NaiveTime::parse_from_str(start_time, "%H:%M")
        .expect("Invalid start time format");
    let end_time = NaiveTime::parse_from_str(end_time, "%H:%M")
        .expect("Invalid end time format");

    let mut timer_off = TIMER_OFF.lock().unwrap();
    *timer_off = Some(TimerOff { start_time, end_time });
}

#[tauri::command]
fn start_typing(interval_secs: u64, state: State<'_, AppState>) {
    let running = state.running.clone();
    let interval = state.interval.clone();

    {
        let mut interval_guard = interval.lock().unwrap();
        *interval_guard = interval_secs;
    }

    {
        let mut running_guard = running.lock().unwrap();
        *running_guard = true;
    }

    let app_handle = state.app_handle.clone();
    if let Err(e) = app_handle.tray_handle().set_icon(
        tauri::Icon::Raw(include_bytes!("../icons/power-on.png").to_vec()),
    ) {
        eprintln!("Error setting tray icon: {}", e);
        return;
    }

    thread::spawn(move || {
        let mut enigo = match Enigo::new(&Settings::default()) {
            Ok(enigo) => enigo,
            Err(e) => {
                eprintln!("Error creating Enigo: {}", e);
                return;
            }
        };

        loop {
            let running_guard = running.lock().unwrap();
            if !*running_guard {
                break;
            }
            drop(running_guard);

            let current_time = NaiveTime::from_hms(
                chrono::Local::now().hour(),
                chrono::Local::now().minute(),
                0,
            );

            let press_key = {
                let timer_off_guard = TIMER_OFF.lock().unwrap();
                println!("{}", current_time );
                if let Some(timer_off) = &*timer_off_guard {
                    !(current_time >= timer_off.start_time && current_time <= timer_off.end_time)
                } else {
                    true
                }
            };

            if press_key {
                println!("Pressing F14");
                if enigo.key(Key::F14, Press).is_err() {
                    eprintln!("Error pressing key");
                }
            } else {
                println!("Ignoring press key");
            }

            thread::sleep(Duration::from_secs(interval_secs));
        }
    });
}
#[tauri::command]
fn stop_mouse_click(state: State<'_, AppState>) {
    if let Ok(mut running_guard) = state.running.lock() {
        *running_guard = false;
    } else {
        eprintln!("Error al bloquear 'running'.");
    }
    let app_handle = &state.app_handle;
    app_handle
        .tray_handle()
        .set_icon(tauri::Icon::Raw(include_bytes!("../icons/power-off.png").to_vec()))
        .unwrap();
}

#[tauri::command]
fn hide_app(state: State<'_, AppState>) {
    let app_handle = &state.app_handle;
    let window = app_handle.get_window("main").unwrap();
    app_handle.tray_handle()
    .set_menu(
        SystemTrayMenu::new()
            .add_item(CustomMenuItem::new("show".to_string(), "Show"))
            .add_native_item(SystemTrayMenuItem::Separator)
            .add_item(CustomMenuItem::new("quit".to_string(), "Salir"))
    )
    .unwrap();
    window.hide().unwrap();
}

struct AppState {
    running: Arc<Mutex<bool>>,
    interval: Arc<Mutex<u64>>,
    app_handle: AppHandle,
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    /*  let show = CustomMenuItem::new("show".to_string(), "Show"); */
    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);

    let tray = SystemTray::new().with_menu(tray_menu).with_tooltip("anti-afk");

    tauri::Builder
        ::default()
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
        .on_system_tray_event(|app, event| {
            match event {
                SystemTrayEvent::LeftClick { position: _, size: _, .. } => {
                    println!("system tray received a left click");
                }
                SystemTrayEvent::RightClick { position: _, size: _, .. } => {
                    println!("system tray received a right click");
                }
                SystemTrayEvent::DoubleClick { position: _, size: _, .. } => {
                    println!("system tray received a double click");
                }
                SystemTrayEvent::MenuItemClick { id, .. } => {
                    match id.as_str() {
                        "quit" => {
                            std::process::exit(0);
                        }
                        "hide" => {
                            let window = app.get_window("main").unwrap();
                            // Asegúrate de tener acceso a `window` que es una instancia de `AppWindow`
                            window.emit("hide-window", ()).expect("Failed to emit event");
                            app.tray_handle()
                                .set_menu(
                                    SystemTrayMenu::new()
                                        .add_item(CustomMenuItem::new("show".to_string(), "Show"))
                                        .add_native_item(SystemTrayMenuItem::Separator)
                                        .add_item(CustomMenuItem::new("quit".to_string(), "Salir"))
                                )
                                .unwrap();
                        }
                        "show" => {
                            let window = app.get_window("main").unwrap();
                            window.show().unwrap();
                            app.tray_handle()
                                .set_menu(
                                    SystemTrayMenu::new()
                                        .add_item(
                                            CustomMenuItem::new("hide".to_string(), "Ocultar")
                                        )
                                        .add_native_item(SystemTrayMenuItem::Separator)
                                        .add_item(CustomMenuItem::new("quit".to_string(), "Salir"))
                                )
                                .unwrap();
                        }
                        _ => {}
                    }
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![stop_mouse_click, start_typing, hide_app, set_timer_off])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
