const db = require("../models/index.js");
const User = db.user;
const Role = db.role;
const { createField, deleteField } = require("../services/field.operations.js");

const createCategory = (req, res) => {
    createField(req, res, "category");
}

const deleteCategory = (req, res) => {
    deleteField(req, res, "category");
}

module.exports = {
    createCategory,
    deleteCategory
};