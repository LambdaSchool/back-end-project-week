const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("./config");
const mongoose = require("mongoose");

const port = process.env.PORT || 3333;
const server = express();
const { authenticate } = require("./middlewares/middlewares");

const noteController = require("./notes/noteController");
const userController = require("./users/userController");

mongoose
  .connect(
    `mongodb://${config.mongo.username}:${
      config.mongo.password
    }@ds139970.mlab.com:39970/cruise-notes`
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(err => {
    console.log("error connecting to database");
  });

server.use(cors({}));
server.use(express.json());
server.use(morgan("combined"));

server.get("/", (req, res) => {
  res.json({ Message: "Server's not broken" });
});

server.use("/api/notes", authenticate, noteController);
server.use("/api/users", userController);

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Focus your attack on port ${port}`);
});
