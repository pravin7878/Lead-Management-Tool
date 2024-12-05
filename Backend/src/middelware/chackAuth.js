const jwt = require("jsonwebtoken");

const chackAuth = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("token", token);

  let accessToken;
  //   if token not provide
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  //   if Bearer is provided
  if (token.startsWith("Bearer ")) {
    accessToken = token.split(" ")[1];
  } else {
    accessToken = token.trim();
  }

  //   varify the provided token
  try {
    const decode = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = chackAuth;
