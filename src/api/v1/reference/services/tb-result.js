import { TbResultOption } from '../models/tb-result.js'

/**
 * Service for managing TB result reference data
 */
class TbResultService {
  /**
   * Creates a new TbResultService instance
   *
   * @param {Object} repository - TB result repository instance
   */
  constructor (repository) {
    this.repository = repository
  }

  /**
   * Get all TB result options
   *
   * @returns {Promise<Array<TbResultOption>>} List of formatted TB results
   * @throws {Error} When repository operations fail
   */
  async getOptions () {
    try {
      const options = await this.repository.getAll()

      return options.map(option => TbResultOption.fromEntity(option))
    } catch (error) {
      throw new Error('Failed to retrieve TB result options')
    }
  }
}

export {
  TbResultService
}
