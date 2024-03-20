const express = require('express');
const router = express.Router();


const woodCtrl = require("../controllers/wood.js");

router.get("/", woodCtrl.readAll);
router.get("/:hardness", woodCtrl.readAll);
module.exports = router;
