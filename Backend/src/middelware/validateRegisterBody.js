const validateRegisterBody = (req, res, next) => {
  const { name, email, mobileNumber, password } = req.body;

  // Check if name is provided
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  // Check if email is provided and is in correct format
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please provide a valid email address" });
  }

  // Check if mobileNumber is provided and has 10 digits
  if (!mobileNumber) {
    return res.status(400).json({ message: "Mobile number is required" });
  }
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobileNumber)) {
    return res.status(400).json({ message: "Mobile number must be 10 digits" });
  }

  // Check if password is provided
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  // If all validations pass, proceed to the next middleware or route handler
  next();
};

module.exports = validateRegisterBody;
