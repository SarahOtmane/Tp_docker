/**
 * @swagger
 * tags:
 *   name: User
 *   description: CRUD operations for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email address of the person
 *         password:
 *           type: string
 *           description: The hashed password of the person
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       403:
 *         description: Missing or invalid fields
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
