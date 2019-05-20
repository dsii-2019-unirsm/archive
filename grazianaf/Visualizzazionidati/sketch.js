var url = "https://spreadsheets.google.com/feeds/list/1IS5UgpgnEV2yzF7a5rqz80tFu0H4wlwsh44s3KyduJI/od6/public/values?alt=json";
var color;
var dati = [];
var guerra;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(59, 32, 100);
  
  //1 colore per ogni casata da 0 a 5 
    colori = [color(42, 100, 93), color(101, 40, 69), color(39, 49, 70), color(16, 94, 80), color(8, 82, 79), color(32, 64, 70)];

  guerra = new Battaglia(1, 1, 4, 1, "pitched", 400, 0);

  // richiedi i dati formato JSON e poi chiama la funzione gotSpreadsheet
  loadJSON(url, gotSpreadsheet);
  print("presi");
  rectMode(CORNER);
} // setup()

function draw() {
  for (var i = 0; i < dati.length; i++) {
    guerra.mostra();
    dati[i].mostra(100, 250, ((windowWidth / 15) + 40) * i, 100);
  }
  textAlign(CENTER);
  textSize(40);
  textFont('Georgia');
  text("The War of the Five Kings", width / 2, 100);
  stroke(59, 32, 100);
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
    text(this.nomeB, 40, -5);
    //vincitore 
    fill(colori[this.vinc]);
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