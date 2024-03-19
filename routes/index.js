const express = require('express')
const router = express();
const userRoutes = require('./user.js')//Ce fichier n’existe pas encore.
const woodRoutes = require('./wood.js')

router.use("/auth", userRoutes)
router.use("/woods", woodRoutes)

module.exports = router