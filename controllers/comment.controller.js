const Comment = require("../models/comment.model");
const Task = require("../models/task.model");

// ฟังก์ชันสำหรับสร้างคอมเมนต์ใหม่
const createComment = async (req, res) => {
  try {
    const { taskId } = req.params; // รับ taskId จาก URL
    const { content } = req.body; // รับเนื้อหาคอมเมนต์จาก body

    // ตรวจสอบว่า task ที่ระบุมีอยู่ในระบบหรือไม่
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // สร้างคอมเมนต์ใหม่ใน task
    const comment = await Comment.create({
      content,
      taskId,
    });

    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลคอมเมนต์ทั้งหมดที่เกี่ยวข้องกับ task
const getCommentsByTaskId = async (req, res) => {
  try {
    const { taskId } = req.params; // รับ taskId จาก URL

    // ค้นหาคอมเมนต์ทั้งหมดที่เชื่อมโยงกับ task
    const comments = await Comment.findAll({
      where: { taskId },
    });

    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this task" });
    }

    res.status(200).json({ comments });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ฟังก์ชันสำหรับอัพเดตคอมเมนต์
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params; // รับ commentId จาก URL
    const { content } = req.body; // รับเนื้อหาคอมเมนต์จาก body

    // ค้นหาคอมเมนต์ที่ต้องการอัพเดต
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // อัพเดตคอมเมนต์
    comment.content = content || comment.content;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ฟังก์ชันสำหรับลบคอมเมนต์
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params; // รับ commentId จาก URL

    // ค้นหาคอมเมนต์ที่ต้องการลบ
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // ลบคอมเมนต์
    await comment.destroy();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createComment,
  getCommentsByTaskId,
  updateComment,
  deleteComment,
};
