import Boom from '@hapi/boom'
import { cphRepository } from '../../../repositories/index.js'

/**
 * @swagger
 * tags:
 *   name: CPH
 *   description: County Parish Holding management endpoints
 */

export const cphController = {
  /**
   * @swagger
   * /api/v1/cph:
   *   get:
   *     summary: Get all CPH records
   *     tags: [CPH]
   *     parameters:
   *       - in: query
   *         name: county
   *         schema:
   *           type: string
   *         description: Filter by county
   *       - in: query
   *         name: postcode
   *         schema:
   *           type: string
   *         description: Filter by postcode prefix
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Search in name and description
   *       - in: query
   *         name: pgp_study
   *         schema:
   *           type: boolean
   *         description: Filter by PGP study participation
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 50
   *         description: Maximum number of records to return
   *       - in: query
   *         name: offset
   *         schema:
   *           type: integer
   *           minimum: 0
   *           default: 0
   *         description: Number of records to skip
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
   *                     $ref: '#/components/schemas/CPH'
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
      const { county, postcode, search, pgp_study, limit = 50, offset = 0 } = request.query

      let cphRecords, total

      if (search) {
        cphRecords = await cphRepository.search(search)
        total = cphRecords.length
        cphRecords = cphRecords.slice(offset, offset + parseInt(limit))
      } else if (postcode) {
        cphRecords = await cphRepository.findByPostcodeArea(postcode)
        total = cphRecords.length
        cphRecords = cphRecords.slice(offset, offset + parseInt(limit))
      } else {
        const filters = {}
        if (county) filters.county = county
        if (pgp_study !== undefined) filters.pgp_study = pgp_study === 'true'
        ;[cphRecords, total] = await Promise.all([
          cphRepository.findAll({
            filters,
            limit: parseInt(limit),
            offset: parseInt(offset),
            sort: { cph_name: 'asc' }
          }),
          cphRepository.count(filters)
        ])
      }

      return h
        .response({
          data: cphRecords,
          pagination: {
            limit: parseInt(limit),
            offset: parseInt(offset),
            total
          }
        })
        .code(200)
    } catch (error) {
      request.logger.error('Error fetching CPH records:', error)
      throw Boom.internal('Failed to fetch CPH records')
    }
  },

  /**
   * @swagger
   * /api/v1/cph/{cph}:
   *   get:
   *     summary: Get CPH by CPH number
   *     tags: [CPH]
   *     parameters:
   *       - in: path
   *         name: cph
   *         required: true
   *         schema:
   *           type: string
   *         description: CPH number
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CPH'
   *       404:
   *         description: CPH not found
   *       500:
   *         description: Internal server error
   */
  async getByCph(request, h) {
    try {
      const { cph } = request.params
      const cphRecord = await cphRepository.findByCph(cph)

      if (!cphRecord) {
        throw Boom.notFound('CPH not found')
      }

      return h.response(cphRecord).code(200)
    } catch (error) {
      if (error.isBoom) {
        throw error
      }
      request.logger.error('Error fetching CPH:', error)
      throw Boom.internal('Failed to fetch CPH')
    }
  },

  /**
   * @swagger
   * /api/v1/cph/{cph}/with-location:
   *   get:
   *     summary: Get CPH with location coordinates
   *     tags: [CPH]
   *     parameters:
   *       - in: path
   *         name: cph
   *         required: true
   *         schema:
   *           type: string
   *         description: CPH number
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               allOf:
   *                 - $ref: '#/components/schemas/CPH'
   *                 - type: object
   *                   properties:
   *                     location:
   *                       type: object
   *                       properties:
   *                         easting:
   *                           type: string
   *                         northing:
   *                           type: string
   *                         map_ref:
   *                           type: string
   *       404:
   *         description: CPH not found
   *       500:
   *         description: Internal server error
   */
  async getWithLocation(request, h) {
    try {
      const { cph } = request.params
      const cphRecord = await cphRepository.findWithLocation(cph)

      if (!cphRecord) {
        throw Boom.notFound('CPH not found')
      }

      return h.response(cphRecord).code(200)
    } catch (error) {
      if (error.isBoom) {
        throw error
      }
      request.logger.error('Error fetching CPH with location:', error)
      throw Boom.internal('Failed to fetch CPH with location')
    }
  },

  /**
   * @swagger
   * /api/v1/cph/pgp-study:
   *   get:
   *     summary: Get CPHs participating in PGP study
   *     tags: [CPH]
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/CPH'
   *       500:
   *         description: Internal server error
   */
  async getPgpStudyParticipants(request, h) {
    try {
      const cphRecords = await cphRepository.findPgpStudyParticipants()
      return h.response(cphRecords).code(200)
    } catch (error) {
      request.logger.error('Error fetching PGP study participants:', error)
      throw Boom.internal('Failed to fetch PGP study participants')
    }
  },

  /**
   * @swagger
   * /api/v1/cph:
   *   post:
   *     summary: Create a new CPH record
   *     tags: [CPH]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CPHInput'
   *     responses:
   *       201:
   *         description: CPH created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CPH'
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Internal server error
   */
  async create(request, h) {
    try {
      const cphData = request.payload
      const cphRecord = await cphRepository.create(cphData)

      return h.response(cphRecord).code(201)
    } catch (error) {
      request.logger.error('Error creating CPH:', error)
      throw Boom.internal('Failed to create CPH')
    }
  },

  /**
   * @swagger
   * /api/v1/cph/{cph}:
   *   put:
   *     summary: Update CPH by CPH number
   *     tags: [CPH]
   *     parameters:
   *       - in: path
   *         name: cph
   *         required: true
   *         schema:
   *           type: string
   *         description: CPH number
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CPHInput'
   *     responses:
   *       200:
   *         description: CPH updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CPH'
   *       404:
   *         description: CPH not found
   *       400:
   *         description: Invalid input
   *       500:
   *         description: Internal server error
   */
  async update(request, h) {
    try {
      const { cph } = request.params
      const updateData = request.payload

      // First check if CPH exists
      const existingCph = await cphRepository.findByCph(cph)
      if (!existingCph) {
        throw Boom.notFound('CPH not found')
      }

      // Update using the primary key
      const updatedCph = await cphRepository.update(existingCph.id, updateData)

      return h.response(updatedCph).code(200)
    } catch (error) {
      if (error.isBoom) {
        throw error
      }
      request.logger.error('Error updating CPH:', error)
      throw Boom.internal('Failed to update CPH')
    }
  },

  /**
   * @swagger
   * /api/v1/cph/{cph}:
   *   delete:
   *     summary: Delete CPH by CPH number
   *     tags: [CPH]
   *     parameters:
   *       - in: path
   *         name: cph
   *         required: true
   *         schema:
   *           type: string
   *         description: CPH number
   *     responses:
   *       204:
   *         description: CPH deleted successfully
   *       404:
   *         description: CPH not found
   *       500:
   *         description: Internal server error
   */
  async delete(request, h) {
    try {
      const { cph } = request.params

      // First check if CPH exists
      const existingCph = await cphRepository.findByCph(cph)
      if (!existingCph) {
        throw Boom.notFound('CPH not found')
      }

      // Delete using the primary key
      await cphRepository.delete(existingCph.id)

      return h.response().code(204)
    } catch (error) {
      if (error.isBoom) {
        throw error
      }
      request.logger.error('Error deleting CPH:', error)
      throw Boom.internal('Failed to delete CPH')
    }
  }
}
