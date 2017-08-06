import * as FunPaint from 'functional-paint';

const DEFAULT_CHANNEL_COUNT = 4;

export function hexColorToArray(hexColor: string, alpha: number = 1): array {
	let regex = /#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/;
	let red: number, green: number, blue: number;
	[, red, green, blue] = hexColor.match(regex);

	return [
		parseInt(red, 16),
		parseInt(green, 16),
		parseInt(blue, 16),
		alpha * 255
	];
}

function getStencilHeight(buffer, width) {
	return (buffer.length / DEFAULT_CHANNEL_COUNT) / width;
}

function forEachColor(
	bgColors: array,
	fgColors: array,
	stencilWidth: number,
	stencilHeight: number,
	callback: mixed
) {
	for (let i = 0; i < bgColors.length; i++) {
		for (let j = 0; j < fgColors.length; j++) {
			let bgColor = hexColorToArray(bgColors[i]),
				fgColor = hexColorToArray(fgColors[j]);

			callback(bgColor, fgColor, i * stencilWidth, j * stencilHeight);
		}
	}
}

export function render(
	stencilBuffer: array,
	stencilWidth: number,
	bgColors: array,
	fgColors: array
) {
	let stencilHeight = getStencilHeight(stencilBuffer, stencilWidth);

	let stencil = FunPaint.createCanvasFromImageBuffer(
	 	stencilBuffer, stencilWidth, stencilHeight);

	let canvas = FunPaint.createCanvas(
		stencilWidth * bgColors.length,
		stencilHeight * fgColors.length
	);

	forEachColor(bgColors, fgColors, stencilWidth, stencilHeight,
		(bgColor, fgColor, x, y) => {
			canvas = FunPaint.drawRect(
				canvas, x, y, stencilWidth, stencilHeight, bgColor);

			let colored = FunPaint.replaceColor(stencil, [0, 0, 0], fgColor);
				canvas = FunPaint.drawCanvas(canvas, colored, x, y);
		});

	return canvas;
};
