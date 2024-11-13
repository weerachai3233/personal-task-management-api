const express = require("express");
const { authenticateJWT } = require("../middlewares/auth.middleware");
const UserController = require("../controllers/user.controller");

const router = express.Router();

/**
 * @swagger
 * 
 * /api/user/register:
 *   post:
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: username
 *               email:
 *                 type: string
 *                 example: email@gmail.com
 *               password:
 *                 type: string
 *                 example: password
 *             required:
 *               - username
 *               - password
 *               - password
 *     responses:
 *       200: { description: "Successful" }
 */
router.post("/register", UserController.register);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: email@gmail.com
 *               password:
 *                 type: string
 *                 example: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200: { description: "Successful" }
 */
router.post("/login", UserController.login);
/**
 *
 * @swagger
 * /api/user/profile:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200: { description: "Successful" }
 *
 */
router.get("/profile", authenticateJWT, UserController.getProfile);

/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               avatar_url:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200: { description: "Successful" }
 */
router.put("/profile", authenticateJWT, UserController.updateProfile);

/**
 * @swagger
 * /api/user/account:
 *   delete:
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200: { description: "Successful" }
 */
router.delete("/account", authenticateJWT, UserController.deleteAccount);

module.exports = router;
