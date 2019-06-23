/*
  Button

  Turns on and off a light emitting diode(LED) connected to digital pin 13,
  when pressing a pushbutton attached to pin 2.

  The circuit:
  - LED attached from pin 13 to ground
  - pushbutton attached to pin 2 from +5V
  - 10K resistor attached to pin 2 from ground

  - Note: on most Arduinos there is already an LED on the board
    attached to pin 13.

  created 2005
  by DojoDave <http://www.0j0.org>
  modified 30 Aug 2011
  by Tom Igoe

  This example code is in the public domain.

  http://www.arduino.cc/en/Tutorial/Button
*/

// constants won't change. They're used here to set pin numbers:
const int buttonPin1 = 4;// the number of the pushbutton pin
const int buttonPin2 = 5; 
const int buttonPin3 = 6; 
const int buttonPin4 = 7; 

// variables will change:
int buttonState1 = 0;// variable for reading the pushbutton status
int buttonState2 = 0;
int buttonState3 = 0;
int buttonState4 = 0;

void setup() {
   Serial.begin(9600);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
  pinMode(buttonPin3, INPUT);
  pinMode(buttonPin4, INPUT);
}

void loop() {
 // bottone 1 registra
  buttonState1 = digitalRead(buttonPin1);
  if (buttonState1 == HIGH) {
    // turn LED on:
    digitalWrite(buttonState1, HIGH);
    Serial.write("1");
    delay(200);
  } else {
    // turn LED off:
    digitalWrite(buttonState1, LOW);  
  }
  
  
  // bottone 2 insert
    buttonState2 = digitalRead(buttonPin2);
    if (buttonState2 == HIGH) {
    // turn LED on:
    digitalWrite(buttonState2, HIGH);
    Serial.write("2");
    delay(200);
  } else {
    // turn LED off:
    digitalWrite(buttonState2, LOW);  
  }
   
  //bottone 3 dream
  buttonState3 = digitalRead(buttonPin3);
  if (buttonState3 == HIGH) {
    // turn LED on:
    digitalWrite(buttonState3, HIGH);
    Serial.write("3");
    delay(200);
  } else {
    // turn LED off:
    digitalWrite(buttonState3, LOW);  
  } 
  
  
  // bottone 4 racconta
  buttonState4 = digitalRead(buttonPin4);
  if (buttonState4 == HIGH) {
    digitalWrite(buttonState4, HIGH);
    Serial.write("4");
    delay(200);
  } else {
    // turn LED off:
    digitalWrite(buttonState4, LOW);  
  } 
}
