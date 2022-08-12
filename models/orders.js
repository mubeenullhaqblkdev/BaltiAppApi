var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
  products: [
    {
      type: mongoose.Schema({
        product_id: { type: mongoose.Schema.Types.ObjectId },
        product_name: { type: String },
        business_name: { type: String },
        qty: { type: Number },
        price: { type: Number },
      }),
    },
  ],
  time_of_order: Date,
  payable_amount: Number,
  delievery_time: String,
  delievery_location: String,
  status: {
    type: String,
    default: "In Process",
  },
});
var Order = mongoose.model("Order", orderSchema);

module.exports.Order = Order;
