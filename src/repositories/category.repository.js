const Category = require('../models/category').Category;

exports.getAll = async () => {
    return await Category.find({});
}

exports.getById = async (id) => {
    return await Category.findById(id)
}

exports.create = async (category) => {
    let newCategory = new Category(category)
    return await newCategory.save();
}

exports.update = async (category) => {
    let newCategory = new Category(category)
    return await newCategory.save();
}

exports.getQtd = async() => {
    return await Category.count({});
}