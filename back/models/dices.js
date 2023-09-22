const mongoose = require("mongoose");

const { Schema } = mongoose;

const diceSchema = new Schema(
  {
    DiceNumber: {
      type: Number, // 숫자 타입으로 변경
      required: true,
    },
  },
  { collection: "diceNums" }
);

module.exports = mongoose.model("test", diceSchema);
