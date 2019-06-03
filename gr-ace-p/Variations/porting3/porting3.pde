// -
// Porting 10 PRINT 0.3 by Grazia Pestillo 
// 2019 © GraziaPestillo, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —


int w = 16;
int h = 16;
int index = 0; 
void setup() {
  //fullScreen();
  size(640, 384);
  background(0);
  smooth();
  noFill();
  colorMode(HSB);
  ellipseMode(CORNER);
}
void draw() {

  int x1 = w*index;
  int x2 = x1 + w;
  int y1 = h*23;
  int y2 = h*24;
  if (random(2) < 1) {
    noFill();
    strokeWeight(2);
    stroke(255);
    arc(x2, y1, w, h, PI, PI+HALF_PI);
  } else if (random(6) < 3) {
    noFill();
    strokeWeight(2);
    arc(x2, y1, w, h, 0, HALF_PI);
    strokeWeight(2);
    fill(#1EF7A6);
    ellipse(x2, y1, w/2, h/2);
    noFill();
    strokeWeight(1);
    stroke(255);
    rect(x2, y1, w/2, h);
    stroke(#1EF7A6);
    rect(x2+w, y1, w, h/2);
  } else {
    strokeWeight(2);
    stroke(#1EF7A6);
    line(x1, y1, x2, y2);
  };
  index++;
  if (index == width/w) {
    PImage p = get(0, h, width, h*23);
    background(0);
    set(0, 0, p);
    index = 0;
  }
}
