// src/classes/ImageMask.js
export default class ImageMask {
  constructor(ctx, imageSrc, maskRect) {
    this.ctx = ctx;
    this.imageSrc = imageSrc;
    this.maskRect = maskRect; // { x, y, width, height }
  }

  draw() {
    const image = new Image();
    image.src = `${this.imageSrc}?${new Date().getTime()}`; // Avoid cache/CORS issues
    image.onload = () => {
      // Save the current context state (composite operation might change)
      this.ctx.save();
      this.ctx.globalCompositeOperation = 'source-in';
      this.ctx.drawImage(
        image,
        this.maskRect.x,
        this.maskRect.y,
        this.maskRect.width,
        this.maskRect.height
      );
      // Restore context state
      this.ctx.restore();
    };
  }
}
