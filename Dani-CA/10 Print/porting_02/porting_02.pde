// -
// 10print_porting 0.2 by Daniele Cappai [10print, processing]
// 2018 © Nomestudente, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —

int w = 16;
int h = 16;
int index = 0;
float r = 0;
float b = 0;
float g = 0;
float o = 0;
void setup() {
size(640, 384);
//background(#0000ff);
strokeWeight(1);
stroke(0);
smooth();
}
void draw() {
int x1 = w*index;
int x2 = x1 + w;
int y1 = h*23;
int y2 = h*24;
if (random(2) < 1) {
rect(x2, y1, x1, y2);
r = 100 + random (155);
b = 100 + random (155);
g = 100 + random (155);
o = 50 + random (100);

fill(r,g,b,o);
} else {
rect(x1, y1, x2, y2);
r = 100 + random (155);
b = 100 + random (155);
g = 100 + random (155);
o = 50 + random (100);
fill(r,g,b,o);
}
index++;
if (index == width/w) {
PImage p = get(0, h, width, h*23);
//background(#0000ff);
set(0, 0, p);
index = 0;
}
}
