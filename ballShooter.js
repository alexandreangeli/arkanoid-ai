class BallShooter {
  constructor() {
    this.angle = -90;
    this.minAngle = -170;
    this.maxAngle = -10;
    this.size = 50;
    this.x0 = canvas.width / 2;
    this.y0 = canvas.height;
    this.maxBalls = 1;
    this.balls = [];
    this.x1 = this.x0 + this.size * Math.cos((Math.PI * this.angle) / 180.0);
    this.y1 = this.y0 + this.size * Math.sin((Math.PI * this.angle) / 180.0);
  }

  draw() {
    this.x1 = this.x0 + this.size * Math.cos((Math.PI * this.angle) / 180.0);
    this.y1 = this.y0 + this.size * Math.sin((Math.PI * this.angle) / 180.0);

    ctx.beginPath();
    ctx.moveTo(this.x0, this.y0);
    ctx.lineTo(this.x1, this.y1);
    ctx.stroke();
    ctx.closePath();
  }

  shoot() {
    this.balls.push(new Ball());
  }
}
