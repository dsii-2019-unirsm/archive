/*
  Physical Pixel

 An example of using the Arduino board to receive data from the
 computer.  In this case, the Arduino boards turns on an LED when
 it receives the character 'H', and turns off the LED when it
 receives the character 'L'.

 The data can be sent from the Arduino serial monitor, or another
 program like Processing (see code below), Flash (via a serial-net
 proxy), PD, or Max/MSP.

 The circuit:
 * LED connected from digital pin 13 to ground

 created 2006
 by David A. Mellis
 modified 30 Aug 2011
 by Tom Igoe and Scott Fitzgerald

 This example code is in the public domain.

 http://www.arduino.cc/en/Tutorial/PhysicalPixel
 */

const int led1 = 13; // the pin that the LED is attached to
const int led2 = 12;
const int led3 = 8;
const int led4 = 7;
int incomingByte;      // a variable to read incoming serial data into
const int relay1 =  2; // the number of the Relay1 pin
const int relay2 =  3; // the number of the Relay1 pin
const int relay3 =  4; // the number of the Relay1 pin
const int relay4 =  5; // the number of the Relay1 pin



void setup() {
  // initialize serial communication:
  Serial.begin(9600);
  // initialize the LED pin as an output:
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  pinMode(relay1, OUTPUT);  
  pinMode(relay2, OUTPUT);  
  pinMode(relay3, OUTPUT);  
  pinMode(relay4, OUTPUT);
  digitalWrite(relay1, HIGH);
  digitalWrite(relay2, HIGH);
  digitalWrite(relay3, HIGH);
  digitalWrite(relay4, HIGH);
   
  
}

void loop() {
  // see if there's incoming serial data:
  if (Serial.available() > 0) {
    // read the oldest byte in the serial buffer:
    incomingByte = Serial.read();
    // if it's a capital H (ASCII 72), turn on the LED:
    if (incomingByte == 'x') {
      digitalWrite(led1, HIGH);
      digitalWrite(relay1, LOW);
      delay(500);
      digitalWrite(led1, LOW);
      digitalWrite(relay1, HIGH);
    }
    // if it's an L (ASCII 76) turn off the LED:
    if (incomingByte == 'o') {
      digitalWrite(led2, HIGH);
      digitalWrite(relay2, LOW);
      delay(500);
      digitalWrite(led2, LOW);
      digitalWrite(relay2, HIGH);
    }
    if (incomingByte == '*') {
      digitalWrite(led3, HIGH);
      digitalWrite(relay3, LOW);
      delay(500);
      digitalWrite(led3, LOW);
      digitalWrite(relay3, HIGH);
    }
    if (incomingByte == '-') {
      digitalWrite(led4, HIGH);
      digitalWrite(relay4, LOW);
      delay(500);
      digitalWrite(led4, LOW);
      digitalWrite(relay4, HIGH);
    }
      }
  
}
