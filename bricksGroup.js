class BricksGroup {
  constructor() {
    this.color = "#0095DD";
    this.padding = 10;
    this.rowCount = 3;
    this.colCount = 5;
    this.width =
      (canvas.width - this.padding * (this.colCount + 1)) / this.colCount;
    this.height = 20;
    this.offSetTop = 50;

    this.bricks = [];
    for (var c = 0; c < this.colCount; c++) {
      this.bricks[c] = [];
      for (var r = 0; r < this.rowCount; r++) {
        let colNumber = c + 1;
        let rowNumber = r + 1;

        let brickX = this.padding * colNumber + this.width * (colNumber - 1);
        let brickY =
          this.offSetTop +
          (this.padding * rowNumber + this.height * (rowNumber - 1));
        this.bricks[c][r] = new Brick(brickX, brickY, this.width, this.height);
      }
    }
  }

  draw() {
    for (var c = 0; c < bricksGroup.colCount; c++) {
      for (var r = 0; r < bricksGroup.rowCount; r++) {
        let brick = bricksGroup.bricks[c][r];
        if (brick.destroyed) {
          continue;
        }
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, bricksGroup.width, bricksGroup.height);
        ctx.fillStyle = bricksGroup.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
