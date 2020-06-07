class BricksGroup {
  constructor() {
    this.padding = 10;
    this.rowCount = 3;
    this.colCount = 5;
    this.width =
      (canvas.width - this.padding * (this.colCount + 1)) / this.colCount;
    this.height = 20;
    this.offSetTop = 50;
    this.bricks = [];

    this.mountBricks();
  }

  mountBricks() {
    for (var r = 0; r < this.rowCount; r++) {
      this.addRow();
    }
  }

  addRow() {
    this.bricks.forEach((row) => {
      row.forEach((brick) => {
        brick.y += this.padding + this.height;
      });
    });

    var row = [];
    for (var c = 0; c < this.colCount; c++) {
      let colNumber = c + 1;

      let brickX = this.padding * colNumber + this.width * (colNumber - 1);
      let brickY = this.padding + this.height;

      row.push(new Brick(brickX, brickY, this.width, this.height));
    }

    this.bricks.unshift(row);
  }

  draw() {
    for (var r = 0; r < this.rowCount; r++) {
      for (var c = 0; c < this.colCount; c++) {
        let brick = this.bricks[r][c];
        if (brick.destroyed) {
          continue;
        }
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, this.width, this.height);
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
