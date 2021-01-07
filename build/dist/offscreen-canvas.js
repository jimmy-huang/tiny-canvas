import { BaseCanvas } from './base-canvas.js';
import { OffscreenCanvasRenderer } from './offscreen-canvas-renderer.js';
export class OffscreenCanvas extends BaseCanvas {
  firstUpdated() {
    super.firstUpdated();

    if (!!this.canvas.transferControlToOffscreen) {
      this.renderer = new OffscreenCanvasRenderer(this.canvas, this.predictionCanvas, this.desynchronized);
    } else {
      console.error('Your browser doesn\'t support offscreen canvas,');
    }
  }

  constructor() {
    super();
  }

}
customElements.define('offscreen-canvas', OffscreenCanvas);