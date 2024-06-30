/**
 * @swagger
 * tags:
 *  name: Blog
 *  description: Blog Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   categoryId
 *                  -   text
 *                  -   tags
 *                  -   readingDuration
 *                  -   icon
 *              properties:
 *                  title:
 *                      type: string
 *                  readingDuration:
 *                      type: number
 *                  categoryId:
 *                      type: string
 *                  text:
 *                      type: string
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: string
 *          AddComment:
 *              type: object
 *              required:
 *                  -   blogId
 *                  -   comment
 *                  -   icon
 *              properties:
 *                  blogId:
 *                      type: string
 *                  comment:
 *                      type: string
 */

/**
 * @swagger
 * /api/blog/create-blog:
 *  post:
 *      summary: create new blog
 *      tags:
 *          -   Blog
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateBlog'
 *      responses:
 *          201: 
 *              description: created
 */
/**
 * @swagger
 * /api/blog/add-comment:
 *  post:
 *      summary: add comment on blog
 *      tags:
 *          -   Blog
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AddComment'
 *      responses:
 *          201: 
 *              description: created a comment
 */
/**
 * @swagger
 * /api/blog/get-all-blogs:
 *  get:
 *      summary: get all blogs
 *      tags:
 *          -   Blog
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /api/blog/delete-blog:
 *  delete:
 *      summary: delete blog
 *      tags:
 *          -   Blog
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: id
 *      responses:
 *          200: 
 *              description: successfully
 */