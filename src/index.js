const FunPaint = require('functional-paint');
const {
	getCharacterCoordinatesOnStencil,
	getCharacterCoordinatesOnSprite,
	getCharacterCoordinatesOnSpriteInPixels,
	DIRECTION_TOP_TO_BOTTOM,
	DIRECTION_LEFT_TO_RIGHT,
} = require('./utils');

const DEFAULT_CHANNEL_COUNT = 4;

const getStencilHeight = function(buffer, width) {
	return buffer.length / DEFAULT_CHANNEL_COUNT / width;
};

const forEachColor = function(
	bgColors,
	fgColors,
	stencilWidth,
	stencilHeight,
	callback
) {
	for (let i = 0; i < bgColors.length; i++) {
		for (let j = 0; j < fgColors.length; j++) {
			const bgColor = FunPaint.hexColorToArray(bgColors[i]);
			const fgColor = FunPaint.hexColorToArray(fgColors[j]);

			callback(bgColor, fgColor, i * stencilWidth, j * stencilHeight);
		}
	}
};

const renderGlyphs = function(stencil, width, fgColor) {
	return FunPaint.mapPixels(
		stencil,
		width,
		(x, y, pos, color) => (color[3] !== 0x00 ? fgColor : color)
	);
};

const render = function(stencilBuffer, stencilWidth, bgColors, fgColors) {
	const stencilHeight = getStencilHeight(stencilBuffer, stencilWidth);
	const width = stencilWidth * bgColors.length;
	const height = stencilHeight * fgColors.length;

	let buffer = FunPaint.createImageBuffer(width, height);

	forEachColor(
		bgColors,
		fgColors,
		stencilWidth,
		stencilHeight,
		(bgColor, fgColor, x, y) => {
			buffer = FunPaint.drawRect(
				buffer,
				width,
				x,
				y,
				stencilWidth,
				stencilHeight,
				bgColor
			);

			let colored = renderGlyphs(stencilBuffer, stencilWidth, fgColor);

			buffer = FunPaint.drawBuffer(
				buffer,
				width,
				colored,
				stencilWidth,
				x,
				y
			);
		}
	);

	return buffer;
};

module.exports = {
	getCharacterCoordinatesOnStencil,
	getCharacterCoordinatesOnSprite,
	getCharacterCoordinatesOnSpriteInPixels,
	DIRECTION_TOP_TO_BOTTOM,
	DIRECTION_LEFT_TO_RIGHT,
	render,
};
