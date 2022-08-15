const joi = require("joi");
var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  name: String,
  price: Number,
  rating: {
    type: Number,
    default: null,
  },
  description: String,
  images: [String],
  videos: [String],
});

var Product = mongoose.model("Product", productSchema);

function validate(user) {
  const schema = {
    business_id: joi.string().required(),
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string(),
    rating: joi.number(),
    images: joi.array().items(joi.string()),
    videos: joi.array().items(joi.string()),
  };
  return joi.validate(user, schema);
}

module.exports.Product = Product;
module.exports.productSchema = productSchema;
module.exports.validate = validate;
