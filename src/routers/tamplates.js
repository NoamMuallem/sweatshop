const Clothes = require("../models/clothes");
const Tamplate = require("../models/tamplets");
const express = require("express");
const router = new express.Router();

//////////////////private routes
/**
route: api/inventory/tamplats
methos: post
access: private
desc: add new tamplate
*/
//TODO:make private routs
router.post("/tamplats", async (req, res) => {
  try {
    let tamplate = new Tamplate({ ...req.body });
    tamplate = await tamplate.save();
    res.status(201).send(tamplate);
  } catch (e) {
    res.status(400).send(e);
  }
});

/////////////////public routes

/**
route: api/inventory/tamplats
methos: get
access: public
desc: get all available tamplates
*/

router.get("/tamplats", async (req, res) => {
  try {
    let tamplates = await Tamplate.find();
    res.send(tamplates);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
