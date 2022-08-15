var mongoose = require("mongoose");
const joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

var BusinessSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: String,
  type: String,
  latitude: Number,
  longitude: Number,
  locationDesc: String,
  ntn: String,
  description: String,
  image: String,
  overallRating: {
    type: Number,
    default: 0,
  },
  delivery_charges: Number,
  phone_number: String,
});

var Business = mongoose.model("Business", BusinessSchema);

function validate(business) {
  const schema = {
    user: joi.string().required(),
    name: joi.string().min(2).max(50).required(),
    type: joi.string(),
    latitude: joi.number(),
    longitude: joi.number(),
    locationDesc: joi.string(),
    ntn: joi.string(),
    description: joi.string(),
    image: joi.string(),
    // email: joi.string().min(5).max(255).required().email(),
    overallRating: joi.number(),
    phone_number: joi.string(),
  };
  return joi.validate(business, schema);
}

module.exports.Businesses = Business;
module.exports.validate = validate;
