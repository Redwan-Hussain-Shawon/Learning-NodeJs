import express from "express";

import { body, validationResult } from "express-validator";
const app = express();

import upload from "./multerConfig.js"; 


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extendede: true }));

const validationRegistration = [
  body("name")
    .notEmpty()
    .withMessage("Name is Required")
    .isLength({ min: 3 })
    .withMessage("Name at least 3 chracters long"),
  body("email").isEmail().withMessage("Please provide a valid email id"),
  body("password")
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be between 5 to 10 chracter"),
  body("age").isNumeric().withMessage("Age Must be a numeric"),
];

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/save-form", validationRegistration, (req, res) => {
  const error = validationResult(req);
  res.render("form", { errors: error.array() });
});

app.get("/file-form", (req, res) => {
  res.render("file-form");
});

app.post("/file-form-submit", upload.single("userfile"), (req, res) => {
 if (!req.file) {
   return res.status(400).send("File not uploaded");
 }
  res.send(req.file)

});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).send(`Multer error: ${error.message}`);
  } else if (error) {
    return res.status(500).send(`Something went wrong: ${error.message}`);
  }

  next();
});


app.listen(3000, () => {
  console.log(`Server started on port`);
});
