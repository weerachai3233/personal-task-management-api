const Board = require("../models/board.model");
const List = require("../models/list.model");
const Project = require("../models/project.model");
const Task = require("../models/task.model");

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

const getProjectBoards = async (req, res) => {
  try {
    const { project_id } = req.query;

    const boards = await Board.findAll({
      where: { project_id: project_id },
    });

    if (!boards || boards.length === 0) {
      return res.status(404).json({ message: "No boards found for this user" });
    }

    res.status(200).json({ boards });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getBoardById = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findByPk(id, {
      include: [{ model: List, include: [Task] }],
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json({ board });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { board_id } = req.params;
    const { title, description } = req.body;

    const board = await Board.findByPk(board_id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    board.title = title || board.title;

    await board.save();

    res.status(200).json({ message: "Board updated successfully", board });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const { board_id } = req.params;

    const board = await Board.findByPk(board_id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    await board.destroy();

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createBoard,
  getProjectBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};
