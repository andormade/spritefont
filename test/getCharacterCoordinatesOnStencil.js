var SpriteFont = require('../src/index.js'),
	fs = require('fs'),
	assert = require('assert'),
	PNG = require('pngjs').PNG;

describe('getCharacterCoordinatesOnStencil', function() {
	const testData = [
		[2, 5, 0],
		[2, 5, 1],
		[2, 5, 2],
		[2, 5, 3],
		[2, 5, 4],
		[2, 5, 5],
		[2, 5, 6],
		[2, 5, 7],
		[2, 5, 8],
		[2, 5, 9],
	];

	it('should return', function() {
		const stencil = PNG.sync.read(fs.readFileSync('./test/numeric.png'));

		const spritefont = SpriteFont.render(
			stencil.data,
			26,
			['#ffffff'],
			['#ffffff']
		);

		const testResults = [
			[0, 0],
			[0, 1],
			[0, 2],
			[0, 3],
			[0, 4],
			[1, 0],
			[1, 1],
			[1, 2],
			[1, 3],
			[1, 4],
		];

		testData.forEach((data, index) => {
			assert.deepEqual(
				SpriteFont.getCharacterCoordinatesOnStencil(
					data[0],
					data[1],
					data[2]
				),
				testResults[index]
			);
		});
	});

	it('should return', function() {
		const stencil = PNG.sync.read(fs.readFileSync('./test/numeric.png'));

		const spritefont = SpriteFont.render(
			stencil.data,
			26,
			['#ffffff'],
			['#ffffff']
		);

		const testResults = [
			[0, 0],
			[1, 0],
			[0, 1],
			[1, 1],
			[0, 2],
			[1, 2],
			[0, 3],
			[1, 3],
			[0, 4],
			[1, 4],
		];

		testData.forEach((data, index) => {
			assert.deepEqual(
				SpriteFont.getCharacterCoordinatesOnStencil(
					data[0],
					data[1],
					data[2],
					SpriteFont.DIRECTION_LEFT_TO_RIGHT
				),
				testResults[index]
			);
		});
	});
});
