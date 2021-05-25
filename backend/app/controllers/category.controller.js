const db = require("../models/index.js");
const User = db.user;
const Role = db.role;
const { createField, deleteField, changeField } = require("../services/field.operations.js");

const createCategory = (req, res) => {
    createField(req, res, "category");
}

const deleteCategory = (req, res) => {
    deleteField(req, res, "category");
}

const changeCategory = (req, res) => {
    changeField(req, res, "category");
}

module.exports = {
    createCategory,
    deleteCategory,
    changeCategory
};