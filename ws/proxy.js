// credit to 
//   https://dimitrisfousteris.wordpress.com/2014/12/07/websocket-udp-proxy-with-node-js/
  
var Buffer = require('buffer').Buffer;
var dgram = require('dgram');
var WebSocketServer = require('ws').Server;
 
var wss = new WebSocketServer({ port : process.env.PORT ? process.env.PORT : 8080 });
 
//The ip & port of the udp server
var DGRAM_TYPE = process.env.DGRAM_TYPE ? process.env.DGRAM_TYPE : 'udp4';
var SERVER_IP = process.env.UDP_SERVER_IP;
var SERVER_PORT = process.env.UDP_SERVER_PORT;
 
wss.on('connection', function(ws) {
    //Create a udp socket for this websocket connection
    var udpClient = dgram.createSocket(DGRAM_TYPE);
 
    //When a message is received from udp server send it to the ws client
    udpClient.on('message', function(msg, rinfo) {
        ws.send(msg.toString());
    });
 
    //When a message is received from ws client send it to udp server.
    ws.on('message', function(message) {
        var msgBuff = Buffer.from(message);
        udpClient.send(msgBuff, 0, msgBuff.length, SERVER_PORT, SERVER_IP);
    });
});
