/**
 * Allocation Booking Method Repository for managing allocation booking method reference data
 * Based on the MongoDB ERD specification for AllocationBookingMethod collection
 */
class MongoAllocationBookingMethodRepository {
  constructor (db) {
    this.collection = db.collection('allocationBookingMethod')
  }

  async getAll () {
    const allocationBookingMethods = await this.collection.find({}).toArray()

    return allocationBookingMethods
  }
}

export {
  MongoAllocationBookingMethodRepository
}
