const Clothes = require("../models/clothes");
const Tamplate = require("../models/tamplets");
const express = require("express");
const router = new express.Router();
const multer = require("multer");
const upload = multer({
  //dest: "avatars" - if not set, will pass the data throw so we can use it in the rout itself and save it to user
  limits: {
    //restricting the upload size
    fileSize: 1000000, //in byts
  },
  fileFilter(req, file, cb) {
    //es6 function, gets the request, the file and cd, a callback function for when we done
    if (!file.originalname.match(/\.(png)$/)) {
      //using with regular expretions- the '\' is for escaping the '.','$' is to specify that thar are no characters after this regular expration
      return cb(new Error("please upload an image"));
    }
    cb(undefined, true); //valid upload
  },
});

//////////////////private routes
/**
route: api/inventory/tamplats
methos: post
access: private
desc: add new tamplate
*/
//TODO:make private routs
router.post("/tamplats", upload.any(), async (req, res, next) => {
  const data = JSON.parse(req.body.data);

  try {
    let tamplate = new Tamplate({
      ...data,
      imageBuffer: req.body.image,
    });
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
