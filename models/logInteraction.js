const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InteractionSchema = new Schema({
  petalLength: { type: String },
  petalWidth: { type: String },
  sepalLength: { type: String },
  sepalWidth: { type: String },
  output: { type: String },
  time: { type: String },
});

module.exports = mongoose.model("Interaction", InteractionSchema);
