import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getTbStatus,
  getTbStatusByRegion,
  getTestResults,
  getActionCategories
} from '../../../src/api/v1/controllers/reference-controller.js'

// Mock the repositories
vi.mock('../../../src/repositories/index.js', () => ({
  tbStatusRepository: {
    getAllTbStatuses: vi.fn(),
    getTbStatusesByRegion: vi.fn()
  },
  testResultRepository: {
    getAllTestResults: vi.fn()
  },
  actionCategoryRepository: {
    getAllActionCategories: vi.fn()
  }
}))

describe('Reference Controller', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {
      logger: {
        error: vi.fn()
      },
      params: {}
    }

    mockH = {
      response: vi.fn().mockReturnThis(),
      code: vi.fn().mockReturnThis()
    }
  })

  describe('getTbStatus', () => {
    it('should return TB status data successfully', async () => {
      const mockTbStatuses = [
        {
          status_abb: 'FR',
          status: 'Fake Restricted',
          midlands: true,
          north: true,
          scotland: true,
          south_east: true,
          south_west: true,
          wales: true
        }
      ]

      const { tbStatusRepository } = await import('../../../src/repositories/index.js')
      tbStatusRepository.getAllTbStatuses.mockResolvedValue(mockTbStatuses)

      await getTbStatus(mockRequest, mockH)

      expect(mockH.response).toHaveBeenCalledWith({
        data: mockTbStatuses
      })
      expect(mockH.code).toHaveBeenCalledWith(200)
    })

    it('should handle repository errors', async () => {
      const { tbStatusRepository } = await import('../../../src/repositories/index.js')
      const dbError = new Error('Database error')
      tbStatusRepository.getAllTbStatuses.mockRejectedValue(dbError)

      await expect(getTbStatus(mockRequest, mockH)).rejects.toThrow('Failed to fetch TB statuses: Database error')
      expect(mockRequest.logger.error).toHaveBeenCalledWith('Error fetching TB statuses:', dbError)
    })
  })

  describe('getTbStatusByRegion', () => {
    beforeEach(() => {
      mockRequest.params = { region: 'midlands' }
    })

    it('should return TB status data for specific region', async () => {
      const mockTbStatuses = [
        {
          status_abb: 'FR',
          status: 'Fake Restricted',
          midlands: true,
          north: false,
          scotland: false,
          south_east: false,
          south_west: false,
          wales: false
        }
      ]

      const { tbStatusRepository } = await import('../../../src/repositories/index.js')
      tbStatusRepository.getTbStatusesByRegion.mockResolvedValue(mockTbStatuses)

      await getTbStatusByRegion(mockRequest, mockH)

      expect(mockH.response).toHaveBeenCalledWith({
        data: mockTbStatuses,
        region: 'midlands'
      })
      expect(mockH.code).toHaveBeenCalledWith(200)
    })

    it('should handle invalid region error', async () => {
      const { tbStatusRepository } = await import('../../../src/repositories/index.js')
      const invalidRegionError = new Error('Invalid region: invalid_region')
      tbStatusRepository.getTbStatusesByRegion.mockRejectedValue(invalidRegionError)

      mockRequest.params.region = 'invalid_region'

      await expect(getTbStatusByRegion(mockRequest, mockH)).rejects.toThrow('Invalid region: invalid_region')
    })
  })

  describe('getTestResults', () => {
    it('should return test results data successfully', async () => {
      const mockTestResults = [{ result: 'Negative' }, { result: 'Positive' }, { result: 'Inconclusive' }]

      const { testResultRepository } = await import('../../../src/repositories/index.js')
      testResultRepository.getAllTestResults.mockResolvedValue(mockTestResults)

      await getTestResults(mockRequest, mockH)

      expect(mockH.response).toHaveBeenCalledWith({
        data: mockTestResults
      })
      expect(mockH.code).toHaveBeenCalledWith(200)
    })
  })

  describe('getActionCategories', () => {
    it('should return action categories data successfully', async () => {
      const mockActionCategories = [
        { action_cat: 'Fake Restriction' },
        { action_cat: 'Fake Testing' },
        { action_cat: 'Fake Removal' }
      ]

      const { actionCategoryRepository } = await import('../../../src/repositories/index.js')
      actionCategoryRepository.getAllActionCategories.mockResolvedValue(mockActionCategories)

      await getActionCategories(mockRequest, mockH)

      expect(mockH.response).toHaveBeenCalledWith({
        data: mockActionCategories
      })
      expect(mockH.code).toHaveBeenCalledWith(200)
    })
  })
})
