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
}

export { HoldingService }
