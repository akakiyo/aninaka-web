const express = require("express");
const { QueryTypes } = require("sequelize");
const sequelize = require("../sequelize");
const { user_infos, personal_anime_infos } = require("../models/models.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    //個人ページを返す
    const { userId } = req.query;
    const userName = (
      await sequelize.query(
        `SELECT name FROM user_infos WHERE user_id = '${userId}'`,
        {
          type: QueryTypes.SELECT,
        }
      )
    )[0]["name"];
    const animeList = await sequelize.query(
      `SELECT * FROM personal_anime_infos WHERE user_id = '${userId}' ORDER BY date DESC`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json({ animeList, userName });
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    await sequelize.sync();
    //ユーザの新規登録の処理
    await sequelize.transaction(async (trn) => {
      const { user_id, name, mail_address } = req.body;
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
router.delete("/", async (req, res, next) => {
  try {
    //視聴アニメの削除
    sequelize.transaction(async (trn) => {
      const { id } = req.query;
      await sequelize.query(
        `DELETE FROM personal_anime_infos WHERE id = ${id}`
      );
      res.end();
    });
  } catch (err) {
    next(err);
  }
});

router.post("/add-anime", async (req, res, next) => {
  //視聴アニメの追加
  try {
    sequelize.transaction(async (trn) => {
      const { userId, title, storyNum, subTitle, starRating, viewingApp } =
        req.body;
      await sequelize.query(
        `INSERT INTO personal_anime_infos (user_id,title,sub_title,story_number,rating,viewing_app,date) VALUES ((?),(?),(?),(?),(?),(?),(?))`,
        {
          replacements: [
            userId,
            title,
            subTitle,
            storyNum,
            starRating,
            viewingApp,
            new Date(),
          ],
          transaction: trn,
        }
      );
      res.end();
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
