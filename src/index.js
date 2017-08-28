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

function forEachColor(bgColors, fgColors, stencilWidth, stencilHeight, callback) {
	for (let i = 0; i < bgColors.length; i++) {
		for (let j = 0; j < fgColors.length; j++) {
			let bgColor = FunPaint.hexColorToArray(bgColors[i]),
				fgColor = FunPaint.hexColorToArray(fgColors[j]);

			callback(bgColor, fgColor, i * stencilWidth, j * stencilHeight);
		}
	}
}

function renderGlyphs(stencil, width, fgColor) {
	return FunPaint.mapPixels(stencil, width, true, (x, y, pos, color) => (
		color[3] !== 0x00) ? fgColor : color
	);
}

export function render(stencilBuffer, stencilWidth, bgColors, fgColors) {
	let stencilHeight = getStencilHeight(stencilBuffer, stencilWidth);
	let width = stencilWidth * bgColors.length;
	let height = stencilHeight * fgColors.length;

	let buffer = FunPaint.createImageBuffer(width, height);

	forEachColor(bgColors, fgColors, stencilWidth, stencilHeight,
		(bgColor, fgColor, x, y) => {
			buffer = FunPaint.drawRect(
				buffer, width, true, x, y, stencilWidth, stencilHeight, bgColor
			);

			let colored = renderGlyphs(stencilBuffer, stencilWidth, fgColor);

			buffer = FunPaint.drawBuffer(
				buffer, width, true, colored, stencilWidth, true, x, y);
		});

	return {
		bgColors      : [...bgColors],
		fgColors      : [...fgColors],
		stencilWidth  : stencilWidth,
		stencilHeight : stencilHeight,
		data          : buffer
	};
};
