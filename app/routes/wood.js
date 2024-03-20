const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.js")

const woodCtrl = require("../controllers/wood.js");

router.get("/", auth,woodCtrl.readAll);
router.get("/hardness/:hardness",auth, woodCtrl.readAll);
module.exports = router;
