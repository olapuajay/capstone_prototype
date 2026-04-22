import mongoose from "mongoose";

const routePointSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    stopName: { type: String, required: true },
  },
  { _id: false },
);

const routeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    points: { type: [routePointSchema], required: true },
  },
  { timestamps: true },
);

const Route = mongoose.model("Route", routeSchema);

export default Route;
