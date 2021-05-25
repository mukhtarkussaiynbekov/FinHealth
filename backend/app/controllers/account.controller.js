const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const { createField, deleteField, changeField } = require("../services/field.operations.js");

const createAccount = (req, res) => {
    createField(req, res, "account");
}

const deleteAccount = (req, res) => {
    deleteField(req, res, "account");
}

const changeAccount = (req, res) => {
    changeField(req, res, "account");
}
module.exports = {
    createAccount,
    deleteAccount,
    changeAccount
};