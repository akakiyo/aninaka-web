const express = require("express");
const { QueryTypes } = require("sequelize");
const sequelize = require("../sequelize");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    res.json("hello");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.json("hello");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
