import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AllocationBookingMethodService } from '../../../../../src/api/v1/reference/services/allocation-booking-method.js'

/**
 * Test suite for AllocationBookingMethodService
 * Covers all public methods and edge cases
 */
describe('AllocationBookingMethodService', () => {
  let mockRepository
  let service

  beforeEach(() => {
    mockRepository = {
      getAll: vi.fn()
    }
    service = new AllocationBookingMethodService(mockRepository)
  })

  describe('constructor', () => {
    it('should create service instance with repository', () => {
      expect(service.repository).toBe(mockRepository)
    })
  })

  describe('getOptions', () => {
    it('should return formatted options when repository returns data', async () => {
      const mockData = [
        { method: 'Phone' },
        { method: 'Email' },
        { method: 'Online Portal' }
      ]
      mockRepository.getAll.mockResolvedValue(mockData)

      const result = await service.getOptions()

      expect(mockRepository.getAll).toHaveBeenCalledOnce()
      expect(result).toEqual([
        { method: 'Phone' },
        { method: 'Email' },
        { method: 'Online Portal' }
      ])
    })

    it('should return empty array when repository returns empty array', async () => {
      mockRepository.getAll.mockResolvedValue([])

      const result = await service.getOptions()

      expect(result).toEqual([])
    })

    it('should return empty array when repository returns null', async () => {
      mockRepository.getAll.mockResolvedValue(null)

      const result = await service.getOptions()

      expect(result).toEqual([])
    })

    it('should throw error when repository fails', async () => {
      const error = new Error('Database connection failed')
      mockRepository.getAll.mockRejectedValue(error)

      await expect(service.getOptions()).rejects.toThrow('Failed to retrieve allocation booking method options')
    })

    it('should handle undefined repository response', async () => {
      mockRepository.getAll.mockResolvedValue(undefined)

      const result = await service.getOptions()

      expect(result).toEqual([])
    })

    it('should properly format single result', async () => {
      const mockData = [{ method: 'Phone' }]
      mockRepository.getAll.mockResolvedValue(mockData)

      const result = await service.getOptions()

      expect(result).toEqual([{ method: 'Phone' }])
    })

    it('should handle repository returning large dataset', async () => {
      const mockData = Array.from({ length: 100 }, (_, i) => ({
        method: `Method ${i + 1}`
      }))
      mockRepository.getAll.mockResolvedValue(mockData)

      const result = await service.getOptions()

      expect(result).toHaveLength(100)
      expect(result[0]).toEqual({ method: 'Method 1' })
      expect(result[99]).toEqual({ method: 'Method 100' })
    })
  })
})
