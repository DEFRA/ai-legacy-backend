import Boom from '@hapi/boom'

import { mongoClient } from '../../../common/database/mongo.js'
import { TbStatusService } from './services/tb-status.js'
import { TbResultService } from './services/tb-result.js'
import { AllocationBookingMethodService } from './services/allocation-booking-method.js'
import { AllocationSkipReasonsService } from './services/allocation-skip-reasons.js'
import { MongoTbStatusRepository } from '../../../data/mongo/repositories/tb-status.js'
import { MongoTbResultRepository } from '../../../data/mongo/repositories/tb-result.js'
import { MongoAllocationBookingMethodRepository } from '../../../data/mongo/repositories/allocation-booking-method.js'
import { MongoAllocationSkipReasonsRepository } from '../../../data/mongo/repositories/allocation-skip-reasons.js'

/**
 * Handler for GET /api/v1/reference/tb-status
 * Get all TB status options with optional region filtering
 *
 * @param {Object} request - Hapi request object
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response with TB status data
 */
async function getTbStatus (request, h) {
  try {
    const repository = new MongoTbStatusRepository(mongoClient)
    const tbStatusService = new TbStatusService(repository)

    const tbStatuses = await tbStatusService.getOptions(request.query.region)

    return h
      .response({
        data: tbStatuses
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching TB statuses:', error)

    throw Boom.internal(`Failed to fetch TB statuses: ${error.message}`)
  }
}

/**
 * Handler for GET /api/v1/reference/tb-result
 * Get all TB result options
 *
 * @param {Object} request - Hapi request object
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response with TB result data
 */
async function getTbResult (request, h) {
  try {
    const repository = new MongoTbResultRepository(mongoClient)
    const tbResultService = new TbResultService(repository)

    const tbResults = await tbResultService.getOptions()

    return h
      .response({
        data: tbResults
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching TB results:', error)

    throw Boom.internal(`Failed to fetch TB results: ${error.message}`)
  }
}

/**
 * Handler for GET /api/v1/reference/allocation-booking-method
 * Get all allocation booking method options
 *
 * @param {Object} request - Hapi request object
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response with allocation booking method data
 */
async function getAllocationBookingMethod (request, h) {
  try {
    const repository = new MongoAllocationBookingMethodRepository(mongoClient)
    const allocationBookingMethodService = new AllocationBookingMethodService(repository)

    const allocationBookingMethods = await allocationBookingMethodService.getOptions()

    return h
      .response({
        data: allocationBookingMethods
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching allocation booking methods:', error)

    throw Boom.internal(`Failed to fetch allocation booking methods: ${error.message}`)
  }
}

/**
 * Handler for GET /api/v1/reference/allocation-skip-reasons
 * Get all allocation skip reason options
 *
 * @param {Object} request - Hapi request object
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response with allocation skip reason data
 */
async function getAllocationSkipReasons (request, h) {
  try {
    const repository = new MongoAllocationSkipReasonsRepository(mongoClient)
    const allocationSkipReasonsService = new AllocationSkipReasonsService(repository)

    const allocationSkipReasons = await allocationSkipReasonsService.getOptions()

    return h
      .response({
        data: allocationSkipReasons
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching allocation skip reasons:', error)

    throw Boom.internal(`Failed to fetch allocation skip reasons: ${error.message}`)
  }
}

/**
 * Reference router plugin
 */
const router = {
  plugin: {
    name: 'reference-router',
    register (server) {
      server.route({
        method: 'GET',
        path: '/api/v1/reference/tb-status',
        handler: getTbStatus,
        options: {
          description: 'Get all TB status options',
          tags: ['api', 'reference']
        }
      })

      server.route({
        method: 'GET',
        path: '/api/v1/reference/tb-result',
        handler: getTbResult,
        options: {
          description: 'Get all TB result options',
          tags: ['api', 'reference']
        }
      })

      server.route({
        method: 'GET',
        path: '/api/v1/reference/allocation-booking-method',
        handler: getAllocationBookingMethod,
        options: {
          description: 'Get all allocation booking method options',
          tags: ['api', 'reference']
        }
      })

      server.route({
        method: 'GET',
        path: '/api/v1/reference/allocation-skip-reasons',
        handler: getAllocationSkipReasons,
        options: {
          description: 'Get all allocation skip reason options',
          tags: ['api', 'reference']
        }
      })
    }
  }
}

export { router }
