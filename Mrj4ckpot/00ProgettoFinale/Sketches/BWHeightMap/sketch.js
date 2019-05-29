let mappa;
let superficie;

var dis = [];


function setup() {
  createCanvas(400, 400);
  
  mappa = loadImage('https://i.imgur.com/jeLxfFt.jpg');
  superficie = createImage(400, 400);
}





function draw() {
  background(220);
  
  image(mappa, (width/2)-200, (height/2)-200, 400, 400);
  
  mappa.loadPixels();
    for(var o = 0; o < mappa.width; o++){
    dis[o] = [];
      for(var v = 0; v < mappa.height; v++){
        
        var index = (mappa.width - o + 1 + (v * mappa.width))+4;
        
        var r = mappa.pixels[index]; 
        var g = mappa.pixels[index+1];
        var b = mappa.pixels[index+2];        
        dis[o][v] = (r+g+b)/3; 
      }
  }
  
  
console.log(dis);


  
}