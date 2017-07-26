const CHANNEL_RED = 0;
const CHANNEL_GREEN = 1;
const CHANNEL_BLUE = 2;
const CHANNEL_ALPHA = 3;
const RGB = 3;
const RGBA = 4;

function getChannelCount(canvas) {
	return canvas.hasAlphaChannel ? RGBA : RGB;
}

function bytePosition2Coordinates(canvas, pos) {
	let byteWidth = canvas.width * getChannelCount(canvas);
	return [Math.floor(pos / byteWidth), pos % byteWidth / getChannelCount(canvas)];
}

function coordinates2bytePosition(canvas, x, y) {
	return y * canvas.width * getChannelCount(canvas) + x;
}

export function createCanvas(width, height, hasAlphaChannel = true) {
	let channels = hasAlphaChannel ? RGBA : RGB;

	return {
		width           : width,
		height          : height,
		hasAlphaChannel : hasAlphaChannel,
		data            : new Uint8Array(width * height * channels).fill(0)
	};
}

export function createCanvasFromImageBuffer(imageBuffer, width, height, hasAlphaChannel = true) {
	let canvas = createCanvas(width, height, hasAlphaChannel);
	canvas.data = [...imageBuffer];
	return canvas;
}

export function cloneCanvas(canvas) {
	return createCanvasFromImageBuffer(
		[...canvas.data], canvas.width, canvas.height, canvas.hasAlphaChannel
	);
}

export function drawPixel(canvas, x, y, color) {
	let [red, green, blue, alpha] = color;

	let newCanvas = cloneCanvas(canvas);

	newCanvas.data[coordinates2bytePosition(canvas, x, y) + CHANNEL_RED] = red;
	newCanvas.data[coordinates2bytePosition(canvas, x, y) + CHANNEL_GREEN] = green;
	newCanvas.data[coordinates2bytePosition(canvas, x, y) + CHANNEL_BLUE] = blue;

	return newCanvas;
}

export function drawRect(canvas, x, y, width, height, color) {
	let [red, green, blue, alpha] = color;

	let newCanvas = cloneCanvas(canvas);

	for (let i = x; i < x + width; i++) {
		for (let j = y; j < y + height; j++) {
			newCanvas.data[coordinates2bytePosition(canvas, i, j) + CHANNEL_RED] = red;
			newCanvas.data[coordinates2bytePosition(canvas, i, j) + CHANNEL_GREEN] = green;
			newCanvas.data[coordinates2bytePosition(canvas, i, j) + CHANNEL_BLUE] = blue;
 		}
	}

	return newCanvas;
}

export function getColor(canvas, x, y) {
	return canvas[coordinates2bytePosition(canvas, x, y)];
}
