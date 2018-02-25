var SpriteFont = require('../dist/index.js'),
	fs = require('fs'),
	assert = require('assert'),
	PNG = require('pngjs').PNG;

describe('render', function() {
	it('should return', function() {
		const stencil = PNG.sync.read(fs.readFileSync('./test/numeric.png'));
		const testImage = PNG.sync.read(fs.readFileSync('./test/test1.png'));

		const spritefont = SpriteFont.render(
			stencil.data,
			26,
			[
				'#ffffff',
				'#000000',
				'#ff0000',
				'#00ff00',
				'#0000ff',
				'#ffff00',
				'#00ffff',
				'#ff00ff'
			],
			['#ffffff', '#000000']
		);

		assert.deepEqual(spritefont, testImage.data);
	});
});
