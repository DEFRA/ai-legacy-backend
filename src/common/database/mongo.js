import { MongoClient } from 'mongodb'

import { config } from '../../config/index.js'
import { getSecureContext } from '../secure-context/secure-context.js'
import { createLogger } from '../logging/logger.js'

const logger = createLogger()

const secureContext = getSecureContext(logger)

const client = await MongoClient.connect(config.get('mongo.uri'), {
  connectTimeoutMS: 10000,
  retryWrites: false,
  readPreference: 'secondary',
  ...(secureContext && { secureContext })
})

const mongoClient = client.db(config.get('mongo.databaseName'))

logger.info('Connected to MongoDB')

export {
  mongoClient
}
