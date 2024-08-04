# GOAL
Win application. Transform your trackpad into a signature pad like iOS laptop does with Annotate>Sign feature.

# Implemented:
- Bezier curve smoothing
- Clipboard save
- Listen/Emit global mouse position

# Solutions, not implemented

**Simulating Mouse Clicks or Changing Canvas Behavior**
   - **Option 1**: Test if the canvas can be configured to draw based solely on mouse movement without requiring a mouse click.
   - **Option 2**: Test if you can programmatically simulate mouse click events to enable drawing on the canvas. This might involve sending synthetic events to the canvas to simulate drawing actions.

   Solution:

   First, we can customize the lib signature_pad to behave like we want too, draw with movement without needing a click.

   But if needed we definetly can trick mouse events:
```typescript
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
        // ...
```

# TODOs

## **Pointer Centering**
   - Test if you can programmatically center the mouse pointer on the canvas when the user starts signing. This might involve using JavaScript or a native API to set the mouse position.
   - **Fallback Option**: If direct pointer manipulation is not possible, test the feasibility of adjusting the reported coordinates to simulate starting from the center.

## **Calibration of Trackpad**
   - Implement and test a procedure to calibrate the trackpad by capturing the maximum and minimum coordinates as the user traces the edges.
   - Ensure the calibration data is accurate and consistent, and test the edge cases where the user might not touch the exact edges.

## **Coordinate Conversion**
   - Test the conversion of trackpad coordinates to canvas coordinates, ensuring the conversion accounts for different aspect ratios and resolutions.
   - Verify that the drawing on the canvas accurately reflects the trackpad movements without any distortions or inaccuracies.

## **Trackpad Sensitivity and Acceleration**
   - Investigate if there are any system settings or libraries that can be used to normalize trackpad sensitivity and acceleration effects.
   - Test the impact of trackpad acceleration on the accuracy of the drawing and determine if any adjustments are needed to account for this.
