import peasy.PeasyCam;
import processing.video.*;

//cambiato
import gab.opencv.*;
import java.awt.*;
import controlP5.*;

ControlP5 interfaccia;
Accordion accordion;
int sliderValue = 0;
int mystroke = 0;

float dist=1;
float size = 10;
float S=1; //moltiplicatore z
float Q=1; // moltiplicatore dist

boolean cerchioSi = false;
boolean biancoENero = false;

OpenCV opencv;
//fine cambio
int ellipseWidth=0;
int ellipseHeight=0;

float z=0;


PeasyCam pippo;
Capture cam;
int cellsize = 10; // The source image
int cols, rows; 
//boolean biancoENero = false;
int modoHSB = 0;
int c=0;

void setup() {
  size(848, 480, P3D);
  smooth();
  
  colorMode(HSB);

  interfaccia = new ControlP5(this);
  interfaccia.setAutoDraw(false);

  costruisciInterfaccia();

/*
  pippo = new PeasyCam(this, 1000);
  pippo.setMinimumDistance(500);
  pippo.setMaximumDistance(2000); */  // clamp zooming

  //cambio
  opencv = new OpenCV(this, 848, 480);
  opencv.loadCascade(OpenCV.CASCADE_FRONTALFACE);  
   ;


  //fine cambio
  
// righe e colonne
  cols = width/cellsize;            
  rows = height/cellsize;
  String[] cameras = Capture.list();
  if (cameras.length == 0) {
    println("There are no cameras available for capture.");
    exit();
  } else {
    println("Available cameras:");
    for (int i = 0; i < cameras.length/4; i++) {
      println(cameras[i]);
    }
    cam = new Capture(this, 848, 480);
    cam.start();
  }
}
// separare interfaccia da peasycam
void mostraInterfaccia() { 
  hint(DISABLE_DEPTH_TEST); 
 //pippo.beginHUD();
  //pippo.endHUD();
  interfaccia.draw();

  hint(ENABLE_DEPTH_TEST);
}


void costruisciInterfaccia() {
  Group comandi = interfaccia.addGroup("Modalità")
    .setBackgroundColor(color(0, 200))
    .setBackgroundHeight(200)
    .setSize(200, 150)
    ; 
  interfaccia.addButton("HueBri").setLabel("H-S-B").moveTo(comandi);
    interfaccia.addButton("bn").setLabel("B/N").moveTo(comandi).linebreak();
    interfaccia.addToggle("cerchio").setLabel("Cerchio").moveTo(comandi).linebreak();
  interfaccia.addSlider("S", 0, 2).setLabel("Distanza").moveTo(comandi).linebreak();
  interfaccia.addSlider("Q", 0, 2).setLabel("Quadratini").setSliderMode(Slider.FLEXIBLE).moveTo(comandi).linebreak();
  accordion = interfaccia.addAccordion("acc").setPosition(40,40).setWidth(200).addItem(comandi);
}



// }




void draw() {

  background(0);
  hint(ENABLE_DEPTH_TEST); 


  translate(0, 0, -1);
  if (cam.available() == true) {
    cam.read();
    
    //image(img,0,0);
    //if(frameCount%30==0){
    opencv.loadImage(cam);





    Rectangle[] faces = opencv.detect();


    for (int i = 0; i < faces.length; i++) {
      println(faces[0].width);
      pushMatrix();
       ellipseWidth=faces[0].width;
       ellipseHeight=faces[0].height;

       popMatrix();

      //definisce la traslazione sull'asse z
      size=map(faces[0].width, 0, 600, 5, 0)*S;
      
      //dimensione pixels in base alla distanza della faccia dalla camera
      dist=map(faces[0].width, 0, 500, 2, 0)*Q;
      
    }



    println(dist);
  }
  
  

  stroke(255);
  
  

  
  





  cam.loadPixels();
  for ( int i = 0; i < cols; i++) {
    // Begin loop for rows
    for ( int j = 0; j < rows; j++) {
      int x = i*cellsize + (cellsize/5); // x position
      int y = j*cellsize + (cellsize/5); // y position
      int loc = x + y*cam.width;           // Pixel array location
      color c = cam.pixels[loc];       // Grab the color
      //println(c);
      // Calculate a z position 

      if (modoHSB==0) {
        z = - hue(cam.pixels[loc])*size;
      } else if (modoHSB ==1) {
        z = - saturation(cam.pixels[loc])*size;
      } else {
        z = - brightness(cam.pixels[loc])*size;
      }

      pushMatrix();
      translate(x, y, z);
      //fill(0,random(2),360);
      fill(c++);
      noStroke();

      rect(0, 0, cellsize*dist, cellsize*dist);
      // ellipse(0, 0, random(1,3), random(3,1));



      rotateX(-.5f);
      rotateY(-.5f);
      


      scale(10);
      

      popMatrix();
    }
  }


  hint(DISABLE_DEPTH_TEST); 


  if (biancoENero==true) {
    filter(GRAY);
  }
  
  
 colorMode(RGB);
  
  if (modoHSB==0) {
          fill(255, 0, 0);
      } else if (modoHSB ==1) {
          fill(0, 255, 0);
      } else {
           fill(0, 0, 255);
      }
      
 colorMode(HSB);
      
      
         if(cerchioSi == true){
  ellipse(100, 350, ellipseHeight, ellipseHeight);
  }
  
  
     mostraInterfaccia(); 
    
  

 
  
  
  
}





void HueBri() {

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