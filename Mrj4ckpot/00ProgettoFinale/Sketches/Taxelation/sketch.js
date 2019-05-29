let A, B;
let puntiA = [];
let puntiB = [];

let beholder;
let Tasselli = [];

let res = 10;

let contaA = 0;
    
let contaB = 0;


function carica(url){
let img = loadImage(url);
  return img;
}


function setup() {
  createCanvas(600, 600);
    background(220);
  stroke(0);
  strokeWeight(1);
  
    A = carica("https://i.imgur.com/ONuv0Qc.jpg");
    B = carica("https://i.imgur.com/1qjhW2L.jpg");
  
  
    beholder = createImage(windowWidth, windowHeight);
    
  
    let numPixel = windowWidth/res;
  
    let resA = A.width/numPixel;
    let resB = B.width/numPixel;  
  
  
  // CREA IL MOSAICO DEI TASSELLI
 
     f = 0;
     k = 0;
    for (let x = 0; x < windowWidth-res; x+=res) {
      Tasselli[x] = [];
      for (let y = 0; y < windowHeight-res; y+=res) {
        
        
        
        if(random(2)>=1){
        Tasselli[x][y] = true;
          contaA++;
        } else {
        Tasselli[x][y] = false;
          contaB++;
        }
        
        let posx = x;
        let posy = y;
        
        let dimx = res;
        let dimy = res;
        
        
        if(Tasselli[x][y]==false){
           

          fill(random(255), 0, 0); 
          rect(posx, posy, dimx, dimy);
         // image(A, posx, posy, res, res, f*resA, k*resA, resA, resA); 
           } else{
             
 
          fill(0, 0, random(255)); 
          rect(posx, posy, dimx, dimy);
          // image(B, posx, posy, res, res, posx, posy, res, res);  
           }
      k=0;
      f++;
      }

    }
 
  
  
  
  console.log("TOTALE "+(contaA+contaB)+"||||||||||||||||||"+contaA+" BLU"+"|||||||"+contaB+" ROSSO");
  
  
}

function draw() {

 // image(A, 0, 0);

//image(beholder);

}