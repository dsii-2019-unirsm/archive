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
  rectMode(CENTER);
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
      var diameter = map(timer, 2000, 2016, 0, dati[i].morti, false);
      fill(0, 191, 165, 70); 
      noStroke();
      translate(70,0);
      ellipse(10,height/2,diameter/1.6,diameter/1.6);
     
      
    } else if (dati[i].morti < "150") {
      var diameter2 = map(timer, 2000, 2016, 0, dati[i].morti, false);
      fill(0, 191, 165, 70); 
      noStroke();
      translate(70,0);
      ellipse(10,height/2,diameter2/1.6,diameter2/1.6);
    }
    
    
    if (dati[i].casi<="50") {
    var diameter3 = map(timer, 2000, 2016, 0, dati[i].casi, false);
    strokeWeight(2);
    fill(255, 10);
    stroke(dati[i].casi/0, diameter3);
    ellipse(10, height/2, dati[i].casi*0.7,dati[i].casi*0.7);
    } else if (dati[i].casi>"50"){
      var diameter4 = map(timer, 2000, 2016, 0, dati[i].casi, false);
      strokeWeight(2);
      fill(255, 10);
      stroke(dati[i].casi/0, diameter4);
      ellipse(10, height/2, dati[i].casi*0.7,dati[i].casi*0.7);
    
    }
    
    noStroke();
    fill(255);
    textAlign(CENTER);
    textSize(10);
    text(dati[i].economia,10,height/5);
    
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
} // gotSpreadsheet(colori)
