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


function carica(url, id){
let img = loadImage(url,  ready => { id=true;  });
  return img;
}






// precarico ml5 e le immagini sorgente
function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  A = carica("https://i.imgur.com/ONuv0Qc.jpg", prontoA);
  B = carica("https://i.imgur.com/1qjhW2L.jpg", prontoB);
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
  gino = get();
  classifier.classify(gino, gotResult);
  mappa = aCheAssimiglia(gino, daMappare);
}


function setup() {
  createCanvas(1000, 600);
    background(220);
  noStroke();
    background(40);

    beholder = createImage(500, 500);

  //console.log("TOTALE "+(contaA+contaB)+"||||||||||||||||||"+contaA+" BLU"+"|||||||"+contaB+" ROSSO");
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


// DISPONE I TASSELLI DELLE DUE SORGENTI
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


// STAMPA A SCHERMO L'IMMAGINE SORGENTE E LA BASE PER L'HEIGHTMAP
if (gino){
   image(gino,0,0);
   mappa.resize(500,500);
   image(mappa, 500, 0);


fill(30);
rect(0,500, 1000, 600);

   fill(255);
   textSize(32);
   textAlign(CENTER);
   text(daMappare, 500, 540);
 }


}


function keyPressed(){
 // TASTO A FA LO SCREEN DI BEHOLDER E TROVA UN'IMMAGINE CHE GLI SOMIGLIA
  if (key == 'a') {
      indovina();
   }
}
