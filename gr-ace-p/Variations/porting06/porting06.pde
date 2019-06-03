
    // -
// Porting 10 PRINT 0.2 by Grazia Pestillo 
// 2019 © GraziaPestillo, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —


int w = 16;
int h = 16;
int index = 0; 
int c;
PImage p;
void setup() {
  c = (120);
  fullScreen();
  //size(640, 384);
  background(0);
  smooth();
  noFill();
  colorMode(HSB);
  ellipseMode(CORNER);
  rectMode(CORNER);
}
void draw() {


  int x1 = w*86;
  int x2 = w*87;
  int y1 = h* index;
  int y2 = h + y1;
  if (random(2) < 1) {
    noFill();
    strokeWeight(2);
    //stroke(255);
    rect(x2, y1, 8, 8);
    //arc(x2, y1, w, h, PI, PI+HALF_PI);
  } else if (random(6) < 2) {
    //noFill();
    strokeWeight(2);
    ellipse(x1, y2, 8, 8);
    //translate(width/2, height/2);
    //rotate(PI/3.0);
    rect(x2, y1, 8, 8);
    fill(c, 150, 255);
    arc(x2, y1, w, h, 0, -HALF_PI);
    arc(x2, y1, w, h, 0, HALF_PI);
  } else {
    strokeWeight(2);
    stroke(c, 255, 255);
    //rect(x2,y1,8,8);
    line(x1, y1, x2, y2);
    line(x1, y2, x2, y1);
    //arc(x2, y1, w, h, 0, -HALF_PI);
    //arc(x2, y1, w, h, 0, HALF_PI);
  };
  index++;
  if (index >= int(random(height/h)+2)) {
    c ++;
    p = get(w, -h/2, w*86, w*90);
    //PImage p = get(w, -h/2, w*37, w*29);
    background(0);
    set(0, 0, p);
    index = 0;
  }
}

void mousepressed () {
  p.resize (10, 10);
}
