import Boom from '@hapi/boom'

import { mongoClient } from '../../../../common/database/mongo.js'
import { TbStatusService } from '../services/tb-status.js'
import { TbResultService } from '../services/tb-result.js'
import { MongoTbStatusRepository } from '../../../../data/mongo/repositories/tb-status.js'
import { MongoTbResultRepository } from '../../../../data/mongo/repositories/tb-result.js'

/**
 * Handler for GET /api/v1/reference/tb-status
 * Get all TB status options with optional region filtering
 *
 * @param {import('@hapi/hapi').Request} request - Hapi request object
 * @param {import('@hapi/hapi').ResponseToolkit} h - Hapi response toolkit
 * @returns {import('@hapi/hapi').ResponseObject} Response with TB status data
 */
async function getTbStatuses (request, h) {
  try {
    const repository = new MongoTbStatusRepository(mongoClient)
    const tbStatusService = new TbStatusService(repository)

    const tbStatuses = await tbStatusService.getOptions(request.query.region)

    return h
      .response({
        data: tbStatuses,
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
 * @param {import('@hapi/hapi').Request} request - Hapi request object
 * @param {import('@hapi/hapi').ResponseToolkit} h - Hapi response toolkit
 * @returns {import('@hapi/hapi').ResponseObject} Response with TB result data
 */
async function getTbResults (request, h) {
  try {
    const repository = new MongoTbResultRepository(mongoClient)
    const tbResultService = new TbResultService(repository)

    const tbResults = await tbResultService.getOptions()

    return h
      .response({
        data: tbResults,
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching TB results:', error)

    throw Boom.internal(`Failed to fetch TB results: ${error.message}`)
  }
}

/**
 * TB endpoint routes
 */
const tbRoutes = [
  {
    method: 'GET',
    path: '/api/v1/reference/tb-status',
    handler: getTbStatuses,
    options: {
      description: 'Get all TB status options',
      tags: ['api', 'reference', 'tb'],
    },
  },
  {
    method: 'GET',
    path: '/api/v1/reference/tb-result',
    handler: getTbResults,
    options: {
      description: 'Get all TB result options',
      tags: ['api', 'reference', 'tb'],
    },
  },
]

export { tbRoutes }
