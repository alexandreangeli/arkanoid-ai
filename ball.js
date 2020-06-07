class Ball {
  constructor() {
    this.color = "#0095DD";
    this.radius = canvas.width * 0.015;

    this.x0 = ballShooter.x1;
    this.y0 = ballShooter.y1;
    this.x = this.x0;
    this.y = this.y0;

    this.dx0 = (-1 * (ballShooter.x0 - ballShooter.x1)) / 10;
    this.dy0 = (-1 * (ballShooter.y0 - ballShooter.y1)) / 10;
    this.dx = this.dx0;
    this.dy = this.dy0;

    this.xMax = canvas.width - this.radius;
    this.yMax = canvas.height - this.radius;
    this.xMin = this.radius;
    this.yMin = this.radius;

    this.destroyed = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  destroy() {
    this.destroyed = true;

    let ballsNotDestroyed = ballShooter.balls.filter((ball) => !ball.destroyed);
    if (ballsNotDestroyed.length == 0) {
      ballShooter.balls = [];
      ballShooter.maxBalls++;
      bricksGroup.rowCount++;
      bricksGroup.addRow();
    }
  }

  move() {
    if (this.y > this.yMax) {
      this.destroy();
    } else if (this.y < this.yMin) {
      this.dy *= -1;
    } else if (this.x < this.yMin || this.x > this.xMax) {
      this.dx *= -1;
    } else {
      outerLoop: for (var r = 0; r < bricksGroup.rowCount; r++) {
        for (var c = 0; c < bricksGroup.colCount; c++) {
          var brick = bricksGroup.bricks[r][c];
          if (brick.destroyed) {
            continue;
          }
          let collisionSide = collisionDetection(
            {
              x: this.x,
              y: this.y,
              r: this.radius,
            },
            {
              x: brick.x,
              y: brick.y,
              h: bricksGroup.height,
              w: bricksGroup.width,
            }
          );
          if (collisionSide.x) {
            this.dx *= -1;
          }
          if (collisionSide.y) {
            this.dy *= -1;
          }
          if (collisionSide.x || collisionSide.y) {
            brick.life--;
            if (!brick.life) {
              score.value++;
              brick.destroyed = true;
            }
            break outerLoop;
          }
        }
      }
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}
