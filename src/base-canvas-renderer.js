export class BaseCanvasRenderer {

  set paths(paths) {
    this._paths = paths;
    this.updateProperty('paths', paths);
  }

  get paths() { return this._paths; }

  set currentColor(currentColor) {
    this._currentColor = currentColor;
    this.updateProperty('currentColor', currentColor);
  }

  get currentColor() { return this._currentColor; }

  set currentLineWidth(currentLineWidth) {
    this._currentLineWidth = currentLineWidth;
    this.updateProperty('currentLineWidth', currentLineWidth);
  }

  get currentLineWidth() { return this._currentLineWidth; }

  set drawCoalescedEvents(drawCoalescedEvents) {
    this._drawCoalescedEvents = drawCoalescedEvents;
    this.updateProperty('drawCoalescedEvents', drawCoalescedEvents);
  }

  get drawCoalescedEvents() { return this._drawCoalescedEvents; }

  set drawPointsOnly(drawPointsOnly) {
    this._drawPointsOnly = drawPointsOnly;
    this.updateProperty('drawPointsOnly', drawPointsOnly);
  }

  get drawPointsOnly() { return this._drawPointsOnly; }

  set drawPredictedEvents(drawPredictedEvents) {
    this._drawPredictedEvents = drawPredictedEvents;
    this.updateProperty('drawPredictedEvents', drawPredictedEvents);
  }

  get drawPredictedEvents() { return this._drawPredictedEvents; }

  set drawWithPreferredColor(drawWithPreferredColor) {
    this._drawWithPreferredColor = drawWithPreferredColor;
    this.updateProperty('drawWithPreferredColor', drawWithPreferredColor);
  }

  get drawWithPreferredColor() { return this._drawWithPreferredColor; }

  set drawWithPressure(drawWithPressure) {
    this._drawWithPressure = drawWithPressure;
    this.updateProperty('drawWithPressure', drawWithPressure);
  }

  get drawWithPressure() { return this._drawWithPressure; }

  set highlightPredictedEvents(highlightPredictedEvents) {
    this._highlightPredictedEvents = highlightPredictedEvents;
    this.updateProperty('highlightPredictedEvents', highlightPredictedEvents);
  }

  get highlightPredictedEvents() { return this._highlightPredictedEvents; }

  set numOfPredictionPoints(numOfPredictionPoints) {
    this._numOfPredictionPoints = numOfPredictionPoints;
    this.updateProperty('numOfPredictionPoints', numOfPredictionPoints);
  }

  get numOfPredictionPoints() { return this._numOfPredictionPoints; }

  constructor(canvas, predictionCanvas) {
    this._canvas = canvas;
    this._predictionCanvas = predictionCanvas;
    this._paths = [];
    this._currentPath = null;
    this._currentColor = '#000000';
    this._currentLineWidth = 1;
    this._drawCoalescedEvents = false;
    this._drawPointsOnly = false;
    this._drawPredictedEvents = false;
    this._drawWithPreferredColor = false;
    this._drawWithPressure = false;
    this._highlightPredictedEvents = false;
    this._numOfPredictionPoints = 1;
  }

  getCurrentColor(point) {
    if (point.preferredColor && this._drawWithPreferredColor)
      return point.preferredColor;
    else
      return point.color;
  }

  updateProperty(name, value) {
    console.log('renderer property', name, 'set to', value);
  }

  resize(width, height) {
    this._canvas.width  = this._predictionCanvas.width = width;
    this._canvas.height =  this._predictionCanvas.height = height;
  }

  undoPath() {
    this.clearCanvas();
    this.clearPredictionCanvas();

    let done = false;
    for (let i=this._paths.length-1; i >= 0; i--) {
      this._paths[i].rendered = false;
      if (!done && this._paths[i].display) {
        this._paths[i].display = false;
        done = true;
      }
    }
  }

  redoPath() {
    this.clearCanvas();
    this.clearPredictionCanvas();

    let done = false;
    for (let i=0; i < this._paths.length; i++) {
      this._paths[i].rendered = false;
      if (!done && !this._paths[i].display) {
        this._paths[i].display = true;
        done = true;
      }
    }
  }

  beginPath(point) {
    if (!this._currentPath)
      this._currentPath = new Path();
    this._currentPath.points.push(point);

    let fromIndex = -1;
    for (let i=this._paths.length-1; i >= 0; i--) {
      if (!this._paths[i].display) {
        fromIndex = i;
      }
    }

    if (fromIndex >= 0)
      this._paths.splice(fromIndex, this._paths.length);
  }

  addToPath(points, predictedPoints) {
    if (!points || !this._currentPath)
      return;

    this._currentPath.points.push(...points);
    this._currentPath.predictedPoints = predictedPoints;
  }

  endPath(point) {
    if (this._drawPredictedEvents)
      this.clearPredictionCanvas();

    this._currentPath.predictedPoints = [];
    this._currentPath.display = true;
    this._currentPath.rendered = false;
    this._paths.push(this._currentPath);
    this._currentPath = null;
  }

  deleteAllPaths() {
    this.clearCanvas();
    this.clearPredictionCanvas();
    this._paths = [];
    this._currentPath = null;
    this._points = [];
    this._predictedPoints = [];
  }

  clearCanvas() {
    console.error('base implementation not provided, must overwrite');
  }

  clearPredictionCanvas() {
    console.error('base implementation not provided, must overwrite');
  }

  render() {
    console.error('base implementation not provided, must overwrite');
  }
}

class Path {

  set points(points) {
    this._points = points;
  }

  get points() { return this._points; }

  set predictedPoints(predictedPoints) {
    this._predictedPoints = predictedPoints;
  }

  get predictedPoints() { return this._predictedPoints; }

  set display(display) {
    this._display = display;
  }

  get display() { return this._display; }

  set rendered(rendered) {
    this._rendered = rendered;
  }

  get rendered() { return this._rendered; }

  constructor() {
    this._points = [];
    this._predictedPoints = [];
    this._display = false;
    this._rendered = false;
  }
}
