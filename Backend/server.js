require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectToDB = require("./src/config/db");
// middelwares
const errorHandler = require("./src/middelware/errorHendeler");
const notFoundMiddleware = require("./src/middelware/notFoundRoute");
// routes
const userRouter = require("./src/routes/user.route");
const adminRotuer = require("./src/routes/admin.routes");
const leadRouter = require("./src/routes/lead.routes");

const app = express();
const port = process.env.PORT || 3000;

// here i have enabled cors
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
// here is the user base routes
app.use("/user", userRouter);
// this is the admin base route
app.use("/admin" , adminRotuer)
app.use("/leads" , leadRouter)

app.get("/", (req, res) => {
  res.send("wellcome to server");
});

app.get("/helth", (req, res) => {
  res.send("server is ok !");
});

// for hendeling error
app.use(errorHandler);

// if route not exist
app.use(notFoundMiddleware);

app.listen(port, async () => {
  console.log(`server is runing on http://localhost:${port}`);
  try {
    await connectToDB();
    console.log("DB Connected Success");
  } catch (error) {
    console.log("DB connection failld", error);
  }
});
