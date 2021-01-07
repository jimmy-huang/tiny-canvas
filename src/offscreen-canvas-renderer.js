import { BaseCanvasRenderer } from './base-canvas-renderer.js';
import { BaseCanvas } from './base-canvas.js';

export class OffscreenCanvasRenderer extends BaseCanvasRenderer {

  constructor(canvas, predictionCanvas, desynchronized) {
    super(canvas, predictionCanvas);
    this._offscreenCanvas = canvas.transferControlToOffscreen();
    this._offscreenPredictionCanvas = predictionCanvas.transferControlToOffscreen();
    this._worker = new Worker(new URL('./canvas-worker.js', import.meta.url), { type: 'module' });
    if (!this._worker) {
      console.error('Cannot load web worker');
      return;
    }

    this._worker.postMessage(
      {
        msg: 'initCanvas',
        canvas: this._offscreenCanvas,
        predictionCanvas: this._offscreenPredictionCanvas,
        desynchronized: desynchronized
      }, [this._offscreenCanvas, this._offscreenPredictionCanvas]
    );
    console.log('Offscreen Canvas2D with web worker loaded, desynchronized:', desynchronized);
  }

  updateProperty(name, value) {
    if (this._worker) {
      this._worker.postMessage({
        msg: 'updateProperty',
        name: name,
        value: value
      });
    }
  }

  resize(width, height) {
    if (this._worker) {
      this._worker.postMessage({
        msg: 'resize',
        width: width,
        height: height
      });
    }
  }

  beginPath(point) {
    if (this._worker) {
      this._worker.postMessage({
        msg: 'beginPath',
        point: point
      });
    } 
  }

  addToPath(points, predictedPoints) {
    if (this._worker) {
      this._worker.postMessage({
        msg: 'addToPath',
        points: points,
        predictedPoints: predictedPoints
      });
    }
  }

  endPath(point) {
    if (this._worker) {
      this._worker.postMessage({
        msg: 'endPath',
        point: point
      });
    }
  }

  clear() {
    if (this._worker) {
      this._worker.postMessage({
        msg: 'clear',
      });
    }
  }

  render() {
    if (this._worker) {
      this._worker.postMessage({
        msg: 'render',
      });
    }
  }
}