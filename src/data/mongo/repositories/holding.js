import { HoldingEntity } from '../entities/holding-entity.js'

/**
 * Holding Repository for managing holding property information
 * Based on the MongoDB ERD specification for Holding collection
 * 
 * Source: cpht table
 * Purpose: Central holding property information with embedded address and geolocation data
 */
class MongoHoldingRepository {
  constructor (db) {
    this.collection = db.collection('holding')
  }

  /**
   * Get all holdings
   * @returns {Promise<Array>} Array of holding documents
   */
  async getAll () {
    const holdings = await this.collection.find({}).toArray()

    return holdings
  }

  /**
   * Find holding by CPH (County Parish Holding) number
   * @param {string} cph - The CPH number to search for
   * @returns {Promise<Object|null>} Holding document or null if not found
   */
  async findByCph (cph) {
    const holding = await this.collection.findOne({
      'details.cph': cph
    })

    return holding
  }

  /**
   * Find holding by MongoDB ObjectId
   * @param {string} id - The ObjectId as string
   * @returns {Promise<Object|null>} Holding document or null if not found
   */
  async findById (id) {
    const { ObjectId } = await import('mongodb')
    
    const holding = await this.collection.findOne({
      _id: new ObjectId(id)
    })

    return holding
  }
  /**
   * Create a new holding
   * @param {HoldingEntity} holdingData - The holding entity or data to insert
   * @returns {Promise<Object>} The inserted holding document
   */
  async create (holdingData) {
    // Convert entity to document if it's an entity instance
    const document = holdingData.toDocument() 
    
    const result = await this.collection.insertOne(document)
    
    return {
      ...document,
      _id: result.insertedId
    }
  }

  /**
   * Get holdings count
   * @param {Object} [filter] - Optional filter criteria
   * @returns {Promise<number>} Count of holdings matching filter
   */
  async count (filter = {}) {
    return await this.collection.countDocuments(filter)
  }
}

export {
  MongoHoldingRepository
}
