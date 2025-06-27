import { BaseRepository } from './base-repository.js'

/**
 * Repository for handling action category reference data operations
 * Manages data from the action_cat_t table
 */
export class ActionCategoryRepository extends BaseRepository {
  constructor(db) {
    super(db, 'action_cat_t')
  }

  /**
   * Get all action categories ordered by action category
   * @returns {Promise<Array>} Array of action category objects
   */
  async getAllActionCategories() {
    return await this.db(this.tableName).select('*').orderBy('action_cat')
  }
}
