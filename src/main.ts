import { invoke } from "@tauri-apps/api/core"
import { listen } from '@tauri-apps/api/event';
import { logger } from "./utils/logger";

type Payload = {
    message: string;
};

logger(window.location.origin);

async function startSerialEventListener() {
    logger("Starting event listeners");

    await listen<Payload>('event-name', (event) => {
        logger("Event triggered from Rust! Payload: " + event.payload.message);
    });

    await listen<{ 0: number, 1: number }>('mouse_move', (event) => {
        const { 0: x, 1: y } = event.payload;
        const xCoordDiv = document.getElementById('x-coord');
        const yCoordDiv = document.getElementById('y-coord');

        if (xCoordDiv && yCoordDiv) {
            xCoordDiv.textContent = `X: ${x}`;
            yCoordDiv.textContent = `Y: ${y}`;
        }
    });
}

document.getElementById('start-button')?.addEventListener('click', () => {
    logger("Start button clicked");

    startSerialEventListener();

    invoke('test_app_handle').then(() => {
        logger("Test command invoked");
    }).catch((e) => {
        logger("Failed to invoke test command: " + e);
    });
});
