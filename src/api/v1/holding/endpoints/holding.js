import { mongoClient } from '../../../../common/database/mongo.js'
import { MongoHoldingRepository } from '../../../../data/mongo/repositories/holding.js'
import { HoldingService } from '../services/holding.js'
import { createHoldingSchema } from '../schemas/holding.js'
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

    return h.response({
      message: 'Holding created successfully',
      data: {
        holding
      }
    }).code(201)
  } catch (error) {
    // Handle domain-specific duplicate CPH error
    if (error instanceof DuplicateCPHError) {
      return h.response({
        error: 'Conflict',
        message: error.message,
        statusCode: error.statusCode
      }).code(error.statusCode)
    }

    // Re-throw other errors to be handled by global error handler
    throw error
  }
}

const holdingRoutes = [
  {
    method: 'POST',
    path: '/api/v1/holding',
    handler: createHolding,
    options: {
      description: 'Create a new holding',
      notes: 'Creates a new holding with address, geolocation, and contact information',
      tags: ['api', 'holding'],
      validate: {
        payload: createHoldingSchema
      }
    }
  }
]

export {
  holdingRoutes
}
