// Data visualization_morti_tumori 0.1 by Agron Begteshi
// 2019 © Agron Begteshi, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino


// carica da online


var url = "https://spreadsheets.google.com/feeds/list/1N-QYhMtlKGLDqTdnUwsLW4O5QxV0PCqS_dpKtq6rZkg/1/public/values?alt=json";

// array per contenere i dati/oggetto
//var dati = [];

////
var ogg = []; // < array di oggetti/classi
var grid = 0;
var ruota = true;
////


function setup() {
  /////
  frameRate(60);
  pixelDensity(displayDensity());
  /////

  // pixelDensity(displayDensity());
  createCanvas(windowWidth, windowHeight);

  // richiedi i dati formato JSON e poi chiama la funzione gotSpreadsheet
  loadJSON(url, gotSpreadsheet);
  colorMode(HSB);
  rectMode(CENTER);
} // setup()

function draw() {
  // piccolo loop per verificare di avere i dati,
  // stampa su schermo cerchi con i colori presenti nel google doc
  ////
  grid = width / (ogg.length + 1.5);
  ////
  translate(grid - 100, height / 30)
  background(0, 0, 20);

  ////
  text("OBJECTS : " + ogg.length, 10, 20); // < stampa il numero oggetti in alto a sx
  ////

  for (var i = 0; i < ogg.length; i++) { // (muovi e) mostra tutti gli oggetti
    ogg[i].mostra();
  }
}


/* var padding = width/(dati.length+1);
 for (var i = 0; i < dati.length; i++) {
   fill(dati[i].hue,dati[i].saturation,dati[i].brightness,dati[i].alpha/100);
   if (dati[i].forma == "quadrato") {
     rect(padding + i * padding, height/2, padding*1.2,padding*1.2);
   } else if (dati[i].forma == "cerchio") {
     ellipse(padding + i * padding, height/2, padding*1.2,padding*1.2);
   }
   noStroke();
   fill(255);
   textAlign(LEFT, CENTER);
   text(dati[i].colore, padding + (i * padding),height/3);
 }*/
//} // draw()

function gotSpreadsheet(datiEgx) {

  //NEW
  console.log(datiEgx.feed.entry.length); // < debug, numero righe della tabella
  for (var i = 0; i < datiEgx.feed.entry.length; i++) {
    // costruzione dell'oggetto singolo, la riga
    var c = {
      // dati, nomi delle colonne, i parametri
      //colore
      "anno": parseInt(datiEgx.feed.entry[i].gsx$anno.$t),
      //hue
      "trachea": parseInt(datiEgx.feed.entry[i].gsx$trachea.$t),
      //saturation
      "prostata": parseInt(datiEgx.feed.entry[i].gsx$prostata.$t),
      //brightness
      "fegato": parseInt(datiEgx.feed.entry[i].gsx$fegato.$t),
      "stomaco": parseInt(datiEgx.feed.entry[i].gsx$stomaco.$t),
      "pancreas": parseInt(datiEgx.feed.entry[i].gsx$pancreas.$t),
      "cervello": parseInt(datiEgx.feed.entry[i].gsx$cervello.$t),


    }
    console.log(c); // < debug, verifica oggetto 1x1
    // e ora generiamo un nuovo oggetto classe "Oggetto"
    ogg.push(new Oggetto(i, c.anno, c.trachea, c.prostata, c.fegato, c.stomaco, c.pancreas, c.cervello));
  }


} // gotSpreadsheet(colori)


