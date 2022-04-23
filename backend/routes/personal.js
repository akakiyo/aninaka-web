const express = require("express");
const { QueryTypes } = require("sequelize");
const sequelize = require("../sequelize");

const router = express.Router();
const { user_infos, personal_anime_infos } = require("../models/models.js");

router.post("/", async (req, res, next) => {
  try {
    //新規登録の処理
    await sequelize.transaction(async (trn) => {
      console.log(req.body);
      const { user_id, name, mail_address } = req.body;
      await sequelize.sync();
      await user_infos.create(
        {
          user_id,
          name,
          mail_address,
        },
        {
          transaction: trn,
        }
      );
    });
    res.end();
  } catch (err) {
    next(err);
  }
});

router.post("/add-anime", async (req, res, next) => {
  try {
    sequelize.transaction(async (trn) => {
      const { userId, title, storyNum, subTitle, starRating, viewingApp } =
        req.body;
      await sequelize.sync();
      await personal_anime_infos.create(
        {
          user_id: userId,
          title,
          sub_title: subTitle,
          story_number: storyNum,
          rating: starRating,
          viewingApp,
          date: new Date(),
        },
        {
          transaction: trn,
        }
      );
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    //個人ページを返す
    const { userId } = req.query;
    console.log(userId);
    const userName = (
      await sequelize.query(
        `SELECT name FROM user_infos WHERE user_id = '${userId}'`,
        {
          type: QueryTypes.SELECT,
        }
      )
    )[0]["name"];
    const animeList = await sequelize.query(
      `SELECT * FROM personal_anime_infos WHERE user_id = '${userId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log(animeList);
    console.log(userName);
    res.json({ animeList, userName });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
