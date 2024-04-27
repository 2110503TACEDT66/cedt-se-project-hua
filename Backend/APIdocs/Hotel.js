/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: API endpoints for managing hotels
 */

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Get all hotels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: Returns a list of all hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 count:
 *                   type: number
 *                   description: The number of hotels returned
 *                   example: 1
 *                 pagination:
 *                   type: object
 *                   description: Pagination information
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: Bad request

 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: Hotel created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     hotel:
 *                       $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: Bad request

 * /hotels/{hid}:
 *   get:
 *     summary: Get a hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the hotel with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Hotel not found
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a hotel by ID
 *     tags: [Hotels]
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
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Hotel not found

 *   delete:
 *     security:
 *       - bearerAuth: []   
 *     summary: Delete a hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: hid
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hotel deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful
 *                   example: true
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 *       404:
 *         description: Hotel not found
 */

/**
* @swagger
* components:
*   schemas:
*     Hotel:
*       type: object
*       required:
*         - name
*         - address
*         - tel
*       properties:
*         id:
*           type: ObjectId
*           format: 12-byte BSON type hexadecimal
*           description: The auto-generated id of the Hotel
*           example: 660271a0b691fa08c48bc1b4
*         name:
*           type: string
*           description: Hotel name
*           example: Happy Hotel
*         address:
*           type: string
*           description: House No., Street, Road
*           example: 121 ถ.สุขุมวิท
*         district:
*           type: string
*           description: District
*           example: บางนา
*         province:
*           type: string
*           description: Province
*           example: กรุงเทพมหานคร
*         postalcode:
*           type: string
*           description: 5-digit postal code
*           example: "10110"
*         tel:
*           type: string
*           description: Telephone number
*           example: "0921870000"
*         region:
*           type: string
*           description: Region
*           example: กรุงเทพมหานคร (Bangkok)
*         picture:
*           type: string
*           description: URL of the hotel picture
*           example: https://example.com/hotel.jpg
*/
