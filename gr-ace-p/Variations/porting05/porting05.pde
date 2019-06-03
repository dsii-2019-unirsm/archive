    // -
// Porting 10 PRINT 0.1 by Grazia Pestillo 
// 2019 © GraziaPestillo, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —


int w = 16;
int h = 16;
int index = 0; 
int c;
int s;
PImage p;

void setup() {
  c=(120);
  s=1;
  fullScreen();
  background(0);
  //background(255);
  //background(c);
  smooth();
  noFill();
  colorMode(HSB);
  //frameRate(3);
  ellipseMode(CENTER);
}

void draw() {

  int x1 = w*86;
  int x2 = w*87;
  int y1 = h*index;
  int y2 = h + y1;

  if (random(4) < 3) {
    //strokeWeight(1);
    strokeWeight(random(2.5, 4.5));
    stroke(c, 190, 255);
    //ellipseMode(CORNER);

    line(x1, y1, x2, y2);
    line(x1, y2, x2, y1);
  } else {


    //strokeWeight(1);
    //stroke(c, 255,255);
    //arc(x1,y1, w, h, HALF_PI,PI);

    strokeWeight(random(1, 2.5));
    stroke(c, 255, 255);
    line(x1+4, y2+4, x2+4, y1+4);
    line(x1+8, y1+8, x2+8, y2+8);
    //arc(x2, y2, w/2,h/2,0, PI+HALF_PI);
  }
  index++;
  if (index >= int(random(height))) {
    c ++;
    p = get(w, -h/2, w*88, w*90);
    //p = get(w, -h/2, w*37, w*29);
    background(0);
    set(0, 0, p);
    index = 0;
  }
}
