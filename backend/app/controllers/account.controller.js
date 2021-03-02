const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const { createField, deleteField } = require("../services/field.operations.js");

const createAccount = (req, res) => {
    createField(req, res, "accounts");
}

const deleteAccount = (req, res) => {
    deleteField(req, res, "accounts");
}

module.exports = {
    createAccount,
    deleteAccount
};