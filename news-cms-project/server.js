const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())
app.use(expressLayouts);
app.set('layout', 'layout')
app.set('view engine', 'ejs'); 

// MongoDB Connection
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("MongoDB connection error:", err);
    }
}
connect();

// Routes
app.use('/', require('./routes/frontend'));

app.use('/admin', (req, res, next) => { 
  res.locals.layout = 'admin/layout';
  next();
})

app.use("/admin", require("./routes/admin"));


app.get('/', (req, res) => {
    res.render('index');;
});

app.get("/category", (req, res) => {
  res.render("category");
});

app.get("/search", (req, res) => {
  res.render("search");
});
app.get("/single", (req, res) => {
  res.render("single");
});


app.get("/admin/articles/index", (req, res) => {
  res.render("admin/articles/index", { layout: "admin/layout" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

  