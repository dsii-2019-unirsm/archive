// -
// Reliable Drum Machine 0.1 by Daniele Cappai [drum machine, physical computing]
// 2018 © Nomestudente, Daniele @Fupete and the course DSII2019 at DESIGN.unirsm 
// github.com/dsii-2019-unirsm — github.com/fupete
// Educational purposes, MIT License, 2019, San Marino
// —

var nomi = ["x", "o", "*", "-"];
var tabla;
var drums = "";
  var contatore = 0;
var carattere;
let bpm = 60;
let tempo = 0;

// Declare a "SerialPort" object
var serial;

var portName = '/dev/cu.usbmodem14201'; // fill in your serial port name here

// this is the message that will be sent to the Arduino:
var outMessage = "";

function getMeChar() {

  if (contatore < tabla.length) {
    carattere = tabla[contatore];
  } else {
    contatore = 0;
  }
  //console.log(contatore+"   "+carattere);
      contatore++;
  //console.log(carattere);
  textSize(20);
  text(carattere, 10, 200);
  translate(10,0);
  return (carattere);
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  //Clock.timeSignature = '8/8';
  // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results. See gotList, below:
  serial.list();

  // Assuming our Arduino is connected,  open the connection to it
  serial.open(portName);

  // When you get a list of serial ports that are available
  serial.on('list', gotList);

  // When you some data from the serial port
  serial.on('data', gotData);
}

function gotList(thelist) {
  //console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    //console.log(i + " " + thelist[i]);
  }
}

// Called when there is data available from the serial port
function gotData() {
  var currentString = serial.readLine();
  //console.log(currentString);
}


function draw() {
}


function scegli_parole(nomi) {
  let a = parseInt(random(nomi.length));
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    background(255);
    if (drums != "") {
      drums.kill();
      drums = "";
    }

    tabla = "";
    let quante = parseInt(random(1, 5)) * 4;
    //console.log(quante);
    Clock.rate = 1;
    Clock.timeSignature = quante + "/" + quante;
    //scegli_parole(nomi);
    for (i = 0; i < quante; i++) {
      let a = parseInt(random(nomi.length));
      tabla += nomi[a];
    }
    textSize(20);
    text(tabla, 10, 100);
    drums = EDrums(tabla);
    console.log(tabla);
    //follow = Follow(drums);
    invia_segnale();
      //setInterval(getMeChar, 2000);
      setInterval(invia_segnale,1000);
  }
}


function invia_segnale() {
  getMeChar();
  serial.write(carattere);
  //console.log(carattere)
}
