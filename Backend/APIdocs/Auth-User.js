/**
* @swagger
* /auth/login:
*   post:
*     summary: User login
*     tags:
*       - Authentication
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               email:
*                 type: string
*                 example: admin@gmail.com
*               password:
*                 type: string
*                 example: admin123
*     responses:
*       200:
*         description: Successful login
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true
*                 token:
*                   type: string
*                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTRhMmFiNmI3YmI0MGI5YmI4OGE2YSIsImlhdCI6MTcxNDIxNDU4NiwiZXhwIjoxNzE2ODA2NTg2fQ.5QiP-R1vlgkniaXoJC1gizja7Ad9fwY8lwpqc7VvBvo
*       400:
*          description: Bad request
*       401:
*         description: Unauthorized
*/

/**
* @swagger
* /auth/logout:
*   get:
*     summary: User logout
*     tags:
*       - Authentication
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description:
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
*         description: Unauthorized
*/

/**
* @swagger
* /auth/register:
*   post:
*     summary: User registration
*     tags:
*       - Authentication
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 example: John Doe
*               email:
*                 type: string
*                 example: JohnDoe@gmail.com
*               tel:
*                 type: string
*                 example: "0812345678"
*               password:
*                 type: string
*                 example: password123
*     responses:
*       201:
*         description: Successful registration
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true
*                 token:
*                   type: string
*                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTUzZDRiODFjMjdjZjQ0MWM4ZmY3NSIsImlhdCI6MTcxNDIxNDk1NiwiZXhwIjoxNzE2ODA2OTU2fQ.JWB-WGBvhJCchYHXURaa73BAGXvNIkiqwDa-Pa7tipU
*       400:
*         description: Bad request
*/

/**
* @swagger
* /auth/me:
*   get:
*     summary: Get user details
*     tags:
*       - User
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Successful request
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true
*                 data:
*                   $ref: '#/components/schemas/User'
*       404:
*         description: User not found
*       500:
*         description: Internal server error
*/

/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*   schemas:
*     User:
*       type: object
*       required:
*         - name
*         - email
*         - tel
*         - role
*       properties:
*         id:
*           type: ObjectId
*           format: 12-byte BSON type hexadecimal
*           description: The auto-generated id of the User
*           example: 65e4a2ab6b7bb40b9bb88a6a
*         name:
*           type: string
*           description: User name
*           example: John Doe
*         email:
*           type: string
*           description: User email
*           example: JohnDoe@gmail.com
*         tel:
*           type: string
*           description: User telephone number
*           example: "0812345678"
*         role:
*           type: string
*           description: User role
*           example: user
*         createdAt:
*           type: Date
*           description: User creation date
*           example: 2021-08-25T11:30:00.000Z
*         notifications:
*           type: array
*           items:
*             $ref: '#/components/schemas/Notification'
*/
