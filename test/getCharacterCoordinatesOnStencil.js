
var SpriteFont = require('../dist/index.js'),
	fs = require('fs'),
	assert = require('assert'),
	PNG = require('pngjs').PNG;

describe('getCharacterCoordinatesOnStencil', function() {
	it('should return', function() {
		const stencil = PNG.sync.read(fs.readFileSync('./test/numeric.png'));

		const spritefont = SpriteFont.render(
			stencil.data,
			26,
			['#ffffff'],
			['#ffffff']
		);

		assert.deepEqual(SpriteFont.getCharacterCoordinatesOnStencil(2, 5, 0), [
			0,
			0
		]);
		assert.deepEqual(SpriteFont.getCharacterCoordinatesOnStencil(2, 5, 1), [
			0,
			1
		]);
		assert.deepEqual(SpriteFont.getCharacterCoordinatesOnStencil(2, 5, 2), [
			0,
			2
		]);
		assert.deepEqual(SpriteFont.getCharacterCoordinatesOnStencil(2, 5, 3), [
			0,
			3
		]);
		assert.deepEqual(SpriteFont.getCharacterCoordinatesOnStencil(2, 5, 4), [
			0,
			4
		]);
		assert.deepEqual(SpriteFont.getCharacterCoordinatesOnStencil(2, 5, 5), [
			1,
			0
		]);
		assert.deepEqual(SpriteFont.getCharacterCoordinatesOnStencil(2, 5, 6), [
			1,
			1
		]);
		assert.deepEqual(SpriteFont.getCharacterCoordinatesOnStencil(2, 5, 7), [
			1,
			2
		]);
		assert.deepEqual(SpriteFont.getCharacterCoordinatesOnStencil(2, 5, 8), [
			1,
			3
		]);
		assert.deepEqual(SpriteFont.getCharacterCoordinatesOnStencil(2, 5, 9), [
			1,
			4
		]);
	});

	it('should return', function() {
		const stencil = PNG.sync.read(fs.readFileSync('./test/numeric.png'));

		const spritefont = SpriteFont.render(
			stencil.data,
			26,
			['#ffffff'],
			['#ffffff']
		);

		assert.deepEqual(
			SpriteFont.getCharacterCoordinatesOnStencil(
				2,
				5,
				0,
				SpriteFont.DIRECTION_LEFT_TO_RIGHT
			),
			[0, 0]
		);
		assert.deepEqual(
			SpriteFont.getCharacterCoordinatesOnStencil(
				2,
				5,
				1,
				SpriteFont.DIRECTION_LEFT_TO_RIGHT
			),
			[1, 0]
		);
		assert.deepEqual(
			SpriteFont.getCharacterCoordinatesOnStencil(
				2,
				5,
				2,
				SpriteFont.DIRECTION_LEFT_TO_RIGHT
			),
			[0, 1]
		);
		assert.deepEqual(
			SpriteFont.getCharacterCoordinatesOnStencil(
				2,
				5,
				3,
				SpriteFont.DIRECTION_LEFT_TO_RIGHT
			),
			[1, 1]
		);
		assert.deepEqual(
			SpriteFont.getCharacterCoordinatesOnStencil(
				2,
				5,
				4,
				SpriteFont.DIRECTION_LEFT_TO_RIGHT
			),
			[0, 2]
		);
		assert.deepEqual(
			SpriteFont.getCharacterCoordinatesOnStencil(
				2,
				5,
				5,
				SpriteFont.DIRECTION_LEFT_TO_RIGHT
			),
			[1, 2]
		);
		assert.deepEqual(
			SpriteFont.getCharacterCoordinatesOnStencil(
				2,
				5,
				6,
				SpriteFont.DIRECTION_LEFT_TO_RIGHT
			),
			[0, 3]
		);
		assert.deepEqual(
			SpriteFont.getCharacterCoordinatesOnStencil(
				2,
				5,
				7,
				SpriteFont.DIRECTION_LEFT_TO_RIGHT
			),
			[1, 3]
		);
		assert.deepEqual(
			SpriteFont.getCharacterCoordinatesOnStencil(
				2,
				5,
				8,
				SpriteFont.DIRECTION_LEFT_TO_RIGHT
			),
			[0, 4]
		);
		assert.deepEqual(
			SpriteFont.getCharacterCoordinatesOnStencil(
				2,
				5,
				9,
				SpriteFont.DIRECTION_LEFT_TO_RIGHT
			),
			[1, 4]
		);
	});
});
