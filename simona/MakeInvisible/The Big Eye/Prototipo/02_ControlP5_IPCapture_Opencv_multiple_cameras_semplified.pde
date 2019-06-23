// ContolP5 + IPCapture + Opencv multiple cameras simplified
// 2018 © Simona Girardi, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
//
// help:
// [1][2] viewmodes: [1] cameras masked [2] just the masks
// [b] toggle dilate&blur filter on opencv
// [SPACE] pause feeds
// [m] toggle on/off cam0
// [n] toggle on/off cam1
// [o] toggle on/off cam2
// [z] toggle on/off cam3
// [x] toggle on/off cam4
// [c] toggle on/off cam5

import ipcapture.*;
import gab.opencv.*;
import controlP5.*;

ControlP5 interfaccia;
StringList urls;
int quanti = 0; 
ArrayList<IPCapture> cams;
ArrayList<OpenCV> opencvs;

ArrayList<Boolean> toggleMy=new ArrayList<Boolean>();

color[] colors = {  // < for simplified viewMode 2
  #FF0000, #FFC000, #2100FF, #7EFF00, 
  #E500FF, #00FF41, #00FF9F, #00FDFF, 
  #009FFF, #003DFF, #E0FF00, #8300FF, 
  #21FF00, #0052FF, #FF007C, #1000FF
};

int w, h;

int viewMode = 1;
boolean blur = false;
boolean cam0 = false;
boolean cam1 = false;
boolean cam2 = false;
boolean cam3 = false;
boolean cam4 = false;
boolean cam5 = false;

//boolean prova0 = false;
void setup() {
  size(640, 480);
  w = width;
  h = height;

  interfaccia = new ControlP5 (this);
  interfaccia.setAutoDraw(false);

  costruisciInterfaccia();


  // CAMERA URLS, JUST ADD OR EDIT THESE...
  urls = new StringList();
  urls.append("http://149.43.156.105/axis-cgi/mjpg/video.cgi?resolution=" );//+ w + "x" + h);
  urls.append("http://67.53.34.94/axis-cgi/mjpg/video.cgi?resolution=" + w + "x" + h);
  urls.append("http://74.92.201.146/mjpg/video.mjpg?resolution=" + w + "x" + h);
  urls.append("http://164.119.54.138/mjpg/video.mjpg?resolution=" + w + "x" + h);
  urls.append("http://oviso.axiscam.net/axis-cgi/mjpg/video.cgi?resolution=" + w + "x" + h);
  urls.append("http://219.121.16.30:81/nphMotionJpeg?resolution=" + w + "x" + h);
  //quanti = urls.size();
  quanti=6;

  // SELF CONFIG CAMS CAPTURE + OPENCVS 
  cams = new ArrayList<IPCapture>();
  opencvs = new ArrayList<OpenCV>();
  for (int i=0; i<quanti; i++) {
    cams.add(new IPCapture(this, urls.get(i), "", ""));
    cams.get(i).start();
    opencvs.add(new OpenCV(this, w, h));
    opencvs.get(i).startBackgroundSubtraction(4, 2, 0.5);

    toggleMy.add(true);
  }

  fill(255);
  noStroke();
}

void mostraInterfaccia() {
  interfaccia.draw();
}

void costruisciInterfaccia() {
  
  interfaccia.addSlider("viewMode", 1, 2).setLabel("How many Cams").linebreak();
  interfaccia.addToggle("blur").setLabel("BLUR").linebreak();

  interfaccia.addToggle("FUN0").setLabel("CAM1").setPosition(10, 110).setSize(40, 15).setValue(true).setMode(ControlP5.SWITCH);       
  interfaccia.addToggle("FUN1").setLabel("CAM2").setPosition(10, 145).setSize(40, 15).setValue(true).setMode(ControlP5.SWITCH);     
  interfaccia.addToggle("FUN2").setLabel("CAM3").setPosition(10, 180).setSize(40, 15).setValue(true).setMode(ControlP5.SWITCH); 
  interfaccia.addToggle("FUN3").setLabel("CAM4").setPosition(10, 215).setSize(40, 15).setValue(true).setMode(ControlP5.SWITCH); 
  interfaccia.addToggle("FUN4").setLabel("CAM5").setPosition(10, 250).setSize(40, 15).setValue(true).setMode(ControlP5.SWITCH); 
  interfaccia.addToggle("FUN5").setLabel("CAM6").setPosition(10, 280).setSize(40, 15).setValue(true).setMode(ControlP5.SWITCH);
}

