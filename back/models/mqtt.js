const mongoose = require("mongoose");

const { Schema } = mongoose;
const plc = new Schema({
  tagId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Boolean,
    required: true,
  },
});

// const plc = new Schema({
//   payload: [PLC_Data],
// });

module.exports = mongoose.model("final", plc);
