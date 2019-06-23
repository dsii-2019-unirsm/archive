// -
// Griglia_camere 0.1 by Simona Girardi [Ciclo for, griglia]
// 2018 © Simona Girardi, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// webcams http://en.ipcams.ch/

import ipcapture.*;
import java.awt.*;

int numeroCamere = 6;
int conta=0;

IPCapture [] cam = new IPCapture[numeroCamere];

String [] url = {"http://213.193.89.202/axis-cgi/mjpg/video.cgi", 
  "http://greenhousecam.hort.cornell.edu/axis-cgi/mjpg/video.cgi", 
  "http://64.69.144.102/axis-cgi/mjpg/video.cgi", 
  "http://cam.petershobby.ch:8081/cam_4.cgi", 
  "http://oviso.axiscam.net/axis-cgi/mjpg/video.cgi", 
  "http://webcam3.mmto.arizona.edu/axis-cgi/mjpg/video.cgi"
};

int l = 0;
int h = 0;

void Camera(IPCapture cam, String url) {
  cam.stop();
  cam.start(url, "", "");
}

void setup() {
  size(800, 600);
  l = (width)/3;
  h = (height)/2;
  for (int i=0; i<numeroCamere; i++) {
    cam[i] = new IPCapture(this);
    Camera(cam[i], url[i]);
  }
}

void draw() {
  background(0); 
  for (int r=0; r<2; r++) {
    for (int c=0; c<3; c++) {
      cam[conta].read();
      image(cam[conta], (l*c), (h*r), l, h);
      conta++;
    }
  }
  conta=0;
}
