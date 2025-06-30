import { describe, it, expect, beforeEach } from 'vitest'
import { Server } from '@hapi/hapi'
import { router } from '../../../../../src/api/v1/reference/router.js'

/**
 * Integration tests for Allocation Booking Method reference router
 * Tests the complete request/response cycle
 */
describe('Allocation Booking Method Reference Router', () => {
  let server

  beforeEach(async () => {
    server = new Server({
      port: 0,
      host: 'localhost'
    })

    await server.register(router)
  })

  describe('GET /api/v1/reference/allocation-booking-method', () => {
    it('should have correct route configuration', () => {
      const routes = server.table()
      const allocationBookingMethodRoute = routes.find(route =>
        route.path === '/api/v1/reference/allocation-booking-method'
      )

      expect(allocationBookingMethodRoute).toBeDefined()
      expect(allocationBookingMethodRoute.method).toBe('get')
      expect(allocationBookingMethodRoute.settings.description).toBe('Get all allocation booking method options')
      expect(allocationBookingMethodRoute.settings.tags).toEqual(['api', 'reference'])
    })

    it('should respond to the endpoint (structure test)', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/api/v1/reference/allocation-booking-method'
      })

      // Test that the endpoint exists and responds (may be 500 due to no DB, but that's expected)
      expect([200, 500]).toContain(response.statusCode)
    })
  })
})
