import { BaseRepository } from './base-repository.js'

/**
 * Repository for handling test result reference data operations
 * Manages data from the result_t table
 */
export class TestResultRepository extends BaseRepository {
  constructor(db) {
    super(db, 'result_t')
  }

  /**
   * Get all test results ordered by result value
   * @returns {Promise<Array>} Array of test result objects
   */
  async getAllTestResults() {
    return await this.db(this.tableName).select('*').orderBy('result')
  }
}
