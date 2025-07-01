import Boom from '@hapi/boom'
import Joi from 'joi'

import { mongoClient } from '../../../../common/database/mongo.js'
import { HoldingService } from '../services/holding-service.js'
import { MongoHoldingRepository } from '../../../../data/mongo/repositories/holding.js'
import { createHoldingSchema } from '../schemas/holding-schemas.js'

/**
 * Handler for POST /api/v1/holding
 * Create a new holding
 *
 * @param {Object} request - Hapi request object
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response with created holding data
 */
async function createHolding (request, h) {
  try {
    const repository = new MongoHoldingRepository(mongoClient)
    const holdingService = new HoldingService(repository)

    const holdingData = request.payload
    const createdHolding = await holdingService.createHolding(holdingData)

    return h
      .response({
        data: createdHolding.toJSON()
      })
      .code(201)
  } catch (error) {
    request.logger.error('Error creating holding:', error)

    // Handle duplicate CPH error
    if (error.code === 11000 && error.keyPattern && error.keyPattern['details.cph']) {
      throw Boom.conflict('A holding with this CPH already exists')
    }

    throw Boom.internal(`Failed to create holding: ${error.message}`)
  }
}

/**
 * Handler for GET /api/v1/holding/{id}
 * Get a holding by ID
 *
 * @param {Object} request - Hapi request object
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response with holding data
 */
async function getHoldingById (request, h) {
  try {
    const repository = new MongoHoldingRepository(mongoClient)
    const holdingService = new HoldingService(repository)

    const { id } = request.params
    const holding = await holdingService.getHoldingById(id)

    if (!holding) {
      throw Boom.notFound('Holding not found')
    }

    return h
      .response({
        data: holding.toJSON()
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching holding by ID:', error)

    if (error.isBoom) {
      throw error
    }

    throw Boom.internal(`Failed to fetch holding: ${error.message}`)
  }
}

/**
 * Handler for GET /api/v1/holding
 * Get all holdings
 *
 * @param {Object} request - Hapi request object
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response with holdings data
 */
async function getAllHoldings (request, h) {
  try {
    const repository = new MongoHoldingRepository(mongoClient)
    const holdingService = new HoldingService(repository)

    const holdings = await holdingService.getAllHoldings()

    return h
      .response({
        data: holdings.map(holding => holding.toSummary())
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching holdings:', error)

    throw Boom.internal(`Failed to fetch holdings: ${error.message}`)
  }
}

/**
 * Holding endpoint routes
 */
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
        payload: createHoldingSchema,
        failAction(request, h, error) {
            return h.response(error.message).code(400).takeover()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/holding/{id}',
    handler: getHoldingById,
    options: {
      description: 'Get holding by ID',
      notes: 'Retrieve a specific holding by its MongoDB ObjectId',
      tags: ['api', 'holding']
    }
  },
  {
    method: 'GET',
    path: '/api/v1/holding',
    handler: getAllHoldings,
    options: {
      description: 'Get all holdings',
      notes: 'Retrieve a summary list of all holdings',
      tags: ['api', 'holding']
    }
  }
]

export { holdingRoutes }
