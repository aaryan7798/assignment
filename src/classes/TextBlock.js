// src/classes/TextBlock.js
export default class TextBlock {
  constructor(ctx, { text, position, fontSize, textColor, maxWidth }) {
    this.ctx = ctx;
    this.text = text;
    this.position = position;
    this.fontSize = fontSize;
    this.textColor = textColor;
    this.maxWidth = maxWidth;
  }

  wrapText() {
    const lines = [];
    const words = this.text.split(" ");
    let currentLine = words[0];

    words.slice(1).forEach((word) => {
      const testLine = `${currentLine} ${word}`;
      this.ctx.font = `${this.fontSize}px Arial`; // Ensure font size is set for accurate measurement
      const metrics = this.ctx.measureText(testLine);
      if (metrics.width > this.maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  }

  draw() {
    // Define margin and padding values
    const margin = 20;
    const padding = 20;

    this.ctx.font = `${this.fontSize}px Arial`;
    this.ctx.fillStyle = this.textColor;
    this.ctx.textAlign = "left";

    const lines = this.wrapText();
    lines.forEach((line, index) => {
        // Calculate y-position with margin and padding
        const yPosition =
            this.position.y +
            margin + // Add margin
            index * (this.fontSize * 1.2 + padding); // Add padding between lines

        this.ctx.fillText(
            line,
            this.position.x + margin, // Add margin
            yPosition
        );
    });
}

}
