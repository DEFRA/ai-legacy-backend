import knex from 'knex'
import { config } from '../../config/index.js'
import { createLogger } from '../logging/logger.js'

const logger = createLogger()

let knexInstance = null

/**
 * Get or create Knex database connection instance
 * @returns {import('knex').Knex} Knex instance
 */
function getKnexInstance () {
  if (!knexInstance) {
    const postgresConfig = config.get('postgres')

    knexInstance = knex({
      client: 'pg',
      connection: {
        host: postgresConfig.host,
        port: postgresConfig.port,
        database: postgresConfig.database,
        user: postgresConfig.user,
        password: postgresConfig.password
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    })

    logger.info('Knex database connection initialized')
  }

  return knexInstance
}

/**
 * Close the database connection
 */
async function closeConnection () {
  if (knexInstance) {
    await knexInstance.destroy()
    knexInstance = null
    logger.info('Knex database connection closed')
  }
}

export { getKnexInstance, closeConnection }
