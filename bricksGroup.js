class BricksGroup {
  constructor() {
    this.padding = 10;
    this.rowCount = 3;
    this.colCount = 10;
    this.width =
      (canvas.width - this.padding * (this.colCount + 1)) / this.colCount;
    this.height = this.width;
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
    for (let row of this.bricks) {
      for (let brick of row) {
        brick.y += this.padding + this.height;
        if (!brick.destroyed && brick.y + brick.height > canvas.height) {
          setTimeout(() => {
            gameOver();
          }, 100);
          return;
        }
      }
    }

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
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.fillText(
          brick.life,
          brick.x + brick.width / 2 - 5,
          brick.y + brick.height / 2 + 5
        );

        ctx.closePath();
      }
    }
  }
}
