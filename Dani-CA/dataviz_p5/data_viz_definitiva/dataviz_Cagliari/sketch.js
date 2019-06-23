//Dataviz Cagliari 0.1 by Daniele Cappai [dataviz, daylenght]
// 2019 © Dani-CA, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino


// example inspired on Gist https://gist.github.com/claytical/6a929f14964c867e07d8 by @claytical

// link del doc google spreasheets, deve essere pubblico su web,
// va copiato la parte di indice nell'url nel formato sotto:
// https://spreadsheets.google.com/feeds/list/
// + KEY_URL + /od6/public/values?alt=json
//


var url = "https://spreadsheets.google.com/feeds/list/1f8dJYks4JyrNxYCHnjpcOxcdOheBMOshprABsfTWjT4/od6/public/values?alt=json";
var dati = [];

function setup() {
createCanvas(windowWidth, windowHeight);
  // Request the data from openweathermap
  loadJSON(url, gotSpreadsheet);
  colorMode(HSB);
}

function draw() {
   background(0);
  for (var i = 0; i < dati.length; i++) {
    noFill();
    strokeWeight(0.4);
  stroke(dati[i].hue,dati[i].saturation,dati[i].brightness);
    var padding = (width/dati.length);
    var area = (dati[i].dimensione)*4000;
    var asse = area/(PI*50);
    ellipse((i*padding), height/2, 50, asse);
  }
  for (var y = 0; y<dati.length; y++){
  fill(255);
  textSize(8);
  text(dati[y].mesi,(width/60)+y*(width/12),height*(5/6));
  }
 
}
function gotSpreadsheet(elenco) {
  for (var i = 0; i < elenco.feed.entry.length; i++) {
    var dato = {
                  "dimensione": elenco.feed.entry[i].gsx$durata.$t, 
                  "hue": elenco.feed.entry[i].gsx$hue.$t,
                  "saturation":                           elenco.feed.entry[i].gsx$saturation.$t,
                  "brightness": elenco.feed.entry[i].gsx$brightness.$t,
      "mesi": elenco.feed.entry[i].gsx$mesi.$t
              }
    dati.push(dato);
  }
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
//window resize
//mesi -> temperature colori
//area ellisse 
