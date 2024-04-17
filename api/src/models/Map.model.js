const { Schema, model } = require("mongoose");

const mapSchema = new Schema({
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User model
});

const Map = model("Map", mapSchema);

module.exports = Map;
