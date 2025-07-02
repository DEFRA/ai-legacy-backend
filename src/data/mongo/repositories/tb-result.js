/**
 * TB Result Repository for managing TB result reference data
 * Based on the MongoDB ERD specification for TbResult collection
 */
class MongoTbResultRepository {
  constructor (db) {
    this.collection = db.collection('tbResult')
  }

  async getAll () {
    const tbResults = await this.collection.find({}).toArray()

    return tbResults
  }
}

export { MongoTbResultRepository }
