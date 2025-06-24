import Boom from '@hapi/boom'
import { countyRepository } from '../../../repositories/index.js'

/**
 * @swagger
 * tags:
 *   name: Counties
 *   description: County management endpoints
 */

export const countyController = {
  /**
   * @swagger
   * /api/v1/counties:
   *   get:
   *     summary: Get all counties
   *     tags: [Counties]
   *     parameters:
   *       - in: query
   *         name: country
   *         schema:
   *           type: string
   *         description: Filter by country
   *       - in: query
   *         name: region
   *         schema:
   *           type: string
   *         description: Filter by region
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 50
   *         description: Maximum number of counties to return
   *       - in: query
   *         name: offset
   *         schema:
   *           type: integer
   *           minimum: 0
   *           default: 0
   *         description: Number of counties to skip
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
   *                     $ref: '#/components/schemas/County'
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
      const { country, region, limit = 50, offset = 0 } = request.query
      
      const filters = {}
      if (country) filters.country = country
      if (region) filters.region = region

      const [counties, total] = await Promise.all([
        countyRepository.findAll({
          filters,
          limit: parseInt(limit),
          offset: parseInt(offset),
          sort: { county: 'asc' }
        }),
        countyRepository.count(filters)
      ])

      return h.response({
        data: counties,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total
        }
      }).code(200)
    } catch (error) {
      request.logger.error('Error fetching counties:', error)
      throw Boom.internal(`Failed to fetch counties: ${error.message}`)
    }
  },

  /**
   * @swagger
   * /api/v1/counties/{id}:
   *   get:
   *     summary: Get county by ID
   *     tags: [Counties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: County ID
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/County'
   *       404:
   *         description: County not found
   *       500:
   *         description: Internal server error
   */
  async getById(request, h) {
    try {
      const { id } = request.params
      const county = await countyRepository.findById(id)

      if (!county) {
        throw Boom.notFound('County not found')
      }

      return h.response(county).code(200)
    } catch (error) {
      if (error.isBoom) {
        throw error
      }
      request.logger.error('Error fetching county:', error)
      throw Boom.internal('Failed to fetch county')
    }
  },

  /**
   * @swagger
   * /api/v1/counties/{id}/with-office:
   *   get:
   *     summary: Get county with office details
   *     tags: [Counties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: County ID
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/County'
   *                 - type: object
   *                   properties:
   *                     office_email:
   *                       type: string
   *                     office_telephone:
   *                       type: string
   *                     office_address1:
   *                       type: string
   *                     office_address2:
   *                       type: string
   *                     office_postcode:
   *                       type: string
   *       404:
   *         description: County not found
   *       500:
   *         description: Internal server error
   */
  async getWithOffice(request, h) {
    try {
      const { id } = request.params
      const county = await countyRepository.findWithOffice(id)

      if (!county) {
        throw Boom.notFound('County not found')
      }

      return h.response(county).code(200)
    } catch (error) {
      if (error.isBoom) {
        throw error
      }
      request.logger.error('Error fetching county with office:', error)
      throw Boom.internal('Failed to fetch county with office details')
    }
  },

  /**
   * @swagger
   * /api/v1/counties:
   *   post:
   *     summary: Create a new county
   *     tags: [Counties]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CountyInput'
   *     responses:
   *       201:
   *         description: County created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/County'
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Internal server error
   */
  async create(request, h) {
    try {
      const countyData = request.payload
      const county = await countyRepository.create(countyData)

      return h.response(county).code(201)
    } catch (error) {
      request.logger.error('Error creating county:', error)
      throw Boom.internal('Failed to create county')
    }
  },

  /**
   * @swagger
   * /api/v1/counties/{id}:
   *   put:
   *     summary: Update county by ID
   *     tags: [Counties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: County ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CountyInput'
   *     responses:
   *       200:
   *         description: County updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/County'
   *       404:
   *         description: County not found
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Internal server error
   */
  async update(request, h) {
    try {
      const { id } = request.params
      const updateData = request.payload

      const county = await countyRepository.update(id, updateData)

      if (!county) {
        throw Boom.notFound('County not found')
      }

      return h.response(county).code(200)
    } catch (error) {
      if (error.isBoom) {
        throw error
      }
      request.logger.error('Error updating county:', error)
      throw Boom.internal('Failed to update county')
    }
  },

  /**
   * @swagger
   * /api/v1/counties/{id}:
   *   delete:
   *     summary: Delete county by ID
   *     tags: [Counties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: County ID
   *     responses:
   *       204:
   *         description: County deleted successfully
   *       404:
   *         description: County not found
   *       500:
   *         description: Internal server error
   */
  async delete(request, h) {
    try {
      const { id } = request.params
      const deleted = await countyRepository.delete(id)

      if (!deleted) {
        throw Boom.notFound('County not found')
      }

      return h.response().code(204)
    } catch (error) {
      if (error.isBoom) {
        throw error
      }
      request.logger.error('Error deleting county:', error)
      throw Boom.internal('Failed to delete county')
    }
  }
}
