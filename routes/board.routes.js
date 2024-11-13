const express = require("express");
const { authenticateJWT } = require("../middlewares/auth.middleware");
const BoardController = require("../controllers/board.controller");

const router = express.Router();

/**
 * @swagger
 * /api/board/createBoard:
 *   post:
 *     tags:
 *       - Board
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               project_id:
 *                 type: string
 *             required:
 *               - title
 *               - project_id
 *
 *     responses:
 *       200: { description: "Successful" }
 */
router.post("/createBoard", authenticateJWT, BoardController.createBoard);

/**
 * @swagger
 * /api/board/projectBoards:
 *   get:
 *     tags:
 *       - Board
 *     parameters:
 *       - name: project_id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200: { description: "Successful" }
 */
router.get("/projectBoards", authenticateJWT, BoardController.getProjectBoards);

/**
 * @swagger
 * /api/board/${board_id}:
 *   get:
 *     tags:
 *       - Board
 *     parameters:
 *       - name: board_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200: { description: "Successful" }
 */
router.get("/:board_id", authenticateJWT, BoardController.getBoardById);

/**
 * @swagger
 * /api/board/${board_id}:
 *   put:
 *     tags:
 *       - Board
 *     parameters:
 *       - name: board_id
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
 *     responses:
 *       200: { description: "Successful" }
 */
router.put("/:board_id", authenticateJWT, BoardController.updateBoard);

/**
 * @swagger
 * /api/board/{board_id}:
 *   delete:
 *     tags:
 *       - Project
 *     parameters:
 *       - name: board_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful
 */
router.delete("/:board_id", authenticateJWT, BoardController.deleteBoard);

module.exports = router;
