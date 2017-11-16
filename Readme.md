# Node - Mote

Still under development.


## Pi Notes

Turn Display on and off:

echo 0 > /sys/class/backlight/rpi_backlight/bl_power

echo 1 > /sys/class/backlight/rpi_backlight/bl_power


Set Brightness value goes from 0 to 255

echo 50 > /sys/class/backlight/rpi_backlight/brightness

### Display rotation

Rotates the touchscreen 180 degree and the input

lcd_rotate=2


Rotates the screen 90 degree

display_rotate=1

call this to get the input remapped 

xinput --set-prop 'FT5406 memory based driver' 'Coordinate Transformation Matrix'  0 1 0 -1 0 1 0 0 1

## Start chromium in kiosk mode

 chromium-browser --disable-infobars --kiosk --disable-overlay-scrollbar --touch-events http://192.168.0.2:3000





## Links

### Pi Rotate screen

* https://www.raspberrypi.org/forums/viewtopic.php?t=120793

### Pi Kioskmode
* http://www.lukebrowning.com/hardware/raspberry-pi/touch-screen-chromium-kiosk-on-the-raspberry-pi/
* https://itrig.de/index.php?/archives/2309-Raspberry-Pi-3-Kiosk-Chromium-Autostart-im-Vollbildmodus-einrichten.html
* https://forum.fhem.de/index.php?topic=51180.0