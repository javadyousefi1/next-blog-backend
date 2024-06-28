/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   title
 *                  -   icon
 *              properties:
 *                  title:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateCategory:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *                  -   icon
 *              properties:
 *                  id:
 *                      type: string
 *                  title:
 *                      type: string
 */

/**
 * @swagger
 * /api/category/create-category:
 *  post:
 *      summary: create new category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *      responses:
 *          201: 
 *              description: created
 */
/**
 * @swagger
 * /api/category/update-category:
 *  put:
 *      summary: update category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
 *      responses:
 *          201: 
 *              description: created
 */
/**
 * @swagger
 * /api/category/get-all-categories:
 *  get:
 *      summary: get all categories
 *      tags:
 *          -   Category
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /api/category/delete-category:
 *  delete:
 *      summary: delete catergory
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: id
 *      responses:
 *          200: 
 *              description: successfully
 */