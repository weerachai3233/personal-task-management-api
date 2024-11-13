const List = require("../models/list.model");

const createList = async (req, res) => {
  const { board_id, title, position } = req.body;

  try {
    const newList = await List.create({ board_id, title, position });
    return res
      .status(201)
      .json({ message: "List created successfully", list: newList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getListById = async (req, res) => {
  const { list_id } = req.params;

  try {
    const list = await List.findByPk(list_id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateList = async (req, res) => {
  const { list_id } = req.params;
  const { title, position } = req.body;

  try {
    const list = await List.findByPk(list_id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    list.title = title || list.title;
    list.position = position !== undefined ? position : list.position;
    await list.save();

    return res.status(200).json({ message: "List updated successfully", list });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteList = async (req, res) => {
  const { list_id } = req.params;

  try {
    const list = await List.findByPk(list_id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    await list.destroy();
    return res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createList,
  getListById,
  updateList,
  deleteList,
};
