import * as FunPaint from 'functional-paint';
import { getCharacterCoordinatesOnStencil, getCharacterCoordinatesOnSprite,
	getCharacterCoordinatesOnSpriteInPixels, DIRECTION_TOP_TO_BOTTOM,
	DIRECTION_LEFT_TO_RIGHT } from './utils';

export { getCharacterCoordinatesOnStencil, getCharacterCoordinatesOnSprite,
	getCharacterCoordinatesOnSpriteInPixels, DIRECTION_TOP_TO_BOTTOM,
	DIRECTION_LEFT_TO_RIGHT }

const DEFAULT_CHANNEL_COUNT = 4;

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

function renderGlyphs(stencil, fgColor) {
	return FunPaint.mapPixels(stencil, (x, y, pos, color) => (
		color[3] !== 0x00) ? fgColor : color
	);
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

			let colored = renderGlyphs(stencil, fgColor);

			canvas = FunPaint.drawCanvas(canvas, colored, x, y);
		});

	return {
		bgColors      : [...bgColors],
		fgColors      : [...fgColors],
		stencilWidth  : stencilWidth,
		stencilHeight : stencilHeight,
		...canvas
	};
};
