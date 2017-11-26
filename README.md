# node-red-contrib-ble-heart-rate

## Retrieve data from BLE heartrate monitors

This node connects to a BLE heartrate monitor, retrieve metrics e.g. heartrate, rri etc, and pass them to the next node.

This node supports the standard BLE GATT - which is the heartrate monitor service and characteristic as "180d" and "2a37" accordingly.


## tips

- 各フェーズのステータスを定義する: [Node-RED日本ユーザ会 : ステータス](https://nodered.jp/docs/creating-nodes/status)
- node登録用の名称が"-"区切りの必要があった


## todo

for the qiita node-red advent calendar on 12/16

- [x] test to deploy on live node-red: 11/25
- [x] git push (my repo): 11/26
- [ ] test to connect to a ble monitor
- [ ] test the debug msg.payloads
- [ ] test the node indicators
- [ ] git push (node)
- [ ] build a end-to-end demo including dashboards
- [ ] git push (demo)
- [ ] write them up


