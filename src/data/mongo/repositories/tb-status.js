/**
 * TB Status Repository for managing TB status reference data
 * Based on the MongoDB ERD specification for TbStatus collection
 */
class MongoTbStatusRepository {
  constructor (db) {
    this.collection = db.collection('tbStatus')
  }

  async getAll () {
    const tbStatuses = await this.collection.find({}).toArray()

    return tbStatuses
  }

  async getByRegion (region) {
    const tbStatuses = await this.collection.find({
      validRegions: region
    }).toArray()

    return tbStatuses
  }
}

export {
  MongoTbStatusRepository
}
