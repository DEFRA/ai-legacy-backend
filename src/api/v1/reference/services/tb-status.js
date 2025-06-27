import { TbStatusOption } from '../models/tb-status.js'

/**
 * Service for managing TB status reference data
 */
class TbStatusService {
  /**
   * Creates a new TbStatusService instance
   * 
   * @param {Object} repository - TB status repository instance
   */
  constructor(repository) {
    this.repository = repository
  }

  /**
   * Get all TB status options with optional region filtering
   * 
   * @param {string|null} region - Optional region filter (must be non-empty string if provided)
   * @returns {Promise<Array<TbStatusOption>>} List of formatted TB statuses
   * @throws {Error} When repository operations fail
   */
  async getOptions(region = null) {
    try {
      let options = []

      if (region) {
        options = await this.repository.getByRegion(region)
      } else {
        options = await this.repository.getAll()
      }

      return options.map(option => TbStatusOption.fromEntity(option))
    } catch (error) {
      throw new Error(`Failed to retrieve TB status options`)
    }
  }
}

export {
  TbStatusService
}
