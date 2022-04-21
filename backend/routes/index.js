const express = require("express");
const router = express.Router();

router.use("/anime", require("./anime"));
router.use("/personal", require("./personal"));

module.exports = router;
