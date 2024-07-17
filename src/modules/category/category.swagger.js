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
 *                  -   svgIcon
 *                  -   icon
 *              properties:
 *                  title:
 *                      type: string
 *                  svgIcon:
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
 *                  -   svgIcon
 *              properties:
 *                  id:
 *                      type: string
 *                  title:
 *                      type: string
 *                  svgIcon:
 *                      type: string
 */


/**
 * @swagger
 * /api/category/create-category:
 *  post:
 *      summary: Create a new blog post
 *      tags:
 *          - Category
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: The title of the blog post
 *                          file:
 *                              type: string
 *                              format: binary
 *                              description: The file image for the blog post (must be a valid image file)
 *      responses:
 *          201:
 *              description: Blog created successfully
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