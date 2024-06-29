# Anti-AFK Application

This application is designed to help users avoid being marked as "Away" or "AFK".

To download the installer, go to [this GitHub release page](https://github.com/jualon92/simpleAntiAfk/releases/tag/app-v0.0.1) or visit [this CloudNebula page](https://web.crabnebula.cloud/software-las-acacias/simple-anti-afk/releases).


## How it works:

- **Key Press Simulation:** Simulates pressing the F19 key to prevent the system from detecting inactivity. 

## Features:

- **Non-obtrusive:** Key F19 was selected to operate discreetly without disrupting daily operations.
- **Modern UI:** Uses Tailwind CSS and Toasts to clearly communicate the current state.
- **Discrete:** App can be hidden from the toolbar or managed directly from the system tray.
- **Cross-platform:** Thanks to Tauri, it can be bundled for Windows, Linux, and macOS.

## Development:

This application was developed using Tauri, a secure, lightweight, and cross-platform desktop application framework.


 - For the frontend UI, we utilized `Tailwind CSS` and Toast library `notie` to clearly communicate the current state.

 - For bundling and distribution, we utilize Tauri along with `GitHub Actions` and CloudNebula.

 - We chose `Jest` and `jsDOM`  as our testing suite to test DOM changes and logic.

For more information on how to develop with Tauri, please refer to the [official Tauri documentation](https://tauri.studio/en/docs/getting-started/intro).


## How to run tests:

```bash
npm install
npm run test

