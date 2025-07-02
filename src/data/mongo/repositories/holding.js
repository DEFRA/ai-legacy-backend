import { HoldingModel } from '../models/holding.js'

/**
 * Holding Repository for managing holding property information
 * Based on the MongoDB ERD specification for Holding collection
 */
class MongoHoldingRepository {
  constructor (db) {
    this.collection = db.collection('holding')
  }

  /**
   * Create a new holding
   * @param {Object} holding - CPH holding data (cph, name, address, etc.)
   * @returns {Promise<Object>} - The created holding document with assigned ID
   */
  async create (holding) {
    const holdingModel = new HoldingModel(holding)

    const result = await this.collection.insertOne(holdingModel)

    return HoldingModel.fromDocument({
      ...holdingModel,
      _id: result.insertedId
    })
  }
}

export {
  MongoHoldingRepository
}
