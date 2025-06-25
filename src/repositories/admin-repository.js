import { BaseRepository } from './base-repository.js'

export class AdminRepository extends BaseRepository {
  constructor (db) {
    super(db, 'admin_t')
  }

  /**
   * Find admin by staff number
   * @param {string} staffNo - Staff number
   * @returns {Promise<Object|null>}
   */
  async findByStaffNo (staffNo) {
    return await this.findOne({ staff_no: staffNo })
  }

  /**
   * Get admins by region
   * @param {string} region - Region name
   * @returns {Promise<Array>}
   */
  async findByRegion (region) {
    return await this.db(this.tableName)
      .where('region', region)
      .orderBy('last_name', 'first_name')
  }

  /**
   * Get admins by office
   * @param {string} office - Office name
   * @returns {Promise<Array>}
   */
  async findByOffice (office) {
    return await this.db(this.tableName)
      .where('office', office)
      .orderBy('last_name', 'first_name')
  }

  /**
   * Get admins by permission level
   * @param {number} permission - Permission level
   * @returns {Promise<Array>}
   */
  async findByPermission (permission) {
    return await this.db(this.tableName)
      .where('permission', permission)
      .orderBy('last_name', 'first_name')
  }

  /**
   * Search admins by name
   * @param {string} searchTerm - Search term
   * @returns {Promise<Array>}
   */
  async search (searchTerm) {
    return await this.db(this.tableName)
      .where(function () {
        this.where('first_name', 'ilike', `%${searchTerm}%`)
          .orWhere('last_name', 'ilike', `%${searchTerm}%`)
          .orWhere('pref_first_name', 'ilike', `%${searchTerm}%`)
      })
      .orderBy('last_name', 'first_name')
  }

  /**
   * Get admin with full name formatted
   * @param {string} staffNo - Staff number
   * @returns {Promise<Object|null>}
   */
  async findWithFormattedName (staffNo) {
    return await this.db(this.tableName)
      .select([
        '*',
        this.db.raw("CONCAT(pref_first_name, ' ', last_name) as full_name")
      ])
      .where('staff_no', staffNo)
      .first()
  }
}
