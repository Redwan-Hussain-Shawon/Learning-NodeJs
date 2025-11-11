const express = require('express');
const router = express.Router();

const siteController = require("../controllers/siteController");

router.get("/", siteController.index);
router.get("/category/:name", siteController.articleByCategories);
router.get("/single/:id", siteController.singleArticle);
router.get("/search", siteController.search);
router.get("/auther/:name", siteController.auther);
router.post("/single/:id", siteController.addComent);

module.exports = router;