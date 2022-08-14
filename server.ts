/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'
// import mosca from 'mosca'

sourceMapSupport.install({ handleUncaughtExceptions: false })



new Ignitor(__dirname)
  .httpServer()
  .start()

// var settings = {
//     port: 8000
// }

// var MqttServer = new mosca.Server(settings);
//   MqttServer.on('clientConnected', function(client){
//       console.log('client connected', client.id);
//   });
//   /**
//    * 监听MQTT主题消息
//    **/
//   MqttServer.on('published', function(packet) {
//       var payload = packet.payload;
//       var topic = payload.topic
//       console.log('packet.payload', packet.payload)
//       switch(topic){
//           case '/stock/order':
//               console.log('message-publish', packet.payload.toString());
//               //MQTT转发主题消息
//               const str = 'success'
//               MqttServer.publish({topic, payload: Buffer.from(str, 'utf-8')});
//               break;
//           case 'other':
//               console.log('message-123', packet.payload.toString());
//               break;
//       }
//   });
  
//   MqttServer.on('ready', function(){
//       console.log('mqtt is running...');
//   });
  
