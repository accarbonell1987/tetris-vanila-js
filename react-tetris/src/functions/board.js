export const createBoard = ({ width, height }) => {
	return Array(height)
		.fill()
		.map(() => Array(width).fill(0));
};

export const getRandomPiece = ({ pieces }) => {
	return {
		shape: pieces[Math.floor(Math.random() * pieces.length)],
		x: 0,
		y: 0,
	};
};

export const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const drawMatrix = ({ context, matrix, color }) => {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value === 1) {
				context.fillStyle = color;
				context.fillRect(x, y, 1, 1);
			}
		});
	});
};

export const drawPiece = ({ context, piece, color }) => {
	piece.shape.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value === 1) {
				context.fillStyle = color;
				context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
			}
		});
	});
};

export const draw = ({ context, canvas, background, colors }) => {
	const { primary, secondary } = colors;

	context.fillStyle = background;
	context.fillRect(0, 0, canvas.width, canvas.height);

	drawMatrix(board, primary);
	drawPiece(piece, secondary);

	$score.innerText = score;
};
