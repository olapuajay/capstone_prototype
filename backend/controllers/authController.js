import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const registerPassenger = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      mobile,
      password,
      role: "passenger",
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      success: true,
      message: "Passenger registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginPassenger = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: "passenger" });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: "driver" });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        busAssigned: user.busAssigned,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (username === expectedUsername && password === expectedPassword) {
      const token = jwt.sign(
        { id: "admin", email: "admin@smartbus.com", role: "admin" },
        JWT_SECRET,
        { expiresIn: "24h" },
      );

      return res.json({
        success: true,
        message: "Admin login successful",
        token,
        user: {
          id: "admin",
          name: "Administrator",
          email: "admin@smartbus.com",
          role: "admin",
        },
      });
    }

    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
