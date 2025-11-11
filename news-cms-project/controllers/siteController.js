const mongoose = require('mongoose');
const categoryModel = require('../models/Category');
const newsyModel = require("../models/News");
const userModel = require("../models/User");
const commentModel = require("../models/Comments");



const index = async (req, res) => {
    res.render('index')
};
const articleByCategories = async (req, res) => {
    res.render('category')
}
const singleArticle = async (req, res) => {
    res.render('single')
}
const search = async (req, res) => {
    res.render('search')
}
const auther = async (req, res) => {
    res.render('auther')
};
const addComent = async (req, res) => {
    // res.redirect('');
}

module.exports = {
    index,
    articleByCategories,
    singleArticle,
    search,
    auther,
    addComent
};