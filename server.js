const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const posts = require("./routes/posts");
const users = require("./routes/users");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(cors());

require("./passport")(passport);

app.use('/api/posts', posts);
app.use('/api/users', users);

app.get("/", (req, res) => {
  res.json({mes: "Api running"});
});

mongoose.connect("mongodb://localhost/lambdaNotes")
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch(() => {
    console.log("Error can't connect to Mongo");
  })

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
