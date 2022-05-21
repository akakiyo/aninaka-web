const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const user_infos = sequelize.define("user_infos", {
  user_id: {
    type: DataTypes.TEXT,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mail_address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const personal_anime_infos = sequelize.define("personal_anime_infos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.TEXT,
    primaryKey: true,
    // references: {
    //   model: user_infos,
    //   key: "user_id",
    // },
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sub_title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  story_number: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.DECIMAL,
  },
  viewing_app: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const friend_infos = sequelize.define("friend_infos", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    references: {
      model: user_infos,
      key: "user_id",
    },
  },
  friend_id: {
    type: DataTypes.TEXT,
    allowNull: false,
    references: {
      model: user_infos,
      key: "user_id",
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = {
  user_infos,
  personal_anime_infos,
  friend_infos,
};
