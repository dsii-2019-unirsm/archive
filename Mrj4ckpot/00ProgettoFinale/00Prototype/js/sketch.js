// VARIABILI DI BEHOLDER MAP RECOGNITION
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



// VARIABILI DI BEHOLDER 3D EDITOR
let easycam;
let punti = [];
let voxel = [];
let voxelBN = [];

let viewMode = 0;
let rot=0;

let multi = 1;

let cam1;

let colore;
let u,v;



function carica(url, id){
let img = loadImage(url,  ready => { id=true;  });
  return img;
}

// precarico ml5 e le immagini sorgente
function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  A = carica("https://i.imgur.com/ONuv0Qc.jpg", prontoA);
  B = carica("https://i.imgur.com/HyKkhog.jpg?1", prontoB);

//  A = createCapture(VIDEO);
//  A.size(500, 500);
//  A.hide();

//  B = createCapture(VIDEO);
//  B.size(500, 500);
//  B.hide();
}



//
//
//
// FUNZIONI DI BEHOLDER MAP RECOGNITION
//
//
//



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




//
//
//
// FUNZIONI DI BEHOLDER 3D EDITOR
//
//
//

function carica() {
  // CARICA MAPPA DISPLACEMENT
    mappa.loadPixels();
    let f = 0;
    let k = 0;
    for (let x = 0; x < mappa.width-res; x+=res) {
      punti[f] = [];
      for (let y = 0; y < mappa.height-res; y+=res) {
        let c = mappa.get(x, y);
        let h = brightness(c);
        punti[f][k] = h;
        k++;
      }
      k=0;
      f++;
    }
    mappa.updatePixels();

  // CARICA TEXTURE
    gino.loadPixels();
    let i = 0;
    let j = 0;
    for (let x = 0; x < gino.width-res; x+=res) {
      voxel[i] = [];
      voxelBN[i] = [];
      for (let y = 0; y < gino.height-res; y+=res) {
        let c = gino.get(x, y);
        let h = brightness(c);
        voxel[i][j] = c;
        voxelBN[i][j] = h;
        j++;
      }
      j=0;
      i++;
    }
    gino.updatePixels();
}


// // // // // //
// // // //
// //
// SETUP
// //
// // // //
// // // // // //




function setup() {
  createCanvas(windowWidth, windowHeight);
    background(220);
    noStroke();
    background(40);

    beholder = createImage(500, 500);

    posIniX=(windowWidth/2)-(beholder.width)/2-beholder.width;
    posIniY=(windowHeight/2)-beholder.width/2;


// EASYCAM
    Dw.EasyCam.prototype.apply = function(n) {
        var o = this.cam;
        n = n || o.renderer,
        n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))

      };

    easycam = new Dw.EasyCam(_renderer, {
      distance: 350,
      center: [0,0,0]
    });

    easycam.setViewport([0, 0, windowWidth, windowHeight]);

    // start with an animated rotation
    easycam.setRotation(Dw.Rotation.create({
      angles_xyz: [0, -PI / 3, PI / 2]
    }), 4000);
    easycam.setDistance(500, 2500);

  //console.log("TOTALE "+(contaA+contaB)+"||||||||||||||||||"+contaA+" BLU"+"|||||||"+contaB+" ROSSO");
}





// // // // // //
// // // //
// //
// DRAW
// //
// // // //
// // // // // //





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

// PREMI TASTO A:
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

  text("It looks like a "+daMappare, windowWidth/2, (windowHeight/2)-300);


  // PREMI TASTO S:
  // CREA IL MODELLO 3D CON TEXTURE


 }


noFill();
strokeWeight(3);
stroke(240);

rect(posIniX, posIniY, beholder.width, beholder.height);
rect(posIniX+beholder.width, posIniY, beholder.width, beholder.height);
rect(posIniX+2*beholder.width, posIniY, beholder.width, beholder.height);
strokeWeight(0);
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
