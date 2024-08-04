import { logger } from "./utils/logger";

export function drawOnCanvasWithOnlyMouseMovement(canvas: HTMLCanvasElement): void {
    // let isOnCanvas = false;
    var simulateMouseDownEvent = new MouseEvent("mousedown");

    if (canvas) {
        canvas.addEventListener('mouseover', () => {
            canvas.dispatchEvent(simulateMouseDownEvent);
        });
        // prevent default behavior on mouse click
        canvas.addEventListener('click', () => {
            canvas.dispatchEvent(simulateMouseDownEvent);
        });

        // canvas.addEventListener('mouseenter', () => {
        //     if (startPressed) {
        //         isDrawing = true;
        //     }
        // });

        // canvas.addEventListener('mouseleave', () => {
        //     isDrawing = false;
        // });

        // canvas.addEventListener('mousemove', (event) => {
        //     if (isDrawing) {
        //         // Drawing logic here
        //     }
        // });

    } else {
        logger("Error: Canvas not found.")
    }


    // drawing behavior for test
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;

    canvas.width = window.innerWidth - canvasOffsetX;
    canvas.height = window.innerHeight - canvasOffsetY;

    let isPainting = false;
    let lineWidth = 5;
    let startX;
    let startY;

    const draw = (e: { clientX: number; clientY: number; }) => {
        if(!isPainting) {
            return;
        }

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';

        ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
        ctx.stroke();
    }

    canvas.addEventListener('mousedown', (e) => {
        isPainting = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    canvas.addEventListener('mouseup', () => {
        isPainting = false;
        ctx.stroke();
        ctx.beginPath();
    });

    canvas.addEventListener('mousemove', draw);
}
