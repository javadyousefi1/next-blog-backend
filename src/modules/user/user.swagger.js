/**
 * @swagger
 * tags:
 *  name: User
 *  description: action on auth user
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateUser:
 *              type: object
 *              required:
 *                  -   email
 *                  -   password
 *                  -   name
 *                  -   icon
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  name:
 *                      type: string
 * 
 */

/**
 * @swagger
 * /api/user/register-user:
 *  post:
 *      summary: register new user
 *      tags:
 *          -   User
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateUser'
 *      responses:
 *          201: 
 *              description: created
 */
