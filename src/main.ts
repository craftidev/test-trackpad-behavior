import { invoke } from "@tauri-apps/api/core"
import { logger } from "./utils/logger";
import { startSerialEventListener } from "./events";
import { drawOnCanvasWithOnlyMouseMovement } from "./canvas";

document.getElementById('start-button')?.addEventListener('click', () => {
    const canvas = document.getElementById('signature-pad') as HTMLCanvasElement;
    logger("Start button clicked");

    startSerialEventListener();
    drawOnCanvasWithOnlyMouseMovement(canvas);

    invoke('test_app_handle').then(() => {
        logger("Test command invoked");
    }).catch((e) => {
        logger("Failed to invoke test command: " + e);
    });
});
