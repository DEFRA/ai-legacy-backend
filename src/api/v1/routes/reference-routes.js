import Joi from 'joi'
import { getTbStatus, getTestResults, getActionCategories } from '../controllers/reference-controller.js'

export const referenceRoutes = [
  {
    method: 'GET',
    path: '/api/v1/reference/tb-status/{region?}',
    handler: getTbStatus,
    options: {
      description: 'Get TB status options with optional region filtering',
      notes: 'Returns all TB status values or filtered by region if region parameter is provided',
      tags: ['api', 'reference'],
      validate: {
        params: Joi.object({
          region: Joi.string()
            .valid('midlands', 'north', 'scotland', 'south_east', 'south_west', 'wales')
            .optional()
            .description('Optional region name for filtering')
        })
      },
      response: {
        schema: Joi.object({
          data: Joi.array()
            .items(
              Joi.object({
                status_abb: Joi.string().required().description('Status abbreviation'),
                status: Joi.string().required().description('Full status description'),
                midlands: Joi.boolean().required().description('Available in Midlands region'),
                north: Joi.boolean().required().description('Available in North region'),
                scotland: Joi.boolean().required().description('Available in Scotland region'),
                south_east: Joi.boolean().required().description('Available in South East region'),
                south_west: Joi.boolean().required().description('Available in South West region'),
                wales: Joi.boolean().required().description('Available in Wales region')
              })
            )
            .required(),
          region: Joi.string().optional().description('Filtered region (if provided)')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/reference/test-results',
    handler: getTestResults,
    options: {
      description: 'Get all test result options',
      notes: 'Returns all available test result values',
      tags: ['api', 'reference'],
      validate: {},
      response: {
        schema: Joi.object({
          data: Joi.array()
            .items(
              Joi.object({
                result: Joi.string().required().description('Test result value')
              })
            )
            .required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/reference/action-categories',
    handler: getActionCategories,
    options: {
      description: 'Get all action category options',
      notes: 'Returns all available action category values',
      tags: ['api', 'reference'],
      validate: {},
      response: {
        schema: Joi.object({
          data: Joi.array()
            .items(
              Joi.object({
                action_cat: Joi.string().required().description('Action category value')
              })
            )
            .required()
        })
      }
    }
  }
]
