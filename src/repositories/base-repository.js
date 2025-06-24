/**
 * Base Repository class implementing common CRUD operations
 * Following the Repository Pattern for data access abstraction
 */
export class BaseRepository {
  constructor(db, tableName) {
    this.db = db
    this.tableName = tableName
  }

  /**
   * Get all records with optional filtering and pagination
   * @param {Object} options - Query options
   * @param {Object} options.filters - Where conditions
   * @param {Array} options.select - Columns to select
   * @param {Object} options.sort - Sort conditions
   * @param {number} options.limit - Limit results
   * @param {number} options.offset - Offset for pagination
   * @returns {Promise<Array>}
   */
  async findAll(options = {}) {
    let query = this.db(this.tableName)

    if (options.select) {
      query = query.select(options.select)
    }

    if (options.filters) {
      query = query.where(options.filters)
    }

    if (options.sort) {
      Object.entries(options.sort).forEach(([column, direction]) => {
        query = query.orderBy(column, direction)
      })
    }

    if (options.limit) {
      query = query.limit(options.limit)
    }

    if (options.offset) {
      query = query.offset(options.offset)
    }

    return await query
  }

  /**
   * Get a single record by ID
   * @param {number|string} id - Record ID
   * @param {Array} select - Columns to select
   * @returns {Promise<Object|null>}
   */
  async findById(id, select = ['*']) {
    const result = await this.db(this.tableName)
      .select(select)
      .where('id', id)
      .first()

    return result || null
  }

  /**
   * Get a single record by conditions
   * @param {Object} conditions - Where conditions
   * @param {Array} select - Columns to select
   * @returns {Promise<Object|null>}
   */
  async findOne(conditions, select = ['*']) {
    const result = await this.db(this.tableName)
      .select(select)
      .where(conditions)
      .first()

    return result || null
  }

  /**
   * Create a new record
   * @param {Object} data - Record data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const [result] = await this.db(this.tableName)
      .insert(data)
      .returning('*')

    return result
  }

  /**
   * Update a record by ID
   * @param {number|string} id - Record ID
   * @param {Object} data - Update data
   * @returns {Promise<Object|null>}
   */
  async update(id, data) {
    const [result] = await this.db(this.tableName)
      .where('id', id)
      .update({ ...data, updated_at: new Date() })
      .returning('*')

    return result || null
  }

  /**
   * Delete a record by ID
   * @param {number|string} id - Record ID
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const deletedCount = await this.db(this.tableName)
      .where('id', id)
      .del()

    return deletedCount > 0
  }

  /**
   * Get count of records with optional filtering
   * @param {Object} filters - Where conditions
   * @returns {Promise<number>}
   */
  async count(filters = {}) {
    const result = await this.db(this.tableName)
      .where(filters)
      .count('* as count')
      .first()

    return parseInt(result.count)
  }

  /**
   * Check if record exists
   * @param {Object} conditions - Where conditions
   * @returns {Promise<boolean>}
   */
  async exists(conditions) {
    const result = await this.db(this.tableName)
      .where(conditions)
      .first()

    return !!result
  }
}
