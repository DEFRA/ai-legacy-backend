import { BaseRepository } from './base-repository.js'

export class CountyRepository extends BaseRepository {
  constructor(db) {
    super(db, 'county_t')
  }

  /**
   * Get counties by country
   * @param {string} country - Country name
   * @returns {Promise<Array>}
   */
  async findByCountry(country) {
    return await this.db(this.tableName)
      .where('country', country)
      .orderBy('county')
  }

  /**
   * Get counties by region
   * @param {string} region - Region name
   * @returns {Promise<Array>}
   */
  async findByRegion(region) {
    return await this.db(this.tableName)
      .where('region', region)
      .orderBy('county')
  }

  /**
   * Get county with office details
   * @param {number} id - County ID
   * @returns {Promise<Object|null>}
   */
  async findWithOffice(id) {
    return await this.db(this.tableName)
      .select([
        'county_t.*',
        'office_t.email as office_email',
        'office_t.telephone as office_telephone',
        'office_t.address1 as office_address1',
        'office_t.address2 as office_address2',
        'office_t.postcode as office_postcode'
      ])
      .leftJoin('office_t', 'county_t.office', 'office_t.office')
      .where('county_t.id', id)
      .first()
  }
}
