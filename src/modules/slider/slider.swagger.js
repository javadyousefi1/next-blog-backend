/**
 * @swagger
 * tags:
 *  name: Slider
 *  description: Slider Module and Routes
 */

/**
 * @swagger
 * /api/slider/add-slider:
 *  post:
 *      summary: Create a new slider post
 *      tags:
 *          - Slider
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          isActive:
 *                              type: boolean
 *                              description: the slider status
 *                          file:
 *                              type: string
 *                              format: binary
 *                              description: The file image for the slider post (must be a valid image file)
 *      responses:
 *          201:
 *              description: Slider created successfully
 */

/**
 * @swagger
 * /api/slider/get-all-slider:
 *  get:
 *      summary: get all slider
 *      tags:
 *          -   Slider
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /api/slider/delete-slider:
 *  delete:
 *      summary: delete slider
 *      tags:
 *          -   Slider
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: fileName
 *      responses:
 *          200: 
 *              description: successfully
 */
/**
 * @swagger
 * /api/slider/toggle-slider-status:
 *  patch:
 *      summary: toggle slider status
 *      tags:
 *          -   Slider
 *      parameters:
 *          -   in: query
 *              required: true
 *              name: fileName
 *      responses:
 *          200: 
 *              description: successfully
 */