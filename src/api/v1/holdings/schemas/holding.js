/**
 * @fileoverview Joi validation schemas for holding API endpoints
 *
 * This module contains all Joi validation schemas used by holding-related API endpoints.
 * Schemas ensure data integrity and provide meaningful error messages for API consumers.
 *
 * Key Schemas:
 * - createHoldingSchema: Validates payload for creating new holdings
 * - getHoldingSchema: Validates CPH parameter for retrieving holdings
 * - updateHoldingSchema: Validates payload for updating existing holdings
 *
 * All schemas use the common CPH validation pattern and provide comprehensive
 * field validation with custom error messages.
 *
 * @module api/v1/holdings/schemas/holding
 * @requires joi - Validation library
 * @requires ../../common/schemas/schemas - Common validation patterns
 * @author Defra DDTS
 * @since 1.0.0
 */

import Joi from 'joi'
import { cph } from '../../common/schemas/schemas.js'

/**
 * Joi validation schema for creating a new holding
 * Validates all required and optional fields for holding creation
 * @type {Joi.ObjectSchema}
 * @example
 * const validPayload = {
 *   details: {
 *     cph: '12/345/6789',
 *     name: 'Test Farm',
 *     description: 'A test holding',
 *     address: {
 *       street: '123 Farm Lane',
 *       locality: 'Little Village',
 *       town: 'Farmington',
 *       county: 'Test County',
 *       postcode: 'TE1 2ST'
 *     },
 *     geolocation: {
 *       mapReference: 'TEST123',
 *       easting: 123456,
 *       northing: 654321
 *     },
 *     contacts: [
 *       { type: 'telephone', value: '01234567890' },
 *       { type: 'email', value: 'test@example.com' }
 *     ]
 *   }
 * }
 */

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

/**
 * Joi validation schema for getting a holding by CPH
 * Validates the CPH parameter in URL path
 * @type {Joi.ObjectSchema}
 * @example
 * // Valid URL parameter: /api/v1/holdings/12/345/6789
 * // URL-encoded: /api/v1/holdings/12%2F345%2F6789
 */
const getHoldingSchema = Joi.object({
  cph: cph.required()
})

/**
 * Joi validation schema for updating an existing holding
 * All fields are optional for partial updates
 * @type {Joi.ObjectSchema}
 * @example
 * const validUpdatePayload = {
 *   details: {
 *     name: 'Updated Farm Name',
 *     description: 'Updated description'
 *   }
 * }
 */

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
