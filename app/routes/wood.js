const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.js");
const multer = require('../middleware/multer.js')

const woodCtrl = require("../controllers/wood.js");

router.get("/", auth,woodCtrl.readAll);
router.get("/hardness/:hardness",auth, woodCtrl.readAll);
router.post("/",auth, multer,woodCtrl.createWood);
router.put("/:id", auth,multer, woodCtrl.updateWood);

module.exports = router;
