const { DataTypes } = require("sequelize");
const sequelize = require("../middlewares/database");
const Project = require("./project");

const Issue = sequelize.define(
  "issues",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "open",
    },
  },
  {}
);

Project.hasMany(Issue);
Issue.belongsTo(Project);

module.exports = Issue;
