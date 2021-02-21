const mongoose = require("mongoose");

const Transaction = mongoose.model(
    "Transaction",
    new mongoose.Schema({
        date: String,
        transaction: Number,
        tag: String,
        account: String,
        category: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = Transaction;