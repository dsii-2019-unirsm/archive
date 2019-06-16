let TuttiGliOggetti = []; // < array di oggetti/classi
let lh, lw; // misura oggetto
let gridX = 2;
let gridY = 5;
let paddingW, paddingH = 20;
let t;

let speedSu = 0; // < luigi.... _-(
let speedGiu = 0;




function setup() {
  createCanvas(windowWidth, windowHeight);

  rectMode(CORNER);
  lw = width / gridX;
  lh = height / gridY;
  //var paddingW = lw/2;
  //var paddingH = lh/2;

  for (var i = 0; i < gridX; i++) {
    for (var j = 0; j < gridY; j++) {
      TuttiGliOggetti.push(new Oggetto(0.01, i * lw /*+paddingH*/ , j * lh /*+paddingW*/ ));
    }
  }
}


function draw() {
  background(255);


      //TuttiGliOggetti[0].disegna3();


  for (var i = 0; i < TuttiGliOggetti.length; i++) { // (muovi e) mostra tutti gli oggetti



   switch (i) {

      case 0: // daniele
        //TuttiGliOggetti[i].disegna();
        break;
      case 1: // romano
        //TuttiGliOggetti[i].disegna1();
        break;
      case 2: // dani CA
        //TuttiGliOggetti[i].disegna2();
        break;
      case 3: // luigi
      //TuttiGliOggetti[i].disegna3();
        break;
      case 4: // simona
      //TuttiGliOggetti[i].disegna4();
        break;
      case 5: // grazia
        //TuttiGliOggetti[i].disegna5();
        break;
      case 6: // luca
        TuttiGliOggetti[i].disegna6();
        break;
      case 7: // fuk
        //TuttiGliOggetti[i].disegna7();
        break;
      case 8: // graziana
        //TuttiGliOggetti[i].disegna8();
        break;
      case 9: // agron
        //TuttiGliOggetti[i].disegna9();
        break;
    }
  }

  text("OBJECTS : " + TuttiGliOggetti.length, 10, 20); // < stampa il numero oggetti in alto a sx

}


// DEFINIZIONE DELLA CLASSE OGGETTI "Oggetto"
function Oggetto(_velocita, _posX, _posY) {

  this.velocita = _velocita;
  this.posX = _posX;
  this.posY = _posY;
  this.colore = color('white');
  this.angolo = 0;


  this.disegna = function() {
      push();
      colorMode(HSB, 360, 100, 100, 1);
      //noStroke();
      rectMode(CORNER);
      translate(this.posX, this.posY);
      fill('black');
      rect( 0, 0, lw, lh);
      let h = frameCount % 360;
      for (let r = 0; r < lw; r++) {
        fill(h, 100, 100, 1);
        rect(r,lh*3/4,1,lh/4);
        let h2 = map(r, 0, lw, 0, 360);
        h2 -= h/4 * this.velocita * 400;
        fill(h2, 100, 100, 1);
        rect(r,0,1,lh*3/4);
      }
      let verso = frameCount % 36;
      if (verso == 0) {
        this.velocita*=-1;
      }
      colorMode(RGB, 255, 255, 255, 1);
      fill('black');
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 5; j++) {
          ellipse( i*lw/10, j*lh/4, 2, 2);
        }
      }
      fill('black');
      rectMode(CENTER);
      rect(lw/2, lh/2-5, 50, 20, 7, 7, 7, 7)
      fill('white');
      textAlign(CENTER);
      text('Daniele', lw/2, lh/2);
      pop();
  }

//   this.disegna1 = function() {
//     // disegna se stesso su schermo
//     let myName = "Romano";
//
//     push();
//     translate(this.posX, this.posY);
//     fill(random(0, 255));
//     strokeWeight(4);
//     stroke(random(100, 255), 0, 0);
//     ellipse(lw*.5, lh*.5, lw, lh);
//     text("Romano",lw*.5 - myName.length/2,lh*.5)
//     let gap = TWO_PI / 8;
//     let radius = lh/2-5;
//     for (let n = 0; n < 10; n++) {
//     x = lw*.5 + cos(gap * n) * radius;
//     y = lh*.5 + sin(gap * n) * radius;
//     fill (0);
//     ellipse(x, y, 5, 5);
//     }
//     pop();
//
//   }
//
//
//   //DANI-CA
//   this.disegna2 = function() {
//     push();
//     rectMode(CENTER);
//     textAlign(CENTER);
//     translate(this.posX, this.posY);
//       fill(0,0,100);
//        //if (frameCount<lh){
//       //   ellipse(lw/2, lh/2,frameCount,frameCount);
//       // } else  {
//       //   ellipse(lw/2, lh/2,frameCount*(-1),frameCount*(-1));
//       // }
//
//     fill('white');
//     text("Dani-CA", lw/2, lh/2);
//     pop();
//   }
//
//

   // MR JACKPOT
  this.disegna3 = function() {


     noStroke();
    speedSu=0;
    speedGiu-=0.002;


    let noiseSu = map(noise(speedSu*10, speedGiu), 0, 1, 0, lh);
    let noiseGiu = map(noise(speedSu, speedGiu), 0, 1, 0, lh/2);


     push();
        rectMode(CENTER);

    translate(this.posX, this.posY);

     fill(40, 0, 100);
     rect(lw/2, lh/2, lw, lh);


    fill(80, 120, 255);
     beginShape(CLOSE);
       for(var vai=0; vai<=lw; vai += .6){

         speedSu+=0.003;
         noiseSu = (lh/5)+map(noise(speedSu/2, speedGiu), 0, 1, 0, lh/3);
         vertex(vai, noiseSu);
       }
                  speedSu=0;
      for(var torna=lw; torna>=0; torna -= .6){
       vertex(torna, noiseGiu);
        speedSu-=0.003;
        noiseGiu = (lh/3)+map(noise(speedSu/4+40, speedGiu+40), 0, 1, 0, lh);
       }
    speedSu=0;
    endShape(CLOSE);


     fill(30, 90, 220, .6);
     beginShape(CLOSE);
       for( vai=0; vai<=lw; vai += .6){

         speedSu+=0.003;
         noiseSu = (lh/4)+map(noise(speedSu+22, speedGiu+88), 0, 1, 0, lh);
         vertex(vai, noiseSu/2);
       }
                  speedSu=0;
      for( torna=lw; torna>=0; torna -= .6){
       vertex(torna, noiseGiu/2);
        speedSu-=0.003;
        noiseGiu = (lh/2)+map(noise(speedSu/4+1, speedGiu+22), 0, 1, 0, lh+(lh/2));
       }
    speedSu=0;
    endShape(CLOSE);


         fill(200, 200, 200, .3);
     beginShape(CLOSE);
       for( vai=0; vai<=lw; vai += .6){

         speedSu+=0.003;
         noiseSu = (lh/4)+map(noise(speedSu+11, speedGiu+33), 0, 1, 0, lh);
         vertex(vai, noiseSu/2);
       }
                  speedSu=0;
      for( torna=lw; torna>=0; torna -= .6){
       vertex(torna, noiseGiu/2);
        speedSu-=0.003;
        noiseGiu = (lh/2)+map(noise(speedSu/4+22, speedGiu+11), 0, 1, 0, lh+(lh/2));
       }
    speedSu=0;


     endShape(CLOSE);

     noStroke();
      stroke(200);
     fill(40,40,40, .6);
     ellipse(lw/2, lh/2, noiseSu+lh/6, noiseSu+lh/6);
     textAlign(CENTER);
     fill(220);
    noStroke();
     text("MR JACKPOT", lw/2, lh/2);
     pop();
   }

  //simo
