let xdim = 10;
let ydim = 10;
let maze = [];
let mode = 1;
let myInput;
function setup() {
  createCanvas(400, 400);
  background(220);

  myInput = createInput('Insert maze');
  myInput.position(0, 400);
  let button = createButton('Draw!');
  button.position(400, 400);

  button.mousePressed(drawMazeFromInput);


  let xpos = 0;
  let jpos = 0;

  for (let i = 0; i < ydim; i++) {
    let r = [];
    for (let j = 0; j < xdim; j++) {
      r.push(new Cell(i, j, xpos, jpos, width / xdim, height / ydim, 0));
      xpos += width / xdim;
    }
    maze.push(r);
    xpos = 0;
    jpos += height / ydim;
  }
}

function draw() {
  for (let i = 0; i < ydim; i++) {
    for (let j = 0; j < xdim; j++) {
      maze[i][j].draw();
    }
  }
}

function mouseClicked(){
  if(mouseX > width || mouseY > height)
    return;
  let j = floor(mouseX / (width / xdim));
  let i = floor(mouseY / (height / ydim));
  maze[i][j].state = mode;
}

function keyPressed(){
  if (keyCode === "C".charCodeAt(0)) {
    console.log("Clear");
    mode = 0;
  }
  if (keyCode === "W".charCodeAt(0)) {
    console.log("Wall");
    mode = 1;
  }
  if (keyCode === "S".charCodeAt(0)) {
    console.log("Start");
    mode = 2;
  }
  if (keyCode === "E".charCodeAt(0)) {
    console.log("End");
    mode = 3;
  }
  if (keyCode === "P".charCodeAt(0)) {
    pM = prologMaze()
    console.log(pM);
    copyStringToClipboard(pM);
  }
}

function prologMaze(){
  let mazePl = "";
  for (let i = 0; i < ydim; i++) {
    for (let j = 0; j < xdim; j++) {
      if(maze[i][j].state == 1){
        mazePl += "occupata(pos(" + (maze[i][j].i + 1) + "," + (maze[i][j].j + 1) + ")).\n";
      }
      if(maze[i][j].state == 2){
        mazePl = "iniziale(pos(" + (maze[i][j].i + 1) + "," + (maze[i][j].j + 1) + ")).\n" + mazePl;
      }
      if(maze[i][j].state == 3){
        mazePl = "finale(pos(" + (maze[i][j].i + 1) + "," + (maze[i][j].j + 1) + ")).\n" + mazePl;
      }
    }
  }
  mazePl = "num_righe(" + ydim + ").\n" + mazePl;
  mazePl = "num_colonne(" + xdim + ").\n" + mazePl;
  return mazePl;
}


function drawMazeFromInput(){
  let mazeProlog = (myInput.value()).replaceAll(' ','');
  let mazePrologLines = mazeProlog.split('.');
  mazePrologLines.pop();
  mazePrologLines.shift();
  mazePrologLines.shift();
  // init new maze
  maze = [];
  let xpos = 0;
  let jpos = 0;
  xdim = parseInt((mazeProlog.split('num_colonne(')[1]).split(')')[0]);
  ydim = parseInt((mazeProlog.split('num_righe(')[1]).split(')')[0]);

  for (let i = 0; i < ydim; i++) {
    let r = [];
    for (let j = 0; j < xdim; j++) {
      r.push(new Cell(i, j, xpos, jpos, width / xdim, height / ydim, 0));
      xpos += width / xdim;
    }
    maze.push(r);
    xpos = 0;
    jpos += height / ydim;
  }

  for(let m = 0; m < mazePrologLines.length; m++){
    let tempSplit = mazePrologLines[m].split('(pos(');
    let xpos = parseInt(tempSplit[1].split(',')[0]) - 1;
    let ypos = parseInt(tempSplit[1].split(')')[0].split(',')[1]) - 1;
    let newState = translateMode(tempSplit[0]);

    maze[xpos][ypos].state = newState;
  }
}

function translateMode(modeType){
  if(modeType === 'iniziale')
    return 2;
  if(modeType === 'finale')
    return 3;
  if(modeType === 'occupata')
    return 1;

  return 0;
}

function copyStringToClipboard (str) {
  var el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}