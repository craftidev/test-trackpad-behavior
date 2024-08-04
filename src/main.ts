import { invoke } from "@tauri-apps/api/core"
import { listen } from '@tauri-apps/api/event';

const logger = document.getElementById('logger');

type Payload = {
    message: string;
};
if (logger) {
    logger.innerText += window.location.origin + '\n';
}

async function startSerialEventListener() {
    if (logger) {
        logger.innerText += "Starting event listeners\n";
    }

    await listen<Payload>('event-name', (event) => {
        if (logger) {
            logger.innerText += "Event triggered from Rust! Payload: " + event.payload.message + '\n';
        }
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
    const logger = document.getElementById('logger');
    if (logger) {
        logger.innerText += "Start button clicked\n";
    }
    startSerialEventListener();
    invoke('test_app_handle').then(() => {
        if (logger) {
            logger.innerText += "Test command invoked\n";
        }
    }).catch((e) => {
        if (logger) {
            logger.innerText += "Failed to invoke test command: " + e + '\n';
        }
    });
});
