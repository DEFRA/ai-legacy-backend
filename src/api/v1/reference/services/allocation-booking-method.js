import { AllocationBookingMethodOption } from '../models/allocation-booking-method.js'

/**
 * Service for managing allocation booking method reference data
 */
class AllocationBookingMethodService {
  /**
   * Creates a new AllocationBookingMethodService instance
   *
   * @param {Object} repository - Allocation booking method repository instance
   */
  constructor (repository) {
    this.repository = repository
  }

  /**
   * Get all allocation booking method options
   *
   * @returns {Promise<Array<AllocationBookingMethodOption>>} List of formatted allocation booking methods
   * @throws {Error} When repository operations fail
   */
  async getOptions () {
    try {
      const options = await this.repository.getAll()

      if (!options || !Array.isArray(options)) {
        return []
      }

      return options.map(option => AllocationBookingMethodOption.fromEntity(option))
    } catch (error) {
      throw new Error('Failed to retrieve allocation booking method options')
    }
  }
}

export {
  AllocationBookingMethodService
}