this.disegna4 = function() {
     push();
     translate(this.posX, this.posY);
   for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
          fill(random(255),random(255),random(255));
          noStroke();
          rect(i*lw/10, j*lh/30, lw/10, lh/30);
        }
   }
     fill(0,0,0,random(100,90));
     noStroke();
     rect (0,0, lw/2, lh/2);
     rect (lw/2, lh/2,lw/2, lh/2);
     textAlign(RIGHT);
     noStroke();
     fill('white');
     text("Simona",lw/2, lh/2);
     pop();
   }

//   //grace
//   this.disegna5 = function() {
//     push();
//     ellipseMode(CORNER);
//     translate(this.posX+lw/2, this.posY+lh/2);
//     textAlign(CENTER);
//
//     fill(random(255), random(255), random(255));
//     //rotate(TWO_PI * i / 8);
//     for (var i = 0; i < 8; i++) {
//       push();
//       text("Grace",lw, lh);
//       rotate(TWO_PI * i / 8);
//       var tx = 200 * noise(0.01 * frameCount);
//       translate(50, 0);
//
//       rect(0, 0, 10, 10);
//       for (var j = 0; j < 6; j++) {
//         push();
//         rotate(TWO_PI * j / 6);
//         var rx = 60 * noise(0.01 * frameCount + 10);
//         ellipse(25, 0, 3, 3);
//
//         pop();
//       }
//       translate();
//
//       pop();
//     }
//   }
   // luca
  this.disegna6 = function() {
    // disegna se stesso su schermo
    push();
    translate(width/2/2 + this.posX, height/5/2 + this.posY);
    rectMode(CENTER);
    textAlign(CENTER);
    fill(this.colore);
    ellipse(0, 0, lw, lh);
    stroke(0);
    rotate(this.velocita);

    for (let i = 0; i < 20; i++) {
      ellipse(0, 0, lw/4, lh/4);
      rotate(PI / 10);
      }
    rotate(-this.velocita);
    this.velocita += 0.01;
      textAlign(RIGHT);
      text("Luca", lw/2 - 50, lh/2);
      pop();
  }
//
//   // Fuk
//   this.disegna7 = function() {
//     push();
//     textAlign(CENTER);
//     text("Fuk", this.posX+lw/2, this.posY+lh/2);
//     ellipseMode(CENTER);
//     fill(99,151,208);
//     strokeWeight(7);
//     translate(this.posX, this.posY);
//     ellipse(0,0,lw,lh);
//     pop();
//   }
//
//

//grazi
  this.disegna8 = function() {
    push();


    // disegna se stesso su schermo

      fill(0);
    noStroke();
      this.xspeed= floor(random(-1,2));
      this.yspeed= floor(random(-1,2));
      this.posX+= this.xspeed;
      this.thisY+=this.yspeed;
      ellipse(this.posX+lw/2,this.posY+lh/2,10,10);
      fill(200,80,0,50);

      rect(this.posX,this.posY,400,110);
      textAlign(CORNER);
      fill(255,80,50);
      text("Graziana", this.posX+lw/2, this.posY+lh/2);
      pop();
  }

//   //begteshi
//   this.disegna9 = function() {
//     push();
//     textAlign(CENTER);
//     text("begteshi" );
//     text("begteshi", this.posX + lw/2, this.posY + lh/2);
//     ellipseMode(CENTER);
//     fill(255, 255, 0);
//     noStroke();
//     translate(this.posX, this.posY);
//     ellipse(0, 0, lw, lh);
//     pop();
//   }



} // CHIUSURA CLASSE, FUNZIONI SOPRA...


// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
