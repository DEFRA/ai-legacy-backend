/**
 * Custom error class for duplicate CPH violations
 * Thrown when attempting to create a holding with a CPH that already exists
 * Extends the base Error class with domain-specific information
 * @class DuplicateCphError
 * @extends Error
 */
class DuplicateCphError extends Error {
  /**
   * Creates a new DuplicateCphError instance
   * @param {string} cph - The duplicate CPH that caused the error
   */
  constructor (cph) {
    super(`Duplicate CPH '${cph}' already exists`)
    this.name = 'DuplicateCphError'
    this.statusCode = 409
  }
}

export { DuplicateCphError }
