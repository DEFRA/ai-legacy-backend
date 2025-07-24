/**
 * @fileoverview RFC 7807 Problem Details for HTTP APIs error formatting
 *
 * This module provides utilities for creating standardized error responses
 * that comply with RFC 7807 "Problem Details for HTTP APIs" specification.
 * It provides consistent error formatting across all API endpoints.
 *
 * Key Features:
 * - RFC 7807 compliant error structure
 * - Standard HTTP status code mapping
 * - Consistent error type URIs
 * - Optional additional error details
 *
 * @module common/errors/rfc7807
 * @author Defra DDTS
 * @since 1.0.0
 */

/**
 * Base URL for error type URIs
 * @constant {string}
 */
const ERROR_TYPE_BASE_URL = 'https://api.tbcms.example.com/problems'

/**
 * Creates an RFC 7807 compliant error response object
 * @param {Object} options - Error configuration options
 * @param {string} options.type - A URI reference that identifies the problem type
 * @param {string} options.title - A short, human-readable summary of the problem type
 * @param {number} options.status - The HTTP status code
 * @param {string} [options.detail] - A human-readable explanation specific to this occurrence
 * @param {string} [options.instance] - A URI reference that identifies the specific occurrence
 * @param {Object} [options.extensions] - Additional problem-specific extension fields
 * @returns {Object} RFC 7807 compliant error object
 * @example
 * const error = createProblemDetails({
 *   type: 'validation-error',
 *   title: 'Validation Error',
 *   status: 400,
 *   detail: 'The CPH format is invalid',
 *   instance: '/api/v1/holdings',
 *   extensions: { field: 'cph', value: 'invalid-cph' }
 * })
 */
export function createProblemDetails ({ type, title, status, detail, instance, extensions = {} }) {
  const problem = {
    type: `${ERROR_TYPE_BASE_URL}/${type}`,
    title,
    status,
    ...(detail && { detail }),
    ...(instance && { instance })
  }

  // Add any extension fields
  return { ...problem, ...extensions }
}

/**
 * Creates a validation error response
 * @param {string} detail - Specific validation error message
 * @param {string} [instance] - API endpoint where error occurred
 * @param {Object} [extensions] - Additional validation details
 * @returns {Object} RFC 7807 validation error
 */
export function createValidationError (detail, instance, extensions = {}) {
  return createProblemDetails({
    type: 'validation-error',
    title: 'Validation Error',
    status: 400,
    detail,
    instance,
    extensions
  })
}

/**
 * Creates a resource not found error response
 * @param {string} detail - Specific not found error message
 * @param {string} [instance] - API endpoint where error occurred
 * @param {Object} [extensions] - Additional not found details
 * @returns {Object} RFC 7807 not found error
 */
export function createNotFoundError (detail, instance, extensions = {}) {
  return createProblemDetails({
    type: 'resource-not-found',
    title: 'Resource Not Found',
    status: 404,
    detail,
    instance,
    extensions
  })
}

/**
 * Creates a duplicate resource error response
 * @param {string} detail - Specific duplication error message
 * @param {string} [instance] - API endpoint where error occurred
 * @param {Object} [extensions] - Additional duplication details
 * @returns {Object} RFC 7807 conflict error
 */
export function createDuplicateResourceError (detail, instance, extensions = {}) {
  return createProblemDetails({
    type: 'duplicate-resource',
    title: 'Duplicate Resource',
    status: 409,
    detail,
    instance,
    extensions
  })
}

/**
 * Creates an internal server error response
 * @param {string} [detail='An internal server error occurred'] - Specific error message
 * @param {string} [instance] - API endpoint where error occurred
 * @param {Object} [extensions] - Additional error details
 * @returns {Object} RFC 7807 internal server error
 */
export function createInternalServerError (detail = 'An internal server error occurred', instance, extensions = {}) {
  return createProblemDetails({
    type: 'internal-server-error',
    title: 'Internal Server Error',
    status: 500,
    detail,
    instance,
    extensions
  })
}
