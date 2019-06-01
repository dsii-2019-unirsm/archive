let A, B;
let puntiA = [];
let puntiB = [];

let beholder;
let Tasselli = [];

let res = 5;

let contaA = 0;
let contaB = 0;

let prontoA=false;
let prontoB=false;

let classifier;

let gino = false;


function carica(url, id){
let img = loadImage(url,  ready => { id=true;  });
  return img;
}







function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  A = carica("https://i.imgur.com/ONuv0Qc.jpg", prontoA);
  B = carica("https://i.imgur.com/1qjhW2L.jpg", prontoB);
}






function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  createDiv('Label: ' + results[0].label);
  createDiv('Confidence: ' + nf(results[0].confidence, 0, 2));
}











function aCheAssimiglia(keywords) {
  var url = "https://source.unsplash.com/" + imgsResolution + "/?" + keywords + "&" + random(200); // < un random per caricarne sempre una nuova anche sugli stessi temi
  var img_Loading = loadImage(url);
  return img_Loading;
}


function setup() {
  createCanvas(1000, 600);
    background(220);
  noStroke();
    background(40);

    beholder = createImage(500, 500);

  console.log("TOTALE "+(contaA+contaB)+"||||||||||||||||||"+contaA+" BLU"+"|||||||"+contaB+" ROSSO");

}

function draw() {

background(30);

// CREA IL MOSAICO DEI TASSELLI
   f = 0;
   k = 0;
  for (let x = 0; x < beholder.width-res; x+=res) {
    Tasselli[x] = [];
    for (let y = 0; y < beholder.height-res; y+=res) {

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

    k=0;
    f++;
    }

  }

  A.resize(beholder.width, beholder.height);
  B.resize(beholder.width, beholder.height);


    for (let x = 0; x < beholder.width-res; x+=res) {

      for (let y = 0; y < beholder.height-res; y+=res) {

        posx = x;
        posy = y;

        if(Tasselli[x][y]==false){
           image(A, posx, posy, res, res, posx, posy, res, res);
           } else{
           image(B, posx, posy, res, res, posx, posy, res, res);
           }
      }


    }
if (gino) image(gino,0,0)
fill(255);
textSize(32);
text('risultato', 500, 550);

}


function keyPressed(){
  if (key == 'a') gino = get();
}
