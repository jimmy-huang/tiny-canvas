import { JSCanvasRenderer } from './js-canvas-renderer.js';
let renderer = null; // web worker thread for canvas.js

self.onmessage = function (event) {
  switch (event.data.msg) {
    case 'initCanvas':
      renderer = new JSCanvasRenderer(event.data.canvas, event.data.predictionCanvas, event.data.desynchronized);
      break;

    case 'updateProperty':
      if (!renderer) return;
      renderer[event.data.name] = event.data.value;
      break;

    case 'resize':
      if (!renderer) return;
      renderer.resize(event.data.width, event.data.height);
      break;

    case 'clear':
      if (!renderer) return;
      renderer.clear();
      break;

    case 'beginPath':
      if (!renderer) return;
      renderer.beginPath(event.data.point);
      break;

    case 'addToPath':
      if (!renderer) return;
      renderer.addToPath(event.data.points, event.data.predictedPoints);
      break;

    case 'endPath':
      if (!renderer) return;
      renderer.endPath(event.data.point);
      break;

    case 'render':
      if (!renderer) return;
      renderer.render();
      break;

    default:
      console.error('Unhandled event', event.data.msg);
  }
};