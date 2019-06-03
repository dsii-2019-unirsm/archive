// http://stackoverflow.com/questions/37662245/processing-opencv-and-ipcapture-library-error-width0-and-height0-cannot-be
// http://stackoverflow.com/questions/34761403/incorporate-processing-opencv-contour-in-video-capture-width0-and-height0/34765285#34765285

// webcams http://en.ipcams.ch/

import ipcapture.*;
import gab.opencv.*;
import java.awt.*;

IPCapture cam, cam2, cam3;
OpenCV opencv, opencv2, opencv3;
PImage camElab1, camElab2, camElab3;
boolean mostraCam = false;
boolean mostraCam2 = false;

String url = "http://213.193.89.202/axis-cgi/mjpg/video.cgi";
String url2 = "http://greenhousecam.hort.cornell.edu/axis-cgi/mjpg/video.cgi";
//String url3 = "http://188.21.168.162/cgi-bin/faststream.jpg?stream=full&fps=10.0&customsize=640x480";

void setup() {
  size(800, 600);
  cam = new IPCapture(this);
  cam2 = new IPCapture(this);
  // cam3 = new IPCapture(this);

  Camera();

  opencv = new OpenCV(this, 800, 600);
  opencv2 = new OpenCV(this, 800, 600);
  // opencv3 = new OpenCV(this, 800, 600);

  noFill();
  opencv2.startBackgroundSubtraction(5, 3, 0.5);
  opencv.startBackgroundSubtraction(5, 3, 0.5);
  // opencv3.startBackgroundSubtraction(5, 3, 0.5);
}

void Camera() {
  cam.stop();
  cam.start(url, "", "");
  cam2.stop();
  cam2.start(url2, "", "");
  /*cam3.stop();
   cam3.start(url3, "", "");*/
}

void draw() {
  if (cam.isAvailable() && cam2.isAvailable() /*&& cam3.isAvailable()*/) {
    cam.read();
    cam2.read();
    /*cam3.read();*/

    background(0);

    //image(cam, 0, 0);  
    opencv.loadImage(cam);
    opencv2.loadImage(cam2);
    //opencv3.loadImage(cam3);

    opencv.updateBackground();
    opencv2.updateBackground();
    //opencv3.updateBackground();

    //opencv.dilate();
    //opencv.erode();
    fill(255, 0, 0);
    noStroke();
    for (Contour contour : opencv.findContours()) {
      contour.draw();
    }
    fill(0, 255, 0);
    for (Contour contour2 : opencv2.findContours()) {
      contour2.draw();
    }
    /*fill(0, 0, 255);
     for (Contour contour : opencv3.findContours()) {
     contour.draw();
     }*/

    if (mostraCam) image(cam, width-200, 100, 400*cam.height/cam.width,200*cam.height/cam.width);
    if (mostraCam2) image(cam2, width-200, 200,400*cam.height/cam.width,200*cam.height/cam.width); 
  }
}

void keyPressed() {
  if (key == 'a' || key == 'A') {
    mostraCam = !mostraCam;
  }
  if ( key == 'b' || key == 'B') {
    mostraCam2 = !mostraCam2;
  }
}
