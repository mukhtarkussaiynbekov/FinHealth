const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        income: [
            {
                name: String,
                amount: Number
            }
        ],
        accounts: [
            {
                name: String,
                balance: Number
            }
        ],
        categories: [
            {
                name: String,
                balance: Number,
                budget: Number
            }
        ]
    })
);

module.exports = User;

