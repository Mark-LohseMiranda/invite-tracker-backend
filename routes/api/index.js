const router = require("express").Router();
const gingerbreadRoutes = require("./gingerbreadRoutes");

router.use("/gingerbread", gingerbreadRoutes);

module.exports = router;