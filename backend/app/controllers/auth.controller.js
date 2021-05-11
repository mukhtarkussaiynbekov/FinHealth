const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signUp = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.status(200).send({ message: "User was registered successfully! " });
                    })
                });
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
        

    })

}

exports.signIn = (req, res) => {
User.findOne({
    email: req.body.email
})
    .populate("roles", "-__v")
    .exec((err, user) => {
    if (err) {
        res.status(500).send({ message: err });
        return;
    }

    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
        });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    var authorities = [];
    var accounts = [];
    var categories = [];
    var income = [];
    for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    for (let i = 0; i < user.accounts.length; i++) {
        accounts.push({ name: user.accounts[i].name, balance: user.accounts[i].balance });
    }
    for (let i = 0; i < user.categories.length; i++) {
        categories.push({ name: user.categories[i].name, balance: user.categories[i].balance, budget: user.categories[i].budget });
    }   
    
    for (let i = 0; i < user.income.length; i++) {
        income.push({ name: user.income[i].name, amount: user.income[i].amount });
    }
    
    res.status(200).send({
        id: user._id,
        email: user.email,
        roles: authorities,
        accounts: accounts,
        categories: categories,
        income: income,
        accessToken: token
    });
    });
};

