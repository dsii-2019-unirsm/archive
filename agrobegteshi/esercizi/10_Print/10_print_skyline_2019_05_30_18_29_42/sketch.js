var DESTRA=true;
var GIU = false;
var SU=false;

var x;
var y;

var conta=0;

var direzione;
var altezza;

/*
var sfondo = [];
var cambiDirezione=0;  */

function setup() {
  
  createCanvas(windowWidth, 400);
  
   x=0;
   y=height/2;
  direzione = 20+int(random(60));
  altezza = 20+int(random(60));
  
  background(240);

}

function draw() {
  
 

    if(DESTRA==true){
      
      x++;
      conta++;
      
      
      if(x>=width){
        background(240);
        x=0;
        cambiDirezione=0;
        
       /* sfondo=[];  */
        
         }
      
      if(conta>=direzione){
         DESTRA=false;
        
      /*sfondo[cambiDirezione]=[];
        
      sfondo[cambiDirezione][0]=x;
      sfondo[cambiDirezione][1]=y;
        cambiDirezione++; */
        
        
        conta=0;
        altezza = 20+int(random(60));
        
        
        if(random(2)>=1){
           SU=true;
           DESTRA=false;
           GIU=false;
           } 
        
        else {
           GIU=true;
          DESTRA=false;
          SU=false;
           }
        
        if(y-altezza<= 0){
        GIU=true;
          DESTRA=false;
          SU=false;
        }
        
        if(y+altezza>= height){
           SU=true;
          DESTRA=false;
          GIU=false;
           }
        
        

        
      }
   
   }
  
    else if (SU==true){
      
        y--;
      conta++;
      
     /* sfondo[cambiDirezione]=[];
        
      sfondo[cambiDirezione][0]=x;
      sfondo[cambiDirezione][1]=y;
        cambiDirezione++;  */
      
      
      
      if(conta>=altezza){
         SU=false;
        
        direzione = 5+int(random(15));
        conta=0;
        
        DESTRA=true;
        
      }
   
   }
  
  else if (GIU==true){
    
      y++;
      conta++;
    
   /* sfondo[cambiDirezione]=[];
        
      sfondo[cambiDirezione][0]=x;
      sfondo[cambiDirezione][1]=y;
        cambiDirezione++;  */
      
      
      
      if(conta>=altezza){
         GIU=false;
        
        direzione = 40+int(random(40));
        conta=0;
        
        DESTRA=true;
        
      }
  
  }
  

  
  stroke(0);
  
  circle(x,y,2);
  
  
  fill(80);
  
  /*beginShape();
  
  vertex(0, height);
  vertex(0,height/2);
  for(var i=0; i<sfondo.length; i++){
 vertex(sfondo[i][0], sfondo[i][1]);
  }
  vertex(x,y);
  vertex(x, height);
  endShape();  */

}


function keyPressed() {
 
  if (keyCode === UP_ARROW) {
    SU = true;
    DESTRA=false;
    GIU=false;
  }
  
  else if (keyCode === RIGHT_ARROW) {
    SU = false;
    DESTRA=true;
    GIU=false;
  }
  
  else if (keyCode === RIGHT_ARROW) {
    SU = false;
    DESTRA=false;
    GIU=true;
  }
}