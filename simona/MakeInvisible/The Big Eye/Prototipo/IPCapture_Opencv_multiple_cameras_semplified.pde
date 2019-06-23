// IPCapture + Opencv multiple cameras simplified
// © @fupete MIT License 
// dsii-2019-unirsm
//
// help:
// [1][2] viewmodes: [1] cameras masked [2] just the masks
// [b] toggle dilate&blur filter on opencv
// [SPACE] pause feeds

import ipcapture.*;
import gab.opencv.*;

StringList urls;
int quanti; 
ArrayList<IPCapture> cams;
ArrayList<OpenCV> opencvs;

color[] colors = {  // < for simplified viewMode 2
  #FF0000, #FFC000, #2100FF, #7EFF00, 
  #E500FF, #00FF41, #00FF9F, #00FDFF, 
  #009FFF, #003DFF, #E0FF00, #8300FF, 
  #21FF00, #0052FF, #FF007C, #1000FF
};

int w, h;

int viewMode = 1;
boolean blur = false;

void setup() {
  size(640, 480);
  w = width;
  h = height;

  // CAMERA URLS, JUST ADD OR EDIT THESE...
  urls = new StringList();
  urls.append("http://149.43.156.105/axis-cgi/mjpg/video.cgi?resolution=" + w + "x" + h);
  urls.append("http://67.53.34.94/axis-cgi/mjpg/video.cgi?resolution=" + w + "x" + h);
  urls.append("http://74.92.201.146/mjpg/video.mjpg?resolution=" + w + "x" + h);
  urls.append("http://164.119.54.138/mjpg/video.mjpg?resolution=" + w + "x" + h);
  urls.append("http://oviso.axiscam.net/axis-cgi/mjpg/video.cgi?resolution=" + w + "x" + h);
  urls.append("http://219.121.16.30:81/nphMotionJpeg?resolution=" + w + "x" + h);
  quanti = urls.size();

  // SELF CONFIG CAMS CAPTURE + OPENCVS 
  cams = new ArrayList<IPCapture>();
  opencvs = new ArrayList<OpenCV>();
  for (int i=0; i<quanti; i++) {
    cams.add(new IPCapture(this, urls.get(i), "", ""));
    cams.get(i).start();
    opencvs.add(new OpenCV(this, w, h));
    opencvs.get(i).startBackgroundSubtraction(4, 2, 0.5);
  }

  fill(255);
  noStroke();
}

void draw() {
  background(0);

  // let's build the frames for all the cameras...
  for (int i=0; i<quanti; i++) 
    frame(cams.get(i), opencvs.get(i));

  // let's display 
  if (viewMode == 1)  // < cameras masked
    for (int i=0; i<quanti; i++) 
      image(cams.get(i), 0, 0);
  else if (viewMode == 2) { // < just the masks
    for (int i=0; i<quanti; i++) {
      tint(colors[i]); 
      image(opencvs.get(i).getOutput(), 0, 0);
    }
    noTint();
  }
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
  }
}
