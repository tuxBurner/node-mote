# Denon backend

## Add a remote

### config.json

Under devices you can add a new denon backend


```json
"DENON" : {
      "type" : "denon",
      "config" : {
        "host" : "192.168.0.88",
        "maxVol" : 60,
        "inputs" : ["DVD","MPLAY", "BD", "SAT", "GAME"],
        "surroundModes" : ["DIRECT", "MCH STEREO"]
      }
    }
```