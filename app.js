const express = require('express')
const app = express()
const router = require("./app/routes/index.js");


const db = require("./app/models/index.js");
app.use(express.json());
db.sequelize
.authenticate()
.then(() => console.log("Database connected ..."))
.catch((err) => console.log(err));


//Ajout des routes
app.use("/api", router);
module.exports = app;