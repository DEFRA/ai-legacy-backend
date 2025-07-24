/**
 * @fileoverview MongoDB repository for holding data access operations
 *
 * This module implements the Repository pattern for holding entities, providing
 * a clean abstraction layer between the business logic and MongoDB database operations.
 *
 * Key Features:
 * - Full CRUD operations (Create, Read, Update, Delete)
 * - CPH-based queries for business logic requirements
 * - Domain-specific error handling (e.g., duplicate CPH detection)
 * - Model transformation between MongoDB documents and domain models
 * - Optimized queries with proper indexing support
 *
 * @module data/mongo/repositories/holding
 * @requires ../models/holding - HoldingModel for data transformation
 * @requires ../../../common/errors/duplicate-cph-error - Domain error handling
 * @author Defra DDTS
 * @since 1.0.0
 */

import { HoldingModel } from '../models/holding.js'

/**
 * MongoDB repository for holding entities
 * Implements the Repository pattern for holding data access
 * Handles all database operations for holdings including CRUD operations and queries
 * @class MongoHoldingRepository
 */
class MongoHoldingRepository {
  /**
   * Creates a new MongoHoldingRepository instance
   * @param {import('mongodb').Db} db - MongoDB database instance
   */
  constructor (db) {
    this.collection = db.collection('holdings')
  }

  /**
   * Create a new holding in the database
   * @param {object} entity - The holding entity to create
   * @param {object} entity.details - Holding details object
   * @param {string} entity.details.cph - County Parish Holding number
   * @param {string} entity.details.name - Holding name
   * @returns {Promise<HoldingModel>} The created holding with assigned MongoDB _id
   * @throws {DuplicateCphError} When a holding with the same CPH already exists
   * @throws {Error} For other database errors
   * @example
   * const entity = { details: { cph: '12/345/6789', name: 'Test Farm' } }
   * const holding = await repository.create(entity)
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
   * Find a holding by its MongoDB ObjectId
   * @param {string|import('mongodb').ObjectId} id - The holding MongoDB _id
   * @returns {Promise<HoldingModel|null>} The holding model or null if not found
   * @example
   * const holding = await repository.findById('507f1f77bcf86cd799439011')
   */
  async findById (id) {
    const document = await this.collection.findOne({ _id: id })
    return document ? HoldingModel.fromDocument(document) : null
  }

  /**
   * Get all holdings from the database
   * Returns raw MongoDB documents without model transformation for performance
   * @returns {Promise<Array<object>>} Array of holding documents from MongoDB
   * @example
   * const allHoldings = await repository.getAll()
   */
  async getAll () {
    const documents = await this.collection.find({}).toArray()
    return documents
  }

  /**
   * Find holdings by CPH (County Parish Holding number)
   * @param {string} cph - The CPH to search for (format: XX/XXX/XXXX)
   * @returns {Promise<Array<HoldingModel>>} Array of holdings with matching CPH
   * @example
   * const holdings = await repository.findByCph('12/345/6789')
   */
  async findByCph (cph) {
    const documents = await this.collection.find({ 'details.cph': cph }).toArray()
    return documents.map(doc => HoldingModel.fromDocument(doc))
  }

  /**
   * Update a holding by its MongoDB ObjectId
   * @param {string|import('mongodb').ObjectId} id - The holding MongoDB _id
   * @param {object} updates - The updates to apply to the holding
   * @param {object} [updates.details] - Updated holding details
   * @returns {Promise<HoldingModel|null>} The updated holding model or null if not found
   * @example
   * const updates = { details: { name: 'Updated Farm Name' } }
   * const updatedHolding = await repository.update('507f1f77bcf86cd799439011', updates)
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
   * Delete a holding by its MongoDB ObjectId
   * @param {string|import('mongodb').ObjectId} id - The holding MongoDB _id
   * @returns {Promise<boolean>} True if the holding was deleted, false if not found
   * @example
   * const wasDeleted = await repository.delete('507f1f77bcf86cd799439011')
   */
  async delete (id) {
    const result = await this.collection.deleteOne({ _id: id })
    return result.deletedCount > 0
  }
}

export { MongoHoldingRepository }
