/**
 * Holding Data Transfer Object
 * Used for API responses - represents how holding data is sent to clients
 */
class HoldingDto {
  /**
   * Create a HoldingDto from a Holding model
   * @param {Holding} holding - Holding domain model
   * @returns {HoldingDto} DTO instance
   */
  static fromModel(holding) {
    // TODO: Transform Holding model to DTO
    // TODO: Structure data for API response
    // TODO: Include nested objects (address, geolocation, comments)
    throw new Error('Method not implemented')
  }

  /**
   * Create a HoldingDto for list responses (summary view)
   * @param {Holding} holding - Holding domain model
   * @returns {HoldingDto} DTO instance with limited fields
   */
  static fromModelSummary(holding) {
    // TODO: Transform Holding model to summary DTO
    // TODO: Include only essential fields for list view
    throw new Error('Method not implemented')
  }

  /**
   * Create multiple HoldingDtos from array of Holdings
   * @param {Holding[]} holdings - Array of Holding models
   * @returns {HoldingDto[]} Array of DTOs
   */
  static fromModels(holdings) {
    // TODO: Transform array of Holding models to DTOs
    throw new Error('Method not implemented')
  }

  /**
   * Convert to JSON-serializable object
   * @returns {Object} Plain object ready for JSON serialization
   */
  toJSON() {
    // TODO: Return object ready for API response
    throw new Error('Method not implemented')
  }
}

export { HoldingDto }
