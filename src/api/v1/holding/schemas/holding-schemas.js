import Joi from 'joi'
import { cphSchema } from '../../common/schemas/cph.js'

/**
 * Address validation schema for holding requests
 */
const addressSchema = Joi.object({
  street: Joi.string().allow('', null).description('Street address'),
  locality: Joi.string().allow('', null).description('Locality'),
  town: Joi.string().required().description('Town name'),
  county: Joi.string().required().description('County name'),
  postcode: Joi.string().required().description('UK postcode')
}).description('Address information')

/**
 * Individual contact validation schema for holding requests
 */
const contactItemSchema = Joi.object({
  type: Joi.string().valid('landline', 'mobile').required().description('Contact type'),
  value: Joi.string().pattern(/^[0-9\s\-\+\(\)]+$/).required().description('Contact number')
}).description('Individual contact information')

/**
 * Contact array validation schema for holding requests
 */
const contactSchema = Joi.array()
  .items(contactItemSchema)
  .default([])
  .description('Array of contact information')

/**
 * Geolocation validation schema for holding requests
 */
const geolocationSchema = Joi.object({
  mapRef: Joi.string().allow('', null).description('Map reference'),
  easting: Joi.number().integer().min(0).max(999999).allow(null).description('Easting coordinate'),
  northing: Joi.number().integer().min(0).max(999999).allow(null).description('Northing coordinate')
}).description('Geographic coordinates')

/**
 * Details validation schema for holding requests
 */
const detailsSchema = Joi.object({
  cph: cphSchema.required(),
  name: Joi.string().min(1).max(255).required().description('Holding name'),
  description: Joi.string().allow('', null).max(1000).description('Holding description'),
  address: addressSchema.required(),
  geolocation: geolocationSchema.allow(null).description('Geographic location'),
  contacts: contactSchema.description('Contact information')
}).description('Holding details')

/**
 * Main holding creation validation schema
 */
const createHoldingSchema = Joi.object({
  details: detailsSchema.required(),
  incidents: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .default([])
    .description('Array of incident ObjectIds')
}).description('Holding creation request')

/**
 * Holding response schema for OpenAPI documentation
 */
const holdingResponseSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().description('Holding ID'),
  details: detailsSchema.required(),
  incidents: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .description('Array of incident IDs')
}).description('Holding response')

export {
  addressSchema,
  contactItemSchema,
  contactSchema,
  geolocationSchema,
  detailsSchema,
  createHoldingSchema,
  holdingResponseSchema
}
