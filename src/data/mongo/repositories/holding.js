import { HoldingModel } from '../models/holding.js'
import { DuplicateCPHError } from '../../../common/errors/DuplicateCPHError.js'

/**
 * Holding Repository for managing holding property information
 * Based on the MongoDB ERD specification for Holding collection
 */
class MongoHoldingRepository {
  constructor (db) {
    this.collection = db.collection('holdings')
  }

  /**
   * Create a new holding
   * @param {Object} holding - CPH holding data (cph, name, address, etc.)
   * @returns {Promise<Object>} - The created holding document with assigned ID
   * @throws {Error} - Throws a domain-specific error for duplicate CPH
   */
  async create (holding) {
    try {
      const holdingModel = new HoldingModel(holding)

      const result = await this.collection.insertOne(holdingModel)

      return HoldingModel.fromDocument({
        ...holdingModel,
        _id: result.insertedId
      })
    } catch (error) {
      // Handle MongoDB duplicate key error and convert to domain error
      if (error.code === 11000 && error.keyPattern && error.keyPattern['details.cph']) {
        throw new DuplicateCPHError(holding.details.cph)
      }

      // Re-throw other MongoDB errors as-is
      throw error
    }
  }

  /**
   * Find a holding by CPH
   * @param {string} cph - The County Parish Holding number
   * @returns {Promise<Object|null>} - The holding document or null if not found
   */
  async findByCph (cph) {
    const document = await this.collection.findOne({ 'details.cph': cph })
    
    if (!document) {
      return null
    }

    return HoldingModel.fromDocument(document)
  }
}

export {
  MongoHoldingRepository
}
