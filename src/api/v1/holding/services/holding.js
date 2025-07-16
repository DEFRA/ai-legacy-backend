class HoldingService {
  constructor (holdingRepository) {
    this.holdingRepository = holdingRepository
  }

  /**
   * Create a new holding
   * @param {Object} details - Domain holding data (cph, name, address, etc.)
   * @returns {Promise<Object>} Created holding response model
   */
  async createHolding (details) {
    const holding = await this.holdingRepository.create({ details })

    return {
      details: holding.details
    }
  }

  /**
   * Get a holding by CPH
   * @param {string} cph - The County Parish Holding number
   * @returns {Promise<Object|null>} Holding response model or null if not found
   */
  async getHoldingByCph (cph) {
    const holding = await this.holdingRepository.findByCph(cph)

    if (!holding) {
      return null
    }

    return {
      details: holding.details
    }
  }
}

export { HoldingService }
