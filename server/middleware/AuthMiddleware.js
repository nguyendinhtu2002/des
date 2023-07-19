const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 1221212121);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
const admin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an Admin" });
  }
};
const user = async(req,res,next)=>{
  if (req.user && req.user.role === "customer") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an User" });
  }
}
const guest = async(req,res,next)=>{
  if (req.user && req.user.role === "guest") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an Guest" });
  }
}
module.exports = { protect, admin ,user,guest};
