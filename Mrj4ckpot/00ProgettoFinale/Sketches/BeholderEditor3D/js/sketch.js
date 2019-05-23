/* DSII 2019 test heightmap */

let easycam; // telecamera peasycam

let oggetto = {
  REFRESH: function() { preload(); carica(); },
  Displacement_Map: 'https://i.imgur.com/jeLxfFt.jpg',
  Geometria: "Causeway",
  Bianco_e_Nero: false,
  Brightness: 1,
  Heightmap: 1,

  Forma_Celle: "Quadrato",
  Scala_Celle: 1,
  Rotazione_X: 0,
  Rotazione_Y: 0,
  Rotazione_Z: 0,

  Texture: 'https://i.imgur.com/kfc8mF0.jpg?1',
  Wireframe: false

};

var gui = new dat.GUI();
gui.add(oggetto, 'REFRESH' );
gui.add(oggetto, 'Displacement_Map' );
gui.add(oggetto, 'Geometria', [ 'Causeway', 'Mesh'] );
gui.add(oggetto, 'Bianco_e_Nero' );
gui.add(oggetto, 'Brightness', 0, 5 );
gui.add(oggetto, 'Heightmap', 0, 5 );

var f1 = gui.addFolder('Opzioni Causeway');
f1.add(oggetto, 'Forma_Celle', [ 'Quadrato', 'Cerchio'] );
f1.add(oggetto, 'Scala_Celle', 0, 5 );
f1.add(oggetto, 'Rotazione_X', 0, 1 );
f1.add(oggetto, 'Rotazione_Y', 0, 1 );
f1.add(oggetto, 'Rotazione_Z', 0, 1 );

var f2 = gui.addFolder('Opzioni Mesh');
f2.add(oggetto, 'Texture' );
f2.add(oggetto, 'Wireframe' );


let img, tex;
let punti = [];
let voxel = [];
let voxelBN = [];
let res = 7;
let viewMode = 0;
let rot=0;

let multi = 1;

let cam1;

let colore;

function preload() {
  img = loadImage(oggetto.Displacement_Map);
  tex = loadImage(oggetto.Texture);
}

function carica() {
  // CARICA MAPPA DISPLACEMENT
    img.loadPixels();
    let f = 0;
    let k = 0;
    for (let x = 0; x < img.width-res; x+=res) {
      punti[f] = [];
      for (let y = 0; y < img.height-res; y+=res) {
        let c = img.get(x, y);
        let h = brightness(c);
        punti[f][k] = h;
        k++;
      }
      k=0;
      f++;
    }
    img.updatePixels();

  // CARICA TEXTURE
    tex.loadPixels();
    let i = 0;
    let j = 0;
    for (let x = 0; x < tex.width-res; x+=res) {
      voxel[i] = [];
      voxelBN[i] = [];
      for (let y = 0; y < tex.height-res; y+=res) {
        let c = tex.get(x, y);
        let h = brightness(c);
        voxel[i][j] = c;
        voxelBN[i][j] = h;
        j++;
      }
      j=0;
      i++;
    }
    tex.updatePixels();
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let density = displayDensity();
  pixelDensity(density);

  carica();

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







  noStroke();
  rectMode(CENTER);

  cam1 = createVideo('test1.mp4');
  cam1.hide();




}

function draw() {
  background(0);
  translate(-img.width/2, -img.height/2, -(100*oggetto.Heightmap)/2);



  stroke(255);
  ambientLight(255);
  fill(255);

rot++;



  // CAUSEWAY
  //--------------------------------
  //--------------------------------
  //--------------------------------
    if (oggetto.Geometria == "Causeway") {
      noStroke();
      for (let x = 0; x < punti.length; x++) {
        for (let y = 0; y < punti[x].length; y++) {
          let h = punti[x][y];
          push();
          translate(x*res,y*res,h*oggetto.Heightmap);


if( oggetto.Bianco_e_Nero == false){
  fill(voxel[x][y]);
} else {
  fill(voxelBN[x][y]*oggetto.Brightness);
}



if( oggetto.Forma_Celle == "Quadrato"){
  rotateX(rot*oggetto.Rotazione_X);
  rotateY(rot*oggetto.Rotazione_Y);
  rotateZ(rot*oggetto.Rotazione_Z);
  rect(0,0,res*oggetto.Scala_Celle,res*oggetto.Scala_Celle);
}

if( oggetto.Forma_Celle == "Cerchio"){
  rotateX(rot*oggetto.Rotazione_X);
  rotateY(rot*oggetto.Rotazione_Y);
  rotateZ(rot*oggetto.Rotazione_Z);
  ellipse(0,0,res*oggetto.Scala_Celle,res*oggetto.Scala_Celle);
}

          pop();
        }
      }
    }




    // MESH
    //--------------------------------
    //--------------------------------
    //--------------------------------
    else {
      //texture(img);
      for (let x = 0; x < punti.length-1; x++) {
          stroke(150);

          if(oggetto.Wireframe == true){
            noFill();
          } else {
            texture(tex);
          }


          beginShape(TRIANGLE_STRIP);
          for (let y = 0; y < punti[x].length-1; y++) {
              vertex(x * res, y * res, punti[x][y]*oggetto.Heightmap, x*res, y*res);
              vertex((x+1) * res , y * res, punti[x+1][y]*oggetto.Heightmap, x*res, y*res);
          }
          endShape();
      }
    }



}



function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
