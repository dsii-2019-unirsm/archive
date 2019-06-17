// -
// dataviz by Grazia Pestillo [dataviz, killer]
// 2019 © Grazia Pestillo, Daniele @Fupete and the course DSII2019 @UniRSM 
// github.com/fupete — github.com/dsii-2019-unirsm
// Educational purposes, MIT License, 2019, San Marino
// —


var url = "https://spreadsheets.google.com/feeds/list/1xMmaavfxlMwLB7G6QE-u6kKGrIQSmjQtnxKN-bZNY5w/1/public/values?alt=json";

var dati = [];

function setup() {
  // pixelDensity(displayDensity());
  createCanvas(windowWidth, windowHeight);
  // richiedi i dati formato JSON e poi chiama la funzione gotSpreadsheet
  loadJSON(url, gotSpreadsheet);
  print("ciao");
  rectMode(CENTER);
} 

function draw() {
  
  background(0);
  var padding = width/(dati.length+1);
  
  for (var i = 0; i < dati.length; i++) {
    textSize(9);
    //fill(255);
    
    text(dati[i].anno, padding + i * padding*1.5, height/5);
    text(dati[i].vittima, padding + i * padding*4, height/3);
    
    
    //fill(255);
    stroke(255);
    strokeWeight(2);
    noFill();
    ellipse(padding + i * padding, height/2, padding*1.2,padding*1.2);
    // se il corpo non è stato ritrovato cerchio grande
    if(dati[i].ritrovamento=="no"){
     
          strokeWeight(1);
          ellipse(padding + i * padding, height/2, 50,50);
    }//rosa chiaro
    if(dati[i].mese=="primavera"){
      c = color('rgba(255, 0, 0, 0.3)');
         fill(c);
      strokeWeight(0);
      //fill(0);
      ellipse(padding + i * padding, height/2-40, padding*0.5,padding*0.5)
    }//rosso
    if(dati[i].mese=="estate"){
      c = color('rgba(255, 0, 0, 0.9)');
         fill(c);
      strokeWeight(0);
      //fill(0);
      ellipse(padding + i * padding, height/2-40, padding*0.5,padding*0.5)
    }//blu chiaro
    if(dati[i].mese=="autunno"){
      c = color('rgba(0, 0, 255, 0.3)');
         fill(c);
      strokeWeight(0);
      //fill(0);
      ellipse(padding + i * padding, height/2-40, padding*0.5,padding*0.5)
    }//inverno
    if(dati[i].mese=="inverno"){
      c = color('rgba(0, 0, 255, 0.9)');
         fill(c);
      strokeWeight(0);
      //fill(0);
     ellipse(padding + i * padding, height/2-40, padding*0.5,padding*0.5)
    }
    
    //giallo
    if(dati[i].stato=="washington"){
      strokeWeight(0);
      fill(249,228,83);
      ellipse(padding + i * padding, height/2,15,15);
    }
    //verde pisello
     if(dati[i].stato=="colorado"){
       strokeWeight(0);
      fill(160, 206, 45);
      ellipse(padding + i * padding, height/2,15,15);
    }
    //verde acceso
     if(dati[i].stato=="utah"){
       strokeWeight(0);
      fill(45,206,91);
      ellipse(padding + i * padding, height/2,15,15);
    }
    
    
    //celeste
     if(dati[i].stato=="florida"){
      strokeWeight(0);
      fill(45,201,206);
      ellipse(padding + i * padding, height/2,15,15);
    }
    //blu
    if(dati[i].stato=="oregon"){
      strokeWeight(0);
      fill(45,120,206);
      ellipse(padding + i * padding, height/2,15,15);
    }
    //viola
    if(dati[i].stato=="idaho"){
      strokeWeight(0);
      fill(131,45,206);
      ellipse(padding + i * padding, height/2,15,15);
    }
    //viola acceso
    if(dati[i].stato=="alabama"){
      strokeWeight(0);
      fill(206,45,201);
      ellipse(padding + i * padding, height/2,15,15);
    }
    // minorenni puntino nero al centro
    if(dati[i].eta <"18"){
      fill(255);
      strokeWeight(0);
      //fill(0);
      ellipse(padding + i * padding, height/2,10,10);
    }
    
    
    
    
    //if (dati[i].forma == "quadrato") {
      //rect(padding + i * padding, height/2, padding*1.2,padding*1.2);
   // } else if (dati[i].forma == "cerchio") {
    //  ellipse(padding + i * padding, height/2, padding*1.2,padding*1.2);
   // }
    //noStroke();
    //fill(255);
  //  textAlign(LEFT, CENTER);
   
   }
    //text(dati[i].colore, padding + (i * padding),height/3);
  
  
} // draw()

function gotSpreadsheet(tedbundy) {
  print(tedbundy.feed.entry.length); // < debug, numero righe della tabella
  for (var i = 0; i < tedbundy.feed.entry.length; i++) {
    // costruzione dell'oggetto singolo, la riga
    var omicidi = {
                  // dati, nomi delle colonne, i parametri
                  "vittima": tedbundy.feed.entry[i].gsx$vittima.$t,
                  "anno": tedbundy.feed.entry[i].gsx$anno.$t,
                  "mese": tedbundy.feed.entry[i].gsx$mese.$t,
                  "eta": tedbundy.feed.entry[i].gsx$eta.$t,
                  "stato": tedbundy.feed.entry[i].gsx$stato.$t,
                  "ritrovamento": tedbundy.feed.entry[i].gsx$ritrovamento.$t
              }
    print(omicidi); // < debug, verifica oggetto 1x1
    dati.push(omicidi); // < inserimento nell'array del dato
  }
} // gotSpreadsheet(colori)

// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
