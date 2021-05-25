const db = require("../models/index.js");
const User = db.user;
const Role = db.role
const Transaction = db.transaction;

const createTransaction = async (req, res) => {
    const date = new Date(req.body.date);
    console.log(date.toString());
    let transaction = new Transaction({
        date: date,
        transaction: req.body.transaction,
        owner: req.userId,
        account: req.body.account,
        category: req.body.category,
        tag: req.body.tag
    });
    await User.findById(transaction.owner, (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            res.status(404).send({ message: "User not found" });
        }
        let accountIndex = -1;
        let categoryIndex = -1;
        for (let i = 0; i < user.accounts.length; i++) {

            if (user.accounts[i].name === transaction.account) {
                accountIndex = i;
                break;
            }
        }
        for (let i = 0; i < user.categories.length; i++) {
            if (user.categories[i].name === transaction.category) {
                categoryIndex = i;
                break;
            }
        }
        if (accountIndex == -1) {
            res.status(404).send({ message: "Such account does not exist" });
            return;
        }
        if (categoryIndex == -1) {
            res.status(404).send({ message: "Such category does not exist" });
            return;
        }
        user.accounts[accountIndex].balance -= transaction.transaction;
        user.categories[categoryIndex].balance += transaction.transaction;
        user.save().then(result => {
            transaction.save().then(result => {
                res.status(200).send({ message: "Transaction was saved successfully " });
            })
            .catch(err => {
                res.status(500).send({ message: err });
            })
        })
        .catch(err => {
            res.status(500).send({ message: err });
        })

    })
}

const deleteTransaction = (req, res) => {
    Transaction.findByIdAndDelete(req.body.id, (err, transaction) => {
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

const changeTransaction = async (req, res) => {
    let changedTransaction = {
        date: req.body.date,
        transaction: req.body.transaction,
        account: req.body.account,
        category: req.body.category,
        tag: req.body.tag
    }
    
    let accountIndex = -1;
    let categoryIndex = -1;

    let prevAccountIndex = -1;
    let prevCategoryIndex = -1;

    
    await User.findById(req.userId, async (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            res.status(404).send({ message: "User not found" });
        }
        for (let i = 0; i < user.accounts.length; i++) {
            
            if (user.accounts[i].name === changedTransaction.account) {
                accountIndex = i;
                break;
            }
        }
        for (let i = 0; i < user.categories.length; i++) {
            if (user.categories[i].name === changedTransaction.category) {
                categoryIndex = i;
                break;
            }
        }
        if (accountIndex == -1) {
            res.status(404).send({ message: "Such account does not exist" });
            return;
        }
        if (categoryIndex == -1) {
            res.status(404).send({ message: "Such category does not exist" });
            return;
        }
        user.accounts[accountIndex].balance -= changedTransaction.transaction;
        user.categories[categoryIndex].balance -= changedTransaction.transaction;

        const transactionId = req.params.id;
        await Transaction.findByIdAndUpdate(transactionId, changedTransaction, {useFindAndModify : false}, (err, transaction) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!transaction) {
                res.status(404).send({ message: "Transaction not found" });
                return;
            }
            for (let i = 0; i < user.accounts.length; i++) {
                if (user.accounts[i].name === transaction.account) {
                    prevAccountIndex = i;
                    break;
                }
            }
            for (let i = 0; i < user.categories.length; i++) {
                if (user.categories[i].name === transaction.category) {
                    prevCategoryIndex = i;
                    break;
                }
            }
            user.accounts[prevAccountIndex].balance += transaction.transaction;
            user.categories[prevCategoryIndex].balance += transaction.transaction;
    
            user.save().then(result => {
                return res.status(200).send({ message: "Transaction was changed successfully" });
            }).catch(err => {
                return res.status(500).send({ message: err });
            })
    })
    })

}
const getAllTransactions = (req, res) => {
    const ctg = req.query.category;
    const acc = req.query.account;
    const count = req.query.count ? Number.parseInt(req.query.count) : 100;
    const from = req.query.from;
    const to = req.query.to
    let condition = {};
    condition.owner = req.userId;
    if (ctg) {
        condition.category = ctg;
    }
    if (acc) {
        condition.account = acc;
    }
    condition.date = {};
    if (from) {
        condition.date = {
            $gte: new Date(from)
        };
    }
    if (to) {
        Object.assign(condition.date, { $lte: new Date(to) });
    }
    if (Object.keys(condition.date).length == 0) {
        delete condition.date;
    }
    Transaction.find(
        condition,
        {
            owner: 0,
            __v: 0
        }   
    ).sort({ date: 1 }).limit(count).exec((err, transactions) => {
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
    changeTransaction,
    getAllTransactions
}