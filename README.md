# Anti-AFK Application

This application is designed to help users avoid being marked as "Away" or "AFK".

To download the installer, go to [this GitHub release page](https://github.com/jualon92/simpleAntiAfk/releases/tag/app-v0.0.1) .

## How it works:

- **Key Press Simulation:** Simulates pressing the F14 key to prevent the system from detecting inactivity. 

## Features:

- **Non-obtrusive:** 
   - Key F14 was selected to operate without disrupting daily operations. 
   - App can be hidden from the toolbar or managed directly from the system tray.
   - The functionality to deactivate the app at a predetermined time range is available.
- **Cross-platform:** Thanks to Tauri, it can be bundled for Windows, Linux, and macOS as a lightweight bunddle.
- **I18N:**  Detects the browser's language and translates accordingly.


## Development:

This application was developed using Tauri, a secure, lightweight, and cross-platform desktop application framework.


 - For the frontend UI, we utilized `Tailwind CSS` , `Typescript`, and Toast library `notie` to clearly communicate the current state.

 - For bundling and distribution, we utilize Tauri along with `GitHub Actions` 

 - We chose `Jest` and `jsDOM`  as our testing suite to test DOM changes and logic.

For more information on how to develop with Tauri, please refer to the [official Tauri documentation](https://tauri.studio/en/docs/getting-started/intro).


## How to run tests:

```bash
npm install
npm run test

