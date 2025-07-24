class HoldingService {
  constructor (holdingRepository) {
    this.holdingRepository = holdingRepository
  }

  /**
   * Create a new holding
   * @param {object} details - The holding details
   * @returns {Promise<object>} The created holding details
   */
  async createHolding (details) {
    const holding = await this.holdingRepository.create({ details })
    return {
      details: holding.details
    }
  }

  /**
   * Get a holding by CPH
   * @param {string} cph - The holding CPH
   * @returns {Promise<object|null>} The holding details or null if not found
   */
  async getHoldingByCph (cph) {
    const holdings = await this.holdingRepository.findByCph(cph)
    if (!holdings || holdings.length === 0) {
      return null
    }
    // Return the first holding found with this CPH
    return {
      details: holdings[0].details
    }
  }
}

export { HoldingService }