// DEFINIZIONE DELLA CLASSE OGGETTI "Oggetto"
function Oggetto(_id, _anno, _trachea, _prostata, _fegato, _stomaco, _pancreas, _cervello) {

  // DATI E COSTRUTTORE
  this.id = Number(_id); // < Number() converte in numero intero la stringa
  this.anno = _anno;
  this.trachea = Number(_trachea);
  this.prostata = Number(_prostata);
  this.fegato = Number(_fegato);
  this.stomaco = Number(_stomaco);
  this.pancreas = Number(_pancreas);
  this.cervello = Number(_cervello);



  this.mostra = function() {
    // disegna, cerchio o quadrato dipende dalla forma, colore dai dati passati
    fill(this.id, this.trachea, this.prostata, this.fegato);

    push();
    translate(grid - 0 + this.id * grid, height / 5) + this.dy

    //// TESTO DATI
    fill(255);
    
    textAlign(LEFT, CENTER);
    text(this.trachea + " " + "Trachea", -65, 80);
    fill(255);
    text(this.prostata + " " + "Prostata", -65, 180);
    fill(255);
    text(this.fegato + " " + "Fegato", -65, 280);
    fill(255);
    textAlign(LEFT, CENTER);
    text(this.stomaco + " " + "Stomaco", -65, 380);
    fill(255);
    text(this.pancreas + " " + "Pancreas", -65, 480);
    fill(255);
    text(this.cervello + " " + "Cervello", -65, 580);

//////////

    rotate(PI / 2);


    /////////////////////////////////////////////////////////////DATI  
    //ELLISSE BASE
    fill("#ffd700");
    noStroke(0);
    ellipse(30, 35, this.trachea*this.trachea/6, this.trachea*this.trachea/6);

    //ELLISSE BASE
    fill("#FF6347");
    noStroke(0);
    ellipse(150, 35, this.prostata*this.prostata/6, this.prostata*this.prostata/6);

    //ELLISSE BASE
    fill("#3CB371");
    noStroke(0);
    ellipse(250, 35, this.fegato*this.fegato/6, this.fegato*this.fegato/6);



    //ELLISSE BASE
    fill("#00CED1");
    noStroke(0);
    ellipse(350, 35, this.stomaco*this.stomaco/6, this.stomaco*this.stomaco/6);

    //ELLISSE BASE
    fill("#FFF8DC");
    noStroke(0);
    ellipse(450, 35, this.pancreas*this.pancreas/6, this.pancreas*this.pancreas/6);

    //ELLISSE BASE
    fill("#FF00FF");
    noStroke(0);
    ellipse(550, 35, this.cervello*this.cervello/6,        this.cervello*this.cervello/6);


    ///////////////////////////////////////////////////



    //ANNO
    rotate(PI / 2);
    pop();
    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    push();
    translate(grid - 70 + (this.id * grid), height / 8);
    textSize(30);
    textStyle(BOLD);
    text(this.anno, 0, 0);
    pop();




    ///////Trachea
    pop();
    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    push();
    translate(grid - 210, 180);
    textSize(16);
    textStyle(BOLD);
    fill("#ffd700");
    text("Trachea", 30, 30);
    pop();


    ///////Prostata
    pop();
    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    push();
    translate(grid - 210, 290);
    textSize(16);
    textStyle(BOLD);
    fill("#FF6347");
    text("Prostata", 30, 30);
    pop();


    ///////fegato
    pop();
    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    push();
    translate(grid - 210, 390);
    textSize(16);
    textStyle(BOLD);
    fill("#3CB371");
    text("Fegato", 30, 30);
    pop();

    ///////stomaco
    pop();
    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    push();
    translate(grid - 210, 490);
    textSize(16);
    textStyle(BOLD);
    fill("#00CED1");
    text("Stomaco", 30, 30);
    pop();

    ///////Pacreas
    pop();
    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    push();
    translate(grid - 210, 590);
    textSize(16);
    textStyle(BOLD);
    fill("#FFF8DC");
    text("Pancreas", 30, 30);
    pop();

    ///////Cervello
    pop();
    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    push();
    translate(grid - 210, 690);
    textSize(16);
    textStyle(BOLD);
    fill("#FF00FF");
    text("Cervello", 30, 30);
    pop();


  }
}




// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
