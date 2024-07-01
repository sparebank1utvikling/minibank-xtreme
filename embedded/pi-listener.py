import serial
from pynput.keyboard import Key, Controller

keyboard = Controller()
keyboard_mapping = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f'
}

port = "/dev/ttyACM0"

s1 = serial.Serial(port, 9600)
s1.flushInput()
print('Listening')
while True:
    if s1.inWaiting() > 0:
        inputValue = s1.read(1)
        tall = ord(inputValue)
        print(tall) #debug
        to_press = keyboard_mapping.get(tall)
        keyboard.tap(to_press)


