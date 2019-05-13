// Graziana Florio @fupete © 2017 MIT License
// P5js retrieve data from Google Spreadsheets/JSON | Firenze, IT | 4.2017
// Educational purpose, made for DSII2017 lab @UniRSM

// example inspired on Gist https://gist.github.com/claytical/6a929f14964c867e07d8 by @claytical

var url = "https://spreadsheets.google.com/feeds/list/1IS5UgpgnEV2yzF7a5rqz80tFu0H4wlwsh44s3KyduJI/od6/public/values?alt=json";

 // array per contenere i dati/oggetto
var dati = [];

var font;
function preload() {
  font = loadFont('Inconsolata-Bold.otf');
  font1 = loadFont('Inconsolata-Regular.otf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // richiedi i dati formato JSON e poi chiama la funzione gotSpreadsheet
  loadJSON(url, gotSpreadsheet);
  print("presi");
  colorMode(HSB);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textSize(16);
  textFont(font);
  noSmooth();
} // setup()

function draw() {
  // piccolo loop per verificare di avere i dati,
  // stampa su schermo cerchi con i colori presenti nel google doc
  background(110,2,97);
  var padding = width/(dati.length+1);
   fill(0);
  textAlign(LEFT);
  textSize(18);
  textFont(font);
  fill(0,100,80);
  noStroke();
  text("Casate",20,30);
 
  textFont(font1);
  fill(58,75,98);
  rect(40,45,10,10);
  text("Lannister",80,50);
  
  
  fill(176,18,31);
  rect(40,65,10,10);
  text("Stark",80,70);
  
  fill(1,68,76);
  rect(40,85,10,10);
  text("Greyjoy",80,90);
  
   fill(140,43,72);
   rect(40,105,10,10);
  text("Frey",80,110);
  
 
   fill(35,75,85);
   rect(40,125,10,10);
   text("Baratheon",80,130);

  
  for (var i = 0; i < dati.length; i++) {
    fill(196,53,56);
    textAlign(CENTER);
    textFont(font);
    noStroke();
    fill(0,100,80);
    noStroke();
    text(dati[i].nomebattaglia, padding+(i * padding),height/3);

    for(var j=0;j<dati[i].attaccante;j++) {
      //attaccanti 
      if(dati[i].attaccante== "1"){ 
        fill(58,75,98);
         noStroke();
        rect(padding+i*padding-25, height/2, 30,30); 
      }else if(dati[i].attaccante=="2"){ 
        fill(176,18,31);
        noStroke();
        rect(padding+i*padding-25, height/2, 30,30);
      }else if(dati[i].attaccante=="3"){ 
        fill(1,68,76);
        noStroke();
        rect(padding+i*padding-25, height/2, 30,30);
      }else if(dati[i].attaccante=="4"){ 
       fill(140,43,72);
        noStroke();
        rect(padding+i*padding-25, height/2, 30,30);
      } else if(dati[i].attaccante=="5"){ 
        fill(35,75,85);
        noStroke();
        rect(padding+i*padding-25, height/2, 30,30);
      }
 }//attaccanti
for(var z=0; z<=dati[i].difensore; z++){
// difensori
   if(dati[i].difensore== "1"){ 
       stroke(58,75,98);
       strokeWeight(4);
       noFill();
       ellipse(padding + i * padding+25, height/2, 30,30);  
      }else if(dati[i].difensore=="2"){ 
       stroke(176,18,31);
       strokeWeight(4);
       noFill();
       ellipse(padding + i * padding+25, height/2, 30,30);  
      }else if(dati[i].difensore=="3"){ 
       stroke(1,68,76);
       strokeWeight(4);
        noFill();
        ellipse(padding + i * padding+25, height/2, 30,30);  
      }else if(dati[i].difensore=="4"){ 
        stroke(140,43,72);
        strokeWeight(4);
        noFill();
        ellipse(padding + i * padding+25, height/2, 30,30);
      }else if(dati[i].difensore=="5"){ 
        stroke(35,75,85);
        strokeWeight(4);
        noFill();
        ellipse(padding + i * padding+25, height/2, 30,30);
      } 
      }//difensori
      //imboscata
    if(dati[i].tipobattaglia=="ambush"){
      stroke(196,53,56);
      noFill();
      ellipse(padding + i * padding, height/2, 100,100);
    } else {
      stroke(196,53,56);
      noFill();
      rect(padding + i * padding, height/2, 100,100);
    }
    
    
  for (var x=0; x<dati[i].vincitore; x++){
    push();
    
    translate(0,height-240);
    line(i*padding+padding,0, i*padding+padding, 50);
    pop();
// vincitori
   if(dati[i].vincitore== "1"){ 
     noStroke();
     fill(58,75,98);
   //  rect(padding + i * padding, height-150, 30,30);
      }
      else if(dati[i].vincitore=="2"){ 
       fill(176,18,31);
      noStroke();
    //   rect(padding + i * padding, height-150, 30,30);
        
      }
     else if(dati[i].vincitore=="3"){ 
        fill(1,68,76);
      noStroke(); 
//   rect(padding + i * padding, height-150, 30,30);
      }
     else if(dati[i].vincitore=="4"){ 
         fill(140,43,72);
       noStroke();
 //       rect(padding + i * padding, height-150, 30,30);
      }
    else if(dati[i].vincitore=="5"){ 
         fill(35,75,85);
        noStroke();
  //     rect(padding + i * padding, height-150, 30,30);
      }
  
    if(dati[i].vincitore==dati[i].attaccante){ 
      rect(padding + i * padding, height-150, 30,30);
      fill(dati[i].attaccante);
      
      } else if(dati[i].vincitore==dati[i].difensore){
        stroke(58,75,98);
        strokeWeight(4);
        noFill();
        ellipse(padding + i * padding, height-150, 30,30);
        }
     
    }
  
} // draw()

}
function gotSpreadsheet(game) {
  print(game.feed.entry.length); // < debug, numero righe della tabella
  
  for (var i = 0; i < game.feed.entry.length; i++) {
    // costruzione dell'oggetto singolo, la riga
    var battaglia = {
                  // dati, nomi delle colonne, i parametri
                  "nomebattaglia": game.feed.entry[i].gsx$nomebattaglia.$t,
                 "attaccante": game.feed.entry[i].gsx$attaccante.$t,
                 "difensore": game.feed.entry[i].gsx$difensore.$t,
                 "tipobattaglia": game.feed.entry[i].gsx$tipobattaglia.$t,
                 "numeroa": game.feed.entry[i].gsx$numeroa.$t,
                 "numerod": game.feed.entry[i].gsx$numerod.$t,
                  "vincitore": game.feed.entry[i].gsx$vincitore.$t
              }
    print(battaglia); // < debug, verifica oggetto 1x1
    dati.push(battaglia); // < inserimento nell'array del dato
  }
} // gotSpreadsheet(colori)

// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
resizeCanvas(windowWidth, windowHeight);

}
