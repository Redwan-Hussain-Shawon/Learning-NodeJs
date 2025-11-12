const categoryModel = require("../models/Category");

const allCategory = async (req, res) => { 
    try {
        const categories = await categoryModel.find();
        res.render("admin/category/index",{ categories }); 
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
    
};
const addCategoryPage = (req, res) => { 
    res.render('admin/category/create');
};
const addCategory = async (req, res) => {
    const { cat, description } = req.body;
    try {
        
        const newCategory =  new categoryModel({
            name: cat,
            description: description,
        })
        await newCategory.save();
        res.redirect("/admin/category");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
 };

const updateCategoryPage = async (req, res) => { 
    const categoryId = req.params.id;
    try {
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            res.status(404).send('category not found');
        }
        res.render("admin/category/edit", { category });
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
};
const updateCategory = async (req, res) => { 
    const { cat, description } = req.body;
    const categoryId = req.params.id;
    try {
        const category = await categoryModel.findById(categoryId);
        if (!category) {
            return  res.status(404).send('category not found');
        }
        category.name = cat;
        category.description = description;
        await category.save();
        res.redirect("/admin/category");
    } catch (err) {
        console.log(err);
        res.status(500).send('server error');
    }
};
const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deleteCategory = await categoryModel.findByIdAndDelete(categoryId);
        if (!deleteCategory) {
            return res
              .status(400)
              .json({ status: false, message: "Category not found" });
        }
        res.status(200).json({ status: true, message: "Category deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Server Error" });
    }
 };


module.exports = {
    allCategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
}