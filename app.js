const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const generalRoutes = require("./routes/generalRoutes");
const app = new express();

mongoose
  .connect(
    "mongodb+srv://Bhavya_09:UsFRHsiMSTJsjuKD@cluster0.kwywqqu.mongodb.net/"
  )
  .then((result) => {
    console.log("Connected successfully");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(generalRoutes);
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Failed to connect DB");
  });
