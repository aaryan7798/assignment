import React, { useRef, useState, useEffect } from "react";
import TextBlock from "../classes/TextBlock";
import { CTA } from "../classes/Caption"; // Adjust the path as necessary
import { SketchPicker } from "react-color";

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState("#0369A1");
  const [captionText, setCaptionText] = useState("1 & 2 BHK ");
  const [ctaText, setCtaText] = useState("Shop Now");
  const [uploadedImage, setUploadedImage] = useState("path/to/your/default/image.png"); // Set path to your default image
  const [colorHistory, setColorHistory] = useState([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

   // Load and draw the image
const image = new Image();
image.src = uploadedImage;
image.onload = () => {
  const imageX = 10; // X position
  const imageY = 100; // Y position
  const imageWidth = canvas.width - 20; // Image width
  const imageHeight = imageWidth * (image.naturalHeight / image.naturalWidth); // Maintain aspect ratio
  ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);

  // Optionally, draw a background color for the text if needed
  const padding = 10; // Adjust padding around text
  const textX = 10;
  const textY = canvas.height - imageY; // Adjusted to be near the bottom of the canvas
  ctx.font = "23px Arial"; // Match font size to TextBlock's fontSize for correct background sizing
  const textMetrics = ctx.measureText(captionText);
  const textWidth = textMetrics.width ;
  const textHeight =  20; // Assuming 44px font size, adjust based on actual size

  // Calculate background rectangle dimensions based on text size
  const bgRectX = textX + 15;
  const bgRectY = textY;
  const bgRectWidth = textWidth;
  const bgRectHeight = textHeight + 10;

  ctx.fillStyle = "#FF5733"; // Background color for text
  ctx.fillRect(bgRectX, bgRectY, bgRectWidth, bgRectHeight); // Draw background rectangle

  // Draw the caption text over the image
  const cta1 = new TextBlock(ctx, {
    text: captionText,
    position: { x: textX, y: textY },
    fontSize: 20,
    textColor: "#FFFFFF",
    maxWidth: canvas.width - imageX * 2, // Assuming same horizontal padding as image
  });
  cta1.draw();

  // Draw the CTA text
  const cta = new CTA(ctx, {
    text: ctaText,
    position: { x: canvas.width - imageX - 200, y: canvas.height - imageY - 300 }, // Example position
    textColor: "#FFFFFF",
    backgroundColor: "#FF5733",
  });
  cta.draw();

};

  }, [backgroundColor, captionText, ctaText, uploadedImage]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleCaptionChange = (e) => {
    setCaptionText(e.target.value);
  };

  const handleCtaChange = (e) => {
    setCtaText(e.target.value);
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color.hex);
    if (!colorHistory.includes(color.hex)) {
      setColorHistory([...colorHistory.slice(-4), color.hex]);
    }
    setIsPickerVisible(false);
  };

  const toggleColorPicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  return (
    <div className="flex h-screen bg-purple-400"> {/* Background color of the entire viewport */}
      <div className="flex w-1/2 justify-center items-start pt-40"> {/* Container for the left side */}
        {/* Box for the canvas with shadow and rounded corners */}
        <div className="shadow-lg rounded-lg overflow-hidden">
          <canvas ref={canvasRef} width="400" height="400" className="border bg-white" />
        </div>
      </div>
  
      {/* Right column for the form */}
<div className="w-1/2 flex flex-col px-8 py-14 bg-blue-300"> {/* Changed bg-white to bg-red-200 */}
  {/* Close button at the top right */}
  <div className="mb-8 self-end">
    <button className="text-gray-600 hover:text-gray-900">
      <span className="text-xl">&times;</span>
    </button>
  </div>

  {/* Ad customization form */}
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start">
    <h2 className="text-xl font-semibold mb-6">Ad customization</h2>
    <p className="text-sm mb-6">Customize your ad and get the templates accordingly</p>

    {/* Upload button */}
    <div className="mb-6 w-full">
      <label htmlFor="image-upload" className="block text-gray-700 text-sm font-bold mb-2">
        Change the ad creative image:
      </label>
      <input id="image-upload" type="file" onChange={handleImageUpload} className="shadow border rounded py-2 px-3 text-gray-700 leading-tight w-full cursor-pointer" />
    </div>

    {/* Ad content input */}
    <div className="mb-6 w-full">
      <label htmlFor="ad-content" className="block text-gray-700 text-sm font-bold mb-2">
        Ad Content:
      </label>
      <input id="ad-content" type="text" value={captionText} onChange={handleCaptionChange} className="shadow border rounded py-2 px-3 text-gray-700 leading-tight w-full" placeholder="Enter ad content here" />
    </div>

    {/* CTA input */}
    <div className="mb-6 w-full">
      <label htmlFor="cta-text" className="block text-gray-700 text-sm font-bold mb-2">
        CTA Text:
      </label>
      <input id="cta-text" type="text" value={ctaText} onChange={handleCtaChange} className="shadow border rounded py-2 px-3 text-gray-700 leading-tight w-full" placeholder="Enter CTA here" />
    </div>

    {/* Color picker and recent colors */}
    <div className="mb-6 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Choose your color
      </label>
      <div className="flex space-x-2">
        {colorHistory.map((color, index) => (
          <div key={index} className="w-6 h-6 rounded-full cursor-pointer" style={{ backgroundColor: color }} onClick={() => setBackgroundColor(color)}></div>
        ))}
        <button onClick={() => setIsPickerVisible(true)} className="ml-2">
          <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
            <span className="text-sm">+</span>
          </div>
        </button>
        {isPickerVisible && (
          <SketchPicker color={backgroundColor} onChangeComplete={handleBackgroundColorChange} className="mt-2 absolute" />
        )}
      </div>
    </div>
  </div>
</div>

    </div>
  );
  
};

export default CanvasEditor;
