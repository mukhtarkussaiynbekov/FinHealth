const db = require("../models/index.js");
const User = db.user;
const Role = db.role
const Transaction = db.transaction;

const createTransaction = (req, res) => {
    let transaction = new Transaction({
        date: req.body.date,
        transaction: req.body.transaction,
        owner: req.userId
    });

    transaction.save().then(result => {
        res.status(200).send({ message: "Transaction was saved successfully " });
    })
    .catch(err => {
        res.status(500).send({ message: err });
    })
}

const deleteTransaction = (req, res) => {
    Transaction.findOneAndDelete({
        date: req.body.date,
        transaction: req.body.transaction,
        owner: req.userId
    }, (err, transaction) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!transaction) {
            res.status(404).send({ message: "Transaction not found" });
            return;
        }
        return res.status(200).send({ message: "Transaction was deleted successfully" });
    })
}

const getAllTransactions = (req, res) => {
    Transaction.find({
        owner: req.userId
        },
        {
            owner: 0,
            _id: 0
        }   
    ).sort({ _id: 1, __v: 1 }).limit(100).exec((err, transactions) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(transactions);
    })
}

module.exports = {
    createTransaction,
    deleteTransaction,
    getAllTransactions
}