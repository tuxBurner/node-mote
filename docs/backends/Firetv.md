# Firetv backend

## Add a remote

### config.json

Under devices you can add a new firetv backend


```json
"FIRETV_BED": {
      "type": "firetv",
      "config": {
        "host": "192.168.0.159",
        "adbPath": "/usr/bin/adb"
      }
    }
```