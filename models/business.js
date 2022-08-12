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
  location: String,
  locationDesc: String,
  description: String,
  image: String,
  overallRating: {
    type: Number,
    default: 0,
  },
  delivery_charges: Number,
});

var Business = mongoose.model("Business", BusinessSchema);

function validate(user) {
  const schema = {
    name: joi.string().min(2).max(50).required(),
    type: joi.string(),
    location: joi.string().min(5).max(255),
    locationDesc: joi.string(),
    description: joi.string(),
    email: joi.string().min(5).max(255).required().email(),
    //picture
  };
  return joi.validate(user, schema);
}

module.exports.Businesses = Business;
module.exports.validate = validate;
