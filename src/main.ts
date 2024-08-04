import { invoke } from "@tauri-apps/api/core"
import { logger } from "./utils/logger";
import { startSerialEventListener } from "./events";

document.getElementById('start-button')?.addEventListener('click', () => {
    logger("Start button clicked");

    startSerialEventListener();

    invoke('test_app_handle').then(() => {
        logger("Test command invoked");
    }).catch((e) => {
        logger("Failed to invoke test command: " + e);
    });
});
