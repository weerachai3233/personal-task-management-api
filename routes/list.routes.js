const express = require("express");
const { authenticateJWT } = require("../middlewares/auth.middleware");
const ListController = require("../controllers/list.controller");

const router = express.Router();

/**
 * @swagger
 * /api/list/createList:
 *   post:
 *     tags:
 *       - List
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               board_id:
 *                 type: string
 *             required:
 *               - title
 *               - board_id
 *     responses:
 *       200: 
 *         description: "Successfully created list"
 */
router.post("/createList", authenticateJWT, ListController.createList);

/**
 * @swagger
 * /api/list/{list_id}:
 *   get:
 *     tags:
 *       - List
 *     parameters:
 *       - name: list_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200: 
 *         description: "Successfully fetched list by ID"
 */
router.get("/:list_id", authenticateJWT, ListController.getListById);

/**
 * @swagger
 * /api/list/{list_id}:
 *   put:
 *     tags:
 *       - List
 *     parameters:
 *       - name: list_id
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
 *               position:
 *                 type: integer
 *     responses:
 *       200: 
 *         description: "Successfully updated list"
 */
router.put("/:list_id", authenticateJWT, ListController.updateList);

/**
 * @swagger
 * /api/list/{list_id}:
 *   delete:
 *     tags:
 *       - List
 *     parameters:
 *       - name: list_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Successfully deleted list"
 */
router.delete("/:list_id", authenticateJWT, ListController.deleteList);

module.exports = router;
