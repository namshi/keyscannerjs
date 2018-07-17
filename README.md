<h1 width="100%"  align="middle">KeyScanner</h1>

<img src="https://raw.githubusercontent.com/namshi/keyscannerjs/master/scanner.svg" height="150" width="100%" align="middle"/>

## Overview
KeyScanner is a library that allows reading input events from a barcode machine or other similar devices, and distinguish them from normal user keystrokes. 
All barcode scanners can feed text into your application if your focused into a textfield however, KeyScanner does not require user focus in a textfield, and provides a simple API to obtain the scanned text.
When you connect a barcode machine to your computer, and scan a code, KeyScanner intercepts those and makes it available to your application in an easy to use manner.

## Quick Start Guide
```
npm i keyscanner --save
```

```js
import keyscanner from 'keyscanner';

const keyScanHandle = new keyscanner(myFuncOnScan);

const myFuncOnScan = barcodeValue => {
    console.log('The scan from your barcode machine', barcodeValue);
    // Do what you like with the barcodeValue now !!!
}
```

#### Ask keyscanner to Stop Listening to events when you no longer need it

```js
const keyScanHandle = new keyscanner(myFuncOnScan);
keyScanHandle.stop();
```

#### Configuration Options (Optional)

```js
    const config = {
        overall_percentage : 80,
        key_stroke_speed_ms: 0.017 
    }
    const keyScanHandle = new keyscanner(myFuncOnScan, config);
```
| Property | Description|
|:---- |:---- |
| overall_percentage      | The Overall percentage 1 - 100, at which scanner input passes the speed threshold mentioned in key_stroke_speed_ms|
| key_stroke_speed_ms     | The speed in milli-seconds the scanner sends alphabets it scans. |