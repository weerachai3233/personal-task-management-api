const Board = require("./Board");
const List = require("./List");
const Task = require("./Task");

Board.hasMany(List, { foreignKey: "board_id", as: "lists" });
List.belongsTo(Board, { foreignKey: "board_id", as: "board" });

List.hasMany(Task, { foreignKey: "list_id", as: "tasks" });
Task.belongsTo(List, { foreignKey: "list_id", as: "list" });

module.exports = { Board, List, Task };
