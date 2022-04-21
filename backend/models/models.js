const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const personal_infos = sequelize.define("personal_infos", {
  personal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
  personal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: personal_infoss,
      key: "personal_id",
    },
  },
  anime_title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  story_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

const friends = sequelize.define("personal_infos", {
  personal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  friend_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

module.exports = {
  personal_infos,
  personal_anime_infos,
  friends,
};
