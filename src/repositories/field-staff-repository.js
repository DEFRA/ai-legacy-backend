import { BaseRepository } from './base-repository.js'

export class FieldStaffRepository extends BaseRepository {
  constructor (db) {
    super(db, 'field_staff_t')
  }

  /**
   * Find field staff by staff number
   * @param {string} staffNo - Staff number
   * @returns {Promise<Object|null>}
   */
  async findByStaffNo (staffNo) {
    return await this.findOne({ staff_no: staffNo })
  }

  /**
   * Get field staff by region
   * @param {string} region - Region name
   * @returns {Promise<Array>}
   */
  async findByRegion (region) {
    return await this.db(this.tableName)
      .where('region', region)
      .orderBy('last_name', 'first_name')
  }

  /**
   * Get field staff by field post
   * @param {number} fieldPost - Field post ID
   * @returns {Promise<Array>}
   */
  async findByFieldPost (fieldPost) {
    return await this.db(this.tableName)
      .where('field_post', fieldPost)
      .orderBy('last_name', 'first_name')
  }

  /**
   * Get field staff by permission level
   * @param {number} permission - Permission level
   * @returns {Promise<Array>}
   */
  async findByPermission (permission) {
    return await this.db(this.tableName)
      .where('permission', permission)
      .orderBy('last_name', 'first_name')
  }

  /**
   * Get field staff with field post details
   * @param {string} staffNo - Staff number
   * @returns {Promise<Object|null>}
   */
  async findWithFieldPost (staffNo) {
    return await this.db(this.tableName)
      .select([
        'field_staff_t.*',
        'field_staff_cat_t.field_post as field_post_name'
      ])
      .leftJoin(
        'field_staff_cat_t',
        'field_staff_t.field_post',
        'field_staff_cat_t.id'
      )
      .where('field_staff_t.staff_no', staffNo)
      .first()
  }

  /**
   * Search field staff by name
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
}
