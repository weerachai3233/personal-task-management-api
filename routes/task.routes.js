const express = require("express");
const { authenticateJWT } = require("../middlewares/auth.middleware");
const TaskController = require("../controllers/task.controller");

const router = express.Router();

/**
 * @swagger
 * /api/task/createTask:
 *   post:
 *     tags:
 *       - Task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               list_id:
 *                 type: string
 *               position:
 *                 type: integer
 *             required:
 *               - title
 *               - list_id
 *     responses:
 *       200: 
 *         description: "Successfully created task"
 */
router.post("/createTask", authenticateJWT, TaskController.createTask);

/**
 * @swagger
 * /api/task/{task_id}:
 *   get:
 *     tags:
 *       - Task
 *     parameters:
 *       - name: task_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200: 
 *         description: "Successfully fetched task by ID"
 */
router.get("/:task_id", authenticateJWT, TaskController.getTaskById);

/**
 * @swagger
 * /api/task/{task_id}:
 *   put:
 *     tags:
 *       - Task
 *     parameters:
 *       - name: task_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               list_id:
 *                 type: string
 *               position:
 *                 type: integer
 *     responses:
 *       200: 
 *         description: "Successfully updated task"
 */
router.put("/:task_id", authenticateJWT, TaskController.updateTask);

/**
 * @swagger
 * /api/task/{task_id}:
 *   delete:
 *     tags:
 *       - Task
 *     parameters:
 *       - name: task_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Successfully deleted task"
 */
router.delete("/:task_id", authenticateJWT, TaskController.deleteTask);

module.exports = router;
