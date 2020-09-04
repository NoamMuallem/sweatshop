const mongoose = require("mongoose");

const coloresSchema = new mongoose.Schema({
  colores: {
    type: String,
    required: true,
  },
  //amount of green colored shirtes
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

const clothesSizesSchema = new mongoose.Schema({
  colores: [coloresSchema],
  //amount of s/m/l/xl shirts - no matter what the colores are
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const clothesSchema = new mongoose.Schema({
  sizes: [clothesSizesSchema],
  //for image will user first sub and subSub category image
});

const clothes = mongoose.model("Clothes", clothesSchema);

module.exports = clothes;
