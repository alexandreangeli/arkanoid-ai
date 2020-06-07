class Brick {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.destroyed = Math.random() > 0.6;
    this.life =
      Math.floor(Math.random() * Math.floor(ballShooter.maxBalls / 2)) +
      (Math.floor(ballShooter.maxBalls * 0.5) || 1);
    this.color = "#0095DD";
  }
}
