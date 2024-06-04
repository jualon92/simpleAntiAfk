# Anti-AFK Application

This application is designed to help users avoid being marked as "Away" or "AFK". 
It uses Tauri, a secure, lightweight, and cross-platform desktop application framework

## Features

- **Key Press Simulation**: Simulates pressing the F23 key to prevent the system from detecting inactivity.<b> The F23 key was chosen to minimize interference with the user's normal activities. </b> 

## How to Use

1. Download and install the application.
2. Click the "Start" button to start the automatic actions.
3. To stop the automatic actions, click the "Stop" button.

## Development

This application was developed using Tauri for the desktop application framework. 
For the frontend UI, we chose to use vanilla JavaScript and TypeScript due to their lightweight nature, along with Bulma CSS for its compact package size.
For more information on how to develop with Tauri, please refer to the [official Tauri documentation](https://tauri.studio).


## TODO
- **Configurable**: Users can configure the interval between automatic actions / which key to use.

## License

This application is distributed under the MIT license. Please refer to the `LICENSE` file for more details.