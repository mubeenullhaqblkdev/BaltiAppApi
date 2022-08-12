const express = require("express");
const { Businesses } = require("../models/business");
const { Product } = require("../models/product");
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

//Get All businesses of a User
router.get("/list/:id", async (req, res) => {
  try{
    let businesses = await Businesses.find({user: req.params.id});
    if(businesses.length == 0) return res.status(404).send("Not Found!");
    return res.status(200).send(businesses);
  }catch(e) {
    return res.status(500).send(e);
  }
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

//Get All products of a business
router.get('/listProducts/:id', async(req, res) => {
  const products = await Product.find({business_id: req.params.id});  
  if(products.length == 0) return res.status(404).send("Not Found!");
  return res.status(200).send(products);
})
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
