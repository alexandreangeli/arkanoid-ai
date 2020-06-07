class Brick {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.destroyed = Math.random() > 0.6;

    let random = randomIntFromInterval(0, 100);
    if (random < 25) {
      this.life = Math.floor(ballShooter.maxBalls / 2);
    }
    if (random >= 25 && random < 75) {
      this.life = ballShooter.maxBalls;
    }
    if (random >= 75) {
      this.life = ballShooter.maxBalls * 2;
    }

    this.color = "#0095DD";
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
