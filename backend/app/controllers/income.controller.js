const db = require("../models/index.js");
const User = db.user;
const Role = db.role;
const { createField, deleteField, changeField } = require("../services/field.operations.js");
const createIncome = (req, res) => {
    createField(req, res, "income");
}

const deleteIncome = (req, res) => {
    deleteField(req, res, "income");
}

const changeIncome = (req, res) => {
    changeField(req, res, "income");
}

module.exports = {
    createIncome,
    deleteIncome,
    changeIncome
};