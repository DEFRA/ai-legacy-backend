import Boom from '@hapi/boom'
import { tbStatusRepository, testResultRepository, actionCategoryRepository } from '../../../repositories/index.js'

/**
 * @swagger
 * tags:
 *   name: Reference
 *   description: Reference data lookup endpoints for frontend dropdowns and selectors
 */

/**
 * @swagger
 * /api/v1/reference/tb-status:
 *   get:
 *     summary: Get all TB status options
 *     description: Returns all available TB status values with regional availability flags
 *     tags: [Reference]
 *     responses:
 *       200:
 *         description: Successfully retrieved TB status data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status_abb:
 *                         type: string
 *                         description: Status abbreviation
 *                         example: "FR"
 *                       status:
 *                         type: string
 *                         description: Full status description
 *                         example: "Fake Restricted"
 *                       midlands:
 *                         type: boolean
 *                         description: Available in Midlands region
 *                       north:
 *                         type: boolean
 *                         description: Available in North region
 *                       scotland:
 *                         type: boolean
 *                         description: Available in Scotland region
 *                       south_east:
 *                         type: boolean
 *                         description: Available in South East region
 *                       south_west:
 *                         type: boolean
 *                         description: Available in South West region
 *                       wales:
 *                         type: boolean
 *                         description: Available in Wales region
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch TB statuses: Database error"
 *
 * /api/v1/reference/tb-status/{region}:
 *   get:
 *     summary: Get TB status options for a specific region
 *     description: Returns TB status values available for the specified region
 *     tags: [Reference]
 *     parameters:
 *       - in: path
 *         name: region
 *         required: true
 *         schema:
 *           type: string
 *           enum: [midlands, north, scotland, south_east, south_west, wales]
 *         description: Region name for filtering TB statuses
 *         example: "midlands"
 *     responses:
 *       200:
 *         description: Successfully retrieved region-specific TB status data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status_abb:
 *                         type: string
 *                         description: Status abbreviation
 *                         example: "FR"
 *                       status:
 *                         type: string
 *                         description: Full status description
 *                         example: "Fake Restricted"
 *                       midlands:
 *                         type: boolean
 *                         description: Available in Midlands region
 *                       north:
 *                         type: boolean
 *                         description: Available in North region
 *                       scotland:
 *                         type: boolean
 *                         description: Available in Scotland region
 *                       south_east:
 *                         type: boolean
 *                         description: Available in South East region
 *                       south_west:
 *                         type: boolean
 *                         description: Available in South West region
 *                       wales:
 *                         type: boolean
 *                         description: Available in Wales region
 *                 region:
 *                   type: string
 *                   description: The region that was requested
 *                   example: "midlands"
 *       400:
 *         description: Bad request - invalid region
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: "Bad Request"
 *                 message:
 *                   type: string
 *                   example: "Invalid region: invalid_region"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch TB statuses for region: Database error"
 */

/**
 * Get TB status options with optional region filtering
 * Returns all TB status values or filtered by region if region parameter is provided
 * Eliminates duplicate entries from the database
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {Promise<object>} Response containing TB status data
 */
export async function getTbStatus(request, h) {
  try {
    const { region } = request.params

    let tbStatuses
    let responseData = {}

    if (region) {
      // Get statuses for specific region
      tbStatuses = await tbStatusRepository.getTbStatusesByRegion(region)
      responseData = {
        data: tbStatuses,
        region
      }
    } else {
      // Get all statuses
      tbStatuses = await tbStatusRepository.getAllTbStatuses()
      responseData = {
        data: tbStatuses
      }
    }

    return h.response(responseData).code(200)
  } catch (error) {
    const { region } = request.params
    const errorMessage = region ? `Error fetching TB statuses for region ${region}:` : 'Error fetching TB statuses:'

    request.logger.error(errorMessage, error)

    if (error.message.includes('Invalid region')) {
      throw Boom.badRequest(error.message)
    }

    const failureMessage = region
      ? `Failed to fetch TB statuses for region: ${error.message}`
      : `Failed to fetch TB statuses: ${error.message}`

    throw Boom.internal(failureMessage)
  }
}

/**
 * @swagger
 * /api/v1/reference/test-results:
 *   get:
 *     summary: Get all test result options
 *     description: Returns all available test result values for dropdown selectors
 *     tags: [Reference]
 *     responses:
 *       200:
 *         description: Successfully retrieved test result data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       result:
 *                         type: string
 *                         description: Test result value
 *                         example: "Negative"
 *             example:
 *               data:
 *                 - result: "Negative"
 *                 - result: "Positive"
 *                 - result: "Inconclusive"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch test results: Database error"
 */

/**
 * Get all test result options
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {Promise<object>} Response containing test result data
 */
export async function getTestResults(request, h) {
  try {
    const testResults = await testResultRepository.getAllTestResults()

    return h
      .response({
        data: testResults
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching test results:', error)
    throw Boom.internal(`Failed to fetch test results: ${error.message}`)
  }
}

/**
 * @swagger
 * /api/v1/reference/action-categories:
 *   get:
 *     summary: Get all action category options
 *     description: Returns all available action category values for dropdown selectors
 *     tags: [Reference]
 *     responses:
 *       200:
 *         description: Successfully retrieved action category data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       action_cat:
 *                         type: string
 *                         description: Action category value
 *                         example: "Reactor Removal"
 *             example:
 *               data:
 *                 - action_cat: "Reactor Removal"
 *                 - action_cat: "Case Closure"
 *                 - action_cat: "Follow Up"
 *                 - action_cat: "Investigation"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch action categories: Database error"
 */

/**
 * Get all action category options
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {Promise<object>} Response containing action category data
 */
export async function getActionCategories(request, h) {
  try {
    const actionCategories = await actionCategoryRepository.getAllActionCategories()

    return h
      .response({
        data: actionCategories
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching action categories:', error)
    throw Boom.internal(`Failed to fetch action categories: ${error.message}`)
  }
}
