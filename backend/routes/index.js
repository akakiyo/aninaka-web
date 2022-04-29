const express = require("express");
const router = express.Router();

router.use("/personal", require("./personal"));
router.use("/friend", require("./friend"));

module.exports = router;
