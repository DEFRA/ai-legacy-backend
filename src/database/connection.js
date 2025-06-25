import knex from 'knex'
import knexConfig from '../../knexfile.js'

const environment = process.env.NODE_ENV || 'development'
const config = knexConfig[environment]

if (!config) {
  throw new Error(`No database configuration found for environment: ${environment}`)
}

export const db = knex(config)

export default db
