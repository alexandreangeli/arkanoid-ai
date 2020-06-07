class Lives {
  constructor() {
    this.value = 3;
  }

  draw() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + this.value, canvas.width - 65, 20);
  }
}
