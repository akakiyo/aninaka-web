const express = require("express");
const sequelize = require("../sequelize");

const router = express.Router();
const { friend_infos } = require("../models/models.js");

router.post("/", async (req, res, next) => {
  try {
    //フレンド追加処理
    await sequelize.transaction(async (trn) => {
      const { userId, addFriendId } = req.body;
      await sequelize.sync();
      await friend_infos.create(
        {
          user_id: userId,
          friend_id: addFriendId,
          date: new Date(),
        },
        {
          trn,
        }
      );
    });
  } catch (err) {
    next(err);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const { searchWord } = req.query;
    const findedUsers = (
      await sequelize.query(
        `SELECT user_id,name FROM user_infos WHERE user_id = '${searchWord}' OR name ='${searchWord}'`
      )
    )[0];
    res.json({ findedUsers });
  } catch (err) {
    next(err);
  }
});

router.get("/friend-list", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const friendIds = [];
    (
      await sequelize.query(
        `SELECT friend_id FROM friend_infos WHERE user_id = '${userId}'`
      )
    )[0].forEach((obj) => {
      friendIds.push(obj.friend_id);
    });
    const viewingList = (
      await sequelize.query(
        `SELECT * FROM personal_anime_infos,user_infos WHERE personal_anime_infos.user_id = user_infos.user_id AND user_infos.user_id IN ('${friendIds.join(
          "','"
        )}')`
      )
    )[0];
    res.json(viewingList);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
