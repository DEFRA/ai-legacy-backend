import { HoldingModel } from '../models/holding.js'

class MongoHoldingRepository {
  constructor (db) {
    this.collection = db.collection('holdings')
  }

  /**
   * Create a new holding in the database
   * @param {object} entity - The holding entity to create
   * @returns {Promise<HoldingModel>} The created holding
   */
  async create (entity) {
    try {
      const holdingModel = new HoldingModel(entity)
      const result = await this.collection.insertOne(holdingModel.toDocument())

      return HoldingModel.fromDocument({
        ...holdingModel.toDocument(),
        _id: result.insertedId
      })
    } catch (error) {
      // Handle domain-specific errors
      if (error.code === 11000 && error.keyPattern && error.keyPattern['details.cph']) {
        const DuplicateCphError = (await import('../../../common/errors/duplicate-cph-error.js')).DuplicateCphError
        throw new DuplicateCphError(entity.details.cph)
      }
      throw error
    }
  }

  /**
   * Find a holding by its ID
   * @param {string} id - The holding ID
   * @returns {Promise<HoldingModel|null>} The holding or null if not found
   */
  async findById (id) {
    const document = await this.collection.findOne({ _id: id })
    return document ? HoldingModel.fromDocument(document) : null
  }

  /**
   * Get all holdings
   * @returns {Promise<Array<object>>} Array of holding documents
   */
  async getAll () {
    const documents = await this.collection.find({}).toArray()
    return documents
  }

  /**
   * Find holdings by CPH
   * @param {string} cph - The CPH to search for
   * @returns {Promise<Array<HoldingModel>>} Array of holdings with matching CPH
   */
  async findByCph (cph) {
    const documents = await this.collection.find({ 'details.cph': cph }).toArray()
    return documents.map(doc => HoldingModel.fromDocument(doc))
  }

  /**
   * Update a holding
   * @param {string} id - The holding ID
   * @param {object} updates - The updates to apply
   * @returns {Promise<HoldingModel|null>} The updated holding or null if not found
   */
  async update (id, updates) {
    const result = await this.collection.findOneAndUpdate(
      { _id: id },
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: 'after' }
    )

    return result.value ? HoldingModel.fromDocument(result.value) : null
  }

  /**
   * Delete a holding
   * @param {string} id - The holding ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async delete (id) {
    const result = await this.collection.deleteOne({ _id: id })
    return result.deletedCount > 0
  }
}

export { MongoHoldingRepository }
