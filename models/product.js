const joi = require('joi');
var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  business_id:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  name: String,
  price: Number,
  rating: {
    type: Number,
    default: null

  }
  //image:
});

var Product = mongoose.model("Product", productSchema);

function validate(user) {
  const schema = {
    business_id: joi.string().min(2).max(50).required(),
    name: joi.string().required(),
    price: joi.number().required(),
    rating: joi.number(),
    //picture
  }
  return joi.validate(user, schema);
}

module.exports.Product = Product;
module.exports.productSchema = productSchema;
module.exports.validate = validate