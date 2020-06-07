class Paddle {
  constructor() {
    this.color = "#0095DD";
    this.height = 10;
    this.width = 75;
    this.x0 = (canvas.width - this.width) / 2;
    this.y0 = canvas.height - this.height;
    this.x = this.x0;
    this.y = this.y0;
    this.dx = 7;
    this.xMax = canvas.width - this.width;
    this.yMax = canvas.height - this.height;
    this.xMin = 0;
    this.yMin = this.yMax;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();

    if (rightPressed) {
      paddle.x += paddle.dx;
      if (paddle.x > paddle.xMax) {
        paddle.x = paddle.xMax;
      }
    }
    if (leftPressed) {
      paddle.x -= paddle.dx;
      if (paddle.x < paddle.xMin) {
        paddle.x = paddle.xMin;
      }
    }
  }

  reset() {
    this.x = this.x0;
    this.y = this.y0;
  }
}
