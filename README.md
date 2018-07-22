<h1 width="100%"  align="middle">KeyScanner</h1>

<img src="https://cdn.rawgit.com/namshi/keyscannerjs/master/scanner.svg" height="150" width="100%" align="middle"/>

## Overview
KeyScanner is a library that allows reading input events from a barcode machine or other similar devices (like a mobile device with a barcode scanner), and distinguish them from normal user keystrokes. 
All barcode scanners can feed text into your application if you're focused into a text field however, KeyScanner does not require user focus in a text field, and provides a simple API to obtain the scanned text.
When you connect a barcode machine to your computer and scan a code, KeyScanner intercepts those and makes it available to your application in an easy to use manner.

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
        key_stroke_speed_ms: 0.017,
        minimum_no_chars: 5
    }
    const keyScanHandle = new keyscanner(myFuncOnScan, config);
```
| Property | Description|
|:---- |:---- |
| overall_percentage      | The Overall percentage 1 - 100, at which scanner input passes the speed threshold mentioned in key_stroke_speed_ms.(default 95, meaning 95% of the character input must be faster than the speed threshold mentioned in key_stroke_speed_ms)|
| key_stroke_speed_ms     | The speed in milli-seconds the scanner sends alphabets it scans. (default: 0.017)|
| minimum_no_chars | The minimum number of characters that a barcode should contain, inorder to get notified (default 4). Hence any inputs containing less than the value specified is ignored by keyscanner. |