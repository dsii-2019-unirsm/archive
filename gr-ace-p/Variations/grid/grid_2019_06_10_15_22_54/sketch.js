var w = 16;
var h = 16;
var index = 0; 
var c;
var s;
var p;

function setup() {
  c=(150);
createCanvas(800,800);
  //fullScreen();
  background(0);
  //background(255);
  //background(c);
  noSmooth();
  noFill();
  colorMode(HSB);
  //frameRate(3);
  ellipseMode(CENTER);
}

function draw() {

  var x1 = w*40;
  var x2 = w*39;
  var y1 = h*index;
  var y2 = h + y1;

  if (random(4) < 3) {
    //strokeWeight(1);
    strokeWeight(random(3.5, 5));
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
    p = get(w, -h/2, w*40, w*39);
    //p = get(w, -h/2, w*37, w*29);
    background(0);
    set(0, 0, p);
    index = 0;
  }
}