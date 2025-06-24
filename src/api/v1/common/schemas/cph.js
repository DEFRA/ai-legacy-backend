import Joi from 'joi'

/**
 * County Parish Holding (CPH) validation schema
 * CPH is an 11-digit identifier used across the TB system
 */
export const cphSchema = Joi.string()
  .pattern(/^[0-9]{11}$/)
  .description('County Parish Holding identifier (11 digits)')

export {
  cphSchema
}
