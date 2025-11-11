const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const categoryController = require("../controllers/categoryController");

const articleController = require("../controllers/articleController");
const { allComments } = require("../controllers/commentsController");

// admin login routes
router.get("/", userController.loginPage);
router.post("/index", userController.adminLogin);
router.get("/logout", userController.logout);

// user
router.get("/users", userController.allUsers);
router.get("/add-user", userController.addUserPage);
router.post("/add-user", userController.addUser);
router.get("/update-user/:id", userController.updateUserPage);
router.post("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);

// caregory
router.get("/category", categoryController.allCategory);
router.get("/add-category", categoryController.addCategoryPage);
router.post("/add-category", categoryController.addCategory    );
router.get("/update-category", categoryController.updateCategoryPage);
router.post("/update-category", categoryController.updateCategory);
router.delete("/delete-category", categoryController.deleteCategory);

// article
router.get("/articles", articleController.allArticles);
router.get("/add-article", articleController.addArticlePage);
router.post("/add-article", articleController.addArticle);
router.get("/update-article/:id", articleController.updateArticlePage);
router.post("/update-article/:id", articleController.updateArticle);
router.delete("/delete-article/:id", articleController.deleteArticle);

// comment
router.get("/comments", allComments);

module.exports = router;
