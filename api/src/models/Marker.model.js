const { Schema, model } = require("mongoose");

const markerSchema = new Schema({
  title: String,
  description: String,
  baseImage: {
    url: String,
    key: String,
    width: Number,
    height: Number,
  },
  offset: { x: Number, y: Number },
  key: String,
  user: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User model
});

const marker = model("marker", markerSchema);

module.exports = marker;
