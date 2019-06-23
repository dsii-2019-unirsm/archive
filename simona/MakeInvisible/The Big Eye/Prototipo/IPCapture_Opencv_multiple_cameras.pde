// IPCapture + Opencv multiple cameras
// © @fupete MIT License 
// dsii-2019-unirsm
//
// help:
// [1][2] viewmodes: [1] cameras masked [2] just the masks
// [b] toggle dilate&blur filter on opencv
// [SPACE] pause feeds

import ipcapture.*;
import gab.opencv.*;

IPCapture cam, cam2, cam3, cam4, cam5;
OpenCV opencv, opencv2, opencv3, opencv4, opencv5;

int w, h;

int viewMode = 1;
boolean blur = false;

void setup() {
  size(640, 480);
  w = width;
  h = height;

  String url = "http://149.43.156.105/axis-cgi/mjpg/video.cgi?resolution=" + w + "x" + h;
  println("Caricando: " + url);
  cam = new IPCapture(this, url, "", "");
  cam.start();

  String url2 = "http://67.53.34.94/axis-cgi/mjpg/video.cgi?resolution=" + w + "x" + h;
  println("Caricando: " + url2);
  cam2 = new IPCapture(this, url2, "", "");
  cam2.start();

  String url3 = "http://74.92.201.146/mjpg/video.mjpg?resolution=" + w + "x" + h;
  println("Caricando: " + url3);
  cam3 = new IPCapture(this, url3, "", "");
  cam3.start();

  String url4 = "http://164.119.54.138/mjpg/video.mjpg?resolution=" + w + "x" + h;
  println("Caricando: " + url4);
  cam4 = new IPCapture(this, url4, "", "");
  cam4.start();

  // http://oviso.axiscam.net/axis-cgi/mjpg/video.cgi
  String url5 = "  http://219.121.16.30:81/nphMotionJpeg?resolution=" + w + "x" + h;
  println("Caricando: " + url5);
  cam5 = new IPCapture(this, url5, "", "");
  cam5.start();

  opencv = new OpenCV(this, w, h);
  opencv.startBackgroundSubtraction(4, 2, 0.5);

  opencv2 = new OpenCV(this, w, h);
  opencv2.startBackgroundSubtraction(4, 2, 0.5);

  opencv3 = new OpenCV(this, w, h);
  opencv3.startBackgroundSubtraction(4, 2, 0.5);

  opencv4 = new OpenCV(this, w, h);
  opencv4.startBackgroundSubtraction(4, 2, 0.5);
  
  opencv5 = new OpenCV(this, w, h);
  opencv5.startBackgroundSubtraction(4, 2, 0.5);

  fill(255);
  noStroke();

  //blendMode(SCREEN);
}

void draw() {
  background(0);

  // let's build the frames...
  frame(cam, opencv);
  frame(cam2, opencv2);
  frame(cam3, opencv3);
  frame(cam4, opencv4);
  frame(cam5, opencv5);

  // let's display
  if (viewMode == 1) { // < cameras masked
    image(cam, 0, 0);
    image(cam2, 0, 0);
    image(cam3, 0, 0);
    image(cam4, 0, 0);
    image(cam5, 0, 0);
  } else if (viewMode == 2) { // < just the masks
    tint(255, 0, 0); 
    image(opencv.getOutput(), 0, 0);
    tint(0, 255, 0); 
    image(opencv2.getOutput(), 0, 0);
    tint(0, 0, 255); 
    image(opencv3.getOutput(), 0, 0);
    tint(255, 255, 0); 
    image(opencv4.getOutput(), 0, 0);
    tint(0, 255, 255); 
    image(opencv5.getOutput(), 0, 0);
    noTint();
  }
}

void frame(IPCapture _webcam, OpenCV _opencv) {
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
}

void keyPressed() {
  if (key == ' ') {
    if (cam.isAlive()) cam.stop();
    else cam.start();
    if (cam2.isAlive()) cam2.stop();
    else cam2.start();
    if (cam3.isAlive()) cam3.stop();
    else cam3.start();
    if (cam4.isAlive()) cam4.stop();
    else cam4.start();
    if (cam5.isAlive()) cam5.stop();
    else cam5.start();
  } else if (key == 'b' || key == 'B') {
    blur = !blur;
  } else if (key == '1') {
    blendMode(SCREEN);
    viewMode = 1;
  } else if (key == '2') {
    blendMode(SCREEN);
    viewMode = 2;
  }
}
