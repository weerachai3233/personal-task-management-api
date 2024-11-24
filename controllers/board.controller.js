const Board = require("../models/board.model");
const List = require("../models/list.model");
const Project = require("../models/project.model");
const Task = require("../models/task.model");
const { development } = require("../configs/config");
const UUID = require("../utils/uuid.util");
const dayjs = require("dayjs");

const createBoard = async (req, res) => {
  try {
    const { project_id, title } = req.body;
    const userId = req.user.user_id;

    const projectList = await Project.findAll({
      where: {
        user_id: userId,
        project_id: project_id,
      },
    });
    if (projectList.length === 0) {
      return res.status(401).json({
        message: "project_id is not found.",
      });
    }

    const board = await Board.create({
      user_id: userId,
      board_id: UUID.generateUUID(),
      project_id,
      title,
    });

    res.status(201).json({ message: "Board created successfully", board });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const getBoardList = async (req, res) => {
  try {
    const { project_id } = req.query;
    if (!project_id) {
      return res.status(401).json({
        message: "project_id is required.",
      });
    }
    const boards = await Board.findAll({
      where: {
        project_id: project_id,
      },
    });
    res.status(201).json({ message: "Success.", boards });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getBoard = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "Board ID is required.",
      });
    }

    let sql = `
SELECT
	board.*,
	(
	SELECT
		jsonb_agg (
			jsonb_build_object (
				'list_id',
				list.list_id,
				'title',
				list.title,
				'position',
				list.POSITION,
				'tasks',
				(
				SELECT
					jsonb_agg ( jsonb_build_object ( 'task_id', task.task_id, 'title', task.title, 'description', task.description ) ) 
				FROM
					tasks task 
				WHERE
					task.list_id = list.list_id 
				) 
			) 
		) 
	FROM
		lists list 
	WHERE
		list.board_id = board.board_id 
	) AS lists 
FROM
	boards board 
WHERE
	board.board_id = '${id}'
    `;

    const [result] = await development.query(sql);

    if (result.length > 0) {
      res.status(200).json({
        message: "Success.",
        data: result[0],
      });
    } else {
      return res.status(404).json({
        message: "Board not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error.",
      error: error.message,
    });
  }
};
const updateBoard = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;

    const board = await Board.findOne({ where: { board_id: id } });
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

    // Prepare queries
    const deleteTask = `
      DELETE FROM tasks
      WHERE list_id IN (
        SELECT lists.list_id
        FROM boards
        LEFT JOIN lists ON boards.board_id = lists.board_id
        WHERE boards.board_id = ?
      );
    `;

    const deleteList = `
      DELETE FROM lists
      WHERE board_id = ?;
    `;

    let listList = (obj.lists || []).map((item, index) =>
      `('${item.list_id}', '${id}', '${item.title}', ${index}, '${currentDate}', '${currentDate}')`
    );

    const insertList = listList.length > 0
      ? `
      INSERT INTO lists
      (list_id, board_id, title, position, created_at, updated_at)
      VALUES
      ${listList.join(", ")};
      `
      : "";

    let taskList = [];
    for (let list of obj?.lists || []) {
      for (let task of list?.tasks || []) {
        taskList.push(
          `('${task.task_id}', '${list.list_id}', '${task.title}', '${task.description}', 0, '${currentDate}', '${currentDate}', '${currentDate}')`
        );
      }
    }

    const insertTask = taskList.length > 0
      ? `
      INSERT INTO tasks
      (task_id, list_id, title, description, position, due_date, created_at, updated_at)
      VALUES
      ${taskList.join(", ")};
      `
      : "";

    // Transaction handling
    await development.transaction(async (transaction) => {
      // Pass the transaction object to `query` method
      await development.query(deleteTask, {
        replacements: [id],
        transaction,
      });

      await development.query(deleteList, {
        replacements: [id],
        transaction,
      });

      if (listList.length > 0) {
        await development.query(insertList, { transaction });
      }

      if (taskList.length > 0) {
        await development.query(insertTask, { transaction });
      }
    });

    res.status(201).json({ message: "Board, lists, and tasks updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.stack });
  }
};


const deleteBoard = async (req, res) => {};

module.exports = {
  createBoard,
  getBoardList,
  getBoard,
  updateBoard,
  deleteBoard,
};
