import { Holding } from '../models/holding.js'
import { HoldingEntity } from '../../../../data/mongo/entities/holding-entity.js'

/**
 * Holding Service
 * Manages the business logic for holdings and coordinates between
 * MongoDB entities and API response models
 */
class HoldingService {
  constructor (holdingRepository) {
    this.holdingRepository = holdingRepository
  }

  /**
   * Get all holdings for API response
   * @returns {Promise<Array<Holding>>} Array of holding response models
   */
  async getAllHoldings () {
    const holdingDocuments = await this.holdingRepository.getAll()
    
    return holdingDocuments.map(doc => Holding.fromEntity(doc))
  }

  /**
   * Get holding by ID for API response
   * @param {string} id - The holding ID
   * @returns {Promise<Holding|null>} Holding response model or null
   */
  async getHoldingById (id) {
    const holdingDocument = await this.holdingRepository.findById(id)
    
    if (!holdingDocument) {
      return null
    }
    
    return Holding.fromEntity(holdingDocument)
  }

  /**
   * Get holding by CPH for API response
   * @param {string} cph - The CPH number
   * @returns {Promise<Holding|null>} Holding response model or null
   */
  async getHoldingByCph (cph) {
    const holdingDocument = await this.holdingRepository.findByCph(cph)
    
    if (!holdingDocument) {
      return null
    }
    
    return Holding.fromEntity(holdingDocument)
  }

  /**
   * Create a new holding
   * @param {Object} holdingData - Raw holding data from API request
   * @returns {Promise<Holding>} Created holding response model
   */
  async createHolding (holdingData) {
    // Create entity from request data
    const holdingEntity = new HoldingEntity(
      null, // ID will be assigned by MongoDB
      holdingData.details,
      holdingData.incidents || []
    )
    
    // Save via repository
    const savedDocument = await this.holdingRepository.create(holdingEntity)
    
    // Return as API response model
    return Holding.fromEntity(savedDocument)
  }
}

export { HoldingService }
