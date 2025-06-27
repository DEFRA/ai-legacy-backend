import Boom from '@hapi/boom'

import { mongoClient } from '../../../common/database/mongo.js'
import { TbStatusService } from './services/tb-status.js'
import { MongoTbStatusRepository } from '../../../data/mongo/repositories/tb-status.js'

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
    }
  }
}

export { router }
