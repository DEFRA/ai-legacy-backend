import { StatusCodes } from 'http-status-codes'

const routes = [
  {
    method: 'GET',
    path: '/health',
    async handler (_request, h) {
      const { statusCode, data } = await getHealthStatus()

      return h.response(data).code(statusCode)
    },
    options: {
      description: 'Health check endpoint',
      tags: ['health', 'probe']
    }
  }
]

/**
 * Get the health status of the service
 * @returns {Promise<{statusCode: number, data: Object}>} - Promise resolving to the health status result
 */
async function getHealthStatus () {
  return {
    statusCode: StatusCodes.OK,
    data: {
      message: 'success'
    }
  }
}

export {
  routes
}
