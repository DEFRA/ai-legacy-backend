/**
 * Finishing Units Repository for managing finishing units reference data
 * Based on the MongoDB ERD specification for FinishingUnits collection
 */
class MongoFinishingUnitsRepository {
  constructor (db) {
    this.collection = db.collection('finishingUnits')
  }

  async getAll () {
    const finishingUnits = await this.collection.find({}).toArray()

    return finishingUnits
  }

  async getByRegion (region) {
    const finishingUnits = await this.collection
      .find({
        validRegions: region,
      })
      .toArray()

    return finishingUnits
  }
}

export { MongoFinishingUnitsRepository }
