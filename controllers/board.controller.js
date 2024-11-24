const Board = require("../models/board.model");
const List = require("../models/list.model");
const Project = require("../models/project.model");
const Task = require("../models/task.model");
const { development } = require("../configs/config");

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
	board.board_id = ${id}
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

const updateBoard = async (erq, res) => {};
const deleteBoard = async (req, res) => {};

module.exports = {
  createBoard,
  getBoardList,
  getBoard,
  updateBoard,
  deleteBoard,
};
