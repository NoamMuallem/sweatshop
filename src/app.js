const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
//starting database server
require("./db/mongoose.js");
//import routes
const inventory = require("./routers/tamplates");
const user = require("./routers/user");

//app config
const app = express();

//automaticly pars incoming json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//set up routers
app.use("/api/inventory", inventory);
app.use("/api/user", user);

module.exports = app;

//.env:
// PORT
// JWT_SECRET
// MONGODB_URL

//to get proccess that use port
//sudo lsof -i :5000
//to terminate it:
//sudo kill -9 proccess number
