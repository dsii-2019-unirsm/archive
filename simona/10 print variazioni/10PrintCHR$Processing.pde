
int w = 16;
int h = 16;
int index = 0;

void setup() {
  size(640, 384);
  background(0);
  strokeWeight(3);
  stroke(244);
  smooth();
}

void draw() {
  int x1 = w*index;
  int x2 = x1 + w;
  int y1 = h*23;
  int y2 = h*24;


  if (random(2) < 1) {
    color(RGB);
    noFill();
    stroke(0, random(255), 0);
    strokeWeight(1);
    
    ellipse(x1, y2, 30, 30);
    arc (x1, y2, 60, 60, 0, HALF_PI);
  } else {
    color(RGB);
    stroke(0, random(255), 0);
    fill(0, random(255), 0, random(30, 50));
    strokeWeight(1);
    arc (x2, y1, 30, 30, 0, HALF_PI);
 
  } 



  index++;
  if (index == width/w) {
    PImage p = get(0, h, width, h*23);
    background(0);
    set(0, 0, p);
    index = 0;
  }
}
