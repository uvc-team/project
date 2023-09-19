const mongoose = require("mongoose");

const { Schema } = mongoose;

const Dice_data = new Schema({
  Number: {
    type: NumberInt,
    required: true,
  },
});

const dice = new Schema(
  {
    Number: Dice_data,
  },
  { collection: "diceNums" }
);

module.exports = mongoose.model("test", dice);
