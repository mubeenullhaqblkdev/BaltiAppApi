const express = require("express");
const { Order } = require("../models/orders");

let router = express.Router();

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

router.get("/", async (req, res) => {
  try {
    let findorder = await Order.find();
    if (findorder.length < 1) {
      return res.status(402).send("error");
    }
    return res.send(findorder);
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
router.delete("/:id", async (req, res) => {
  let ordersdelete = await Order.findOneAndDelete({
    "UserId._id": req.params.id,
  });

  return res.send({ message: "succesfully deleted" });
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
