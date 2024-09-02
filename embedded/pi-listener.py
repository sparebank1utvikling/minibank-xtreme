import serial
from pynput.keyboard import Key, Controller

keyboard = Controller()
keyboard_mapping = {
    1: "7", #PIN-spill
    2: "9", #Efaktura-spill
    3: "4", #Labyrint
    4: "6", #Tom slot
    5: "1", #Leaderboard PIN
    6: "3" #Leaderboard efaktura
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


