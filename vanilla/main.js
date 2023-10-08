import "./style.css";

import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH, VELOCITY, MOVEMENTS } from "./src/constants/const";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const $score = document.querySelector("span");

const audio = new window.Audio("./tetris.mp3");
let audioState = true;

let score = 0;
let level = 1;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT);
const piece = {
	position: { x: 5, y: 5 },
	shape: [
		[1, 1],
		[1, 1],
	],
};
const PIECES = [
	[
		[1, 1],
		[1, 1],
	],
	[[1, 1, 1, 1]],
	[
		[0, 1, 0],
		[1, 1, 1],
	],
	[
		[1, 1, 0],
		[0, 1, 1],
	],
	[
		[1, 0],
		[1, 0],
		[1, 1],
	],
	[
		[0, 1],
		[0, 1],
		[1, 1],
	],
];

function drawMatrix(matrix, color) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value === 1) {
				context.fillStyle = color;
				context.fillRect(x, y, 1, 1);
			}
		});
	});
}

function drawPiece(piece, color) {
	piece.shape.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value === 1) {
				context.fillStyle = color;
				context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
			}
		});
	});
}

function createBoard(width, height) {
	return Array(height)
		.fill()
		.map(() => Array(width).fill(0));
}

function draw() {
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);

	drawMatrix(board, "yellow");
	drawPiece(piece, "red");

	$score.innerText = score;
}

let dropCounter = 0;
let lastTime = 0;

function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;

	dropCounter += deltaTime;
	if (dropCounter > VELOCITY[level - 1].speed) {
		piece.position.y++;
		dropCounter = 0;
	}

	if (checkCollisions()) {
		piece.position.y--;
		solidifyPiece();
		removeRows();
	}

	draw();
	window.requestAnimationFrame(update);
}

function checkCollisions() {
	return piece.shape.find((row, y) => {
		return row.find((value, x) => {
			return value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0;
		});
	});
}

function solidifyPiece() {
	piece.shape.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value === 1) {
				board[y + piece.position.y][x + piece.position.x] = 1;
			}
		});
	});

	piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];
	piece.position.x = 0;
	piece.position.y = 0;

	//! gameover
	if (checkCollisions()) {
		board.forEach((row) => row.fill(0));
	}
}

function removeRows() {
	const rowsToRemove = [];

	board.forEach((row, y) => {
		if (row.every((value) => value === 1)) {
			rowsToRemove.push(y);
		}
	});

	rowsToRemove.forEach((y) => {
		board.splice(y, 1);
		const newRow = Array(BOARD_WIDTH).fill(0);
		board.unshift(newRow);
	});

	score += rowsToRemove.length * 10;

	let currentLevel = 1;
	for (const item of VELOCITY) {
		if (item.score.max > score) {
			level = currentLevel;
			break;
		}
		currentLevel++;
	}
}

document.addEventListener("keydown", (event) => {
	switch (event.key) {
		case MOVEMENTS.LEFT:
			{
				piece.position.x--;
				if (checkCollisions()) piece.position.x++;
			}
			break;
		case MOVEMENTS.RIGHT:
			{
				piece.position.x++;
				if (checkCollisions()) piece.position.x--;
			}
			break;
		case MOVEMENTS.DOWN:
			{
				piece.position.y++;
				if (checkCollisions()) {
					piece.position.y--;
					solidifyPiece();
					removeRows();
				}
			}
			break;
		case MOVEMENTS.ROTATE:
			{
				const rotated = [];

				for (let i = 0; i < piece.shape[0].length; i++) {
					const row = [];
					for (let j = piece.shape.length - 1; j >= 0; j--) {
						row.push(piece.shape[j][i]);
					}

					rotated.push(row);
				}

				const previousShape = piece.shape;
				piece.shape = rotated;
				if (checkCollisions()) piece.shape = previousShape;
			}
			break;

		default:
			break;
	}
});

const $section = document.querySelector("section");
const $info = document.querySelector("article");

$info.addEventListener("click", () => {
	audioState ? audio.pause() : audio.play();
	audioState = !audioState;
	$info.innerText = `Music: ${audioState ? "ON" : "OFF"} | Speed: ${VELOCITY[level - 1].speed} | Level: ${level}`;
	// $info.innerText = `Music: ${audioState ? "ON" : "OFF"}`;
});

$section.addEventListener("click", () => {
	update();
	$section.remove();

	audio.volume = 0.5;
	audio.play();
});
