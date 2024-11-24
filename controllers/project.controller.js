const Project = require("../models/project.model");

const createProject = async (req, res) => {
  try {
    const { user_id, title, description } = req.body;

    const newProject = await Project.create({
      user_id,
      title,
      description,
    });

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getProjectList = async (req, res) => {
  try {
    const { user_id } = req.user;
    const projects = await Project.findAll({
      where: {
        user_id: user_id,
      },
    });

    if (!projects) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({  projects });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getProject = async (req, res) => {
  try {
    const projectId = req.params.project_id;
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.project_id;
    const { name: title, description } = req.body;

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.name = title || project.name;
    project.description = description || project.description;

    await project.save();

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createProject,
  getProjectList,
  getProject,
  updateProject,
  deleteProject,
};
