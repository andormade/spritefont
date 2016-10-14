import Promise from 'core-js/library/es6/promise';

export default class LetterSprite {
	stencil: object;
	bgColors: array;
	fgColors: array;
	rows: number;
	cols: number;
	isRendered: boolean;
	stencilWidth: number;
	stencilHeight: number;
	characterWidth: number;
	characterHeight: number;
	context: object;

	constructor(
		stencil: any,
		rows: number,
		cols: number,
		bgColors: array,
		fgColors: array
	) {
		this.index = [];

		if (typeof stencil === 'string') {
			this.stencil = new Image();
			this.stencil.src = stencil;
		}
		else {
			this.stencil = stencil;
		}

		this.bgColors = bgColors;
		this.fgColors = fgColors;
		this.rows = rows;
		this.cols = cols;
		this.isRendered = false;
	}

	/**
	 * Renders the sprite font.
	 *
	 * @returns {object} Returns a promise.
	 */
	render() {
		return new Promise((resolve, reject) => {
			if (this.isRendered) {
				resolve();
			}

			if (!this.stencil instanceof Image) {
				reject();
			}

			if (this.stencil.complete) {
				this.renderSync();
				resolve();
			}
			else {
				this.stencil.addEventListener('load', () => {
					this.renderSync();
					resolve();
				});
			}
		});
	}

	/**
	 * Expects the stencil image to be loaded already, renders the sprite font.
	 *
	 * @returns {void}
	 */
	renderSync(): void {
		if (!this.stencil.complete) {
			this.isRendered = false;
			return;
		}

		this.stencilWidth = this.stencil.width;
		this.stencilHeight = this.stencil.height;
		this.characterWidth = this.stencil.width / this.cols;
		this.characterHeight = this.stencil.height / this.rows;

		this.canvas = document.createElement('canvas');
		this.canvas.width = this.stencilWidth * this.fgColors.length;
		this.canvas.height = this.stencilHeight * this.bgColors.length;
		this.context = this.canvas.getContext('2d');

		for (var i = 0; i < this.bgColors.length; i++) {
			for (var j = 0; j < this.fgColors.length; j++) {
				let offsetX: number = j * this.stencilWidth;
				let offsetY: number = i * this.stencilHeight;

				this.index[this.bgColors[i] + this.fgColors[j]] = {
					offsetX : offsetX,
					offsetY : offsetY
				};

				this._renderPart(
					offsetX,
					offsetY,
					this.bgColors[i],
					this.fgColors[j]
				);
			}
		}

		this.isRendered = true;
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
	letMeDrawIt(
		context: object,
		char: number,
		bgColor: string,
		fgColor: string,
		posX: number,
		posY: number
	): void {
		if (!this.isRendered) {
			return;
		}

		let [x, y] = this._getLetterPosition(char, bgColor, fgColor);

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
	 * Returns with the position of the specified letter.
	 *
	 * @param {number} char
	 * @param {string} bgColor
	 * @param {string} fgColor
	 *
	 * @returns {array}
	 */
	_getLetterPosition(char: number, bgColor: string, fgColor: string): array {
		if (!this.isRendered) {
			return [0, 0];
		}

		let offsetX: number = this.index[bgColor + fgColor].offsetX;
		let offsetY: number = this.index[bgColor + fgColor].offsetY;

		let x: number = Math.floor(char / this.rows) * this.characterWidth;
		let y: number = Math.floor(char % this.rows) * this.characterHeight;

		return [x + offsetX, y + offsetY];
	}

	_renderPart(
		offsetX: number,
		offsetY: number,
		bgColor: string,
		fgColor: string
	): void {
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
}
