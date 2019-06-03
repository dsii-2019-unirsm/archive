// -
// DataViz_10 battaglie di Game of Thrones 0.1 by Graziana Florio [Dataviz, Game of Thrones]
// 2019 © Graziana Florio @grazianaf, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —

var url = "https://spreadsheets.google.com/feeds/list/1IS5UgpgnEV2yzF7a5rqz80tFu0H4wlwsh44s3KyduJI/od6/public/values?alt=json";
var color;
var dati = [];
var guerra;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  //1 colore per ogni casata da 0 a 5 
    colori = [color(49, 46, 81), color(23, 96, 51), color(19, 91, 83), color(31, 75, 98), color(207, 97, 15), color(32, 64, 70)];

  guerra = new Battaglia(1, 1, 4, 1, "pitched", 400, 0);

  // richiedi i dati formato JSON e poi chiama la funzione gotSpreadsheet
  loadJSON(url, gotSpreadsheet);
  print("presi");
  rectMode(CORNER);
} // setup()

function draw() {
  background(54, 41, 100);
  for (var i = 0; i < dati.length; i++) {
    guerra.mostra();
    dati[i].mostra(100, 250, ((windowWidth / 15) + 40) * i, 100);
  }
  textAlign(CENTER);
  textSize(40);
  textFont('Patua One');
  fill(351, 83, 25);
  text("Ten War of the Five Kings", width / 2, 100);
 //disegno legenda
  textSize(10);
  text("Legenda", 120, 490);
  rectMode(CORNER);
  //casata1
  noStroke();
  fill(49, 46, 81);
  rect(100,500,15,15);
  fill(351, 83, 25);
  text("Baratheon",150,510);
  //casata2
  noStroke();
  fill(23, 96, 51);
  rect(100,530,15,15);
  fill(351, 83, 25);
  text("Stark",140,540);
  //casata3
  noStroke();
  fill(19, 91, 83);
  rect(100,560,15,15);
  fill(351, 83, 25);
  text("Lannister",150,572);
  //casata4
  noStroke();
  fill(31, 75, 98);
  rect(190,500,15,15);
  fill(351, 83, 25);
  text("Frey",225,511);
  //casata5
  noStroke();
  fill(207, 97, 15);
  rect(190,530,15,15);
  fill(351, 83, 25);
  text("Greyjoy",230,541);
  
  //sommario
  textSize(10);
  text("Sommario delle battaglie vinte", 407, 490);
  rectMode(CORNER);
  //Frey
  fill(31, 75, 98);
  stroke(54, 41, 100);
  rect(340,500,15,15);
  rect(355,500,15,15);
  rect(370,500,15,15);
  rect(385,500,15,15);
  
  //Stark
  fill(23, 96, 51);
  stroke(54, 41, 100);
  rect(340,515,15,15);
  rect(355,515,15,15);
  rect(370,515,15,15);
  //Lannister
  fill(19, 91, 83);
  stroke(54, 41, 100);
  rect(340,530,15,15);
  //Baratheon
  fill(49, 46, 81);
  stroke(54, 41, 100);
  rect(340,545,15,15);
  //Greyjoy
  fill(207, 97, 15);
  stroke(54, 41, 100);
  rect(340,560,15,15);
  
} // draw()


function gotSpreadsheet(prova1) {
  print(prova1.feed.entry.length); // < debug, numero righe della tabella
  for (var i = 0; i < prova1.feed.entry.length; i++) {
    // costruzione dell'oggetto singolo, la riga
    var battaglia = {
      // dati, nomi delle colonne, i parametri
      "nomebattaglia": prova1.feed.entry[i].gsx$nomebattaglia.$t,
      "attaccante": prova1.feed.entry[i].gsx$attaccante.$t,
      "difensore": prova1.feed.entry[i].gsx$difensore.$t,
      "tipobattaglia": prova1.feed.entry[i].gsx$tipobattaglia.$t,
      "numeroa": prova1.feed.entry[i].gsx$numeroa.$t,
      "numerod": prova1.feed.entry[i].gsx$numerod.$t,
      "vincitore": prova1.feed.entry[i].gsx$vincitore.$t,

    }
    // print(battaglia); // < debug, verifica oggetto 1x1
    dati.push(new Battaglia(battaglia.nomebattaglia, battaglia.attaccante, battaglia.difensore, battaglia.tipobattaglia, battaglia.numeroa, battaglia.numerod, battaglia.vincitore));

  }
  console.log(dati);
}

// DEFINIZIONE DELLA CLASSE 
class Battaglia {

  constructor(_nomeBattaglia, _attaccante, _difensore, _tipoBattaglia, _numeroa, _numerod, _vincitore) {
    this.nomeB = String(_nomeBattaglia);
    this.att = Number(_attaccante);
    this.dif = Number(_difensore);
    this.tipob = Number(_tipoBattaglia);
    this.numA = Number(_numeroa / 10);
    this.numD = Number(_numerod / 10);
    this.vinc = _vincitore;

  }
  mostra(w, h, x, y) {
    //rettangolo
    push();
    translate(x + 100, y + 100);
    textSize(12);
    textFont("Slabo 27px");
    noStroke();
    text(this.nomeB, 40, -5);
    //vincitore 
    fill(colori[this.vinc]);
    stroke(54,41,100);
    strokeWeight(2);
    rect(0, 0, w, h);
    //primo quadrato sx
    fill(colori[this.att]);
    rect(0, 0, w * (this.numA / (this.numA + this.numD)), 0.8 * h);
    //secondo quadrato dx
    fill(colori[this.dif]);
    rect(w * (this.numA / (this.numA + this.numD)), 0, w * (this.numD / (this.numA + this.numD)), 0.8 * h);
    pop();
  }
} // Oggetto()

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}