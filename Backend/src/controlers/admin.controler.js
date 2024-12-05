const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User")


const authenticateAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) return res.status(400).json({ message: "email is required" });
    const admin = await User.findOne({ email });
    if (!admin)
      return res
        .status(404)
        .json({ message: "email in invalid" });

    if (!password)
      return res.status(400).json({ message: "password is required" });
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "password is wrong" });

    
    const token = jwt.sign(
      {
        userId: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "login success",
      user : { name: admin.name, userId: admin._id, role: admin.role, token },
    });
  } catch (error) {
    next(error);
  }
};



const getAllUsers =  async (_,res,next)=>{
try {
    const users = await User.find({ role: "user" }).select("-password");
    const totelUsers = await User.countDocuments({role : "user"})
    res.json({totelUsers,users})
} catch (error) {
    next(error)
}
}


module.exports = {getAllUsers , authenticateAdmin}