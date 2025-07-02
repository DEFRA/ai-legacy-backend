/**
 * Service for managing allocation skip reasons reference data
 */
class AllocationSkipReasonsService {
  /**
   * Creates a new AllocationSkipReasonsService instance
   *
   * @param {Object} repository - Allocation skip reasons repository instance
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Get all allocation skip reason options
   *
   * @returns {Promise<Array<Object>>} List of allocation skip reason options
   * @throws {Error} When repository operations fail
   */
  async getOptions() {
    try {
      const options = await this.repository.getAll();

      if (!options || !Array.isArray(options)) {
        return [];
      }

      return options.map((option) => ({
        reason: option.reason,
      }));
    } catch (error) {
      throw new Error("Failed to retrieve allocation skip reason options");
    }
  }
}

export { AllocationSkipReasonsService };
