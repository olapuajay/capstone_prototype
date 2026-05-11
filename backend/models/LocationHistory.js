import mongoose from "mongoose";

const locationHistorySchema = new mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    speed: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Add index for bus and timestamp for efficient queries
locationHistorySchema.index({ bus: 1, createdAt: -1 });

const LocationHistory = mongoose.model(
  "LocationHistory",
  locationHistorySchema,
);

export default LocationHistory;
