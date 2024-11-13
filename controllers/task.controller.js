const Task = require("../models/task.model");
const List = require("../models/list.model");

// Create a new task within a list
const createTask = async (req, res) => {
  const { list_id, title, description, position } = req.body;

  try {
    const list = await List.findByPk(list_id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const newTask = await Task.create({
      list_id,
      title,
      description,
      position,
    });
    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  const { task_id } = req.params;

  try {
    const task = await Task.findByPk(task_id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a task's details, list, and position within a list
const updateTask = async (req, res) => {
  const { task_id } = req.params;
  const { title, description, list_id, position } = req.body;

  try {
    const task = await Task.findByPk(task_id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (list_id) {
      const newList = await List.findByPk(list_id);
      if (!newList) {
        return res.status(404).json({ error: "New list not found" });
      }
      task.list_id = list_id;
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.position = position !== undefined ? position : task.position;
    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { task_id } = req.params;

  try {
    const task = await Task.findByPk(task_id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
