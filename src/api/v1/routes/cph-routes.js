import Joi from 'joi'
import { cphController } from '../controllers/cph-controller.js'

export const cphRoutes = [
  {
    method: 'GET',
    path: '/api/v1/cph',
    handler: cphController.getAll,
    options: {
      description: 'Get all CPH records',
      tags: ['api', 'cph'],
      validate: {
        query: Joi.object({
          county: Joi.string().optional().description('Filter by county'),
          postcode: Joi.string().optional().description('Filter by postcode prefix'),
          search: Joi.string().optional().description('Search in name and description'),
          pgp_study: Joi.boolean().optional().description('Filter by PGP study participation'),
          limit: Joi.number().integer().min(1).max(100).default(50).description('Maximum number of records to return'),
          offset: Joi.number().integer().min(0).default(0).description('Number of records to skip')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/cph/{cph}',
    handler: cphController.getByCph,
    options: {
      description: 'Get CPH by CPH number',
      tags: ['api', 'cph'],
      validate: {
        params: Joi.object({
          cph: Joi.string().required().description('CPH number')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/cph/{cph}/with-location',
    handler: cphController.getWithLocation,
    options: {
      description: 'Get CPH with location coordinates',
      tags: ['api', 'cph'],
      validate: {
        params: Joi.object({
          cph: Joi.string().required().description('CPH number')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/cph/pgp-study',
    handler: cphController.getPgpStudyParticipants,
    options: {
      description: 'Get CPHs participating in PGP study',
      tags: ['api', 'cph']
    }
  },
  {
    method: 'POST',
    path: '/api/v1/cph',
    handler: cphController.create,
    options: {
      description: 'Create a new CPH record',
      tags: ['api', 'cph'],
      validate: {
        payload: Joi.object({
          cph: Joi.string().required().description('CPH number'),
          cph_name: Joi.string().required().description('Farm name'),
          description: Joi.string().optional().description('Farm description'),
          street: Joi.string().optional().description('Street address'),
          locality: Joi.string().optional().description('Locality'),
          town: Joi.string().optional().description('Town'),
          county: Joi.string().optional().description('County'),
          postcode: Joi.string().optional().description('Postcode'),
          map_ref: Joi.string().optional().description('Map reference'),
          easting: Joi.string().optional().description('Easting coordinate'),
          northing: Joi.string().optional().description('Northing coordinate'),
          landline: Joi.string().optional().description('Landline phone number'),
          mobile: Joi.string().optional().description('Mobile phone number'),
          language: Joi.string().optional().description('Preferred language'),
          pgp_study: Joi.boolean().optional().description('PGP study participation')
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/cph/{cph}',
    handler: cphController.update,
    options: {
      description: 'Update CPH by CPH number',
      tags: ['api', 'cph'],
      validate: {
        params: Joi.object({
          cph: Joi.string().required().description('CPH number')
        }),
        payload: Joi.object({
          cph_name: Joi.string().required().description('Farm name'),
          description: Joi.string().optional().description('Farm description'),
          street: Joi.string().optional().description('Street address'),
          locality: Joi.string().optional().description('Locality'),
          town: Joi.string().optional().description('Town'),
          county: Joi.string().optional().description('County'),
          postcode: Joi.string().optional().description('Postcode'),
          map_ref: Joi.string().optional().description('Map reference'),
          easting: Joi.string().optional().description('Easting coordinate'),
          northing: Joi.string().optional().description('Northing coordinate'),
          landline: Joi.string().optional().description('Landline phone number'),
          mobile: Joi.string().optional().description('Mobile phone number'),
          language: Joi.string().optional().description('Preferred language'),
          pgp_study: Joi.boolean().optional().description('PGP study participation')
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/cph/{cph}',
    handler: cphController.delete,
    options: {
      description: 'Delete CPH by CPH number',
      tags: ['api', 'cph'],
      validate: {
        params: Joi.object({
          cph: Joi.string().required().description('CPH number')
        })
      }
    }
  }
]
