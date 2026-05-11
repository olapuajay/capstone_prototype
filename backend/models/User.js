import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["passenger", "driver", "admin"],
      default: "passenger",
    },
    // Driver specific fields
    busAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      default: null,
    },
    licenseNumber: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
