import Joi from 'joi'
import { countyController } from '../controllers/county-controller.js'

export const countyRoutes = [
  {
    method: 'GET',
    path: '/api/v1/counties',
    handler: countyController.getAll,
    options: {
      description: 'Get all counties',
      tags: ['api', 'counties'],
      validate: {
        query: Joi.object({
          country: Joi.string().optional().description('Filter by country'),
          region: Joi.string().optional().description('Filter by region'),
          limit: Joi.number()
            .integer()
            .min(1)
            .max(100)
            .default(50)
            .description('Maximum number of counties to return'),
          offset: Joi.number()
            .integer()
            .min(0)
            .default(0)
            .description('Number of counties to skip')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/counties/{id}',
    handler: countyController.getById,
    options: {
      description: 'Get county by ID',
      tags: ['api', 'counties'],
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required().description('County ID')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/counties/{id}/with-office',
    handler: countyController.getWithOffice,
    options: {
      description: 'Get county with office details',
      tags: ['api', 'counties'],
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required().description('County ID')
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/api/v1/counties',
    handler: countyController.create,
    options: {
      description: 'Create a new county',
      tags: ['api', 'counties'],
      validate: {
        payload: Joi.object({
          c_num: Joi.string().optional().description('County number'),
          county: Joi.string().required().description('County name'),
          country: Joi.string().required().description('Country name'),
          office: Joi.string().optional().description('Office name'),
          region: Joi.string().optional().description('Region name')
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/counties/{id}',
    handler: countyController.update,
    options: {
      description: 'Update county by ID',
      tags: ['api', 'counties'],
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required().description('County ID')
        }),
        payload: Joi.object({
          c_num: Joi.string().optional().description('County number'),
          county: Joi.string().required().description('County name'),
          country: Joi.string().required().description('Country name'),
          office: Joi.string().optional().description('Office name'),
          region: Joi.string().optional().description('Region name')
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/counties/{id}',
    handler: countyController.delete,
    options: {
      description: 'Delete county by ID',
      tags: ['api', 'counties'],
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required().description('County ID')
        })
      }
    }
  }
]
