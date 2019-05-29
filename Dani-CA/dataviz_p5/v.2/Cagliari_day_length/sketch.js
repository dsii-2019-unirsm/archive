// -
// Data viz Cagliari day length 0.1 by Daniele Cappai [data visualization, p5.js]
// 2018 © Nomestudente, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —

// example inspired on Gist https://gist.github.com/claytical/6a929f14964c867e07d8 by @claytical

// link del doc google spreasheets, deve essere pubblico su web,
// va copiato la parte di indice nell'url nel formato sotto:
// https://spreadsheets.google.com/feeds/list/
// + KEY_URL + /od6/public/values?alt=json
//
// se chiamando questo url direttamente nel browser riporta l'errore “Il valore di grid_id non è valido.” provate indicizzando direttamente il primo foglio sostituendo a /od6/ un /1/ quindi la seconda parte diventa + /1/public/values?alt=json

var url = "https://spreadsheets.google.com/feeds/list/1f8dJYks4JyrNxYCHnjpcOxcdOheBMOshprABsfTWjT4/od6/public/values?alt=json";
var dati = [];
function setup() {
createCanvas(windowWidth, windowHeight);
  // Request the data from openweathermap
  loadJSON(url, gotSpreadsheet);
 
}

function draw() {
  background(0);
  var padding = width/dati.length;
  for (var i = 0; i < dati.length; i++) {
    noFill();
    strokeWeight(0.2);
    stroke(190,255,255);
    ellipse(50, height/2, dati[i].dimensione*10, dati[i].dimensione*30);
    translate(1.66,0);
  }
  
}

function gotSpreadsheet(elenco) {
  for (var i = 0; i < elenco.feed.entry.length; i++) {
    var dato = {
                  "dimensione": elenco.feed.entry[i].gsx$durata.$t, 
              }
    dati.push(dato);
  }

}
