import Boom from '@hapi/boom'

import { mongoClient } from '../../../../common/database/mongo.js'
import { AllocationBookingMethodService } from '../services/allocation-booking-method.js'
import { AllocationSkipReasonsService } from '../services/allocation-skip-reasons.js'
import { MongoAllocationBookingMethodRepository } from '../../../../data/mongo/repositories/allocation-booking-method.js'
import { MongoAllocationSkipReasonsRepository } from '../../../../data/mongo/repositories/allocation-skip-reasons.js'

/**
 * Handler for GET /api/v1/reference/allocation-booking-method
 * Get all allocation booking method options
 *
 * @param {import('@hapi/hapi').Request} request - Hapi request object
 * @param {import('@hapi/hapi').ResponseToolkit} h - Hapi response toolkit
 * @returns {import('@hapi/hapi').ResponseObject} Response with allocation booking method data
 */
async function getAllocationBookingMethods (request, h) {
  try {
    const repository = new MongoAllocationBookingMethodRepository(mongoClient)
    const allocationBookingMethodService = new AllocationBookingMethodService(
      repository
    )

    const allocationBookingMethods =
      await allocationBookingMethodService.getOptions()

    return h
      .response({
        data: allocationBookingMethods,
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching allocation booking methods:', error)

    throw Boom.internal(
      `Failed to fetch allocation booking methods: ${error.message}`
    )
  }
}

/**
 * Handler for GET /api/v1/reference/allocation-skip-reasons
 * Get all allocation skip reason options
 *
 * @param {import('@hapi/hapi').Request} request - Hapi request object
 * @param {import('@hapi/hapi').ResponseToolkit} h - Hapi response toolkit
 * @returns {import('@hapi/hapi').ResponseObject} Response with allocation skip reason data
 */
async function getAllocationSkipReasons (request, h) {
  try {
    const repository = new MongoAllocationSkipReasonsRepository(mongoClient)
    const allocationSkipReasonsService = new AllocationSkipReasonsService(
      repository
    )

    const allocationSkipReasons =
      await allocationSkipReasonsService.getOptions()

    return h
      .response({
        data: allocationSkipReasons,
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching allocation skip reasons:', error)

    throw Boom.internal(
      `Failed to fetch allocation skip reasons: ${error.message}`
    )
  }
}

/**
 * Allocation endpoint routes
 */
const allocationRoutes = [
  {
    method: 'GET',
    path: '/api/v1/reference/allocation-booking-method',
    handler: getAllocationBookingMethods,
    options: {
      description: 'Get all allocation booking method options',
      tags: ['api', 'reference', 'allocation'],
    },
  },
  {
    method: 'GET',
    path: '/api/v1/reference/allocation-skip-reason',
    handler: getAllocationSkipReasons,
    options: {
      description: 'Get all allocation skip reason options',
      tags: ['api', 'reference', 'allocation'],
    },
  },
]

export { allocationRoutes }
