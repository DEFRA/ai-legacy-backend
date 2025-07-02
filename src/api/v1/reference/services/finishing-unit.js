/**
 * Service for managing finishing unit reference data
 */
class FinishingUnitService {
  /**
   * Creates a new FinishingUnitService instance
   *
   * @param {Object} repository - Finishing unit repository instance
   */
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Get all finishing unit options with optional region filtering
   *
   * @param {string|null} region - Optional region filter (must be non-empty string if provided)
   * @returns {Promise<Array<Object>>} List of finishing unit options
   * @throws {Error} When repository operations fail
   */
  async getOptions(region = null) {
    try {
      let options = [];

      if (region) {
        options = await this.repository.getByRegion(region);
      } else {
        options = await this.repository.getAll();
      }

      return options.map((option) => ({
        unitType: option.unitType,
        regions: option.validRegions || [],
      }));
    } catch (error) {
      throw new Error("Failed to retrieve finishing unit options");
    }
  }
}

export { FinishingUnitService };
