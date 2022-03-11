const router = require("express").Router()

const homeRoutes = require("./homeRoutes")
const apiRoutes = require('./api');
const { blogrouter } = require("./api/post");

router.use("/",homeRoutes)
router.use("/api", apiRoutes);
router.use("/blog", blogrouter)

module.exports = router;