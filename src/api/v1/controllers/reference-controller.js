import Boom from '@hapi/boom'
import Joi from 'joi'
import { tbStatusRepository, testResultRepository, actionCategoryRepository } from '../../../repositories/index.js'

/**
 * @swagger
 * tags:
 *   name: Reference
 *   description: Reference data lookup endpoints
 */

/**
 * Get all TB status options
 * Returns unique TB status values with regional availability flags
 * Eliminates duplicate entries from the database
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {Promise<object>} Response containing TB status data
 */
export async function getTbStatus(request, h) {
  try {
    const tbStatuses = await tbStatusRepository.getAllTbStatuses()

    return h
      .response({
        data: tbStatuses
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching TB statuses:', error)
    throw Boom.internal(`Failed to fetch TB statuses: ${error.message}`)
  }
}

/**
 * Get TB status options available for a specific region
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {Promise<object>} Response containing TB status data for the region
 */
export async function getTbStatusByRegion(request, h) {
  try {
    const { region } = request.params

    const tbStatuses = await tbStatusRepository.getTbStatusesByRegion(region)

    return h
      .response({
        data: tbStatuses,
        region
      })
      .code(200)
  } catch (error) {
    request.logger.error(`Error fetching TB statuses for region ${request.params.region}:`, error)

    if (error.message.includes('Invalid region')) {
      throw Boom.badRequest(error.message)
    }

    throw Boom.internal(`Failed to fetch TB statuses for region: ${error.message}`)
  }
}

/**
 * Get all test result options
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {Promise<object>} Response containing test result data
 */
export async function getTestResults(request, h) {
  try {
    const testResults = await testResultRepository.getAllTestResults()

    return h
      .response({
        data: testResults
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching test results:', error)
    throw Boom.internal(`Failed to fetch test results: ${error.message}`)
  }
}

/**
 * Get all action category options
 * @param {object} request - Hapi request object
 * @param {object} h - Hapi response toolkit
 * @returns {Promise<object>} Response containing action category data
 */
export async function getActionCategories(request, h) {
  try {
    const actionCategories = await actionCategoryRepository.getAllActionCategories()

    return h
      .response({
        data: actionCategories
      })
      .code(200)
  } catch (error) {
    request.logger.error('Error fetching action categories:', error)
    throw Boom.internal(`Failed to fetch action categories: ${error.message}`)
  }
}
