import Boom from '@hapi/boom'
import { mongoClient } from '../../../../common/database/mongo.js'
import { MongoHoldingRepository } from '../../../../data/mongo/repositories/holding.js'
import { HoldingService } from '../services/holding.js'
import { createHoldingSchema, getHoldingSchema } from '../schemas/holding.js'

/**
 * Handler for POST /api/v1/holdings
 * Create a new holding
 *
 * @param {import('@hapi/hapi').Request} request - Hapi request object
 * @param {import('@hapi/hapi').ResponseToolkit} h - Hapi response toolkit
 * @returns {import('@hapi/hapi').ResponseObject} Response object
 */
async function createHolding (request, h) {
  try {
    const repo = new MongoHoldingRepository(mongoClient)
    const service = new HoldingService(repo)

    const holding = await service.createHolding(request.payload.details)

    return h.response({
      message: 'Holding created successfully',
      data: { holding }
    }).code(201)
  } catch (error) {
    // Handle domain-specific errors
    if (error.name === 'DuplicateCphError') {
      return h.response({
        error: 'Conflict',
        message: error.message,
        statusCode: error.statusCode
      }).code(error.statusCode)
    }

    request.logger.error('Error creating holding:', error)
    throw Boom.internal(`Failed to create holding: ${error.message}`)
  }
}

/**
 * Handler for GET /api/v1/holdings/{cph}
 * Get a holding by CPH
 *
 * @param {import('@hapi/hapi').Request} request - Hapi request object
 * @param {import('@hapi/hapi').ResponseToolkit} h - Hapi response toolkit
 * @returns {import('@hapi/hapi').ResponseObject} Response object
 */
async function getHolding (request, h) {
  try {
    const repo = new MongoHoldingRepository(mongoClient)
    const service = new HoldingService(repo)

    const holding = await service.getHoldingByCph(request.params.cph)

    if (!holding) {
      return h.response({
        error: 'Not Found',
        message: 'Holding not found',
        statusCode: 404
      }).code(404)
    }

    return h.response({
      message: 'Holding retrieved successfully',
      data: { holding }
    }).code(200)
  } catch (error) {
    request.logger.error('Error retrieving holding:', error)
    throw Boom.internal(`Failed to retrieve holding: ${error.message}`)
  }
}

const holdingRoutes = [
  {
    method: 'POST',
    path: '/api/v1/holdings',
    handler: createHolding,
    options: {
      description: 'Create a new holding',
      notes: 'Creates a new holding with validation',
      tags: ['api', 'holdings'],
      validate: {
        payload: createHoldingSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/holdings/{cph}',
    handler: getHolding,
    options: {
      description: 'Get holding by CPH',
      notes: 'Retrieves holding details using its CPH (County Parish Holding) number',
      tags: ['api', 'holdings'],
      validate: {
        params: getHoldingSchema
      }
    }
  }
]

export { holdingRoutes }
