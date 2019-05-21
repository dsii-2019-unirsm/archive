var mosaico = [];
var cellaX, cellaY;

var numeroCelle = 15;

var posX, posY;





function carica(url){
  var img = loadImage(url);
  return img
}






function moneta(x, XMAX){
  
  x++;
  var percentuale = XMAX/x;
  
  if( percentuale <= XMAX && percentuale > (4*XMAX)/5 ){
    return true;
     }
  
  
  if( percentuale <= (4*XMAX)/5 && percentuale > (3*XMAX)/5 ){
    if( random() > 0.75 ){
      return false;
       }
    else{
      return true;
    }
     }
  
  
  if( percentuale <= (3*XMAX)/5 && percentuale > (2*XMAX)/5 ){
    if( random() > 0.5 ){
      return false;
       }
    else{
      return true;
    }
     }
  
  
  if( percentuale <= (2*XMAX)/5 && percentuale > (XMAX)/5 ){
    if( random() > 0.25 ){
      return false;
       }
    else{
      return true;
    }
     }
  
  
  if( percentuale <= (XMAX)/5 && percentuale >= 0 ){
      return false;
     }
  
}








function setup() {
  createCanvas(250, 250);
  
  mappa = carica("https://i.imgur.com/jeLxfFt.jpg");  
  
  cellaX = int(mappa.width/numeroCelle);
  cellaY = int(mappa.height/numeroCelle);
  
  // sceglie da dove prendere la tessera del mosaico, a sinistra è più probabile l'immagine A e a destra la B
  for(var righe=0; righe<=numeroCelle; righe++){
      mosaico[righe] = [];
      for(var colonne=0; colonne<=numeroCelle; colonne++){
          mosaico[righe][colonne] = moneta(colonne, numeroCelle);
      }
  }

  
  
}

function draw() {
  background(220);
  
  

  
  for(var righe=0; righe < mosaico.length; righe++){

      for(var colonne=0; colonne < mosaico.length; colonne++){
        
        posX = colonne*cellaX;
        posY = righe*cellaY;
        


        
        if( mosaico[righe][colonne] == true){
           fill(255, 0, 0);
           }
        else{
           fill(0, 255, 0);
        }
        
        rect(posX, posY, cellaX, cellaY);
        
      }
  }
  

  
  
  
  
  
}
