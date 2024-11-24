const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/config").development;
const List = require("./list.model");

class Task extends Model {}

Task.init(
  {
    task_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    list_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: List,
        key: "list_id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
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
    modelName: "Task",
    tableName: "tasks",
    timestamps: false,
    underscored: true,
  }
);


module.exports = Task;
