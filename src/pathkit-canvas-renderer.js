import { BaseCanvasRenderer } from './base-canvas-renderer.js';
import PathKitInit from 'pathkit-wasm/bin/pathkit';

let PathKit = null;

export class PathKitCanvasRenderer extends BaseCanvasRenderer {

  constructor(canvas, predictionCanvas, desynchronized) {
    super(canvas, predictionCanvas);
    this._context = this._canvas.getContext('2d', { desynchronized: desynchronized });
    this._predictionContext = this._predictionCanvas.getContext('2d', { desynchronized: desynchronized });

    if (!this._context || !this._predictionContext) {
      console.error('Your browser doesn\'t support canvas, this demo won\'t work');
      return;
    }

    this._context.lineCap = this._predictionContext.lineCap = 'round';
    this._context.lineJoin = this._predictionContext.lineJoin = 'round';
    this._context.shadowBlur = this._predictionContext.shadowBlur = 2;

    PathKitInit({
      locateFile: (file) => './wasm/' + file,
    }).then((pathkit) => {
      PathKit = pathkit;
      console.log('Canvas2D with PathKit loaded, desynchronized:', desynchronized);
    });
  }

  resize(width, height) {
    this._canvas.width  = this._predictionCanvas.width = width;
    this._canvas.height =  this._predictionCanvas.height = height;
  }

  beginPath(point) {
    this._points.push(point);
  }

  addToPath(points, predictedPoints) {
    if (!points)
      return;
    this._points.push(...points);
    this._predictedPoints = predictedPoints;
  }

  endPath(point) {
    if (this._drawPredictedEvents)
      this._predictionContext.clearRect(0, 0,
        this._predictionContext.canvas.width, this._predictionContext.canvas.height);
    this._points = [];
    this._predictedPoints = [];
  }

  clear() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._predictionContext.clearRect(0, 0,
      this._predictionContext.canvas.width, this._predictionContext.canvas.height);
    this._points = [];
    this._predictedPoints = [];
  }

  render() {
    if(this._points.length > 0) {
      if (this._drawPointsOnly)
        this._drawPoints(this._context);
      else
        this._drawStroke(this._context);

      if (this._drawPredictedEvents && this._predictedPoints.length > 0) {
        // This will clear the canvas (which include the previous predictions).
        this._predictionContext.clearRect(0, 0,
          this._predictionContext.canvas.width, this._predictionContext.canvas.height);
        if (this._drawPointsOnly)
          this._strokePredictedPoints(this._predictionContext);
        else
          this._strokePredictedEvents(this._predictionContext);
      }

      // Drop all previous coalesced pointer events except for the last one
      // which is used for the next start position for the stroke.  If
      // coalesced events were not used, then the last point will always be
      // the current x y position of pointerMove event.
      this._points.splice(0, this._points.length-1);
      this._predictedPoints = [];
    }
  }

  _drawStroke(context) {
    if (this._points.length < 2) {
      context.beginPath();
      context.fillStyle = this.getCurrentColor(this._points[0]);
      let radius;
      if (this._drawWithPressure)
        radius = this._currentLineWidth * this._points[0].pressure;
      else
        radius = this._currentLineWidth / 2;
    }

    let i;
    for (i = 0; i < this._points.length-1; i++) {
      let path = this._createPath(this._points[i].x, this._points[i].y, this._points[i+1].x, this._points[i+1].y);
      // NOTE: there's a bug in the arc() function using PathKit in wasm
      // so until that's fixed, we can only create a fixed width path rather
      // that a variable path, it will be slightly less ideal
      if (this._drawWithPressure)
        context.lineWidth = this._currentLineWidth * this._points[i].pressure * 2;
      else
        context.lineWidth = this._currentLineWidth;
      context.lineCap = 'round';
      context.strokeStyle = this.getCurrentColor(this._points[i]);
      context.stroke(path.toPath2D());
      path.delete(); // clean up wasm memory
    }
  }

  _drawPoints(context) {
    if (this._points.length < 2) {
      context.beginPath();
      context.fillStyle = this.getCurrentColor(this._points[0]);
      context.arc(this._points[0].x,  this._points[0].y, 3, 0, Math.PI * 2, true);
      context.fill();
      return;
    }

    let i;
    for (i = 1; i < this._points.length-1; i++) {
      context.beginPath();
      context.fillStyle = this.getCurrentColor(this._points[i]);
      context.arc(this._points[i].x, this._points[i].y, 2, 0, Math.PI * 2, true);
      context.stroke();
    }

    context.beginPath();
    context.fillStyle = this.getCurrentColor(this._points[i]);
    context.arc(this._points[i].x, this._points[i].y, 3, 0, Math.PI * 2, true);
    context.fill();
  }

  _createPath(x1, y1, x2, y2) {
    // FIXME: there's a bug in the arc() function using PathKit in wasm
    // so until that's fixed, we can only create a fixed width path rather
    // that a variable path, it will be slightly less ideal
    const path = PathKit.NewPath();
    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
    return path;
  }

  _strokePredictedEvents(context) {
    if (this._points.length > 0 && this._predictedPoints.length > 0) {
      let lastPoint = this._points[this._points.length-1];
      if (this._drawWithPressure)
        context.lineWidth =  this._currentLineWidth * lastPoint.pressure * 2;
      else
        context.lineWidth = this._currentLineWidth;
      context.lineCap = 'round';
      context.strokeStyle = 'red';

      let path = this._createPath(lastPoint.x, lastPoint.y, this._predictedPoints[0].x, this._predictedPoints[0].y);
      context.stroke(path.toPath2D());
      path.delete(); // clean up wasm memory

      let i;
      for (i = 0; i < this._predictedPoints.length-1; i++) {
        path = this._createPath(this._predictedPoints[i].x, this._predictedPoints[i].y, this._predictedPoints[i+1].x, this._predictedPoints[i+1].y);
        context.stroke(path.toPath2D());
        path.delete(); // clean up wasm memory
      }
    }
  }

  _strokePredictedPoints(context) {
    let i;
    let lastPoint = this._points[this._points.length-1];
    for (i = 0; i < this._predictedPoints.length; i++) {
      context.beginPath();
      if (this._highlightPredictedEvents)
        context.fillStyle = 'red';
      else
        context.fillStyle = this.getCurrentColor(lastPoint);
      context.arc(this._predictedPoints[i].x, this._predictedPoints[i].y, 3, 0, Math.PI * 2, true);
      context.fill();
    }
  }
}
