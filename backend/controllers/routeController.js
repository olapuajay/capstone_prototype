import Route from "../models/Route.js";

export const getAllRoutes = async (_req, res) => {
  try {
    const routes = await Route.find().sort({ name: 1 });
    return res.json(routes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRoute = async (req, res) => {
  try {
    const { name, from, to, points } = req.body;

    if (!name || !from || !to || !Array.isArray(points) || points.length < 2) {
      return res.status(400).json({ message: "Invalid route payload" });
    }

    const route = await Route.create({ name, from, to, points });
    return res.status(201).json(route);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRoute = async (req, res) => {
  try {
    const { name, from, to, points } = req.body;
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    if (name) route.name = name;
    if (from) route.from = from;
    if (to) route.to = to;
    if (Array.isArray(points) && points.length >= 2) route.points = points;

    await route.save();

    return res.json(route);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
