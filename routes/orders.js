const express = require("express");
const { Order } = require("../models/orders");

let router = express.Router();

//Get All Order
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) return res.status(404).send("Not Found!");
    return res.status(200).send(orders);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//get products
router.get("/:id/:check?", async (req, res) => {
  try {
    if (req.params.check == "true") {
      let findorder = await Order.find({ "UserId.createdby": req.params.id });
      if (findorder.length < 1) {
        return res.status(402).send("error");
      }
      return res.send(findorder);
    }

    let orders = await Order.findById(req.params.id);
    if (!orders) {
      return res.status(400).send("error");
    }
    return res.send(orders);
  } catch (e) {
    return res.status(400).send("error");
  }
});

router.put("/:id", async (req, res) => {
  let orders = await Order.findOneAndUpdate(
    {
      "UserId._id": req.params.id,
    },
    { $set: { "UserId.$.status": req.body.status } }
  );

  return res.send(orders);
});
//postproducts
router.post("/:id", async (req, res) => {
  let findorder = await Order.findById(req.params.id);
  if (!findorder) {
    let orders = new Order();
    orders._id = req.params.id;
    orders.UserId = req.body;
    await orders.save();
    return res.send(orders);
  } else {
    findorder.UserId.push(req.body);
    await findorder.save();
    return res.send(findorder);
  }
});

module.exports = router;
