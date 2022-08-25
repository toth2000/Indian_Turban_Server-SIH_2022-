const mongoose = require("mongoose");

const turbanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    modelUrl: { type: String, required: true },
    videoUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Turban", turbanSchema);
