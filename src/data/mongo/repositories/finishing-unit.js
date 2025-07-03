/**
 * Finishing Unit Repository for managing finishing unit reference data
 * Based on the MongoDB ERD specification for FinishingUnits collection
 */
class MongoFinishingUnitRepository {
  constructor (db) {
    this.collection = db.collection('finishingUnit')
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

export { MongoFinishingUnitRepository }
