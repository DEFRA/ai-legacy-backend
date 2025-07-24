import { Holding } from '../../../domain/holdings/holdings.js'
import { MongoHoldingRepository } from '../../../domain/holdings/mongo-holding-repository.js'
import { mongoClient } from '../../../common/database/mongo.js'
import { holdingRequestDto } from './dto/holding-request.js'

const basePath = '/api/v1/holdings'

const routes = [
  {
    method: 'POST',
    path: `${basePath}`,
    async handler (request, h) {
      const holding = holdingRequestDto(request.payload)

      const { statusCode, data } = await createHolding(holding)

      return h.response(data).code(statusCode)
    }
  }
]

/**
 * Create a new holding in the system
 * @param {Holding} holding - The holding data to be created
 *
 * @returns {Promise<{statusCode: number, data: Object}>} - Promise resolving to the health status result
 */
async function createHolding (holding) {
  const repository = new MongoHoldingRepository(mongoClient)

  const createdHolding = await repository.addHolding(holding)

  return {
    statusCode: 200,
    data: createdHolding
  }
}

export {
  routes
}
