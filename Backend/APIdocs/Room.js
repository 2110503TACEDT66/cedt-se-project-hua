/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API endpoints for managing rooms
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Returns an array of all rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Room'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rooms/{rid}:
 *   get:
 *     summary: Get a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: rid
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns an array of all rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /hotels/{hid}/rooms:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add a new room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNo:
 *                 type: string
 *                 description: Room number
 *                 example: 104
 *               roomType:
 *                 type: string
 *                 description: Type of the room
 *                 example: Luxury
 *               price:
 *                 type: string
 *                 description: Price of the room
 *                 example: 5000
 *               picture:
 *                 type: string
 *                 description: Picture of the room
 *                 example: /Images/room/room-lux.jpg
 *     responses:
 *       201:
 *         description: Room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Room'
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /hotels/{hid}/rooms:
 *   get:
 *     summary: Get all rooms of a hotel
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns an array of all rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Room'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /rooms/{rid}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: rid
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNo:
 *                 type: string
 *                 example: 107
 *               price:
 *                 type: string
 *                 example: 3000
 *     responses:
 *       200:
 *         description: Room updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: rid
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - roomNo
 *         - hotel
 *       properties:
 *         id:
 *           type: ObjectId
 *           format: 12-byte BSON type hexadecimal
 *           description: ID of the room
 *           example: 60e1c9e0f9e9b9c4d8d5b2d7
 *         roomNo:
 *           type: string
 *           description: Room number
 *           example: 101
 *         hotel:
 *           $ref: '#/components/schemas/Hotel'
 *         roomType:
 *           type: string
 *           description: Type of the room
 *           example: Standard
 *         price:
 *           type: string
 *           description: Price of the room
 *           example: 1000
 *         picture:
 *           type: string
 *           description: Picture of the room
 *           example: /Images/room/room-stand.jpg
 */