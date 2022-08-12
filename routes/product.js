const express = require("express");
const { Product, validate } = require("../models/product");
let router = express.Router();

//Create Product
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product(req.body);
    await product.save();

    return res.send(product);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//get products
router.get("/", async (req, res) => {
  let products = await Product.find();

  return res.send(products);
});

//Get a product By ID
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).send("Product Not Found.");
    return res.status(200).send(product);
  } catch (e) {
    return res.status(500).send({ errorMessage: e.reason.message });
  }
});

//Update a product By ID
router.put("/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(product);
  } catch (e) {
    res.status(500).send({ errorMessage: "Internal Server Error" });
  }
});

//Delete a product by ID
router.delete("/:id", async (req, res) => {
  let products = await Product.findByIdAndDelete(req.params.id);
  console.log(products, req.params.id);
  return res.status(200).send(products);
});

module.exports = router;
