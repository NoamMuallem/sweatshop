const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

//creat user
router.post("/users", async (req, res) => {
  try {
    dd(req.body);
    const user = new User(req.body);
    dd("1");
    const token = await user.generateAuthToken();
    dd("1");
    await user.save();
    res.status(201).send({
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//user login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send();
  }
});

//update my user
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  if (!User.isValidUpdate(updates)) {
    //making sure a requested update filed is a valid field
    return res.status(400).send({ error: "invalid update field" });
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save(); //makeing sure we will call user.save() so we can hash a new password if needed

    res.send(user);
  } catch (e) {
    //error in validation on new user
    res.status(400).send();
  }
});

module.exports = router;
