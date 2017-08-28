#!/usr/bin/env node

var program = require('commander');
var SpriteFont = require('..');
var PNG = require('pngjs').PNG;
var fs = require('fs');

program
	.arguments('<file>')
	.option('-c, --colors <colors>', 'List of colors separated by space characters.')
	.option('-o, --out <out>', 'The output file.')
	.action(function(file) {

		let colors = program.colors.split(' ');

		fs.createReadStream(file)
			.pipe(new PNG())
			.on('parsed', function() {
				let spriteFont = SpriteFont.render(
					this.data, this.width, colors, colors
				);

				this.data = spriteFont.data;
				this.width = spriteFont.width;
				this.height = spriteFont.height;

				this.pack().pipe(fs.createWriteStream(program.out));
			});
	})
	.parse(process.argv);
