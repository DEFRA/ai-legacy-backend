class MongoHoldingRepository {
  constructor(dbClient) {
    this.db = dbClient
  }

  async addHolding(holding) {
    try {
      const collection = this.db.collection('holdings')

      const mapped = holding.toDocument()

      const result = await collection.insertOne(mapped)
      const createdHolding = await collection.findOne({ _id: result.insertedId })

      return createdHolding
    } catch (error) {     
      const mongoError = new Error('MongoDB operation failed')

      mongoError.name = error.name || 'MongoError'
      mongoError.code = error.code
      mongoError.codeName = error.codeName
      
      const wrappedError = new Error('Failed to create holding', { cause: mongoError })

      throw wrappedError
    }
  }
}

export {
  MongoHoldingRepository
}
