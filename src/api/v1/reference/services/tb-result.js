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
   * @returns {Promise<Array<Object>>} List of TB result options
   * @throws {Error} When repository operations fail
   */
  async getOptions () {
    try {
      const options = await this.repository.getAll()

      return options.map(option => ({
        code: option.code,
        description: option.description
      }))
    } catch (error) {
      throw new Error('Failed to retrieve TB result options')
    }
  }
}

export {
  TbResultService
}
