export const DIRECTION_TOP_TO_BOTTOM = Symbol('ttb');
export const DIRECTION_LEFT_TO_RIGHT = Symbol('ltr');

export function getCharacterCoordinatesOnStencil(
	rows,
	cols,
	pos,
	direction = DIRECTION_TOP_TO_BOTTOM
) {
	if (direction === DIRECTION_LEFT_TO_RIGHT) {
		return [pos % rows, Math.floor(pos / rows)];
	}

	return [Math.floor(pos / cols), pos % cols];
}

export function getCharacterCoordinatesOnSprite(
	indexOfBgColor,
	indexOfFgColor,
	rows,
	cols,
	pos,
	direction = DIRECTION_TOP_TO_BOTTOM
) {
	const [x, y] = getCharacterCoordinatesOnStencil(rows, cols, pos, direction);

	return [x + indexOfBgColor * cols, y + indexOfFgColor * rows];
}

export function getCharacterCoordinatesOnSpriteInPixels(
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
}
