const { Schema, model } = require("mongoose");

const markerSchema = new Schema({
  title: String,
  description: String,
  baseImage: {
    url: String,
    key: String,
  },
  width: Number,
  height: Number,
  offset: { x: Number, y: Number },
  tooltipOffset: { x: Number, y: Number },
  key: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  maps: [{ type: Schema.Types.ObjectId, ref: "Map" }],
});

const marker = model("marker", markerSchema);

module.exports = marker;
