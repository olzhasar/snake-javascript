document.addEventListener('keydown', keyDownHandler, false);

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const squareSize = 30;
const gridsize = 600 / squareSize;

const gameInterval = 100;

var snake = [[10,10], [11,10], [12,10], [13,10], [14, 10]];
var food = generateFood();

var scoreLabel = document.getElementById("score");

const scoreStep = 9;
var score = 0;

var eaten = false;

var nextDirection = 0;
var direction = 0; // 0 - left, 1 - up, 2 - right, 3 - down

var interval;

interval = setInterval(main, gameInterval);

function endGame() {
  alert(`GAME OVER\nYou scored ${score}`);
  window.location.reload();
}

function main() {
  clearCanvas();
  moveSnake();
  drawSnake();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function keyDownHandler(event) {
  switch (event.keyCode) {
    case 39:
      if (direction != 0) {
	nextDirection = 2;
      }
      break;
    case 37:
      if (direction != 2) {
	nextDirection = 0;
      }
      break;
    case 40:
      if (direction != 1) {
	nextDirection = 3;
      }
      break;
    case 38:
      if (direction != 3) {
	nextDirection = 1;
      }
      break;
  }
}

function moveSnake(){
  if (! eaten) {
    snake.pop();
  } else {
    eaten = false;
  }

  direction = nextDirection;

  let x = snake[0][0];
  let y = snake[0][1];

  let xdiff = 0;
  let ydiff = 0;

  if (direction % 2 === 0) {
    xdiff = direction - 1;
  } else {
    ydiff = direction - 2;
  }

  x = adjustForOverflow(x, xdiff);
  y = adjustForOverflow(y, ydiff);

  if (x === food[0] && y === food[1]) {
    eaten = true;
    increaseScore();
    food = generateFood();
  }

  snake.forEach(function(point) {
    if (point[0] === x && point[1] === y) {
      endGame();
    }
  })

  snake.unshift([x, y]);

}

function increaseScore() {
  score += scoreStep;
  scoreLabel.innerHTML = score;
}

function adjustForOverflow(n, diff) {
  n += diff;

  if (diff > 0) {
    if (n >= gridsize) {
      n = 0;
    }
  } else {
    if (n < 0) {
      n = gridsize - 1;
    }
  }

  return n
}

function drawSnake() {
  snake.forEach(drawSquare);
  drawSquare(food);
}

function getRandomCoordinate() {
  return Math.floor(Math.random() * (gridsize - 1));
}

function generateFood() {
  x = getRandomCoordinate();
  y = getRandomCoordinate();

  snake.forEach(function(element) {
    if (element[0] === x && element[1] === y) {
      return generateFood();
    }
  });
  return [x,y]
}

function drawSquare(el) {
  ctx.fillRect(el[0] * squareSize, el[1] * squareSize, squareSize, squareSize);
}
