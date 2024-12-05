const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// register a new user
const registerNewUser = async (req, res, next) => {
  const { name, email, mobileNumber, password,role } = req.body;
  try {
    // if provided email is alredy register then return
    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ message: "email already register" });
    if (!password)
      return res.status(400).json({ message: "password is required" });
    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND)
    );
    const user = await new User({
      name,
      email,
      mobileNumber,
      password: hashPassword,
      role
    });
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User Registeration Success", user: savedUser });
  } catch (error) {
    next(error);
  }
};

// authenticate Registered User
const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).json({ message: "email is required" });
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "user not found , please register first" });

    if (!password)
      return res.status(400).json({ message: "password is required" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "password is wrong" });

     if (user.status === "inactive")
       return res.status(403).json({ message: "User is inactive" });

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "login success",
      user: { name: user.name, userId: user._id, role: user.role, token },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { registerNewUser, authenticateUser };
