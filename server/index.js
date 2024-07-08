const express = require("express");
require("express-async-errors");
const app = express();
const productRouter = require("./routes/Product");
const userRouter = require("./routes/User");
const orderRouter = require("./routes/Order");
const messageRouter = require("./routes/Message");
const notFound = require("./middlewares/not-found");
const errorHandlerFunction = require("./middlewares/error-handler");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
//const User = require("./models/User");
//const Order = require("./models/Order");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/v1", userRouter);
app.use("/api/v2", productRouter);
app.use("/api/v3", orderRouter);
app.use("/api/v4", messageRouter);

app.use(notFound);
app.use(errorHandlerFunction);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() =>
      console.log("MongoDB connected")
    );
    //await User.updateMany({}, { $set: { roleId: "R1" } });
    //await Order.deleteMany();
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};

start();

module.exports = app;
