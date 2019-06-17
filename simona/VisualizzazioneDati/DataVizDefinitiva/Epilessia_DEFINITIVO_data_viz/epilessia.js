// -
// Data Visualization 0.3 by Simona Girardi [Epilessia, Open Data]
// 2019 © Simona Girardi, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino


var timer = 2000;
var url = "https://spreadsheets.google.com/feeds/list/1mFBaNYYYKBhZd1X0nmMkvNkieb8trFfF4_kV8hx4Wwo/od6/public/values?alt=json";

 // array per contenere i dati/oggetto
var dati = [];

function setup() {
  // pixelDensity(displayDensity());
  createCanvas(windowWidth, windowHeight);

  // richiedi i dati formato JSON e poi chiama la funzione gotSpreadsheet
  loadJSON(url, gotSpreadsheet);
  print("libri");
  colorMode(RGB);
  rectMode(CORNER);
} // setup()

function draw() {
  // piccolo loop per verificare di avere i dati,
  // stampa su schermo cerchi con i colori presenti nel google doc
  
  
  background(40);
  
  
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(255);
  text(timer, width / 2, height/1.1);

  
    if (frameCount%10 == 0 && timer > 0) { 
      timer++;
    } else if (timer == 2016) {
      noLoop();

    }
  
  var padding = width/(dati.length+1);
  
  
  
  for (var i = 0; i < dati.length; i++) {
    
    
   if (dati[i].morti >="150") {
     //morti rossi
      var diameter = map(timer, 2000, 2016, 10, dati[i].morti, false);
      fill(200,0,19, 70); 
      noStroke();
      translate(70,0);
      rect(padding,height/4,diameter/2,diameter/1.6);
     
      
    } else if (dati[i].morti < "150") {
      var diameter2 = map(timer, 2000, 2016, 10, dati[i].morti, false);
      fill(200, 0, 19, 70); 
      noStroke();
      translate(70,0);
      rect(padding,height/4,diameter2/2,diameter2/1.6);
    }
    
    
    if (dati[i].casi<="50") {
    var diameter3 = map(timer, 2000, 2016, 10, dati[i].casi, false);
    strokeWeight(0.5);
    noFill();
    stroke(dati[i].casi);
    rect(padding, height/4,  diameter3/6,diameter3*3);
    } else if (dati[i].casi>"50"){
      var diameter4 = map(timer, 2000, 2016, 10, dati[i].casi, false);
    strokeWeight(0.5);
    noFill();
    stroke(dati[i].casi);
    rect(padding,height/4, diameter4/6,diameter4*3);
    
    }
    
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(10);
    text(dati[i].economia,padding,height/5);
    
  }
} // draw

function gotSpreadsheet(epilessia) {
  //println(colori.feed.entry.length); // < debug, numero righe della tabella
  for (var i = 0; i < epilessia.feed.entry.length; i++) {
    // costruzione dell'oggetto singolo, la riga
    var dato = {
                  // dati, nomi delle colonne, i parametri
                  "economia": epilessia.feed.entry[i].gsx$economia.$t,
                  "morti": epilessia.feed.entry[i].gsx$morti.$t,
                  "casi": epilessia.feed.entry[i].gsx$casi.$t,
       
              }
              //println(colore); // < debug, verifica oggetto 1x1
    dati.push(dato); // < inserimento nell'array del dato
  }
} // gotSpreadsheet

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}