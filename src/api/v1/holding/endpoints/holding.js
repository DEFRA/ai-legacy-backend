import Boom from '@hapi/boom'
import { mongoClient } from '../../../../common/database/mongo.js'
import { MongoHoldingRepository } from '../../../../data/mongo/repositories/holding.js'
import { HoldingService } from '../services/holding.js'
import {
  createHoldingSchema,
  getHoldingByCphSchema,
} from '../schemas/holding.js'
import { DuplicateCPHError } from '../../../../common/errors/DuplicateCPHError.js'

/**
 * Handler for POST /api/v1/holding
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

    return h
      .response({
        message: 'Holding created successfully',
        data: {
          holding,
        },
      })
      .code(201)
  } catch (error) {
    // Handle domain-specific duplicate CPH error
    if (error instanceof DuplicateCPHError) {
      return h
        .response({
          error: 'Conflict',
          message: error.message,
          statusCode: error.statusCode,
        })
        .code(error.statusCode)
    }

    // Re-throw other errors to be handled by global error handler
    throw error
  }
}

/**
 * Handler for GET /api/v1/holding/{cph}
 * Get a holding by CPH
 *
 * @param {import('@hapi/hapi').Request} request - Hapi request object
 * @param {import('@hapi/hapi').ResponseToolkit} h - Hapi response toolkit
 * @returns {import('@hapi/hapi').ResponseObject} Response object
 */
async function getHoldingByCph (request, h) {
  try {
    const repo = new MongoHoldingRepository(mongoClient)
    const service = new HoldingService(repo)

    const holding = await service.getHoldingByCph(request.params.cph)

    if (!holding) {
      return h
        .response({
          error: 'Not Found',
          message: `Holding with CPH ${request.params.cph} not found`,
          statusCode: 404,
        })
        .code(404)
    }

    return h
      .response({
        message: 'Holding retrieved successfully',
        data: {
          holding,
        },
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error retrieving holding by CPH:', error)

    throw Boom.internal(
      `Failed to retrieve holding with CPH ${request.params.cph}: ${error.message}`
    )
  }
}

const holdingRoutes = [
  {
    method: 'POST',
    path: '/api/v1/holding',
    handler: createHolding,
    options: {
      description: 'Create a new holding',
      notes:
        'Creates a new holding with address, geolocation, and contact information',
      tags: ['api', 'holding'],
      validate: {
        payload: createHoldingSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/api/v1/holding/{cph}',
    handler: getHoldingByCph,
    options: {
      description: 'Get a holding by CPH',
      notes: "Retrieves a holding's details using its CPH",
      tags: ['api', 'holding'],
      validate: {
        params: getHoldingByCphSchema,
      },
    },
  },
]

export { holdingRoutes }
