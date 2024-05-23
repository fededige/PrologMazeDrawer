class Cell {
  constructor(i, j, x, y, xdim, ydim, state){
    this.i = i;
    this.j = j;
    this.x = x;
    this.y = y;
    this.xdim = xdim;
    this.ydim = ydim;
    this.state = state;
  }
  draw () {
    if(this.state === 0)
      fill('white');
    if(this.state === 1)
      fill('blue');
    if(this.state === 2)
      fill('green');
    if(this.state === 3)
      fill('red');
    rect(this.x, this.y, this.xdim, this.ydim);
  }
}