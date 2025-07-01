import Lab from '@hapi/lab'
import Code from '@hapi/code'
import { tbcmsRouter } from '../../../../../src/api/v1/router.js'
import { createServer } from '../../../../../src/api/server.js'

const { experiment, test, before, after } = Lab.script()
const { expect } = Code

experiment('Holding Router Integration Tests', () => {
  let server

  before(async () => {
    server = await createServer()
    await server.register(tbcmsRouter)
    await server.start()
  })

  after(async () => {
    await server.stop()
  })

  test('POST /api/v1/holding should create a new holding', async () => {
    const payload = {
      details: {
        cph: '12345678901',
        name: 'Test Farm',
        description: 'A test farm',
        address: {
          street: '123 Test Lane',
          locality: 'Test Village',
          town: 'Testtown',
          county: 'Testshire',
          postcode: 'TE12 3ST'
        },
        geolocation: {
          mapRef: 'TQ123456',
          easting: 512345,
          northing: 187654
        },
        contacts: [
          {
            type: 'landline',
            value: '01234 567890'
          }
        ]
      },
      incidents: []
    }

    const response = await server.inject({
      method: 'POST',
      url: '/api/v1/holding',
      payload
    })

    expect(response.statusCode).to.equal(201)
    expect(response.result.data).to.be.an.object()
    expect(response.result.data.id).to.be.a.string()
    expect(response.result.data.details.cph).to.equal('12345678901')
    expect(response.result.data.details.name).to.equal('Test Farm')
  })

  test('POST /api/v1/holding should return 400 for invalid data', async () => {
    const payload = {
      details: {
        // Missing required cph field
        name: 'Test Farm',
        address: {
          town: 'Testtown',
          county: 'Testshire',
          postcode: 'TE12 3ST'
        }
      }
    }

    const response = await server.inject({
      method: 'POST',
      url: '/api/v1/holding',
      payload
    })

    expect(response.statusCode).to.equal(400)
  })

  test('GET /api/v1/holding should return all holdings', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/v1/holding'
    })

    expect(response.statusCode).to.equal(200)
    expect(response.result.data).to.be.an.array()
  })

  test('GET /api/v1/holding/{id} should return 400 for invalid ObjectId', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/v1/holding/invalid-id'
    })

    expect(response.statusCode).to.equal(400)
  })
})

export { experiment }
