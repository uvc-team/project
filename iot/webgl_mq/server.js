const mqtt = require("mqtt");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const brokerUrl = "mqtt://localhost:1883";
const topic = "test";

const mqttClient = mqtt.connect(brokerUrl);

mqttClient.on("connect", function () {
  console.log("Connected to MQTT broker");
  mqttClient.subscribe(topic);
});

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  mqttClient.on("message", function (topic, message) {
    console.log("Message received:", message.toString());
    ws.send(message.toString()); // MQTT 브로커로부터 받은 메시지를 클라이언트로 전송
  });
});

server.listen(8080, function () {
  console.log("Server is listening on port 8080");
});
