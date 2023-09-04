const mqtt = require("mqtt");
const MqttData = require("./models/mqtt");

const brokerUrl = "mqtt://192.168.0.33:1883";
// const topic = "test";
const topic = "edukit/robotarm";

const mqttClient = mqtt.connect(brokerUrl);

function connectToMqttBroker() {
  mqttClient.on("connect", function () {
    console.log("MQTT 브로커에 연결됨");
  });
}

function subscribeToMqttTopic() {
  mqttClient.on("connect", function () {
    mqttClient.subscribe(topic);
  });
}

mqttClient.on("message", async function (mqttTopic, message) {
  console.log("MQTT에서 메시지 받음:", message.toString());

  try {
    const data = JSON.parse(message.toString()); // JSON 형식의 MQTT 메시지 파싱
    await MqttData.create(data);
    console.log("데이터를 MongoDB에 저장했습니다:", data);
  } catch (error) {
    console.error("데이터 저장 실패:", error.message);
  }
});

module.exports = { mqttClient, connectToMqttBroker, subscribeToMqttTopic };