void draw() {
  background(0);

  // let's build the frames for all the cameras...

  for (int i=0; i<quanti; i++) 
    frame(cams.get(i), opencvs.get(i));

  // let's display 
  if (viewMode == 1)  // < cameras masked
    for (int i=0; i<quanti; i++)
    {
      if (toggleMy.get(i)) {
        image(cams.get(i), 0, 0);
      }
    } else if (viewMode == 2) { // < just the masks
    for (int i=0; i<quanti; i++) {
      if (toggleMy.get(i)) {
        tint(colors[i]); 
        image(opencvs.get(i).getOutput(), 0, 0);
      }
    }
  }
  mostraInterfaccia();
  noTint();
}

void frame(IPCapture _webcam, OpenCV _opencv) { // < the core... 
  if (_webcam.isAvailable()) {
    _webcam.read();
    _opencv.loadImage(_webcam);
    _opencv.updateBackground();
    if (blur) {
      _opencv.dilate();
      _opencv.blur(3);
    }
    if (viewMode == 1) {
      PGraphics canvas = createGraphics(w, h);
      canvas.beginDraw();
      canvas.image(_opencv.getOutput(), 0, 0); // < fuori dalla canvas, è più veloce
      canvas.endDraw();
      _webcam.mask(canvas); // < direttamente sulla cam, è più "veloce"
    }
  }
  // mostraInterfaccia();
}



void keyPressed() {
  if (key == ' ') {
    for (int i=0; i<quanti; i++) 
      if (cams.get(i).isAlive()) cams.get(i).stop();
      else cams.get(i).start();
  } else if (key == 'b' || key == 'B') {
    blur = !blur;
  } else if (key == '1') {
    blendMode(SCREEN);
    viewMode = 1;
  } else if (key == '2') {
    blendMode(SCREEN);
    viewMode = 2;
  } else if (key == 'n') {
    int index=0;
    boolean val=toggleMy.get(index);
    val= (!val);
    toggleMy.remove(index);
    toggleMy.add(index, val);
    printArray(toggleMy);
  } else if (key == 'm') {
    int index=1;
    boolean val=toggleMy.get(index);
    val= (!val);
    toggleMy.remove(index);
    toggleMy.add(index, val);
    printArray(toggleMy);
  } else if (key == 'o') {
    int index=2;
    boolean val=toggleMy.get(index);
    val= (!val);
    toggleMy.remove(index);
    toggleMy.add(index, val);
    printArray(toggleMy);
  } else if (key == 'z') {
    int index=3;
    boolean val=toggleMy.get(index);
    val= (!val);
    toggleMy.remove(index);
    toggleMy.add(index, val);
    printArray(toggleMy);
  } else if (key == 'x') {
    int index=4;
    boolean val=toggleMy.get(index);
    val= (!val);
    toggleMy.remove(index);
    toggleMy.add(index, val);
    printArray(toggleMy);
  } else if (key == 'c') {
    int index=5;
    boolean val=toggleMy.get(index);
    val= (!val);
    toggleMy.remove(index);
    toggleMy.add(index, val);
    printArray(toggleMy);
  }
}

void FUN0(boolean tog) 
{
  if (tog!=true) {  
    cam0=toggleMy.get(0);
    cam0= (!cam0);
    toggleMy.remove(0);
  } else {
    toggleMy.add(0, cam0);
  }
}

void FUN1(boolean tog) 
{
  if (tog!=true) {
    cam1=toggleMy.get(1);
    cam1= (!cam1);
    toggleMy.remove(1);
  } else {
    toggleMy.add(1, cam1);
  }
}
void FUN2(boolean tog) 
{
  if (tog!=true) {
    cam2=toggleMy.get(2);
    cam2= (!cam2);
    toggleMy.remove(2);
  } else {
    toggleMy.add(2, cam2);
  }
}
void FUN3(boolean tog) 
{
  if (tog!=true) {
    cam3=toggleMy.get(3);
    cam3= (!cam3);
    toggleMy.remove(3);
  } else {
    toggleMy.add(3, cam3);
  }
}
void FUN4(boolean tog) 
{
  if (tog!=true) {
    cam4=toggleMy.get(4);
    cam4= (!cam4);
    toggleMy.remove(4);
  } else {
    toggleMy.add(4, cam4);
  }
}
void FUN5(boolean tog) 
{
  if (tog!=true) {
    cam5=toggleMy.get(5);
    cam5= (!cam5);
    toggleMy.remove(5);
  } else {
    toggleMy.add(5, cam5);
  }
}
