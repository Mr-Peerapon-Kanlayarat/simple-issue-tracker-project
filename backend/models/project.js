const { DataTypes } = require("sequelize");
const sequelize = require("../middlewares/database");
const User = require("./user");

const Project = sequelize.define(
  "projects",
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
  },
  {}
);

User.hasMany(Project);
Project.belongsTo(User);

module.exports = Project;
