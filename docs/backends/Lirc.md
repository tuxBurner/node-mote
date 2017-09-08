# Lirc Infrared backend

## Configure Lirc

Check if you can find your remote here: http://lirc.sourceforge.net/remotes/

## Add a remote

### config.json

Under devices you can add a new lirc backend


```json
"SAMSUNG_BED": {
      "type": "lirc",
      "config": {
        "remote": "Samsung_BN59-00865A",
        "buttons": [
          {
            "KEY_POWER": "power_settings_new",
            "KEY_CYCLEWINDOWS": "input"
          },
          {
            "KEY_VOLUMEDOWN": "volume_down",
            "KEY_VOLUMEUP": "volume_up",
            "KEY_MUTE": "volume_off"
          }
        ]
      }
    }
```