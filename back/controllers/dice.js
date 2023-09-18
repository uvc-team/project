// MQTT 데이터를 조회하는 컨트롤러
exports.dataget = async (req, res) => {
  try {
    const dicedata = await MqttData.aggregate([
      { $unwind: "$Number" },
      { $sort: { _id: -1 } },
    ]).limit(1);
    if (dicedata) {
      res.status(200).json(dicedata);
    } else {
      res.status(400).json({ error: "데이터가 없습니다" });
    }
  } catch (error) {
    return res.status(500).json({ error: "데이터 조회 실패" });
  }
};
