#include <AFMotor.h>
AF_DCMotor Motor2(3);
AF_DCMotor Motor3(4);
#include <SoftwareSerial.h>
SoftwareSerial WMBT(10,9);
char leer;
void setup(){
Serial.begin(9600);
Serial.println("Listo");
WMBT.begin(9600);
Motor2.run(RELEASE);
Motor3.run(RELEASE);
}
void loop() {
if (WMBT.available()){
leer = WMBT.read();
Serial.println(leer);
switch(leer){
case 'F':
adelante();
WMBT.println("Adelante");
break;
case 'f':
adelante();
WMBT.println("Adelante");
break;
case 'B':
retroceder();
WMBT.println("Reversa");
break;
case 'b':
retroceder();
WMBT.println("Reversa");
break;
case 'L':
izquierda();
WMBT.println("Izquierda");
break;
case 'l':
izquierda();
WMBT.println("Izquierda");
break;
case 'R':
derecha();
WMBT.println("Derecha");
break;
case 'r':
derecha();
WMBT.println("Derecha");
break;
case 'S':
detener();
WMBT.println("Detener");
break;
case 'd':
detener();
WMBT.println("Detener");
break;
}
}
}
void adelante(){
Motor2.setSpeed(200);
Motor2.run(FORWARD);
Motor3.setSpeed(200-50);
Motor3.run(FORWARD);
}
void retroceder(){
Motor2.setSpeed(180);
Motor2.run(BACKWARD);
Motor3.setSpeed(180-50);
Motor3.run(BACKWARD);
}
void derecha(){
Motor2.setSpeed(200);
Motor2.run(BACKWARD);
Motor3.setSpeed(200-50);
Motor3.run(FORWARD);
}
void izquierda(){
Motor2.setSpeed(200);
Motor2.run(FORWARD);
Motor3.setSpeed(200-50);
Motor3.run(BACKWARD);
}
void detener(){
Motor2.setSpeed(0);
Motor2.run(RELEASE);
Motor3.setSpeed(0);
Motor3.run(RELEASE);
}