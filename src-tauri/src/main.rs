#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use device_query::{DeviceEvents, DeviceState};
use tauri::{AppHandle, Wry, Emitter, generate_context, generate_handler};
use tokio::{sync::mpsc::unbounded_channel, task};
use mouse_rs::Mouse;

// Define the payload struct
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

// Command test
#[tauri::command]
async fn test_app_handle(app: AppHandle<Wry>) {
    app.emit("event-name", Payload { message: "Tauri is awesome!".into() }).unwrap();
    let mouse = Mouse::new();
    mouse.move_to(500, 500).expect("Unable to move mouse");
}

#[tokio::main]
async fn main() {
    let (tx, mut rx) = unbounded_channel();

    // Spawning a separate task for the mouse event listener
    let device_state_task = task::spawn_blocking(move || {
        let device_state = DeviceState::new();

        let _guard = device_state.on_mouse_move(move |position| {
            let pos = *position;
            // Emitter (for the second thread.)
            if let Err(e) = tx.send(pos) {
                println!("Failed to send position: {:?}", e);
            }
        });

        // Keep the thread alive to listen for events
        loop {
            std::thread::sleep(std::time::Duration::from_secs(1));
        }
    });

    // Running the Tauri application
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle().clone();

            // Process mouse events asynchronously
            task::spawn(async move {
                // Receiver
                while let Some(position) = rx.recv().await {
                    if let Err(e) = handle.emit("mouse_move", position) {
                        println!("Failed to emit event: {:?}", e);
                    }
                }
            });

            Ok(())
        })
        .invoke_handler(generate_handler![test_app_handle])
        .run(generate_context!())
        .expect("error while running tauri application");

    // Await the blocking task to ensure it doesn't terminate prematurely
    let _ = device_state_task.await;
}
