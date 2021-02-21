const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        first: String,
        last: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
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

