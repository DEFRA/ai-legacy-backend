/**
 * Allocation Skip Reasons Repository for managing allocation skip reasons reference data
 * Based on the MongoDB ERD specification for AllocationSkipReasons collection
 */
class MongoAllocationSkipReasonsRepository {
  constructor(db) {
    this.collection = db.collection("allocationSkipReasons");
  }

  async getAll() {
    const allocationSkipReasons = await this.collection.find({}).toArray();

    return allocationSkipReasons;
  }
}

export { MongoAllocationSkipReasonsRepository };
