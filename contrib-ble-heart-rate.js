 module.exports = function(RED) {
  "use strict";

  function bleHeartrate(config) {
    RED.nodes.createNode(this,config);
    var node = this;

    // Init
    var noble = require('noble');
    var authorized_ble_peripheral_address = config.authorized_peripheral_address;
    var serviceUUID = ["180d"];
    var characteristicUUID = ["2a37"];

    // --- BLE handling using noble --- //
    noble
      .on('stateChange', function(state) {
        if (state === 'poweredOn') { 
          // Scan for peripherals broadcasting the heart rate service and use the first one discovered
          noble.startScanning(serviceUUID);
          console.log("Scanning BLE devices...");
          node.status({fill:"yellow",shape:"dot",text:"scanning"});
        } else {
          noble.stopScanning();
        }
      })
      .on('discover', function(peripheral) {
        // Stop scanning once a peripheral is discovered
        noble.stopScanning();
        console.log("DISCOVERED: " + peripheral);        
        node.status({fill:"blue",shape:"dot",text:"discovered"});


        if (peripheral.address === authorized_ble_peripheral_address || authorized_ble_peripheral_address == "") {
          // connect to the peripherals
          peripheral.connect(function(error) {
            console.log("CONNECTED: " + peripheral);
            node.status({fill:"green",shape:"dot",text:"connected"});

            peripheral.discoverSomeServicesAndCharacteristics(serviceUUID, characteristicUUID, function(error, services, characteristics){
              characteristics[0].notify(true, function(error){
                characteristics[0].on('data', function(data, isNotification){
                  // parsing RRIs
                  var rri1 = (data[3] << 8) + data[2];
                  var rri2 = (data[5] << 8) + data[4];
                  console.log('Flag: ' + data[0] + '  HBR:' + data[1] + '  RRI1:' + rri1 + '  RRI2:' + rri2);
                  var formatted_time = new Date().toISOString();

                  var args = {
                    "time": formatted_time,
                    "flag": data[0],
                    "hbr": data[1],
                    "rri1": rri1,
                    "rri2": rri2
                  };
                  node.send({payload: args});

                });
              });
            });
          });
          peripheral.on('disconnect', function() {
            console.log("DISCONNECTED: " + peripheral);
            node.status({fill:"red",shape:"dot",text:"disconnected"});

            noble.startScanning(serviceUUID);
            console.log("Scanning BLE devices...");
            node.status({fill:"yellow",shape:"dot",text:"scanning"});

          });
        } else {
          console.log("Could not discover the authorized device. Wait for 10 seconds.");
          node.status({fill:"yellow",shape:"ring",text:"waiting"});
          setTimeout(function() {
                noble.startScanning(serviceUUID);
                console.log("Re-scanning BLE devices...");
                node.status({fill:"yellow",shape:"dot",text:"scanning"});
          }, 10000);
        }

      });
  }

  RED.nodes.registerType("ble-heartrate",bleHeartrate);
}




