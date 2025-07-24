import Joi from 'joi'

/**
 * Common validation schema for CPH (County Parish Holding) number
 * Format: XX/XXX/XXXX where X represents digits
 */
const cph = Joi.string()
  .pattern(/^\d{2}\/\d{3}\/\d{4}$/)
  .required()
  .messages({
    'string.pattern.base': 'CPH must be in format XX/XXX/XXXX (e.g., 12/345/6789)'
  })

export { cph }
