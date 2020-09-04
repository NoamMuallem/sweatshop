const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
//starting database server
require("./db/mongoose.js");
//import routes
const inventory = require("./routers/tamplates");

//app config
const app = express();

//automaticly pars incoming json
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

module.exports = app;

//.env
// PORT=
// MONGODB_URL=
