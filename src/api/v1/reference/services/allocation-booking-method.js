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
   * @returns {Promise<Array<Object>>} List of allocation booking method options
   * @throws {Error} When repository operations fail
   */
  async getOptions () {
    try {
      const options = await this.repository.getAll()

      if (!options || !Array.isArray(options)) {
        return []
      }

      return options.map((option) => ({
        method: option.method,
      }))
    } catch (error) {
      throw new Error('Failed to retrieve allocation booking method options')
    }
  }
}

export { AllocationBookingMethodService }
