import Joi from 'joi'
import { caseController } from '../controllers/case-controller.js'

export const caseRoutes = [
  {
    method: 'GET',
    path: '/api/v1/cases',
    handler: caseController.getAll,
    options: {
      description: 'Get all TB cases',
      tags: ['api', 'cases'],
      validate: {
        query: Joi.object({
          cph: Joi.string().optional().description('Filter by CPH number'),
          tb_status: Joi.number()
            .integer()
            .optional()
            .description('Filter by TB status'),
          result: Joi.string().optional().description('Filter by case result'),
          start_date: Joi.date().optional().description('Filter by start date'),
          end_date: Joi.date().optional().description('Filter by end date'),
          limit: Joi.number()
            .integer()
            .min(1)
            .max(100)
            .default(50)
            .description('Maximum number of cases to return'),
          offset: Joi.number()
            .integer()
            .min(0)
            .default(0)
            .description('Number of cases to skip')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/cases/{nat_inc}',
    handler: caseController.getByNatInc,
    options: {
      description: 'Get case by national incident number',
      tags: ['api', 'cases'],
      validate: {
        params: Joi.object({
          nat_inc: Joi.string()
            .required()
            .description('National incident number')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/cases/{nat_inc}/details',
    handler: caseController.getWithDetails,
    options: {
      description: 'Get case with related information',
      tags: ['api', 'cases'],
      validate: {
        params: Joi.object({
          nat_inc: Joi.string()
            .required()
            .description('National incident number')
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/cases/drf-pending',
    handler: caseController.getDrfPending,
    options: {
      description: 'Get cases requiring DRF completion',
      tags: ['api', 'cases']
    }
  },
  {
    method: 'GET',
    path: '/api/v1/cases/dashboard-stats',
    handler: caseController.getDashboardStats,
    options: {
      description: 'Get dashboard statistics',
      tags: ['api', 'cases']
    }
  }
]
