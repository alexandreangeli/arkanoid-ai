var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.9;
canvas.height = 500;

var score = new Score();
var ballShooter = new BallShooter();
var bricksGroup = new BricksGroup();

var rightPressed = false;
var leftPressed = false;

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);
document.addEventListener("click", onClickHandler, false);

function mouseMoveHandler(e) {
  e.preventDefault();
  if (!ballShooter.balls.length) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    ballShooter.angle =
      (Math.atan2(relativeY - ballShooter.y0, relativeX - ballShooter.x0) *
        180) /
      Math.PI;

    if (ballShooter.angle > ballShooter.maxAngle) {
      ballShooter.angle = ballShooter.maxAngle;
    }
    if (ballShooter.angle < ballShooter.minAngle) {
      ballShooter.angle = ballShooter.minAngle;
    }
  }
}
function touchMoveHandler(e) {
  e.preventDefault();
  if (!ballShooter.balls.length) {
    var relativeX = e.touches[0].clientX - canvas.offsetLeft;
    var relativeY = e.touches[0].clientY - canvas.offsetTop;
    ballShooter.angle =
      (Math.atan2(relativeY - ballShooter.y0, relativeX - ballShooter.x0) *
        180) /
      Math.PI;

    if (ballShooter.angle > ballShooter.maxAngle) {
      ballShooter.angle = ballShooter.maxAngle;
    }
    if (ballShooter.angle < ballShooter.minAngle) {
      ballShooter.angle = ballShooter.minAngle;
    }
  }
}
function onClickHandler() {
  if (!ballShooter.balls.length) {
    ballShooter.shoot();

    let ballNumber = 1;
    let interval = setInterval(() => {
      if (ballNumber == ballShooter.maxBalls) {
        clearInterval(interval);
      } else {
        ballShooter.shoot();
        ballNumber++;
      }
    }, 50);
  }
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

function gameOver() {
  alert("GAME OVER");
  document.location.reload();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  score.draw();
  bricksGroup.draw();
  ballShooter.draw();

  let ballsNotDestroyed = ballShooter.balls.filter((ball) => !ball.destroyed);
  if (ballsNotDestroyed.length != 0) {
    ballsNotDestroyed.forEach((ball) => {
      ball.move();
      ball.draw();
    });
  }

  requestAnimationFrame(draw);
}

draw();
