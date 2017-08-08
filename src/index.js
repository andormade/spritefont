import * as FunPaint from 'functional-paint';

const DEFAULT_CHANNEL_COUNT = 4;

export const DIRECTION_TOP_TO_BOTTOM = Symbol('ttb');
export const DIRECTION_LEFT_TO_RIGHT = Symbol('ltr');

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
			let bgColor = FunPaint.hexColorToArray(bgColors[i]),
				fgColor = FunPaint.hexColorToArray(fgColors[j]);

			callback(bgColor, fgColor, i * stencilWidth, j * stencilHeight);
		}
	}
}

export function getCharacterCoordinates(
	rows: number,
	cols: number,
	pos: number,
	direction: mixed = DIRECTION_TOP_TO_BOTTOM
) {
	if (direction === DIRECTION_LEFT_TO_RIGHT) {
		return [
			pos % rows,
			Math.floor(pos / rows)
		];
	}

	return [
		Math.floor(pos / cols),
		pos % cols
	];
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
		stencilWidth * bgColors.length, stencilHeight * fgColors.length);

	forEachColor(bgColors, fgColors, stencilWidth, stencilHeight,
		(bgColor, fgColor, x, y) => {
			canvas = FunPaint.drawRect(
				canvas, x, y, stencilWidth, stencilHeight, bgColor);

			let colored = FunPaint.replaceColor(stencil, [0, 0, 0], fgColor);
			canvas = FunPaint.drawCanvas(canvas, colored, x, y);
		});

	return {
		bgColors     : [...bgColors],
		fgColors     : [...fgColors],
		stencilWidth : stencilWidth,
		...canvas
	};
};
