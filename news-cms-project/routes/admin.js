const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const categoryController = require("../controllers/categoryController");

const articleController = require("../controllers/articleController");
const { allComments } = require("../controllers/commentsController");
const  isLogin = require('../middleware/IsLogin');
const  isAdmin = require('../middleware/IsAdmin');

// admin login routes
router.get("/", userController.loginPage);
router.post("/index", userController.adminLogin);
router.get("/logout",isLogin, userController.logout);
router.get("/dashboard", isLogin, userController.adminDashboard);

// user
router.get("/users",isLogin,isAdmin, userController.allUsers);
router.get("/add-user", isLogin,isAdmin, userController.addUserPage);
router.post("/add-user", isLogin,isAdmin, userController.addUser);
router.get("/update-user/:id", isLogin,isAdmin, userController.updateUserPage);
router.post("/update-user/:id", isLogin,isAdmin, userController.updateUser);
router.delete("/delete-user/:id", isLogin,isAdmin, userController.deleteUser);
// caregory
router.get("/category", isLogin,isAdmin, categoryController.allCategory);
router.get("/add-category", isLogin,isAdmin, categoryController.addCategoryPage);
router.post("/add-category", isLogin,isAdmin, categoryController.addCategory);
router.get("/update-category/:id", isLogin,isAdmin, categoryController.updateCategoryPage);
router.post("/update-category/:id", isLogin,isAdmin, categoryController.updateCategory);
router.delete("/delete-category/:id", isLogin,isAdmin, categoryController.deleteCategory);

// article
router.get("/articles", isLogin, articleController.allArticles);
router.get("/add-article", isLogin, articleController.addArticlePage);
router.post("/add-article", isLogin, articleController.addArticle);
router.get("/update-article/:id", isLogin, articleController.updateArticlePage);
router.post("/update-article/:id", isLogin, articleController.updateArticle);
router.delete("/delete-article/:id", isLogin, articleController.deleteArticle);

// comment
router.get("/comments", allComments);

module.exports = router;
