const DIRECTION_TOP_TO_BOTTOM = Symbol('ttb');
const DIRECTION_LEFT_TO_RIGHT = Symbol('ltr');

const getCharacterCoordinatesOnStencil = function(
	rows,
	cols,
	pos,
	direction = DIRECTION_TOP_TO_BOTTOM
) {
	if (direction === DIRECTION_LEFT_TO_RIGHT) {
		return [pos % rows, Math.floor(pos / rows)];
	}

	return [Math.floor(pos / cols), pos % cols];
};

const getCharacterCoordinatesOnSprite = function(
	indexOfBgColor,
	indexOfFgColor,
	rows,
	cols,
	pos,
	direction = DIRECTION_TOP_TO_BOTTOM
) {
	const [x, y] = getCharacterCoordinatesOnStencil(rows, cols, pos, direction);

	return [x + indexOfBgColor * cols, y + indexOfFgColor * rows];
};

const getCharacterCoordinatesOnSpriteInPixels = function(
	stencilWidth,
	stencilHeight,
	indexOfBgColor,
	indexOfFgColor,
	rows,
	cols,
	pos,
	direction = DIRECTION_TOP_TO_BOTTOM
) {
	const [x, y] = getCharacterCoordinatesOnSprite(
		indexOfBgColor,
		indexOfFgColor,
		rows,
		cols,
		pos,
		direction
	);
	const characterWidth = stencilWidth / cols;
	const characterHeight = stencilHeight / rows;

	return [x * characterWidth, y * characterHeight];
};

module.exports = {
	DIRECTION_TOP_TO_BOTTOM,
	DIRECTION_LEFT_TO_RIGHT,
	getCharacterCoordinatesOnStencil,
	getCharacterCoordinatesOnSprite,
	getCharacterCoordinatesOnSpriteInPixels,
};
