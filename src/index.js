export default class LetterSprite {
	constructor(stencil, rows, cols, bgColors, fgColors) {
		this.index = [];

		if (typeof stencil === 'string') {
			this.stencil = document.createElement('img');
			this.stencil.src = stencil;
		}
		else {
			this.stencil = stencil;
		}

		this.bgColors = bgColors;
		this.fgColors = fgColors;
		this.rows = rows;
		this.cols = cols;
		this.stencilWidth = this.stencil.width;
		this.stencilHeight = this.stencil.height;
		this.characterWidth = this.stencil.width / cols;
		this.characterHeight = this.stencil.height / rows;

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

				this.index[this.bgColors[i] + this.fgColors[j]] = {
					offsetX : offsetX,
					offsetY : offsetY
				};

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
	 * Returns with the position of the specified letter.
	 *
	 * @param {number} char
	 * @param {string} bgColor
	 * @param {string} fgColor
	 *
	 * @returns {array}
	 */
	getLetterPosition(char, bgColor, fgColor) {
		let offsetX = this.index[bgColor + fgColor].offsetX;
		let offsetY = this.index[bgColor + fgColor].offsetY;

		let x = Math.floor(char / this.rows) * this.characterWidth;
		let y = Math.floor(char % this.rows) * this.characterHeight;

		return [x + offsetX, y + offsetY];
	}

	/**
	 * Draws the spcified letter to the specified context.
	 *
	 * @param {object} context
	 * @param {number} char
	 * @param {string} bgColor
	 * @param {string} fgColor
	 * @param {number} posX
	 * @param {number} posY
	 *
	 * @returns {void}
	 */
	letMeDrawIt(context, char, bgColor, fgColor, posX, posY) {
		let [x, y] = this.getLetterPosition(char, bgColor, fgColor);

		context.drawImage(
			this.canvas,
			x, y,
			this.characterWidth,
			this.characterHeight,
			posX, posY,
			this.characterWidth,
			this.characterHeight
		);
	}

	/**
	 * Returns with the specified letter's image data. (It's very slow.)
	 *
	 * @param {number} char
	 * @param {string} bgColor
	 * @param {string} fgColor
	 *
	 * @returns {object}
	 */
	getLetterImageData(char, bgColor, fgColor) {
		let [x, y] = this.getLetterPosition(char, bgColor, fgColor);

		return this.context.getImageData(x, y, this.characterWidth,
			this.characterHeight);
	}
}
