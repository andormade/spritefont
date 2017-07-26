let assert = require('assert'),
	functionalPaint = require('../dist/functionalPaint');

describe('test', function() {
	let canvas = functionalPaint.createCanvas(1000, 1000);
	canvas = functionalPaint.drawRect(canvas, 0, 0, 1000, 1000, [255, 255, 255, 255]);
	console.log(canvas);
	assert(true);
});
