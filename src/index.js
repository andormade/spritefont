export default class LetterSprite {
	constructor(stencil, rows, cols, bgColors, fgColors) {
		this.index = [];
		this.stencil = stencil;
		this.bgColors = bgColors;
		this.fgColors = fgColors;
		this.rows = rows;
		this.cols = cols;
		this.stencilWidth = stencil.width;
		this.stencilHeight = stencil.height;
		this.characterWidth = stencil.width / cols;
		this.characterHeight = stencil.height / rows;

		this.render();
	}

	render() {
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.stencilWidth * this.fgColors.length;
		this.canvas.height = this.stencilHeight * this.bgColors.length;
		this.context = this.canvas.getContext('2d');

		for (var i = 0; i < this.bgColors.length; i++) {
			for (var j = 0; j < this.fgColors.length; j++) {
				if (this.fgColors[i] === this.bgColors[j]) {
					continue;
				}

				let offsetX = j * this.stencilWidth;
				let offsetY = i * this.stencilHeight;

				this.renderPart(
					offsetX,
					offsetY,
					this.bgColors[i],
					this.fgColors[j]
				);
			}
		}
	}

	renderPart(offsetX, offsetY, bgColor, fgColor) {
		this.index[bgColor + fgColor] = {
			offsetX : offsetX,
			offsetY : offsetY
		};

		this.context.imageSmoothingEnabled = false;

		this.context.save();

		this.context.beginPath();
		this.context.rect(offsetX, offsetY, this.stencilWidth,
			this.stencilHeight);
		this.context.clip();

		/* Draws sprite on the canvas */
		this.context.drawImage(this.stencil, offsetX, offsetY);

		/* Fills foreground */
		this.context.globalCompositeOperation = 'source-in';
		this.context.fillStyle = fgColor;
		this.context.fillRect(offsetX, offsetY, this.stencilWidth,
			this.stencilHeight);

		/* Fills background */
		this.context.globalCompositeOperation = 'destination-over';
		this.context.fillStyle = bgColor;
		this.context.fillRect(offsetX, offsetY, this.stencilWidth,
			this.stencilHeight);

		this.context.restore();
	}

	/**
	 * Returns with the specified letter's image data.
	 *
	 * @param {number} char
	 * @param {string} bgColor
	 * @param {string} fgColor
	 *
	 * @returns {object}
	 */
	getLetterImageData(char, bgColor, fgColor) {
		var offsetX = this.index[bgColor + fgColor].offsetX;
		var offsetY = this.index[bgColor + fgColor].offsetY;

		var x = Math.floor(char / this.rows) * this.characterWidth;
		var y = Math.floor(char % this.rows) * this.characterHeight;

		return this.context.getImageData(x + offsetX, y + offsetY,
			this.characterWidth, this.characterHeight);
	}
}
