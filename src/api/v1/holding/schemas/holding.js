import Joi from 'joi'

import { cph } from '../../common/schemas/schemas.js'

const createHoldingSchema = Joi.object({
  details: Joi.object({
    cph: cph.required(),
    name: Joi.string().min(1).max(255).required(),
    description: Joi.string().allow('', null).max(1000),
    address: Joi.object({
      street: Joi.string().allow('', null),
      locality: Joi.string().allow('', null),
      town: Joi.string().required(),
      county: Joi.string().required(),
      postcode: Joi.string().required(),
    }).required(),
    geolocation: Joi.object({
      mapReference: Joi.string().allow('', null),
      easting: Joi.number().integer().min(0).max(999999).allow(null),
      northing: Joi.number().integer().min(0).max(999999).allow(null),
    }).allow(null),
    contacts: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().valid('landline', 'mobile', 'email').required(),
          value: Joi.string().required(),
        })
      )
      .default([]),
  }).required(),
}).required()

const getHoldingByCphSchema = Joi.object({
  cph: cph.required(),
})

export { createHoldingSchema, getHoldingByCphSchema }
