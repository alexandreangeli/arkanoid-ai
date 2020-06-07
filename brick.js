class Brick {
  constructor(x, y, width, height, destroyed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.destroyed = destroyed;
    this.life = Math.floor(Math.random() * 2) + 1;
    console.log(this.life);
    this.color = this.life == 1 ? "blue" : "green";
  }
}
