import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied! No token provided." });
    }

    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

    req.user = decoded; // Attach user info from token
    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token. Please log in again." });
  }
};
