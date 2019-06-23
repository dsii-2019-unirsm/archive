// -
// 10print porting 0.1 by Daniele Cappai [10print, processing]
// 2018 © Dani-CA, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
int w = 16;
int h = 16;
int index = 0;
float r = 255;
float g = 150;
float b = 0;
float o = 255;

void setup(){
  size(640, 384);
  background(0);
  strokeWeight(1);
  smooth();
}

void draw(){
  int x1 = w*index;
  int x2 = x1 + w;
  int y1 = h*23;
  int y2 = h*24;

  if (random(5) < 4) {
    line (x2, y1, x1, y2);
  } else {
    line (x1, y1, x2, y2);
  }
  
  if (random(5) > 4) {
    line (x1, y1, x2, y2);
  } else {
    line (x2, y1, x1, y2);
  }
 
 index++;

 if(index == width/(w)){
   PImage p = get(0, h, width, h*23);
   background(0);
   b = b + random(10);
   r = r - 10;
  
   stroke(r,g,b,o);
   set (0, 0, p);
   index = 0;
 }
}
