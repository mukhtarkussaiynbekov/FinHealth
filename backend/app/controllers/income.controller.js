const db = require("../models/index.js");
const User = db.user;
const Role = db.role;
const { createField, deleteField } = require("../services/field.operations.js");
const createIncome = (req, res) => {
    createField(req, res, "income");
}

const deleteIncome = (req, res) => {
    deleteField(req, res, "income");
}

module.exports = {
    createIncome,
    deleteIncome
};