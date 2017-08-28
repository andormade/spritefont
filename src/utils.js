export const DIRECTION_TOP_TO_BOTTOM = Symbol('ttb');
export const DIRECTION_LEFT_TO_RIGHT = Symbol('ltr');

export function getCharacterCoordinatesOnStencil(
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

export function getCharacterCoordinatesOnSprite(
	sprite: object,
	bgColor: string,
	fgColor: string,
	rows: number,
	cols: number,
	pos: number,
	direction: mixed = DIRECTION_TOP_TO_BOTTOM
) {
	let bgColorPos = sprite.bgColors.indexOf(bgColor);
	let fgColorPos = sprite.fgColors.indexOf(fgColor);
	let [x, y] = getCharacterCoordinatesOnStencil(rows, cols, pos, direction);

	return [
		x + bgColorPos * cols,
		y + fgColorPos * rows
	];
}

export function getCharacterCoordinatesOnSpriteInPixels(
	sprite: object,
	bgColor: string,
	fgColor: string,
	rows: number,
	cols: number,
	pos: number,
	direction: mixed = DIRECTION_TOP_TO_BOTTOM
) {
	let [x, y] = getCharacterCoordinatesOnSprite(
		sprite, bgColor, fgColor, rows, cols, pos, direction);
	let characterWidth = sprite.stencilWidth / cols;
	let characterHeight = sprite.stencilHeight / rows;

	return [
		x * characterWidth,
		y * characterHeight
	];
}
