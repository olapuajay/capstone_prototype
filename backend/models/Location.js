import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    speed: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Location = mongoose.model("Location", locationSchema);

export default Location;
