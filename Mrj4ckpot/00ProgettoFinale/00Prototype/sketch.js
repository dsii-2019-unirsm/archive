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
let mappa = false;
let daMappare;
let imgsResolution;

let posIniX;
let posIniY;


function carica(url, id){
let img = loadImage(url,  ready => { id=true;  });
  return img;
}






// precarico ml5 e le immagini sorgente
function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  A = carica("https://i.imgur.com/ONuv0Qc.jpg", prontoA);
  B = carica("https://i.imgur.com/1qjhW2L.jpg", prontoB);

//  A = createCapture(VIDEO);
//  A.size(500, 500);
//  A.hide();

//  B = createCapture(VIDEO);
//  B.size(500, 500);
//  B.hide();
}



// ml5 riconosce l'immagine
function gotResult(error, results) {

  if (error) {
    console.error(error);
  }

  console.log(results);
  daMappare = results[0].label;
}


// inserisce il suggerimento di ml5 e cerca l'immagine corrispettiva su unsplash
function aCheAssimiglia(immagine, keywords) {
  imgsResolution= immagine.width + "x" + immagine.height;
  var url = "https://source.unsplash.com/" + imgsResolution + "/?" + keywords + "&" + random(200); // < un random per caricarne sempre una nuova anche sugli stessi temi
  var img_Loading = loadImage(url);
  return img_Loading;
}


// inserisco gotResult e aChiAssomiglia dentro una funzione in modo da fermare il programma
function indovina(){

  gino = get(posIniX, posIniY, beholder.width, beholder.height);
  classifier.classify(gino, gotResult);
  mappa = aCheAssimiglia(gino, daMappare);

}


function setup() {
  createCanvas(windowWidth, windowHeight);
    background(220);
    noStroke();
    background(40);

    beholder = createImage(500, 500);

    posIniX=(windowWidth/2)-(beholder.width)/2-beholder.width;
    posIniY=(windowHeight/2)-beholder.width/2;

  //console.log("TOTALE "+(contaA+contaB)+"||||||||||||||||||"+contaA+" BLU"+"|||||||"+contaB+" ROSSO");
}

function draw() {

background(30);

// CREA IL MOSAICO DEI TASSELLI

//if(gino==false){
   f = 0;
   k = 0;
  for (let x = 0; x < beholder.width; x+=res) {
    Tasselli[x] = [];
    for (let y = 0; y < beholder.height; y+=res) {

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


// DISPONE I TASSELLI DELLE DUE SORGENTI
  A.resize(beholder.width, beholder.height);
  B.resize(beholder.width, beholder.height);

    for (let x = 0; x < beholder.width; x+=res) {
      for (let y = 0; y < beholder.height; y+=res) {

        posx = x+posIniX;
        posy = y+posIniY;

        if(Tasselli[x][y]==false){
           image(A, posx, posy, res, res, posx-posIniX, posy-posIniY, res, res);
           } else{
           image(B, posx, posy, res, res, posx-posIniX, posy-posIniY, res, res);
           }
      }
    }
//}

// STAMPA A SCHERMO L'IMMAGINE SORGENTE E LA BASE PER L'HEIGHTMAP
if (gino && mappa){
   gino.resize(500,500);
   image(gino,posIniX,posIniY);

  mappa.resize(500,500);
  image(mappa, (windowWidth/2)-250, (windowHeight/2)-250);

fill(30);
rect(0,0, windowWidth, posIniY);

  fill(255);
  textSize(32);
  textAlign(CENTER);
  text("Looks like a "+daMappare, windowWidth/2, (windowHeight/2)-300);


 }


}


function keyPressed(){
 // TASTO A FA LO SCREEN DI BEHOLDER E TROVA UN'IMMAGINE CHE GLI SOMIGLIA
  if (key == 'a') {

    indovina();
    background(30);
   }
}


function windowResized() {
resizeCanvas(windowWidth, windowHeight);
posIniX=(windowWidth/2)-(beholder.width)/2-beholder.width;
posIniY=(windowHeight/2)-beholder.width/2;
}
