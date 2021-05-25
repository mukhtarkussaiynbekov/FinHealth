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
                amount: Number,
                iconName: String
            }
        ],
        accounts: [
            {
                name: String,
                balance: Number,
                iconName: String
            }
        ],
        categories: [
            {
                name: String,
                balance: Number,
                budget: Number,
                iconName: String
            }
        ]
    })
);

module.exports = User;

