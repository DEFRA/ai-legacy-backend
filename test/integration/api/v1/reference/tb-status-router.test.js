import { describe, it, expect, beforeEach, vi } from 'vitest'
import { init } from '@hapi/hapi'
import { router } from '../../../../../src/api/v1/reference/router.js'

/**
 * Integration tests for TB Status reference router
 * Tests the complete request/response cycle
 */
describe('TB Status Reference Router', () => {
  let server

  beforeEach(async () => {
    server = init({
      port: 0,
      host: 'localhost'
    })

    // Mock the mongo client and repository
    vi.mock('../../../../../src/common/database/mongo.js', () => ({
      mongoClient: {
        collection: vi.fn(() => ({
          find: vi.fn(() => ({
            toArray: vi.fn()
          }))
        }))
      }
    }))

    await server.register(router)
  })

  describe('GET /api/v1/reference/tb-status', () => {
    it('should return 200 with tb status data', async () => {
      // Mock successful repository response
      const mockData = [
        { code: 'ACTIVE', description: 'Active TB Case' },
        { code: 'CLOSED', description: 'Closed TB Case' }
      ]

      const mockCollection = {
        find: vi.fn(() => ({
          toArray: vi.fn().mockResolvedValue(mockData)
        }))
      }

      vi.doMock('../../../../../src/common/database/mongo.js', () => ({
        mongoClient: mockCollection
      }))

      const response = await server.inject({
        method: 'GET',
        url: '/api/v1/reference/tb-status'
      })

      expect(response.statusCode).toBe(200)
      expect(response.result).toEqual({
        data: [
          { code: 'ACTIVE', description: 'Active TB Case' },
          { code: 'CLOSED', description: 'Closed TB Case' }
        ]
      })
    })

    it('should handle region query parameter', async () => {
      const mockData = [
        { code: 'REGIONAL', description: 'Regional TB Case' }
      ]

      const mockCollection = {
        find: vi.fn(() => ({
          toArray: vi.fn().mockResolvedValue(mockData)
        }))
      }

      vi.doMock('../../../../../src/common/database/mongo.js', () => ({
        mongoClient: mockCollection
      }))

      const response = await server.inject({
        method: 'GET',
        url: '/api/v1/reference/tb-status?region=north-west'
      })

      expect(response.statusCode).toBe(200)
      expect(response.result.data).toEqual([
        { code: 'REGIONAL', description: 'Regional TB Case' }
      ])
    })

    it('should return 500 on service error', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/v1/reference/tb-status?region='
      })

      expect(response.statusCode).toBe(500)
      expect(response.result.message).toContain('Failed to fetch TB statuses')
    })
  })
})
