/* DSII 2019 test heightmap */

let easycam; // telecamera peasycam

let cubone = 16;
let cella = 6;
let mappa = [];

let conta=0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let density = displayDensity();
  pixelDensity(density);

  Dw.EasyCam.prototype.apply = function(n) {
      var o = this.cam;
      n = n || o.renderer,
      n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))

    };

  easycam = new Dw.EasyCam(_renderer, {
    distance: 350,
    center: [0,0,0]
  });

  easycam.setViewport([0, 0, windowWidth, windowHeight]);

  // start with an animated rotation
  easycam.setRotation(Dw.Rotation.create({
    angles_xyz: [0, -PI / 3, PI / 2]
  }), 4000);
  easycam.setDistance(500, 2500);

for(var giovanni=0; giovanni<cubone; giovanni++){
      mappa[giovanni]=[];
  for(var righe=0; righe<cubone; righe++){
    mappa[giovanni][righe]=[];
    for(var colonne=0; colonne<cubone; colonne++){
          mappa[giovanni][righe][colonne]=random(12);
    }
  }
}


  rectMode(CENTER);
normalMaterial();
colorMode(HSB);
noStroke();


}

function draw() {

background(5);

translate(-cubone*cella/2, -cubone*cella/2, -cubone*cella/2);

/*
let dirX = (mouseX / width - 0.5) * 2;
let dirY = (mouseY / height - 0.5) * 2;
directionalLight(250, 250, 250, -dirX, -dirY, -500);
*/



for (var z=0; z<cubone; z++) {
  for (var x=0; x<cubone; x++) {
    for (var y=0; y<cubone; y++) {

      fill(map((y+x+z)/3, 0, cubone, 30, 210), 200, 200, .3);
    //  stroke(map(z, 0, cubone, 0, 100), 200, 200, .5);

    // SCEGLIE UNO DI DUE CARATTERI DEL 10 PRINT
    // CARATTERE 1
    if ( mappa[z][x][y] >= 0 && mappa[z][x][y] <= 1 ) {
      A(x, y, z, cella);
    }  else if (mappa[z][x][y] > 1 && mappa[z][x][y] <= 2) {
      push();
      B(x, y, z, cella);
      rotateY(90);
      pop();
    } else {

    }

  }
}
}

conta++;

if(conta == 10){

conta = 0;

for(var giovanni=0; giovanni<cubone; giovanni++){
      mappa[giovanni]=[];
  for(var righe=0; righe<cubone; righe++){
    mappa[giovanni][righe]=[];
    for(var colonne=0; colonne<cubone; colonne++){
          mappa[giovanni][righe][colonne]=random(12);
    }
  }
}
}



}

function A(x, y, z, cella){

// CIMA
  beginShape();
vertex(x*cella, y*cella, (z+1)*cella);
vertex((x+1)*cella, y*cella, (z+1)*cella);
vertex((x+1)*cella, (y+1)*cella, (z+1)*cella);
  endShape();

  // FONDO
    beginShape();
vertex(x*cella, y*cella, z*cella);
vertex((x+1)*cella, y*cella, z*cella);
vertex((x+1)*cella, (y+1)*cella, z*cella);
    endShape();

    // IPOTENUSA
      beginShape();
vertex(x*cella, y*cella, (z+1)*cella);
vertex((x+1)*cella, (y+1)*cella, (z+1)*cella);
vertex((x+1)*cella, (y+1)*cella, z*cella);
vertex(x*cella, y*cella, z*cella);
      endShape();

      //C1
      beginShape();
vertex((x+1)*cella, y*cella, (z+1)*cella);
vertex((x+1)*cella, (y+1)*cella, (z+1)*cella);
vertex((x+1)*cella, (y+1)*cella, z*cella);
vertex((x+1)*cella, y*cella, z*cella);
      endShape();

      //C2
      beginShape();
vertex(x*cella, y*cella, (z+1)*cella);
vertex((x+1)*cella, y*cella, (z+1)*cella);
vertex(x*cella, y*cella, z*cella);
vertex(x*cella, y*cella, z*cella);
      endShape();

}



function B(x, y, z, cella){

// CIMA
  beginShape();
vertex(x*cella, y*cella, (z+1)*cella);
vertex((x+1)*cella, (y+1)*cella, (z+1)*cella);
vertex(x*cella, (y+1)*cella, (z+1)*cella);
  endShape();

  // FONDO
    beginShape();
vertex(x*cella, y*cella, z*cella);
vertex((x+1)*cella, (y+1)*cella, z*cella);
vertex(x*cella, (y+1)*cella, z*cella);
    endShape();

    // IPOTENUSA
      beginShape();
vertex(x*cella, y*cella, (z+1)*cella);
vertex((x+1)*cella, (y+1)*cella, (z+1)*cella);
vertex((x+1)*cella, (y+1)*cella, z*cella);
vertex(x*cella, y*cella, z*cella);
      endShape();

      //C1
      beginShape();
vertex(x*cella, y*cella, (z+1)*cella);
vertex(x*cella, (y+1)*cella, (z+1)*cella);
vertex(x*cella, (y+1)*cella, z*cella);
vertex(x*cella, y*cella, z*cella);
      endShape();

      //C2
      beginShape();
vertex(x*cella, (y+1)*cella, (z+1)*cella);
vertex(x*cella, (y+1)*cella, z*cella);
vertex((x+1)*cella, (y+1)*cella, z*cella);
vertex((x+1)*cella, (y+1)*cella, (z+1)*cella);

      endShape();
}






function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
