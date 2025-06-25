import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { cphSchema } from '../common/schemas/cph.js'

/**
 * Handler for GET /v1/holdings
 * Returns all holdings
 *
 * @param {*} request
 * @param {*} h
 * @returns
 */
async function getAllHoldings (request, h) {
  return h
    .response({
      message: 'Holdings endpoint - implementation pending',
      endpoint: 'GET /v1/holdings'
    })
    .code(StatusCodes.OK)
}

/**
 * Handler for GET /v1/holdings/{cph}
 * Returns a single holding by CPH
 * @param {*} request
 * @param {*} h
 * @returns
 */
async function getHoldingByCph (request, h) {
  const { cph } = request.params

  return h
    .response({
      message: 'Single holding endpoint - implementation pending',
      endpoint: `GET /v1/holdings/${cph}`,
      cph
    })
    .code(StatusCodes.OK)
}

const router = {
  plugin: {
    name: 'holdings-router',
    register (server) {
      server.route({
        method: 'GET',
        path: '/v1/holdings',
        handler: getAllHoldings
      })

      server.route({
        method: 'GET',
        path: '/v1/holdings/{cph}',
        handler: getHoldingByCph,
        options: {
          validate: {
            params: Joi.object({
              cph: cphSchema.required()
            })
          }
        }
      })
    }
  }
}

export { router }
