import { beforeEach, describe, expect, test, vi } from 'vitest'
import Boom from '@hapi/boom'
import { getByCphRoute } from '../../../../../src/api/v1/routes/cph/get-by-cph.js'
import { cphRepository } from '../../../../../src/repositories/index.js'

// Mock the repository
vi.mock('../../../../../src/repositories/index.js', () => ({
  cphRepository: {
    findByCph: vi.fn()
  }
}))

describe('Get By CPH Route', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {
      params: { cph: '12/345/0001' },
      logger: {
        error: vi.fn()
      }
    }
    mockH = {
      response: vi.fn().mockReturnThis(),
      code: vi.fn().mockReturnThis()
    }
    vi.clearAllMocks()
  })

  test('should have correct route configuration', () => {
    expect(getByCphRoute.method).toBe('GET')
    expect(getByCphRoute.path).toBe('/api/v1/cph/{cph}')
    expect(getByCphRoute.options.description).toBe('Get CPH by CPH number')
    expect(getByCphRoute.options.tags).toEqual(['api', 'cph'])
  })

  test('should return CPH record when found', async () => {
    const mockCphRecord = {
      id: 1,
      cph_number: '12/345/0001',
      cph_name: 'Test Farm 1',
      address: '123 Farm Lane'
    }

    cphRepository.findByCph.mockResolvedValue(mockCphRecord)

    await getByCphRoute.handler(mockRequest, mockH)

    expect(cphRepository.findByCph).toHaveBeenCalledWith('12/345/0001')
    expect(mockH.response).toHaveBeenCalledWith(mockCphRecord)
    expect(mockH.code).toHaveBeenCalledWith(200)
  })

  test('should throw 404 error when CPH not found', async () => {
    cphRepository.findByCph.mockResolvedValue(null)

    await expect(getByCphRoute.handler(mockRequest, mockH)).rejects.toThrow(
      Boom.notFound('CPH not found')
    )
    expect(cphRepository.findByCph).toHaveBeenCalledWith('12/345/0001')
  })

  test('should handle repository error', async () => {
    const error = new Error('Database connection failed')
    cphRepository.findByCph.mockRejectedValue(error)

    await expect(getByCphRoute.handler(mockRequest, mockH)).rejects.toThrow(
      Boom.internal('Failed to fetch CPH')
    )
    expect(mockRequest.logger.error).toHaveBeenCalledWith(
      'Error fetching CPH:',
      error
    )
  })

  test('should re-throw Boom errors', async () => {
    const boomError = Boom.badRequest('Invalid CPH format')
    cphRepository.findByCph.mockRejectedValue(boomError)

    await expect(getByCphRoute.handler(mockRequest, mockH)).rejects.toThrow(
      boomError
    )
  })
})
