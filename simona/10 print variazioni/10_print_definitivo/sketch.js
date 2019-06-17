// -
// 10 print final 0.1 by Simona Girardi [10 Print, Nature]
// 2018 © Simona Girardi, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino

var w = 16;
var h = 16;
var index = 0;

function setup() {
  createCanvas(640, 384);
  background(255);
  color(RGB);
}

function draw() {
  var x1 = w*index;
  var x2 = x1 + w;
  var y1 = h*23;
  var y2 = h*24;


  if (random(2) < 1) {
    
    noFill();
    arc (x2-16,y1-16, 30, 30, radians(0), radians(90))
    fill(0, random(255), 0, random(50,100));
    arc (x2,y1, 30, 30, radians(180), radians(270));
   
  } else {
    
    fill(0, random(255), 0, random(80,100));
    strokeWeight(1);
    arc (x2,y1, 30, 30, radians(270), radians(0));
    arc (x2-16,y1-16, 30, 30, radians(90), radians(180));
    fill(random(255),0, 0);
    ellipse (x2,y1,7,7);
  } 


index++;
  if (index >= int(random(height))){
    var p = get(0, h, width, h*23);
    background(255);
    set(0, 0, p);
    index = 0;
  } 
}