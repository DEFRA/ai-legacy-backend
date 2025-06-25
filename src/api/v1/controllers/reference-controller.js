import Boom from '@hapi/boom'
import { db } from '../../../database/connection.js'

/**
 * @swagger
 * tags:
 *   name: Reference
 *   description: Reference data lookup endpoints
 */

export const referenceController = {
  /**
   * @swagger
   * /api/v1/reference/tb-status:
   *   get:
   *     summary: Get all TB status options
   *     tags: [Reference]
   *     responses:
   *       200:
   *         description: Successful response
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
   */
  async getTbStatus (request, h) {
    try {
      // Use DISTINCT ON to get unique TB status values based on status_abb and status
      // This eliminates the duplicate entries in the database
      const tbStatuses = await db('tb_status_t')
        .distinct(
          'status_abb',
          'status',
          'midlands',
          'north',
          'scotland',
          'south_east',
          'south_west',
          'wales'
        )
        .orderBy('status_abb')

      return h
        .response({
          data: tbStatuses
        })
        .code(200)
    } catch (error) {
      request.logger.error('Error fetching TB statuses:', error)
      throw Boom.internal(`Failed to fetch TB statuses: ${error.message}`)
    }
  }
}
