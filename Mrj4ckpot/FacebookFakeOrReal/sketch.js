// -
// FacebookFakeOrReal 0.1 by Luigi Marchionni
// 2018 © Luigi Marchionni, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
// Credits/Thanks to: 
// Daniele Tabellini
// Paolo Petrangolini
// —
// Fonte:
// www.kaggle.com
// —

var propAmici=30;
var propFoto=1.5;

var baseFoto=30;

var linea = 1;
var img;

var centroX;
var centroY;

var valoreX;
var valoreY;

var Ax;
var Ay;

var Bx;
var By;

var imgX;
var imgY;

var Mr=0;
var Mf=0;
var Fr=0;
var Ff=0;

var MaleReal;
var MaleFake;
var FemaleReal;
var FemaleFake;

var stroke=1;

var url = "https://spreadsheets.google.com/feeds/list/1g8Sb2jGNK03x8uu8HRJZfueXfx18ILOFAlOyoTjRj0c/1/public/values?alt=json";

var ogg = []; // < array di oggetti/classi


function setup() {
  createCanvas(800, 800);
  loadJSON(url, gotSpreadsheet);
  colorMode(HSB);
  
  // dimensioni del quadrato e coordinate dei punti A e B
  imgX = height/4;
  imgY = height/4;
  
  Ax = width/2 - imgX;
  Ay = Ax;
  
  Bx = width/2 + imgX;
  By = Bx;
  
 // img = loadImage("C:\Users\gigio15039\Desktop\Facebook_logo_(square)");
}


function draw() {
  background(120);
  
   // Azzero i contatori prima di ogni ciclo
  Mr=0;
  Mf=0;
  Fr=0;
  Ff=0;
  
  
  
  // Leggo l'array e stampo un poligono che rappresenta l'attività di post con foto.
  // foto maschi reali
  beginShape();
    vertex(Ax, Ay);
  for (var i=0; i < ogg.length; i++) { 
  
  if ( ogg[i].sesso == "male" && ogg[i].tipo == "real" ){
        
        noStroke();
        fill(180, 150, 65, 0.5);
        vertex(Ax+Mr, (Ay-int(ogg[i].foto)/propFoto-baseFoto));  
        Mr += linea;
    
      }     
  }
      vertex(Ax+Mr, Ay);
    endShape();
  
  
  
  // foto maschi fake
    beginShape();
    vertex(Ax, Ay);
  for (var i=0; i < ogg.length; i++) { 
  
  if ( ogg[i].sesso == "male" && ogg[i].tipo == "fake" ){
        
        noStroke();
        fill(180, 150, 65, 0.2);
        vertex(Ax-int(ogg[i].foto)/propFoto-(baseFoto/2), Ay+Mf);  
        Mf += linea;
    
      }     
  }
      vertex(Ax, Ay+Mf);
    endShape();
  
  
    // foto femmine real
    beginShape();
    vertex(Bx, By);
  for (var i=0; i < ogg.length; i++) { 
  
  if ( ogg[i].sesso == "female" && ogg[i].tipo == "real" ){
        
        noStroke();
        fill(280, 100, 67, 0.4);
        vertex(Bx-Fr, By+int(ogg[i].foto)/propFoto+baseFoto);  
        Fr += linea;
    
      }     
  }
      vertex(Bx-Fr, By);
    endShape();
  
  
  
  // foto femmine fake
    beginShape();
    vertex(Bx, By);
  for (var i=0; i < ogg.length; i++) { 
  
  if ( ogg[i].sesso == "female" && ogg[i].tipo == "fake" ){
        
        noStroke();
        fill(280, 100, 67, 0.2);
        vertex(Bx+(int(ogg[i].foto)/(propFoto))+(baseFoto/2), By-Ff);  
        Ff += linea;
      }     
  }
      vertex(Bx, By-Ff);
    endShape();
  
  
 // Metto da parte i contatori e li azzero di nuovo 
 MaleReal = Mr;
 MaleFake = Mf;
 FemaleReal = Fr;
 FemaleFake = Ff;
  
  Mr=0;
  Mf=0;
  Fr=0;
  Ff=0;
  
        
  // leggo tutto l'array e stampo linee corrispondenti al numero di amici
  for (var i=0; i < ogg.length; i++) {  
          
                  strokeWeight(linea);

    if ( ogg[i].sesso == "male" && ogg[i].tipo == "real" ){
        
        stroke(228, 100, 65);
        line(Ax+Mr, Ay, Ax+Mr, Ay-int(ogg[i].amici)/propAmici);  
        Mr += linea;
     // console.log(Mr);
      } 
   
    if ( ogg[i].sesso == "male" && ogg[i].tipo == "fake" ){
        
        stroke(228, 160, 105, 0.5);
        line(Ax, Ay+Mf, Ax-int(ogg[i].amici)/propAmici, Ay+Mf);  
        Mf += linea;
      }
          
    if ( ogg[i].sesso == "female" && ogg[i].tipo == "real" ){
        
        stroke(318, 100, 67);
        line(Bx-Fr, By, Bx-Fr, By+int(ogg[i].amici)/propAmici);  
        Fr += linea;
      } 
   
    if ( ogg[i].sesso == "female" && ogg[i].tipo == "fake" ){
        
        stroke(318, 160, 107, 0.5);
        line(Bx, By-Ff, Bx+int(ogg[i].amici)/propAmici, By-Ff);  
        Ff += linea;
      }

          
   }
    
     
    textSize(12);
    noStroke();
    fill(228, 160, 200, 0.5);
    text("FAKE males", Ax-65, Ay+MaleFake+20);
    
    noStroke();
    fill(228, 160, 105);
    text("REAL males", Ax+MaleReal-70, Ay+20);
    
    noStroke();
    fill(318, 100, 67, 0.5);
    text("FAKE females", Bx, By-FemaleFake-10);
    
    noStroke();
    fill(318, 100, 67);
    text("REAL females", Bx-FemaleReal, By-10);
    
    noStroke();
    fill(40);
    textSize(30);
    text("FACEBOOK", width/2 - 80, height/2);
    text("ACCOUNTS", width/2 - 80, height/2+30); 
  
  
  //image(img, Ax, Ay, imgX, imgY);
    
  //noLoop();
}


function gotSpreadsheet(array) {
  for (var i = 0; i < array.feed.entry.length; i++) {
    
    //console.log(array.feed.entry.length);

    var oggetto = {
           "tipo": array.feed.entry[i].gsx$status.$t,
           "amici": array.feed.entry[i].gsx$friend.$t,
           "sesso": array.feed.entry[i].gsx$gender.$t,
           "post": array.feed.entry[i].gsx$post.$t,
           "foto": array.feed.entry[i].gsx$photo.$t,
           "video": array.feed.entry[i].gsx$video.$t,
           "like": array.feed.entry[i].gsx$like.$t,
           "gruppi": array.feed.entry[i].gsx$group.$t
              }
    ogg.push(oggetto);
 //  console.log(oggetto);
  }
  
//  console.log(ogg.length);
} 
