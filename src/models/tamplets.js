const mongoose = require("mongoose");

const tampletSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

const Tamplet = mongoose.model("Tamplet", tampletSchema);

module.exports = Tamplet;
