/**
 * @fileoverview Business logic service for holding operations
 *
 * This module contains the service layer implementation for holding business logic.
 * It acts as an intermediary between API endpoints and data repositories, implementing
 * business rules, data validation, and response formatting.
 *
 * Key Responsibilities:
 * - Business logic orchestration
 * - Data transformation between API and repository layers
 * - Error handling and business rule enforcement
 * - Response formatting for API consumers
 *
 * @module api/v1/holdings/services/holding
 * @requires ../../../../data/mongo/repositories/holding - Data access layer
 * @author Defra DDTS
 * @since 1.0.0
 */

/**
 * Service layer for holding business logic
 * Implements business rules and orchestrates data operations for holdings
 * Acts as an intermediary between API endpoints and data repositories
 * @class HoldingService
 */
class HoldingService {
  /**
   * Creates a new HoldingService instance
   * @param {import('../../../../data/mongo/repositories/holding.js').MongoHoldingRepository} holdingRepository - Repository for holding data operations
   */
  constructor (holdingRepository) {
    this.holdingRepository = holdingRepository
  }

  /**
   * Create a new holding with business logic validation
   * @param {object} holdingData - The flattened holding data from request
   * @param {string} holdingData.cph - County Parish Holding number (format: XX/XXX/XXXX)
   * @param {string} holdingData.name - Name of the holding
   * @param {string} [holdingData.description] - Optional description
   * @param {object} [holdingData.address] - Optional address information
   * @param {object} [holdingData.geolocation] - Optional geolocation data
   * @param {Array<object>} [holdingData.contacts] - Optional contact information
   * @returns {Promise<object>} The created holding in OpenAPI-compliant format with timestamps
   * @throws {DuplicateCphError} When a holding with the same CPH already exists
   * @example
   * const holdingData = { cph: '12/345/6789', name: 'Test Farm' }
   * const result = await service.createHolding(holdingData)
   * // Returns: { cph: '12/345/6789', name: 'Test Farm', address: {...}, contacts: [...], createdAt: Date, updatedAt: Date }
   */
  async createHolding (holdingData) {
    // Transform the flattened data to the internal model structure
    const entityData = {
      details: holdingData
    }

    const holding = await this.holdingRepository.create(entityData)
    return holding.toOpenApiObject()
  }  /**
   * Get a holding by its CPH (County Parish Holding number)
   * @param {string} cph - The CPH to search for (format: XX/XXX/XXXX)
   * @returns {Promise<object|null>} The holding in OpenAPI-compliant format with timestamps, or null if not found
   * @example
   * const result = await service.getHoldingByCph('12/345/6789')
   * // Returns: { cph: '12/345/6789', name: 'Test Farm', address: {...}, contacts: [...], createdAt: Date, updatedAt: Date } or null
   */

  async getHoldingByCph (cph) {
    const holdings = await this.holdingRepository.findByCph(cph)
    if (!holdings || holdings.length === 0) {
      return null
    }
    // Return the first holding found with this CPH in OpenAPI format
    return holdings[0].toOpenApiObject()
  }
}

export { HoldingService }
