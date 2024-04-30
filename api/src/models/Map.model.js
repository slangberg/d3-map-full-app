const { Schema, model } = require("mongoose");

const mapSchema = new Schema(
  {
    title: String,
    baseImage: {
      url: String,
      key: String,
    },
    description: String,
    user: { type: Schema.Types.ObjectId, ref: "User", index: true },
    tags: [{ type: String, index: true }],
  },
  {
    timestamps: true,
  }
);

const Map = model("Map", mapSchema);

module.exports = Map;
