export class CanvasElement {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw() {
    throw new Error("Draw method should be implemented");
  }
}
