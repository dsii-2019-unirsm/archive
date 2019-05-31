// -
// 10Print 0.1 by Graziana Florio [10print, arcs]
// 2019 © Graziana Florio @grazianaf, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —


int larghezza= 24;
int altezza= 24;
int index=0;

void setup() {
  size(1200, 600);
  colorMode(HSB, 360);
  background(0);
}

void draw() {
  strokeWeight(3);
  noFill();

  int x1 = larghezza*index;
  int x2 = x1 + larghezza;
  int y1 = altezza*23;
  int y2 = altezza*24;

//disegna un arco 180-0 
  if (random(3) < 1) {
    shapeMode(CENTER);
    stroke(random(0, 230), 280, 360);
    arc(x1, y2, larghezza, altezza, PI, TWO_PI);
    fill(0, 0, random(255));
 //disegna un arco 90-180 e un arco da 270 a 0      
  } else if (random(3) < 2) {
    stroke(random(0, 230), 280, 360);
    arc(x2, y1, larghezza, altezza, PI/2, PI);
    stroke(random(230, 360), 280, 360);
    arc(x2, y1, larghezza, altezza, PI+HALF_PI, TWO_PI);
  } else {
  //disegna un arco da 0 a 90
    noFill();
    stroke(random(0, 140), 200, 360);
    arc(x2, y1, larghezza, altezza, 0, PI/2); 
  }

  index++;
  if (index == width/altezza) {
    PImage p = get(0, altezza, width, altezza*24);
    background(0);
    set(0, 0, p);
    index = 0;
  }
}
