import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { getKnexInstance } from '../../common/database/knex.js'
import { PgHoldingsRepository } from '../../data/sql/pg-holdings-repository.js'

/**
 * Handler for GET /v1/holdings
 * Returns all holdings
 */
async function getAllHoldings (request, h) {
  try {
    const knex = getKnexInstance()
    const holdingsRepo = new PgHoldingsRepository(knex)
    
    // TODO: Call repository method when implemented
    // const holdings = await holdingsRepo.findAll()
    
    // Temporary response for basic setup
    return h.response({
      message: 'Holdings endpoint - implementation pending',
      endpoint: 'GET /v1/holdings'
    }).code(StatusCodes.OK)
  } catch (error) {
    request.logger.error('Error fetching holdings:', error)
    return h.response({
      message: 'Internal server error'
    }).code(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

/**
 * Handler for GET /v1/holdings/{cph}
 * Returns a single holding by CPH
 */
async function getHoldingByCph (request, h) {
  try {
    const { cph } = request.params
    const knex = getKnexInstance()
    const holdingsRepo = new PgHoldingsRepository(knex)
    
    // TODO: Call repository method when implemented
    // const holding = await holdingsRepo.findByCph(cph)
    // if (!holding) {
    //   return h.response({
    //     message: 'Holding not found'
    //   }).code(StatusCodes.NOT_FOUND)
    // }
    
    // Temporary response for basic setup
    return h.response({
      message: 'Single holding endpoint - implementation pending',
      endpoint: `GET /v1/holdings/${cph}`,
      cph
    }).code(StatusCodes.OK)
  } catch (error) {
    request.logger.error('Error fetching holding:', error)
    return h.response({
      message: 'Internal server error'
    }).code(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

/**
 * Validation schema for CPH parameter
 */
const cphSchema = Joi.string()
  .pattern(/^[0-9]{11}$/)
  .required()
  .description('County Parish Holding identifier (11 digits)')

/**
 * Holdings router plugin
 */
const router = {
  plugin: {
    name: 'holdings-router',
    register (server) {
      // GET /v1/holdings - Get all holdings
      server.route({
        method: 'GET',
        path: '/v1/holdings',
        handler: getAllHoldings
      })

      // GET /v1/holdings/{cph} - Get single holding by CPH
      server.route({
        method: 'GET',
        path: '/v1/holdings/{cph}',
        handler: getHoldingByCph,
        options: {
          validate: {
            params: Joi.object({
              cph: cphSchema
            })
          }
        }
      })
    }
  }
}

export { router }
