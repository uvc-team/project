const mongoose = require("mongoose");

const { Schema } = mongoose;

const Dicedata = new Schema({
  DiceNumber: {
    type: Number,
    required: true,
  },
});

const dice = new Schema(
  {
    Dicenumber: Dicedata,
  },
  { collection: "diceNums" }
);

module.exports = mongoose.model("test", dice);
