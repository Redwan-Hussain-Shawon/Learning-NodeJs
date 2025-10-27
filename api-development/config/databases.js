const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()
const connectDb = () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Connected to MongoDb"))
      .catch((error) => console.log(error));
    
}

module.exports = connectDb
