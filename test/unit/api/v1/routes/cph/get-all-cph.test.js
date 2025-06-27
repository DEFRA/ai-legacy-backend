import { beforeEach, describe, expect, test, vi } from 'vitest'
import Boom from '@hapi/boom'
import { getAllCphRoute } from '../../../../../src/api/v1/routes/cph/get-all-cph.js'
import { cphRepository } from '../../../../../src/repositories/index.js'

// Mock the repository
vi.mock('../../../../../src/repositories/index.js', () => ({
  cphRepository: {
    search: vi.fn(),
    findByPostcodeArea: vi.fn(),
    findAll: vi.fn(),
    count: vi.fn()
  }
}))

describe('Get All CPH Route', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {
      query: {},
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
    expect(getAllCphRoute.method).toBe('GET')
    expect(getAllCphRoute.path).toBe('/api/v1/cph')
    expect(getAllCphRoute.options.description).toBe('Get all CPH records')
    expect(getAllCphRoute.options.tags).toEqual(['api', 'cph'])
  })

  test('should return paginated CPH records with default parameters', async () => {
    const mockCphRecords = [
      { id: 1, cph_number: '12/345/0001', cph_name: 'Test Farm 1' },
      { id: 2, cph_number: '12/345/0002', cph_name: 'Test Farm 2' }
    ]
    const mockTotal = 2

    cphRepository.findAll.mockResolvedValue(mockCphRecords)
    cphRepository.count.mockResolvedValue(mockTotal)

    await getAllCphRoute.handler(mockRequest, mockH)

    expect(cphRepository.findAll).toHaveBeenCalledWith({
      filters: {},
      limit: 50,
      offset: 0,
      sort: { cph_name: 'asc' }
    })
    expect(cphRepository.count).toHaveBeenCalledWith({})
    expect(mockH.response).toHaveBeenCalledWith({
      data: mockCphRecords,
      pagination: {
        limit: 50,
        offset: 0,
        total: mockTotal
      }
    })
    expect(mockH.code).toHaveBeenCalledWith(200)
  })

  test('should handle search query', async () => {
    const searchTerm = 'test farm'
    const mockSearchResults = [
      { id: 1, cph_number: '12/345/0001', cph_name: 'Test Farm 1' }
    ]

    mockRequest.query.search = searchTerm
    cphRepository.search.mockResolvedValue(mockSearchResults)

    await getAllCphRoute.handler(mockRequest, mockH)

    expect(cphRepository.search).toHaveBeenCalledWith(searchTerm)
    expect(mockH.response).toHaveBeenCalledWith({
      data: mockSearchResults,
      pagination: {
        limit: 50,
        offset: 0,
        total: 1
      }
    })
  })

  test('should handle postcode query', async () => {
    const postcode = 'SW1A'
    const mockPostcodeResults = [
      { id: 1, cph_number: '12/345/0001', postcode: 'SW1A 1AA' }
    ]

    mockRequest.query.postcode = postcode
    cphRepository.findByPostcodeArea.mockResolvedValue(mockPostcodeResults)

    await getAllCphRoute.handler(mockRequest, mockH)

    expect(cphRepository.findByPostcodeArea).toHaveBeenCalledWith(postcode)
    expect(mockH.response).toHaveBeenCalledWith({
      data: mockPostcodeResults,
      pagination: {
        limit: 50,
        offset: 0,
        total: 1
      }
    })
  })

  test('should handle repository error', async () => {
    const error = new Error('Database connection failed')
    cphRepository.findAll.mockRejectedValue(error)
    cphRepository.count.mockRejectedValue(error)

    await expect(getAllCphRoute.handler(mockRequest, mockH)).rejects.toThrow(
      Boom.internal('Failed to fetch CPH records')
    )
    expect(mockRequest.logger.error).toHaveBeenCalledWith(
      'Error fetching CPH records:',
      error
    )
  })

  test('should apply filters correctly', async () => {
    const mockCphRecords = []
    const mockTotal = 0

    mockRequest.query = {
      county: 'Devon',
      pgp_study: 'true',
      limit: 25,
      offset: 10
    }

    cphRepository.findAll.mockResolvedValue(mockCphRecords)
    cphRepository.count.mockResolvedValue(mockTotal)

    await getAllCphRoute.handler(mockRequest, mockH)

    expect(cphRepository.findAll).toHaveBeenCalledWith({
      filters: {
        county: 'Devon',
        pgp_study: true
      },
      limit: 25,
      offset: 10,
      sort: { cph_name: 'asc' }
    })
    expect(cphRepository.count).toHaveBeenCalledWith({
      county: 'Devon',
      pgp_study: true
    })
  })
})
