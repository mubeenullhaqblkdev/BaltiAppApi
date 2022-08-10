const joi = require('joi');
const config = require('config')
const jwt = require('jsonwebtoken')
var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  name: String,
  number: String,
  password: String,
  location: String,
  email: String,
  Uid: String,
  
 
  Address: String,
  role: {
    type: String,
    default: "user",
  },
});
userSchema.methods.generateAuthToken = function () {

  const token = jwt.sign({ _id: this.id, name: this.name, role: this.role, email: this.email }, config.get('jwtPrivateKey'))
  //console.log(process.env.baltiApp_jwtPrivateKey);
  return token
}

function validate(user) {
  const schema = {
      name: joi.string().min(2).max(50).required(),
      number: joi.string(),
      password: joi.string().min(5).max(255).required(),
      location: joi.string(),
      email: joi.string().min(5).max(255).required().email(),
      //picture
  }
  return joi.validate(user, schema);
}

var User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.validate = validate;
