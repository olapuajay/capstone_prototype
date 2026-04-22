import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    speed: { type: Number, default: 40 },
    currentPointIndex: { type: Number, default: 0 },
    currentLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ["Running", "Delayed"],
      default: "Running",
    },
    delayMinutes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
