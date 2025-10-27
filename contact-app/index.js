import express from "express";
import ContactRouters from "./routes/contacts.route.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const router = express.Router(); 

import Contact from "./models/contact.models.js";
import connectDB from "./config/databases.js";

const PORT = process.env.PORT;

connectDB();



app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(ContactRouters);


const myMiddleware = (req, res, next) => {
  console.log('api call')
  next()
};


router.get("/home", myMiddleware, (req, res) => {
  res.send("hello");
});


router.get("/about", (req, res) => {
  res.send("another");
});

app.use('/', router)

app.use((req, res) => {
  res.send('<h2>Page not found</h2>');
})


app.listen(PORT, () => {
  console.log("server work in " + PORT);
});
