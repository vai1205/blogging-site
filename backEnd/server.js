const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//import routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");

//app
const app = express();

//middleWares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL
    })
  );
}
//routes middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

//db
mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("db Connected");
  });

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
