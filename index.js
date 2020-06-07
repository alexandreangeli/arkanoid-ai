var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

var score = new Score();
var paddle = new Paddle();
var ball = new Ball();
var bricksGroup = new BricksGroup();
var lives = new Lives();

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);

function keyDownHandler(e) {
  e.preventDefault();
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  e.preventDefault();
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  e.preventDefault();
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}
function touchMoveHandler(e) {
  e.preventDefault();
  var relativeX = e.touches[0].clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

function moveBall() {
  if (ball.y < ball.yMin) {
    ball.dy *= -1;
  } else if (ball.y > paddle.y - ball.radius) {
    if (
      ball.dy > 0 &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.width
    ) {
      ball.dy *= -1;
    }
  } else if (ball.x < ball.yMin || ball.x > ball.xMax) {
    ball.dx *= -1;
  } else {
    outerLoop: for (var c = 0; c < bricksGroup.colCount; c++) {
      for (var r = 0; r < bricksGroup.rowCount; r++) {
        var brick = bricksGroup.bricks[c][r];
        if (brick.destroyed) {
          continue;
        }

        let collisionSide = collisionDetection(
          {
            x: ball.x,
            y: ball.y,
            r: ball.radius,
          },
          {
            x: brick.x,
            y: brick.y,
            h: bricksGroup.height,
            w: bricksGroup.width,
          }
        );

        if (collisionSide.x) {
          ball.dx *= -1;
        }
        if (collisionSide.y) {
          ball.dy *= -1;
        }
        if (collisionSide.x || collisionSide.y) {
          score.value++;
          brick.destroyed = true;
          break outerLoop;
        }
      }
    }
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
}

function collisionDetection(circle, rect) {
  var distX = Math.abs(circle.x - rect.x - rect.w / 2);
  var distY = Math.abs(circle.y - rect.y - rect.h / 2);

  if (distX > rect.w / 2 + circle.r) {
    return false;
  }
  if (distY > rect.h / 2 + circle.r) {
    return false;
  }

  if (distX <= rect.w / 2) {
    return { y: true, x: false };
  }
  if (distY <= rect.h / 2) {
    return { y: false, x: true };
  }

  var dx = distX - rect.w / 2;
  var dy = distY - rect.h / 2;
  return dx * dx + dy * dy <= circle.r * circle.r
    ? { y: true, x: true }
    : { y: false, x: false };
}

function victory() {
  alert("YOU WIN, CONGRATULATIONS!");
  document.location.reload();
}

function lostLife() {
  lives.value--;
  if (!lives.value) {
    gameOver();
  } else {
    ball.reset();
    paddle.reset();
  }
}

function gameOver() {
  alert("GAME OVER");
  document.location.reload();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  score.draw();
  lives.draw();
  bricksGroup.draw();
  paddle.draw();
  ball.draw();

  moveBall();

  if (ball.y > ball.yMax) {
    lostLife();
  }

  if (score.value == bricksGroup.rowCount * bricksGroup.colCount) {
    victory();
  } else {
    requestAnimationFrame(draw);
  }
}

draw();
