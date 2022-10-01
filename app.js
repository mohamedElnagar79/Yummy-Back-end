const express = require("express");
const server = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const pilotRoute = require("./routes/pilotRoute");
const userRoute = require("./routes/userRoute");
const kitchenRoute = require("./routes/kitchenRoute");
const menuRoute = require("./routes/menuRoute");
const itemRoute = require("./routes/itemRoute");
const orderRoute = require("./routes/orderRoute");
const loginRoute = require("./routes/loginRoute");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
//connect database
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db Connected ");
    server.listen(process.env.port || 8080, () => {
      console.log("Hi iam listening to Server with port 8080");
    });
  })
  .catch(() => {
    console.log("db connection error");
  });

// use morgan middleWare
server.use(
  morgan("dev", {
    skip: (req, res) => {
      res.statusCode < 400;
    },
  })
);

server.get("/", (req, res) => {
  res.send("hello from main page");
});

// image
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./avatars/images/");
    },
    filename: function (req, file, callback) {
      const newImageName = `${Date.now()}.jpg`;
      callback(null, newImageName);
    },
  }),
});
//cors
server.use(cors({}));

//end Routes
server.use([
  express.json(),
  express.urlencoded({ extended: false }),
  upload.single("image"),
]);
server.use([
  pilotRoute,
  userRoute,
  kitchenRoute,
  menuRoute,
  itemRoute,
  orderRoute,
  loginRoute,
]);

server.use("/avatars", express.static(path.join(__dirname, "avatars")));

// general middleware not found
server.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

//middleware error handler
server.use((error, req, res, next) => {
  let status = error.status || 500;
  res.status(status).json({ message: "internal Error " + error });
});
