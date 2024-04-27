/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API endpoints for managing notifications
 */

/**
 * @swagger
 * /notifications:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Returns all notifications
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
 *                     $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Internal server error

 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: update
 *               title:
 *                 type: string
 *                 example: test API swaggers
 *               message:
 *                 type: string
 *                 example: this is for test notifaication from API swaggers
 *               user:
 *                 type: string
 *                 example: 661e44faaa7264ce57d320c9
 *               bookingId:
 *                 type: string
 *                 example: 662a188f6474419fd6be846d
 *     responses:
 *       200:
 *         description: Successfully created a new notification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error

 * /notifications/{nid}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: nid
 *         required: true
 *         description: ID of the notification
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the notification
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
 *       401:
 *         description: User Not authorized to delete notification
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error

 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: ID of the notification
 *           example: "662a18d1df30fc676376e1ca"
 *         type:
 *           type: string
 *           description: Type of the notification (update or delete)
 *           example: update
 *         title:
 *           type: string
 *           description: Title of the notification
 *           example: test1
 *         message:
 *           type: string
 *           description: Message of the notification
 *           example: this is for test notifaication
 *         user:
 *           type: ObjectId
 *           description: ID of the user
 *           example: "661e44faaa7264ce57d320c9"
 *         bookingId:
 *           type: ObjectId
 *           description: ID of the booking
 *           example: "662a188f6474419fd6be846d"
 *         createdAt:
 *           type: date
 *           description: Creation date of the notification
 *           example: "2024-04-24T09:00:00.000Z"
 *       required:
 *         - type
 *         - title
 *         - message
 *         - user
 */
