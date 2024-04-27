/**
* @swagger
* tags:
*   name: Booking
*   description: API endpoints for managing bookings
*/

/**
 * @swagger
 * /bookings:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all bookings
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Returns all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   description: Number of bookings
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /hotels/{hid}/bookings:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add Booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         description: ID of the Hotel
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room:
 *                 type: ObjectId
 *                 description: ID of the Room
 *                 example: 6603cbea2b3f77cfa0065461
 *               bookingDate:
 *                 type: Date
 *                 example: 2020-05-08T00:00:00.000Z
 *               bookingEnd:
 *                 type: Date
 *                 example: 2020-05-10T00:00:00.000Z
 *     responses:
 *       200:
 *         description: Successfully added a booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Already booked 3 bookings
 *       404:
 *         description: Hotel or Room not found
 *       500:
 *         description: Internal server error
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all bookings of a hotel
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         description: ID of the Hotel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   description: Number of bookings
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /bookings/{bid}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a booking by ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the booking with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Booking'
 *
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               BookingDate:
 *                 type: Date
 *                 example: 2020-05-08T00:00:00.000Z
 *               BookingEnd:
 *                 type: Date
 *                 example: 2020-05-10T00:00:00.000Z
 *     responses:
 *       200:
 *         description: Successfully updated the booking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       401:
 *         description: User is not authorized to update this booking
 *       404:
 *         description: No booking with the id
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a booking
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: bid
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the booking
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
 *         description: User is not authorized to delete this booking
 *       404:
 *         description: No booking with the id
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: ObjectId
 *           format: 12-byte BSON type hexadecimal
 *           description: The auto-generated id of the Hotel
 *           example: 5eb5a37f4f5c6f1b431b5c07
 *         bookingDate:
 *           type: Date
 *           description: Check-in date
 *           example: 2020-05-08T00:00:00.000Z
 *         bookingEnd::
 *           type: Date
 *           description: Check-out date
 *           example: 2020-05-10T00:00:00.000Z
 *         user:
 *           $ref: '#/components/schemas/User'
 *         hotel:
 *           $ref: '#/components/schemas/Hotel'
 *         room:
 *           $ref: '#/components/schemas/Room'
 *         rating:
 *           type: Number
 *           description: Rating of the Booking
 *           example: 4
 */