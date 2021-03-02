const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var db = {};

db.mongoose = mongoose;
db.role = require("./role.model.js");
db.user = require("./user.model.js");
db.transaction = require("./transaction.model.js");
db.ROLES = ['user', 'admin'];

module.exports = db;