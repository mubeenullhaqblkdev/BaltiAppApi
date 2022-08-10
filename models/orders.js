var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
  _id: String,
  UserId: [
    {
      type: mongoose.Schema({
        amount: { type: Number },
        dateTime: { type: String },
        status: { type: String, default: "Pending" },
        createdby: { type: String },
        products: [
          {
            type: mongoose.Schema({
              id: String,
              title: String,
              quantity: Number,
              price: Number,
              createdby: { type: String },
            }),
          },
        ],
      }),
    },
  ],
});
var Order = mongoose.model("Order", orderSchema);

module.exports.Order = Order;
