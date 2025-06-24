import { referenceController } from '../controllers/reference-controller.js'

export const referenceRoutes = [
  {
    method: 'GET',
    path: '/api/v1/reference/tb-status',
    handler: referenceController.getTbStatus,
    options: {
      description: 'Get all TB status options',
      tags: ['api', 'reference'],
      validate: {}
    }
  }
]
