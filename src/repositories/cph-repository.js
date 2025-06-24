import { BaseRepository } from './base-repository.js'

export class CphRepository extends BaseRepository {
  constructor(db) {
    super(db, 'cpht')
  }

  /**
   * Find CPH by CPH number
   * @param {string} cph - CPH number
   * @returns {Promise<Object|null>}
   */
  async findByCph(cph) {
    return await this.findOne({ cph })
  }

  /**
   * Get CPHs by county
   * @param {string} county - County name
   * @returns {Promise<Array>}
   */
  async findByCounty(county) {
    return await this.db(this.tableName)
      .where('county', county)
      .orderBy('cph_name')
  }

  /**
   * Get CPHs by postcode area
   * @param {string} postcodePrefix - Postcode prefix (e.g., 'FB50')
   * @returns {Promise<Array>}
   */
  async findByPostcodeArea(postcodePrefix) {
    return await this.db(this.tableName)
      .where('postcode', 'like', `${postcodePrefix}%`)
      .orderBy('cph_name')
  }

  /**
   * Search CPHs by name or description
   * @param {string} searchTerm - Search term
   * @returns {Promise<Array>}
   */
  async search(searchTerm) {
    return await this.db(this.tableName)
      .where('cph_name', 'ilike', `%${searchTerm}%`)
      .orWhere('description', 'ilike', `%${searchTerm}%`)
      .orderBy('cph_name')
  }

  /**
   * Get CPH with location coordinates
   * @param {string} cph - CPH number
   * @returns {Promise<Object|null>}
   */
  async findWithLocation(cph) {
    return await this.db(this.tableName)
      .select([
        '*',
        this.db.raw('CASE WHEN easting IS NOT NULL AND northing IS NOT NULL THEN json_build_object(\'easting\', easting, \'northing\', northing, \'map_ref\', map_ref) END as location')
      ])
      .where('cph', cph)
      .first()
  }

  /**
   * Get CPHs participating in PGP study
   * @returns {Promise<Array>}
   */
  async findPgpStudyParticipants() {
    return await this.db(this.tableName)
      .where('pgp_study', true)
      .orderBy('cph_name')
  }
}
