//Analisi frequenze 0.1 by Daniele Cappai [audio, fft_spectrum]
// 2019 © Dani-CA, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino

let mio_suono = 'prova';

function preload(){
  sound = loadSound(mio_suono+'.mp3');
}

function setup(){
  var cnv = createCanvas(710,600);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.2);
  colorMode(HSB);
}

function draw(){
  background(0);
  textSize(15);
  fill(255);
  text('Traccia Audio: '+mio_suono,10,20);
  fill(200,100,90);
  textSize(30);
  text('Click to play!',10,60);
  
 
  var spectrum = fft.analyze();
  
  var freq_stamp = fft.getEnergy(1,1000);
  var freq_stamp2 = fft.getEnergy(1000,2000);
  var freq_stamp3 = fft.getEnergy(2000,3000);
  var freq_stamp4 = fft.getEnergy(3000,4000);
  var freq_stamp5 = fft.getEnergy(4000,5000);
  var freq_stamp6 = fft.getEnergy(5000,6000);
  var freq_stamp7 = fft.getEnergy(6000,7000);
  var freq_stamp8 = fft.getEnergy(7000,8000);
  var freq_stamp9 = fft.getEnergy(8000,9000);
  var freq_stamp10 = fft.getEnergy(9000,10000);
  var freq_stamp11 = fft.getEnergy(10000,11000);
  var freq_stamp12 = fft.getEnergy(11000,12000);
  var freq_stamp13 = fft.getEnergy(12000,13000);
  var freq_stamp14 = fft.getEnergy(13000,14000);
  var freq_stamp15 = fft.getEnergy(14000,15000);
  var freq_stamp16 = fft.getEnergy(15000,16000);
  
  
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape(); 
  for (i = 0; i < spectrum.length; i++) { vertex(i, map(spectrum[i], 0, 255, height, 0)); } 
  endShape();
  noStroke();
  
  
  fill(200,100,90);
  rect(10,height,25,-freq_stamp*2);
  rect(55,height,25,-freq_stamp2*2);
  rect(100,height,25,-freq_stamp3*2);
  rect(145,height,25,-freq_stamp4*2);
  rect(190,height,25,-freq_stamp5*2);
  rect(235,height,25,-freq_stamp6*2);
  rect(280,height,25,-freq_stamp7*2);
  rect(325,height,25,-freq_stamp8*2);
  rect(370,height,25,-freq_stamp9*2);
  rect(415,height,25,-freq_stamp10*2);
  rect(460,height,25,-freq_stamp11*2);
  rect(505,height,25,-freq_stamp12*2);
  rect(550,height,25,-freq_stamp13*2);
  rect(595,height,25,-freq_stamp14*2);
  rect(640,height,25,-freq_stamp15*2);
  rect(685,height,25,-freq_stamp16*2);  
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}