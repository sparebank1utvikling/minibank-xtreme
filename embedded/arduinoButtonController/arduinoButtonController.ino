const int BUTTON_1 = 2;                 //Define ports for buttons
const int BUTTON_2 = 3;
const int BUTTON_3 = 4;
const int BUTTON_4 = 5;
const int BUTTON_5 = 6;
const int BUTTON_6 = 7;

void setup() {
  Serial.begin(9600);                   //Start serial-listening
                            
  pinMode(BUTTON_1, INPUT_PULLUP);      //Start listening on assigned inputs on Arduino-board
  pinMode(BUTTON_2, INPUT_PULLUP);
  pinMode(BUTTON_3, INPUT_PULLUP);
  pinMode(BUTTON_4, INPUT_PULLUP);
  pinMode(BUTTON_5, INPUT_PULLUP);
  pinMode(BUTTON_6, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(BUTTON_1) == LOW) {   //Listen for button presses
        Serial.write(1);
        delay(250);
    };
  if (digitalRead(BUTTON_2) == LOW) {
        Serial.write(2);
        delay(250);
    };
  if (digitalRead(BUTTON_3) == LOW) {
        Serial.write(3);
        delay(250);
    };
  if (digitalRead(BUTTON_4) == LOW) {
        Serial.write(4);
        delay(250);
    };
  if (digitalRead(BUTTON_5) == LOW) {
        Serial.write(5);
        delay(250);
    };
  if (digitalRead(BUTTON_6) == LOW) {
        Serial.write(6);
        delay(250);
    };
}