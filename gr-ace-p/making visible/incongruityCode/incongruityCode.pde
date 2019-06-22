// -
// Incongruity by GraziaPestillo [depth, incomprehensibility, discrepancy]
// 2019 © Grazia Pestillo, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —



import peasy.PeasyCam;
import processing.video.*;
import gab.opencv.*;
import java.awt.*;
import controlP5.*;
OpenCV opencv;
int ellipseWidth=0;
int ellipseHeight=0;

PeasyCam pippo;
Capture cam;
int cellsize = 2; // The source image
int cols, rows; 
int modoHSB = 0;
int c=0;

ControlP5 interfaccia;
Accordion accordion;
int sliderValue = 0;
float dist = 1;

int Q = 1;
float z=0;
boolean cerchioSi = false;
boolean biancoENero = false;


void setup() {
  size(848, 480, P3D);
  smooth();
  colorMode(HSB);
  
  interfaccia= new ControlP5(this);
  interfaccia.setAutoDraw(false);
  costruisciInterfaccia();
  
  pippo= new PeasyCam(this, 1000);
  pippo.setMinimumDistance(500);
  pippo.setMaximumDistance(2000);
  
  opencv= new OpenCV(this, 848, 480);
  opencv.loadCascade(OpenCV.CASCADE_FRONTALFACE);
  
  //righe e colonne
  cols = width/cellsize;
  rows = height/cellsize;
  String[] cameras = Capture.list();
  
  if(cameras.length == 0) {
    println("There are no cameras available for capture.");
    exit();
  } else {
    println("Available cameras:");
    for (int i = 0; i < cameras.length; i++) {
      println(cameras[i]);
    }
    
    cam = new Capture(this, 848, 480);
    cam.start();
  }
}

//separare interfaccia da Peasycam

void mostraInterfaccia() {
  hint(DISABLE_DEPTH_TEST);
  pippo.beginHUD();
  interfaccia.draw();
  pippo.endHUD();
  
  hint(ENABLE_DEPTH_TEST);
}

void costruisciInterfaccia() {
  Group comandi = interfaccia.addGroup("Mode")
      .setBackgroundColor(color(0,200))
      .setBackgroundHeight(200)
      .setSize(200, 10);
      
      interfaccia.addButton("HueSBri"). setLabel("H | S | B"). moveTo(comandi);
      interfaccia.addButton("bn").setLabel("B/N").moveTo(comandi).linebreak();
      interfaccia.addToggle("cerchio").setLabel("faceSize").moveTo(comandi).linebreak();
      //interfaccia.addSlider("Q", 1, 5).setLabel("cellsize").setSliderMode(Slider.FLEXIBLE).moveTo(comandi).linebreak();
      accordion = interfaccia.addAccordion("acc").setPosition(40, 40).setWidth(200).addItem(comandi);
}

void draw() {
  background(0);
  hint(ENABLE_DEPTH_TEST);
  translate(-width/2, -height/2, 1);
  
  if(cam.available()==true) {
    cam.read();
    opencv.loadImage(cam);
    
    Rectangle[] faces = opencv.detect();
    dist = 0;
    
    for(int i = 0; i < faces.length; i++) {
      //println(faces[0].width);
      pushMatrix();
      ellipseWidth=faces[0].width;
      ellipseHeight=faces[0].height;
      popMatrix();
      
      //mappo i valori di scostamento sull'asse Z in relazione alla dimensione del viso e quindi alla dist
      if(faces[0].width > 100) {
        dist= map(faces[0].width, 0 ,500, 0 , -5);
        
}
    }
    println(dist);
  }
  stroke(255);
  cam.loadPixels();
  
  //scomposizione immagine in celle ==> righe e colonne
  //colonne
  for(int i = 0; i < cols; i++){
    //righe
    for(int j = 0; j < rows; j++){
      int x = i*cellsize + (cellsize/5); //x pos
      int y = j*cellsize + (cellsize/5); // y pos
      int loc = x + y*cam.width; //pixel array location
      color c = cam.pixels[loc]; // setta colore
      
      //calcolo scostamento z in base alla modalità 
      if(modoHSB == 0){
        z = -hue(cam.pixels[loc])*dist;
      } else if (modoHSB == 1) {
          z= - saturation(cam.pixels[loc])*dist;
      } else {
        z= - brightness(cam.pixels[loc])*dist;
        
      }
      
      pushMatrix();
      translate(x,y,z);
      fill(c++);
      noStroke();
      rect(0,0, cellsize, cellsize);
      rotateX(-.5f);
      rotateY(-.5f);
      scale(10);
      popMatrix();
    }
  }
  hint(DISABLE_DEPTH_TEST);
  
  if (biancoENero == true) {
    filter (GRAY);
  }
  colorMode(RGB);
   if (modoHSB == 0) {
     fill( 255,92,79);

   } else if (modoHSB == 1) {
     fill( 57, 255, 192); 
   } else {
     fill (44, 120, 255);
   }
   colorMode(HSB);
   if(cerchioSi== true) {
     ellipse ( 100, 550, ellipseWidth, ellipseHeight);
   }
   mostraInterfaccia();
}

void HueSBri() {

  if (modoHSB==2) {  
    modoHSB=0;
    
  } else if (modoHSB==1) {  
    modoHSB=2;
  } else {  
    modoHSB=1;
  }
}
//}

void cerchio() {

  cerchioSi = !cerchioSi;
}

void bn() {
  biancoENero = !biancoENero;
}
   
