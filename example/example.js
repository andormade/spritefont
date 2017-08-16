var PNG = require('pngjs').PNG;
var fs = require('fs');
var path = require('path');
var SpriteFont = require('../dist/index');

var colors = ['#000000', '#0000ff', '#00ff00', '#00ffff', '#ff0000', '#ff00ff',
	'#ffff00', '#ffffff'];

var stencilFile = path.resolve(__dirname, 'numeric.png');
var outFile = path.resolve(__dirname, 'out.png');

fs.createReadStream(stencilFile)
	.pipe(new PNG())
	.on('parsed', function() {
		let spriteFont = SpriteFont.render(
			this.data, this.width, colors, colors
		);

		this.data = spriteFont.data;
		this.width = spriteFont.width;
		this.height = spriteFont.height;

		this.pack().pipe(fs.createWriteStream(outFile));
	});
