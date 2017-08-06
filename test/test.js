var spriteFont = require('../dist/index.js'),
	fs = require('fs'),
	assert = require('assert'),
	PNG = require('pngjs').PNG;

describe('hexColorToArray', function() {
	it('should return', function() {
		assert.deepEqual(spriteFont.hexColorToArray('#ffffff'), [0xff, 0xff, 0xff, 0xff]);
		assert.deepEqual(spriteFont.hexColorToArray('#000000'), [0x00, 0x00, 0x00, 0xff]);
	});
});

describe('render', function() {
	it('should return', function() {
		let stencil = PNG.sync.read(fs.readFileSync('./test/numeric.png'));
		let testImage = PNG.sync.read(fs.readFileSync('./test/test1.png'));

		let canvas = spriteFont.render(
			stencil.data, 26,
			['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'],
			['#ffffff', '#000000']
		);

		assert.deepEqual(canvas.data, testImage.data);
	});
});
