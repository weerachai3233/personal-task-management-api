const express = require("express");
const { authenticateJWT } = require("../middlewares/auth.middleware");
const BoardController = require("../controllers/board.controller");

const router = express.Router();

/**
 * @swagger
 * /api/board:
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
router.post("/", authenticateJWT, BoardController.createBoard);

router.get("/:id", authenticateJWT, BoardController.getBoard);
router.get("/", authenticateJWT, BoardController.getBoardList);
router.post("/", authenticateJWT, BoardController.createBoard);
router.delete("/", authenticateJWT, BoardController.createBoard);

module.exports = router;
