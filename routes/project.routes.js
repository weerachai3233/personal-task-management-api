const express = require("express");
const { authenticateJWT } = require("../middlewares/auth.middleware");
const ProjectController = require("../controllers/project.controller");

const router = express.Router();

/**
 * @swagger
 * /api/project:
 *   post:
 *     tags:
 *       - Project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: project_name1
 *               description:
 *                 type: string
 *                 example: description on project name
 *             required:
 *               - user_id
 *               - title
 *               - description
 *     responses:
 *       200: { description: "Successful" }
 */
router.post("/", authenticateJWT, ProjectController.createProject);
/**
 * @swagger
 * /api/project:
 *   get:
 *     tags:
 *       - Project
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/", authenticateJWT, ProjectController.getProjectList);

/**
 * @swagger
 * /api/project/{project_id}:
 *   get:
 *     tags:
 *       - Project
 *     parameters:
 *       - name: project_id
 *         in: path
 *         required: true
 *         description: The ID of the project to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/:project_id", authenticateJWT, ProjectController.getProject);

/**
 * @swagger
 * /api/project/{project_id}:
 *   put:
 *     tags:
 *       - Project
 *     parameters:
 *       - name: project_id
 *         in: path
 *         required: true
 *         description: The ID of the project to retrieve
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
 *                 example: project_title
 *               description:
 *                 type: string
 *                 example: project_description
 *     responses:
 *       200:
 *         description: Successful
 */
router.put("/:project_id", authenticateJWT, ProjectController.updateProject);
/**
 * @swagger
 * /api/project/{project_id}:
 *   delete:
 *     tags:
 *       - Project
 *     parameters:
 *       - name: project_id
 *         in: path
 *         required: true
 *         description: The ID of the project to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful
 */
router.delete("/:project_id", authenticateJWT, ProjectController.deleteProject);

module.exports = router;
