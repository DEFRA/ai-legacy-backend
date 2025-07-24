import Joi from 'joi'
import { cph } from '../../common/schemas/schemas.js'

const createHoldingSchema = Joi.object({
  details: Joi.object({
    cph: cph.required(),
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(1).max(1000).optional(),
    address: Joi.object({
      street: Joi.string().min(1).max(255).optional(),
      locality: Joi.string().min(1).max(100).optional(),
      town: Joi.string().min(1).max(100).optional(),
      county: Joi.string().min(1).max(100).optional(),
      postcode: Joi.string().min(1).max(10).optional()
    }).optional(),
    geolocation: Joi.object({
      mapReference: Joi.string().min(1).max(50).optional(),
      easting: Joi.number().integer().min(0).max(999999).optional(),
      northing: Joi.number().integer().min(0).max(999999).optional()
    }).optional(),
    contacts: Joi.array().items(
      Joi.object({
        type: Joi.string().valid('telephone', 'email').required(),
        value: Joi.string().min(1).max(255).required()
      })
    ).optional()
  }).required()
}).required()

const getHoldingSchema = Joi.object({
  cph: cph.required()
})

const updateHoldingSchema = Joi.object({
  details: Joi.object({
    name: Joi.string().min(1).max(255).optional(),
    description: Joi.string().min(1).max(1000).optional(),
    address: Joi.object({
      street: Joi.string().min(1).max(255).optional(),
      locality: Joi.string().min(1).max(100).optional(),
      town: Joi.string().min(1).max(100).optional(),
      county: Joi.string().min(1).max(100).optional(),
      postcode: Joi.string().min(1).max(10).optional()
    }).optional(),
    geolocation: Joi.object({
      mapReference: Joi.string().min(1).max(50).optional(),
      easting: Joi.number().integer().min(0).max(999999).optional(),
      northing: Joi.number().integer().min(0).max(999999).optional()
    }).optional(),
    contacts: Joi.array().items(
      Joi.object({
        type: Joi.string().valid('telephone', 'email').required(),
        value: Joi.string().min(1).max(255).required()
      })
    ).optional()
  }).optional()
}).required()

export { createHoldingSchema, getHoldingSchema, updateHoldingSchema }
