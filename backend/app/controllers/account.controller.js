const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const { createField, deleteField, changeField } = require("../services/field.operations.js");

const createAccount = (req, res) => {
    createField(req, res, "accounts");
}

const deleteAccount = (req, res) => {
    deleteField(req, res, "accounts");
}

const changeAccount = (req, res) => {
    changeField(req, res, "accounts");
}
module.exports = {
    createAccount,
    deleteAccount,
    changeAccount
};