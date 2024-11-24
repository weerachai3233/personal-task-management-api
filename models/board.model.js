const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/config").development;
const Project = require("./project.model");
const List = require("./list.model");

class Board extends Model {}

Board.init(
  {
    board_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Project,
        key: "project_id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Board",
    tableName: "boards",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Board;
