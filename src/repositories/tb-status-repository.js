import { BaseRepository } from './base-repository.js'

/**
 * Repository for handling TB status reference data operations
 * Extends BaseRepository to provide common CRUD functionality
 */
export class TbStatusRepository extends BaseRepository {
  constructor(db) {
    super(db, 'tb_status_t')
  }

  /**
   * Get all unique TB status options ordered by abbreviation
   * Eliminates duplicate entries that may exist in the database
   * @returns {Promise<Array>} Array of TB status objects
   */
  async getAllTbStatuses() {
    return await this.db(this.tableName)
      .select('status_abb', 'status', 'midlands', 'north', 'scotland', 'south_east', 'south_west', 'wales')
      .orderBy('status_abb', 'asc')
  }

  /**
   * Get TB statuses available for a specific region
   * @param {string} region - Region name (midlands, north, scotland, south_east, south_west, wales)
   * @returns {Promise<Array>} Array of TB status objects available in the region
   */
  async getTbStatusesByRegion(region) {
    if (!['midlands', 'north', 'scotland', 'south_east', 'south_west', 'wales'].includes(region)) {
      throw new Error(`Invalid region: ${region}`)
    }

    return await this.db(this.tableName)
      .select('status_abb', 'status', 'midlands', 'north', 'scotland', 'south_east', 'south_west', 'wales')
      .where(region, true)
      .orderBy('status_abb', 'asc')
  }
}
