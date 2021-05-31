const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = new express();

var corsOptions = {
    options: "http://localhost:8081"
};

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Connect mongoose to MongoDB, create Role Documents */
const db = require("./app/models/index.js");
const dbConfig = require("./app/config/db.config.js");

const Role = db.role;
var uri = "mongodb+srv://batya:dSL3K1Ddr2axpoC1@cluster0.hpppx.mongodb.net/prod?retryWrites=true&w=majority";
db.mongoose
    .connect(uri || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the Database.");
        initializeRoles();
    })
    .catch(err => {
        console.log("Couldn't connect to the Database");
        console.log(err);
        process.exit();
    });

function initializeRoles() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err & count == 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("Added 'user' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("Added 'admin' to roles collection");
            })
        }
    })
}

require('./app/routes/auth.routes')(app);
require('./app/routes/transaction.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/account.routes')(app);
require('./app/routes/income.routes')(app);
require('./app/routes/misc.routes')(app);
require('./app/routes/test')(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});






