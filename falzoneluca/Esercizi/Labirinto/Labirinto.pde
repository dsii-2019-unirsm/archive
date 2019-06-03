// -
// labirinto.pde 0.2 by FalzoneLuca [labyrinth, generate, random]
// 2019 © FalzoneLuca, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
// Credits/Thanks to: 
// @shiffman (shiffman.net) for https://www.youtube.com/watch?v=bEyTZ5ZZxZs
// original license: Tipo licenza
//-


int x=0;
int y=0;
int spacing= 20;

void setup() {
  size(600,600);
  background(0);
}

void draw() {
  stroke(255);
  if (random(1) < 0.6) {
    line (x,y,x+spacing,y+spacing);
  } else {
    line(x,y+spacing,x+spacing,y);
  }

x = x + spacing;
if (x>width) {
  x= 0;
  y= y+spacing;
}
}
