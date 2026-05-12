import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    busNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    speed: { type: Number, default: 40 },
    currentPointIndex: { type: Number, default: 0 },
    currentLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ["Running", "Delayed", "Heavy Traffic", "Breakdown", "Inactive"],
      default: "Running",
    },
    delayMinutes: { type: Number, default: 0 },
    delayReason: {
      type: String,
      enum: [
        "traffic",
        "road_construction",
        "weather",
        "mechanical",
        "crowd",
        "none",
      ],
      default: "none",
    },
    capacity: { type: Number, default: 50 },
    currentPassengers: { type: Number, default: 0 },
    lastUpdateTime: { type: Date, default: Date.now },
    manualStatusUntil: { type: Date, default: null },
  },
  { timestamps: true },
);

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
