# node-red-contrib-ble-heart-rate

A contributed Node-RED node, that retrieve data from BLE heartrate monitors.


## Overview

This node connects to a BLE heartrate monitor, retrieve metrics e.g. heartrate, rri etc, and pass them to the next node.

This node supports the standard BLE GATT - which is the heartrate monitor service and characteristic as "180d" and "2a37" accordingly.

## Installation

Mostly you can move to `/.node-red` and install this package using `npm` as below.

```
$ cd $HOME/.node-red
$ npm install node-red-contrib-ble-heart-rate
```

## Usage

- turn on your BLE heart rate moitor device
- place the `ble heartrate` node on the flow
- deploy the flow
- the node status changes to `connected`
- the node start to transmit `time`, `flag`, `hbr`, `rri1`, `rri2` through `msg.payload` to the next node

example:

```
{
	"time": 2017-12-16T13:15:20Z,
	"flag": 22,
	"hbr": 73,
	"rri1": 852,
	"rri2": null
};
```


### Node status

This `ble heartrate` node has below satus which represents BLE connection status with target devices.

|status|description|
|---|---|
|scanning|Scanning BLE devices nearby|
|discovered|A BLE device is discovered|
|connected|Connected to a BLE device|
|disconnected|Disconnected a BLE device|
|waiting|Waitint for 10 seconds till the next scan|

## Configuration

- Name
	- Change the name of the node from the default `ble heartrate` to whatever you want.
- Authorized peripheral address
	- e.g. xx:xx:xx:xx:xx:xx
	- default: `null` (Any BLE devices nearby could be connected.)

## License

MIT License

Copyright (c) 2017 tomo-makes (Tomo Masuda)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.