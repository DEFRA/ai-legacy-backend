/**
 * @fileoverview API endpoint handlers for holding operations
 *
 * This module contains all HTTP request handlers for holding-related API endpoints.
 * Handlers implement the controller layer of the MVC pattern, managing request/response
 * processing, validation, error handling, and service coordination.
 *
 * Available Endpoints:
 * - POST /api/v1/holdings - Create a new holding
 * - GET /api/v1/holdings/{cph} - Retrieve holding by CPH
 *
 * All endpoints follow REST conventions and return standardized JSON responses
 * with consistent error handling using Boom for HTTP errors.
 *
 * @module api/v1/holdings/endpoints/holding
 * @requires @hapi/boom - HTTP error handling
 * @requires ../services/holding - Business logic service
 * @requires ../schemas/holding - Request validation schemas
 * @author Defra DDTS
 * @since 1.0.0
 */

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

    const holding = await service.createHolding(request.payload)

    return h.response(holding).code(201)
  } catch (error) {
    // Handle domain-specific errors
    if (error.name === 'DuplicateCphError') {
      throw Boom.conflict(`A holding with CPH '${request.payload.cph}' already exists`)
    }

    // Handle validation errors
    if (error.isJoi) {
      throw Boom.badRequest(error.details[0].message)
    }

    // For unexpected errors, log and return generic error
    request.logger.error('Error creating holding:', error)
    throw Boom.internal('An error occurred while creating the holding')
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
      throw Boom.notFound(`Holding with CPH '${request.params.cph}' not found`)
    }

    return h.response(holding).code(200)
  } catch (error) {
    // Re-throw Boom errors as-is
    if (error.isBoom) {
      throw error
    }

    request.logger.error('Error retrieving holding:', error)
    throw Boom.internal('An error occurred while retrieving the holding')
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
