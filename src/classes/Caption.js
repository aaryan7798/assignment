// Assuming the file path is correct based on your structure
export class CTA {
  constructor(ctx, { text, position, textColor, backgroundColor }) {
    this.ctx = ctx;
    this.text = text;
    this.position = position;
    this.textColor = textColor;
    this.backgroundColor = backgroundColor;
    this.ctx.fillStyle = "black"; // Set text color to black
  }

  draw() {
    this.ctx.font = "20px Arial"; // Set font for accurate width measurement and drawing
    const textMetrics = this.ctx.measureText(this.text);
    const textWidth = textMetrics.width;
    const padding = 10;
    const margin = 20;
    const rectHeight = 0;

    // Adjust background rectangle drawing
    this.ctx.fillStyle = "black"; // Set background color to black
    this.ctx.fillRect(
        this.position.x - (textWidth + padding) / 2, // Center the background on the text
        this.position.y - rectHeight, // Align the top of the rectangle with the text
        textWidth + padding,
        rectHeight
    );

    // Set text color to black
    this.ctx.fillStyle = "black";

    // Adjust text drawing to position it at the top of the rectangle
    this.ctx.fillText(
        this.text,
        this.position.x - textWidth / 2,
        this.position.y - rectHeight + 20 // Adjust based on font size to position the text at the top
    );
}
}