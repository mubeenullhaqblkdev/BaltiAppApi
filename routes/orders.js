const express = require("express");
const { Order } = require("../models/orders");
const { Product } = require("../models/product");
const { Businesses } = require("../models/business");

let router = express.Router();

//Create Order
router.post("/", async (req, res) => {
  try {
    const products = req.body.products;
    var orderTotal = 0;
    var totalShipment = 0;
    for (let i = 0; i < products.length; i++) {
      //
      let product = await Product.findById(products[i].product_id);
      orderTotal += product.price * products[i].qty;
      products[i].price = product.price;
      //
      let business = await Businesses.findById(product.business_id);
      totalShipment += business.delivery_charges;
      products[i].business_name = business.name;
    }
    let order = new Order({
      products: products,
      time_of_order: Date.now(),
      payable_amount: orderTotal + totalShipment,
      // delievery_time: String,
      //delievery_location: String,
    });
    order = await order.save();
    return res.status(200).send({
      message: "Order created Successfully",
      Order: order,
    });
    console.log("a");
  } catch (e) {
    return res.status(500).send(e);
  }
});

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
//Delete Order by ID
router.delete("/:id", async (req, res) => {
  let ordersdelete = await Order.findByIdAndRemove(req.params.id);
  if (!ordersdelete)
    return res.status(404).send("The user with given id was not found...");
  res.send(ordersdelete);
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
