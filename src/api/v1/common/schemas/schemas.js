import Joi from 'joi'

/**
 * Common validation schema for CPH (County Parish Holding) number
 * Validates the standard UK format: XX/XXX/XXXX where X represents digits
 * Used across multiple endpoints to ensure consistent CPH validation
 * @type {Joi.StringSchema}
 * @example
 * // Valid CPH formats:
 * // 12/345/6789
 * // 01/001/0001
 * // 99/999/9999
 */
const cph = Joi.string()
  .pattern(/^\d{2}\/\d{3}\/\d{4}$/)
  .required()
  .messages({
    'string.pattern.base': 'CPH must be in format XX/XXX/XXXX (e.g., 12/345/6789)',
    'any.required': 'CPH is required'
  })

export { cph }
