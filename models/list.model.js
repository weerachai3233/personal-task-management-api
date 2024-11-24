const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/config").development;
const Board = require("./board.model");
const Task = require("./task.model");

class List extends Model {}

List.init(
  {
    list_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    board_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Board,
        key: "board_id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
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
    modelName: "List",
    tableName: "lists",
    timestamps: false,
    underscored: true,
  }
);


module.exports = List;
