var res=3;
var x,y,z;
var mappa;

function carica(url){
  mappa = loadImage(url);
  return mappa
}

function setup() {
  createCanvas(400, 400, WEBGL);
  colorMode(HSB);
  
   mappa = carica("https://i.imgur.com/jeLxfFt.jpg");
}

function draw() {
  background(220);
  
  //image(mappa, 0, 0, 400, 400);

  translate(-120, -120,-30);
  rotateX(PI/6);
  
  smooth();
  
  fill(255);
  stroke(220, 120, 160);
  for( y=0; y<= mappa.height; y += res){
    beginShape(TRIANGLE_STRIP);
      for( x=0; x<= mappa.width; x += res){
        var r = mappa.get(x,y)[0];
        var g = mappa.get(x,y)[1];
        var b = mappa.get(x,y)[2];
        
        var r2 = mappa.get(x+res,y+res)[0];
        var g2 = mappa.get(x+res,y+res)[1];
        var b2 = mappa.get(x+res,y+res)[2];
    
    var grigio = (r+g+b)/3;
    var grigio2 = (r2+g2+b2)/3;
    
    z = map(grigio, 0, 255, 0, 40);
        z2 = map(grigio2, 0, 255, 0, 40);
    
    vertex (x, y, z);
    vertex (x, y+res, z2);
      }
      endShape();
  }

  
 // noLoop();

  
  
  
  
  
}
