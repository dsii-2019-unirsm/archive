var w = 16;
var h = 16;
var index = 0; 
var c;
var s;
var p;


function setup() {
  c=160;
  
  createCanvas(800,800);

  background(0);

  noSmooth();
  noFill();
  colorMode(HSB);
  
  ellipseMode(CENTER);
}

function draw() {

  var x1 = w*40;
  var x2 = w*39;
  var y1 = h*index;
  var y2 = h + y1;
 

   if (random(6) < 3) {
    
   
    
   ellipseMode(CENTER);
   ellipse(x1, y2/2, 3, 3);
   strokeWeight(random(1, 1.5));
   fill(c, 160, 255);
   line(x1, y1, x2, y2);
   line(x1, y2, x2, y1);
    
    
  } else {
    
    
    stroke(c, 170, 255);
    
    strokeWeight(random(2, 3.5));
    stroke(c, 255, 255);
    
    ellipseMode(CENTER);
    ellipse(x1, y2/2, 4, 4);
    line(x1, y1, x2, y2);
    line(x1, y2, x2, y1);
  }
  index++;
  if (index >= int(random(height))) {
    c ++;

    p = get(w, -h/2, w*43, w*42);
    
    background(0);
    set(0, 0, p);
    index = 0;
  }
}