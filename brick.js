class Brick {
  constructor(x, y, width, height, destroyed, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.destroyed = destroyed;
    this.life =
      Math.floor(Math.random() * Math.floor(ballShooter.maxBalls / 3)) + 1;
    this.color = "#0095DD";
  }
}
