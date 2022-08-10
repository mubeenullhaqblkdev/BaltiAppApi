const express = require("express");
const { Businesses } = require("../models/business");
const _ = require("lodash");
let router = express.Router();

//Create Business
router.post("/", async (req, res) => {
  let Business = new Businesses(req.body);
  await Business.save();
  return res.send(Business);
});

//Get All businesses
router.get("/", async (req, res) => {
  let businesses = await Businesses.find();

  return res.send(businesses);
});

//Get a business by ID
router.get("/:id", async (req, res) => {
  try {
    let Business = await Businesses.findById(req.params.id);

    return res.send(Business);
  } catch (e) {
    return res.send({ errormessage: "No Business found" });
  }
});

//Update a business by ID
router.put("/:id", async (req, res) => {
  try{
    let Business = await Businesses.findOneAndUpdate(req.params.id, req.body, {new: true});
    return res.status(200).send(Business);
  }catch(e) {
    return res.send({ errormessage: "no record found" });
  }

});

//Delete a business by ID
router.delete("/:id", async (req, res) => {
try{
  let Business = await Businesses.findByIdAndDelete(req.params.id);

  return res.status(200).send(Business);
}catch(e) {
  return res.send({ errormessage: "no record found" });
}
});

module.exports = router;
