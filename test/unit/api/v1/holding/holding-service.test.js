import Lab from '@hapi/lab'
import Code from '@hapi/code'
import { HoldingService } from '../../../../../src/api/v1/holding/services/holding-service.js'
import { HoldingEntity } from '../../../../../src/data/mongo/entities/holding-entity.js'

const { experiment, test, beforeEach } = Lab.script()
const { expect } = Code

experiment('Holding Service Unit Tests', () => {
  let holdingService
  let mockRepository

  beforeEach(() => {
    // Mock repository
    mockRepository = {
      getAll: () => Promise.resolve([]),
      findById: () => Promise.resolve(null),
      findByCph: () => Promise.resolve(null),
      create: (entity) => Promise.resolve({
        _id: '507f1f77bcf86cd799439011',
        ...entity.toDocument()
      })
    }

    holdingService = new HoldingService(mockRepository)
  })

  test('createHolding should create a new holding entity', async () => {
    const holdingData = {
      details: {
        cph: '12345678901',
        name: 'Test Farm',
        description: 'A test farm',
        address: {
          street: '123 Test Lane',
          town: 'Testtown',
          county: 'Testshire',
          postcode: 'TE12 3ST'
        },
        contacts: []
      },
      incidents: []
    }

    const result = await holdingService.createHolding(holdingData)

    expect(result).to.be.an.object()
    expect(result.id).to.equal('507f1f77bcf86cd799439011')
    expect(result.details.cph).to.equal('12345678901')
    expect(result.details.name).to.equal('Test Farm')
  })

  test('getAllHoldings should return empty array when no holdings exist', async () => {
    const result = await holdingService.getAllHoldings()

    expect(result).to.be.an.array()
    expect(result).to.have.length(0)
  })

  test('getHoldingById should return null when holding not found', async () => {
    const result = await holdingService.getHoldingById('507f1f77bcf86cd799439011')

    expect(result).to.be.null()
  })

  test('getHoldingByCph should return null when holding not found', async () => {
    const result = await holdingService.getHoldingByCph('12345678901')

    expect(result).to.be.null()
  })
})

export { experiment }
