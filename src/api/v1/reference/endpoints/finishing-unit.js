import Boom from '@hapi/boom'

import { mongoClient } from '../../../../common/database/mongo.js'
import { FinishingUnitService } from '../services/finishing-unit.js'
import { MongoFinishingUnitRepository } from '../../../../data/mongo/repositories/finishing-unit.js'

/**
 * Handler for GET /api/v1/reference/finishing-unit
 * Get all finishing unit options with optional region filtering
 *
 * @param {import('@hapi/hapi').Request} request - Hapi request object
 * @param {import('@hapi/hapi').ResponseToolkit} h - Hapi response toolkit
 * @returns {import('@hapi/hapi').ResponseObject} Response with finishing unit data
 */
async function getFinishingUnits (request, h) {
  try {
    const repository = new MongoFinishingUnitRepository(mongoClient)
    const finishingUnitService = new FinishingUnitService(repository)

    const finishingUnits = await finishingUnitService.getOptions(
      request.query.region
    )

    return h
      .response({
        data: finishingUnits,
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching finishing units:', error)

    throw Boom.internal(`Failed to fetch finishing units: ${error.message}`)
  }
}

/**
 * Finishing unit endpoint routes
 */
const finishingUnitRoutes = [
  {
    method: 'GET',
    path: '/api/v1/reference/finishing-unit',
    handler: getFinishingUnits,
    options: {
      description: 'Get all finishing unit options',
      tags: ['api', 'reference', 'finishing-unit'],
    },
  },
]

export { finishingUnitRoutes }
