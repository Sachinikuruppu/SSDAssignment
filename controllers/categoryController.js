const Category = require("../models/categoryModel");
const Products = require("../models/productModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const categoryController = {
  async getCategories(req, res, next) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return next(err);
    }
  },

  async createCategory(req, res, next) {
    const { name } = req.body;
    try {
      if (!name) {
        return next(CustomErrorHandler.badRequest("Please add a Category."));
      }

      // Create a new category with user-controlled data
      const newCategory = new Category({
        name,
      });

      // Save the new category to the database
      await newCategory.save();

      res.json({
        message: "Created a category.",
      });
    } catch (error) {
      return next(error);
    }
  },

  async deleteCategory(req, res, next) {
    try {
      const products = await Products.findOne({ category: req.params.id });

      if (products)
        return res.status(400).json({
          message: "Please delete all products with a relationship.",
        });

      // Use parameterized query to delete the category
      await Category.findByIdAndDelete(req.params.id);

      res.json({
        message: "Deleted a category",
      });
    } catch (err) {
      return next(err);
    }
  },

  async updateCategory(req, res, next) {
    try {
      const { name } = req.body;

      // Use parameterized query to update the category
      await Category.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { name },
        { new: true }
      );

      res.json({
        message: "Updated a category.",
      });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = categoryController;
