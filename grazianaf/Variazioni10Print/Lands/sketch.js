// -
// Lands 0.1 by GrazianaFlorio [walker, 10Print]
// 2018 © GrazianaFlorio, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —
// Credits/Thanks to: 
// Generative Gestaltung – Creative Coding in Web
// Copyright 2018 http://www.generative-gestaltung.de
// Licensed under the Apache License
// 
// —
//
// Help:
// [s-S] save Canvas
// [DELETE/BACKSPACE] clear
//
// —

//definisco direzioni 
//una delle direzioni viene selezionata random ad ogni frame disegnato
var nord=0;
var nordEst=1
var est= 2
var sudEst=3;
var sud= 4;
var sudOvest= 5;
var ovest=6;
var nordOvest=7;
var direzione;

var passo= 10;
var diametro;

var posX;
var posY;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  //background(255);
  background(61,163,93);
 
  //incomincia al centro della finestra
  posX= width/2;
  posY=height/2;
  
}

function draw() {
  direzione=int(random(0,8));
  diametro= int(random(0,10));
  //direzione del passo in base al numero random selezionato
  if(direzione==nord){
    posY -= passo;
  } else if(direzione==nordEst){
    posX+=passo;
    posY-= passo;
  }else if(direzione==est){
    posX+=passo;
  } else if(direzione==sudEst){
    posX+=passo;
    posY+=passo;
  }else if(direzione==sud){
    posY+=passo;
  } else if(direzione==sudOvest){
    posX-=passo;
    posY+=passo;
  }else if(direzione==ovest){
    posX-=passo;
  }else if(direzione==nordOvest){
    posX-= passo;
    posY-=passo;
  }
  //limiti della finestra
  if(posX>width){
    posX=0;
  } else if(posX<0){
    posX=width;
  }else if(posY<0){
    posY=height;           
  } else if(posY>height){
    posY=0;
  }
  //disegno
  fill(71,44,27);
  //fill(0);
  //ellipse(posX+passo/2, posY+passo/2,diametro,diametro);
  rect(posX+passo/2, posY+passo/2,diametro,diametro);
  
}///draw

function keyReleased() {
  if (key == 's' || key == 'S'){ 
    saveCanvas("land"+ int(random(1000)), 'png');
    background(61,163,93);
  }
  if (keyCode == DELETE || keyCode == BACKSPACE){ 
    clear();
    background(61,163,93);
  }
}

// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
