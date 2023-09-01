const mqtt = require("mqtt");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const brokerUrl = "mqtt://192.168.0.33:1883";
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
const allowedOrigins = ["http://192.168.0.33:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

server.listen(8081, function () {
  console.log("Server is listening on port 8081");
});
