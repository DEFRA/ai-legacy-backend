import { BaseRepository } from './base-repository.js'

export class CaseRepository extends BaseRepository {
  constructor (db) {
    super(db, 'case_t')
  }

  /**
   * Find case by national incident number
   * @param {string} natInc - National incident number
   * @returns {Promise<Object|null>}
   */
  async findByNatInc (natInc) {
    return await this.findOne({ nat_inc: natInc })
  }

  /**
   * Get cases by CPH
   * @param {string} cph - CPH number
   * @returns {Promise<Array>}
   */
  async findByCph (cph) {
    return await this.db(this.tableName).where('cph', cph).orderBy('nat_inc')
  }

  /**
   * Get cases by TB status
   * @param {number} tbStatus - TB status ID
   * @returns {Promise<Array>}
   */
  async findByTbStatus (tbStatus) {
    return await this.db(this.tableName)
      .where('tb_status', tbStatus)
      .orderBy('nat_inc')
  }

  /**
   * Get cases by result
   * @param {string} result - Case result
   * @returns {Promise<Array>}
   */
  async findByResult (result) {
    return await this.db(this.tableName)
      .where('result', result)
      .orderBy('nat_inc')
  }

  /**
   * Get case with related CPH and county information
   * @param {string} natInc - National incident number
   * @returns {Promise<Object|null>}
   */
  async findWithDetails (natInc) {
    return await this.db(this.tableName)
      .select([
        'case_t.*',
        'cpht.cph_name',
        'cpht.county as cph_county',
        'cpht.postcode as cph_postcode',
        'tb_status_t.status as tb_status_name',
        'result_t.result as result_name'
      ])
      .leftJoin('cpht', 'case_t.cph', 'cpht.cph')
      .leftJoin('tb_status_t', 'case_t.tb_status', 'tb_status_t.id')
      .leftJoin('result_t', 'case_t.result', 'result_t.result')
      .where('case_t.nat_inc', natInc)
      .first()
  }

  /**
   * Get cases requiring DRF completion
   * @returns {Promise<Array>}
   */
  async findDrfPending () {
    return await this.db(this.tableName)
      .whereNull('final_drf_completed_date')
      .whereNotNull('initial_drf_completed_date')
      .orderBy('initial_drf_completed_date')
  }

  /**
   * Get cases by date range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Promise<Array>}
   */
  async findByDateRange (startDate, endDate) {
    return await this.db(this.tableName)
      .whereBetween('database_entry_date', [startDate, endDate])
      .orderBy('database_entry_date', 'desc')
  }

  /**
   * Get cases requiring post mortem
   * @returns {Promise<Array>}
   */
  async findPostMortemRequired () {
    return await this.db(this.tableName)
      .whereNotNull('final_pm_date')
      .orderBy('final_pm_date')
  }

  /**
   * Get dashboard summary statistics
   * @returns {Promise<Object>}
   */
  async getDashboardStats () {
    const stats = await this.db(this.tableName)
      .select([
        this.db.raw('COUNT(*) as total_cases'),
        this.db.raw(
          "COUNT(CASE WHEN result = 'Reactor' THEN 1 END) as reactor_cases"
        ),
        this.db.raw(
          "COUNT(CASE WHEN result = 'Clear' THEN 1 END) as clear_cases"
        ),
        this.db.raw(
          'COUNT(CASE WHEN final_drf_completed_date IS NULL THEN 1 END) as pending_drf'
        ),
        this.db.raw('COUNT(CASE WHEN drf_late = true THEN 1 END) as late_drf')
      ])
      .first()

    return {
      totalCases: parseInt(stats.total_cases),
      reactorCases: parseInt(stats.reactor_cases),
      clearCases: parseInt(stats.clear_cases),
      pendingDrf: parseInt(stats.pending_drf),
      lateDrf: parseInt(stats.late_drf)
    }
  }
}
