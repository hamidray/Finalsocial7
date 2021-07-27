var jwt = require("jsonwebtoken");

module.exports = () => (req, res, next) => {
  try {
    const token = req.headers.token;
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user.data;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token", error }).end();
  }
};
