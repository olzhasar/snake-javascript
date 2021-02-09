document.addEventListener('keydown', keyDownHandler, false);

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const squareSize = 30;
const gridsize = 600 / squareSize;

const gameInterval = 200;

var snake = [[10,10], [11,10], [12,10], [13,10], [14, 10]];

direction = 0 // 0 - left, 1 - up, 2 - right, 3 - down

setInterval(main, 100);

function main() {
  clearCanvas();
  drawSnake();
  moveSnake();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function keyDownHandler(event) {
  switch (event.keyCode) {
    case 39:
      if (direction != 0) {
	direction = 2;
      }
      break;
    case 37:
      if (direction != 2) {
	direction = 0;
      }
      break;
    case 40:
      if (direction != 1) {
	direction = 3;
      }
      break;
    case 38:
      if (direction != 3) {
	direction = 1;
      }
      break;
  }
}

function moveSnake(){
  snake.pop();

  head = movePoint(snake[0].slice());

  snake.unshift(head);
}

function movePoint(point) {

  switch (direction) {
    case 0:
      point[0] = adjustCoordinate(point[0], false);
      break;
    case 1:
      point[1] = adjustCoordinate(point[1], false);
      break;
    case 2:
      point[0] = adjustCoordinate(point[0], true);
      break;
    case 3:
      point[1] = adjustCoordinate(point[1], true);
      break;
  }

  return point
}

function adjustCoordinate(n, positive=true) {
  if (positive) {
    if (n >= gridsize) {
      n = 0;
    } else {
      n += 1;
    }

  }
  else {
    if (n <= 0) {
      n = gridsize - 1;
    } else {
      n -= 1;
    }

  }
  return n
}

function drawSnake() {
  ctx.fillstyle = "#FF0000";
  snake.forEach(drawSquare);
}

function drawSquare(el) {
  ctx.fillRect(el[0] * squareSize, el[1] * squareSize, squareSize, squareSize);
}