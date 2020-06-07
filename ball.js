class Ball {
  constructor() {
    this.color = "#0095DD";
    this.radius = 10;

    this.x0 = canvas.width / 2;
    this.y0 = canvas.height - paddle.height - this.radius;
    this.x = this.x0;
    this.y = this.y0;

    this.dx0 = 5;
    this.dy0 = -5;
    this.dx = this.dx0;
    this.dy = this.dy0;

    this.xMax = canvas.width - this.radius;
    this.yMax = canvas.height - this.radius;
    this.xMin = this.radius;
    this.yMin = this.radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  }

  reset() {
    this.x = this.x0;
    this.y = this.y0;
    this.dx = this.dx0;
    this.dy = this.dy0;
  }
}
