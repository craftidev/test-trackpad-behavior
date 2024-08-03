const canvas = document.getElementById('signature-box') as HTMLCanvasElement;
const context = canvas.getContext('2d');
let isDrawing = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const startDrawing = (event: PointerEvent) => {
  isDrawing = true;
  context?.beginPath();
  context?.moveTo(event.clientX, event.clientY);
};

const draw = (event: PointerEvent) => {
  if (!isDrawing) return;
  context?.lineTo(event.clientX, event.clientY);
  context?.stroke();
};

const stopDrawing = () => {
  isDrawing = false;
  context?.closePath();
};

canvas.addEventListener('pointerdown', startDrawing);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', stopDrawing);
canvas.addEventListener('pointerleave', stopDrawing);
