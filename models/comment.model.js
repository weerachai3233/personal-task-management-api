const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/config").development;
const Task = require("./Task");
const User = require("./User");

class Comment extends Model {}

Comment.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Task,
        key: "task_id",
      },
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Comment;
