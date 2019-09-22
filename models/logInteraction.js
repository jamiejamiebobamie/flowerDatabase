const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
  input: { type: String },
  output: { type: String },
  time: { type: String },
});

module.exports = mongoose.model("Label", LabelSchema);
