const adminAuth = (req, res, next) => {
  const username = req.header("x-admin-username");
  const password = req.header("x-admin-password");

  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (username !== expectedUsername || password !== expectedPassword) {
    return res.status(401).json({ message: "Unauthorized admin request" });
  }

  return next();
};

export default adminAuth;
