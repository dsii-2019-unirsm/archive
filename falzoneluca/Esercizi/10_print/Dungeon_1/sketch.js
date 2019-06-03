let x=-100;
let y=-100;
let spacing= 20;

function setup() {
  createCanvas (600, 600);
  background(0);
}

function draw() {
  
  noStroke();
  if (random(1) < 0.6) {
    rect (x+spacing,y+spacing, 10,10);
  } else {
    rect (y+spacing,x+spacing, 30, 30);
  }

x = x + spacing;
if (x>width) {
  x= 0;
  y= y+spacing;
}
}
