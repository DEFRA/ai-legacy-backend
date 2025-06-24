import Boom from '@hapi/boom'
import { caseRepository } from '../../../repositories/index.js'

/**
 * @swagger
 * tags:
 *   name: Cases
 *   description: TB Case management endpoints
 */

export const caseController = {
  /**
   * @swagger
   * /api/v1/cases:
   *   get:
   *     summary: Get all TB cases
   *     tags: [Cases]
   *     parameters:
   *       - in: query
   *         name: cph
   *         schema:
   *           type: string
   *         description: Filter by CPH number
   *       - in: query
   *         name: tb_status
   *         schema:
   *           type: integer
   *         description: Filter by TB status
   *       - in: query
   *         name: result
   *         schema:
   *           type: string
   *         description: Filter by case result
   *       - in: query
   *         name: start_date
   *         schema:
   *           type: string
   *           format: date
   *         description: Filter by start date (YYYY-MM-DD)
   *       - in: query
   *         name: end_date
   *         schema:
   *           type: string
   *           format: date
   *         description: Filter by end date (YYYY-MM-DD)
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 50
   *         description: Maximum number of cases to return
   *       - in: query
   *         name: offset
   *         schema:
   *           type: integer
   *           minimum: 0
   *           default: 0
   *         description: Number of cases to skip
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
   *                 pagination:
   *                   type: object
   *                   properties:
   *                     limit:
   *                       type: integer
   *                     offset:
   *                       type: integer
   *                     total:
   *                       type: integer
   *       500:
   *         description: Internal server error
   */
  async getAll(request, h) {
    try {
      const { cph, tb_status, result, start_date, end_date, limit = 50, offset = 0 } = request.query
      
      let cases, total

      if (start_date && end_date) {
        cases = await caseRepository.findByDateRange(new Date(start_date), new Date(end_date))
        total = cases.length
        cases = cases.slice(offset, offset + parseInt(limit))
      } else {
        const filters = {}
        if (cph) filters.cph = cph
        if (tb_status) filters.tb_status = parseInt(tb_status)
        if (result) filters.result = result

        ;[cases, total] = await Promise.all([
          caseRepository.findAll({
            filters,
            limit: parseInt(limit),
            offset: parseInt(offset),
            sort: { nat_inc: 'asc' }
          }),
          caseRepository.count(filters)
        ])
      }

      return h.response({
        data: cases,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total
        }
      }).code(200)
    } catch (error) {
      request.logger.error('Error fetching cases:', error)
      throw Boom.internal('Failed to fetch cases')
    }
  },

  /**
   * @swagger
   * /api/v1/cases/{nat_inc}:
   *   get:
   *     summary: Get case by national incident number
   *     tags: [Cases]
   *     parameters:
   *       - in: path
   *         name: nat_inc
   *         required: true
   *         schema:
   *           type: string
   *         description: National incident number
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: Case not found
   *       500:
   *         description: Internal server error
   */
  async getByNatInc(request, h) {
    try {
      const { nat_inc } = request.params
      const caseRecord = await caseRepository.findByNatInc(nat_inc)

      if (!caseRecord) {
        throw Boom.notFound('Case not found')
      }

      return h.response(caseRecord).code(200)
    } catch (error) {
      if (error.isBoom) {
        throw error
      }
      request.logger.error('Error fetching case:', error)
      throw Boom.internal('Failed to fetch case')
    }
  },

  /**
   * @swagger
   * /api/v1/cases/{nat_inc}/details:
   *   get:
   *     summary: Get case with related information
   *     tags: [Cases]
   *     parameters:
   *       - in: path
   *         name: nat_inc
   *         required: true
   *         schema:
   *           type: string
   *         description: National incident number
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       404:
   *         description: Case not found
   *       500:
   *         description: Internal server error
   */
  async getWithDetails(request, h) {
    try {
      const { nat_inc } = request.params
      const caseRecord = await caseRepository.findWithDetails(nat_inc)

      if (!caseRecord) {
        throw Boom.notFound('Case not found')
      }

      return h.response(caseRecord).code(200)
    } catch (error) {
      if (error.isBoom) {
        throw error
      }
      request.logger.error('Error fetching case details:', error)
      throw Boom.internal('Failed to fetch case details')
    }
  },

  /**
   * @swagger
   * /api/v1/cases/drf-pending:
   *   get:
   *     summary: Get cases requiring DRF completion
   *     tags: [Cases]
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *       500:
   *         description: Internal server error
   */
  async getDrfPending(request, h) {
    try {
      const cases = await caseRepository.findDrfPending()
      return h.response(cases).code(200)
    } catch (error) {
      request.logger.error('Error fetching DRF pending cases:', error)
      throw Boom.internal('Failed to fetch DRF pending cases')
    }
  },

  /**
   * @swagger
   * /api/v1/cases/dashboard-stats:
   *   get:
   *     summary: Get dashboard statistics
   *     tags: [Cases]
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 totalCases:
   *                   type: integer
   *                 reactorCases:
   *                   type: integer
   *                 clearCases:
   *                   type: integer
   *                 pendingDrf:
   *                   type: integer
   *                 lateDrf:
   *                   type: integer
   *       500:
   *         description: Internal server error
   */
  async getDashboardStats(request, h) {
    try {
      const stats = await caseRepository.getDashboardStats()
      return h.response(stats).code(200)
    } catch (error) {
      request.logger.error('Error fetching dashboard stats:', error)
      throw Boom.internal('Failed to fetch dashboard stats')
    }
  }
}
