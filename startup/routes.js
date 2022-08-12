const xmlparser = require("express-xml-bodyparser");
const express = require("express");
const cors = require("cors");
const users = require("../routes/users");
const products = require("../routes/product");
const businesses = require("../routes/businesses");
const feedbacks = require("../routes/feedbacks");

module.exports = function (app) {
  app.use(xmlparser());
  app.use(express.json());
  //app.use('/uploads/', express.static('uploads'))
  app.use(cors());
  app.options("*", cors());

  app.use("/api/users", users);
  app.use("/api/businesses", businesses);
  app.use("/api/products", products);
  app.use("/api/feedbacks", feedbacks);

  //app.use('/api/dealCustomers', dealCustomers)

  //app.use('/api/test', test)
};
